import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { shuffleArray } from '../utils/quizParser';

export default function QuizPage({ questions, quizType, onFinish, onBack }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showEarlySubmitModal, setShowEarlySubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const questionsPerPage = 10;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  useEffect(() => {
    // Shuffle questions and their options when quiz starts
    const shuffled = questions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setShuffledQuestions(shuffled);
  }, [questions]);

  const getCurrentPageQuestions = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return shuffledQuestions.slice(start, end);
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (isSubmitted) return; // Don't allow changes after submission
    
    const globalQuestionIndex = currentPage * questionsPerPage + questionIndex;
    const question = shuffledQuestions[globalQuestionIndex];
    
    // Check if this question has multiple correct answers
    const correctAnswersCount = question.options.filter(option => option.isCorrect).length;
    
    if (correctAnswersCount > 1) {
      // Multiple choice - toggle selection
      setAnswers(prev => {
        const currentAnswers = prev[globalQuestionIndex] || [];
        const newAnswers = currentAnswers.includes(optionIndex)
          ? currentAnswers.filter(idx => idx !== optionIndex)
          : [...currentAnswers, optionIndex];
        
        return {
          ...prev,
          [globalQuestionIndex]: newAnswers.length > 0 ? newAnswers : undefined
        };
      });
    } else {
      // Single choice - replace selection
      setAnswers(prev => ({
        ...prev,
        [globalQuestionIndex]: optionIndex
      }));
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const isQuizComplete = () => {
    return getAnsweredCount() === shuffledQuestions.length;
  };

  const calculateScore = () => {
    let totalCorrectAnswers = 0;
    let totalPossiblePoints = 0;
    
    shuffledQuestions.forEach((question, questionIndex) => {
      const selectedAnswers = answers[questionIndex];
      if (selectedAnswers !== undefined) {
        const correctOptions = question.options.filter(option => option.isCorrect);
        const correctAnswersCount = correctOptions.length;
        
        if (correctAnswersCount > 1) {
          // Multiple choice question - partial credit scoring
          const selectedArray = Array.isArray(selectedAnswers) ? selectedAnswers : [selectedAnswers];
          let correctSelections = 0;
          let incorrectSelections = 0;
          
          selectedArray.forEach(selectedIdx => {
            if (question.options[selectedIdx]?.isCorrect) {
              correctSelections++;
            } else {
              incorrectSelections++;
            }
          });
          
          // Award partial credit: (correct selections - incorrect selections) / total correct, minimum 0
          const questionScore = Math.max(0, (correctSelections - incorrectSelections) / correctAnswersCount);
          totalCorrectAnswers += questionScore;
        } else {
          // Single choice question - all or nothing
          const selectedIdx = Array.isArray(selectedAnswers) ? selectedAnswers[0] : selectedAnswers;
          const selectedOption = question.options[selectedIdx];
          if (selectedOption && selectedOption.isCorrect) {
            totalCorrectAnswers += 1;
          }
        }
        totalPossiblePoints += 1;
      }
    });

    return {
      correct: Math.round(totalCorrectAnswers * 100) / 100, // Round to 2 decimal places
      total: getAnsweredCount(),
      totalQuestions: shuffledQuestions.length,
      percentage: totalPossiblePoints > 0 ? Math.round((totalCorrectAnswers / totalPossiblePoints) * 100) : 0
    };
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    const score = calculateScore();
    onFinish(score);
  };

  const handleEarlySubmit = () => {
    if (getAnsweredCount() === 0) return;
    setShowEarlySubmitModal(true);
  };

  const confirmEarlySubmit = () => {
    setShowEarlySubmitModal(false);
    setIsSubmitted(true);
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-palette-cream via-palette-warm-white to-palette-light-blue flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-palette-blue border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-xl text-palette-navy">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-palette-cream via-palette-warm-white to-palette-light-blue">
      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-palette-cream shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-base sm:text-lg font-semibold text-palette-charcoal">Progress</span>
            <span className="text-base sm:text-lg font-semibold text-palette-blue">{Math.round((getAnsweredCount() / shuffledQuestions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-palette-beige rounded-full h-2 sm:h-3">
            <div 
              className="bg-gradient-to-r from-palette-blue to-palette-light-blue h-2 sm:h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(getAnsweredCount() / shuffledQuestions.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-1 sm:mt-2 text-xs sm:text-sm text-palette-navy">
            <span>{getAnsweredCount()} of {shuffledQuestions.length} answered</span>
            <span>Page {currentPage + 1} of {totalPages}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-palette-cream">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <button 
                className="flex items-center space-x-2 sm:space-x-3 text-palette-blue hover:text-palette-navy transition-colors font-semibold text-base sm:text-lg"
                onClick={onBack}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-palette-charcoal">
                  {quizType === 'master' ? 'Comprehensive Assessment' : 'Topic-Focused Practice'}
                </h1>
                <p className="text-base sm:text-lg text-palette-navy">
                  Page {currentPage + 1} of {totalPages} • {getAnsweredCount()}/{shuffledQuestions.length} answered
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              {!isSubmitted && getAnsweredCount() > 0 && (
                <button 
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-palette-blue text-white rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  onClick={isQuizComplete() ? handleSubmit : handleEarlySubmit}
                >
                  {isQuizComplete() ? 'Submit Assessment' : 'Submit Early'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
          {getCurrentPageQuestions().map((question, questionIndex) => {
            const globalQuestionIndex = currentPage * questionsPerPage + questionIndex;
            const selectedAnswers = answers[globalQuestionIndex];
            const correctAnswersCount = question.options.filter(option => option.isCorrect).length;
            const isMultipleChoice = correctAnswersCount > 1;
            const isAnswered = selectedAnswers !== undefined;

            return (
              <div key={globalQuestionIndex} className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border-2 border-palette-cream hover:shadow-3xl transition-all duration-300">
                <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6">
                  <div className={classNames(
                    "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-base sm:text-lg font-bold",
                    isAnswered ? "bg-palette-blue text-white shadow-xl" : "bg-palette-beige text-palette-navy"
                  )}>
                    {globalQuestionIndex + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold leading-relaxed text-palette-charcoal">
                        {question.question}
                      </h3>
                      {isMultipleChoice && (
                        <span className="bg-orange-100 text-orange-800 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-orange-200 self-start">
                          Multiple Answers
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = isMultipleChoice 
                          ? (Array.isArray(selectedAnswers) ? selectedAnswers.includes(optionIndex) : false)
                          : selectedAnswers === optionIndex;
                        const isCorrect = option.isCorrect;
                        const showAnswer = isSubmitted;
                        
                        let buttonClass = "w-full p-4 sm:p-5 lg:p-6 text-left rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02]";
                        
                        if (showAnswer) {
                          if (isCorrect) {
                            // Always show correct answers with green styling
                            buttonClass += " bg-green-100 border-2 border-green-400 text-green-800 shadow-xl";
                          } else if (isSelected && !isCorrect) {
                            // Show incorrect selected answers with red styling
                            buttonClass += " bg-red-100 border-2 border-red-400 text-red-800 shadow-xl";
                          } else {
                            // Non-selected, non-correct answers
                            buttonClass += " bg-gray-100 border-2 border-gray-300 text-gray-600";
                          }
                        } else {
                          if (isSelected) {
                            buttonClass += " bg-palette-light-blue border-2 border-palette-blue text-palette-charcoal shadow-xl";
                          } else {
                            buttonClass += " bg-palette-soft-gray border-2 border-palette-beige text-palette-navy hover:border-palette-blue hover:shadow-xl";
                          }
                        }

                        return (
                          <button
                            key={optionIndex}
                            className={buttonClass}
                            onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                            disabled={isSubmitted}
                          >
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                                <span className={classNames(
                                  "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border-2 flex items-center justify-center text-base sm:text-lg font-bold transition-all duration-300",
                                  showAnswer && isCorrect ? "bg-green-600 border-green-600 text-white" :
                                  showAnswer && isSelected && !isCorrect ? "bg-red-600 border-red-600 text-white" :
                                  isSelected ? "bg-palette-blue border-palette-blue text-white" : "border-current"
                                )}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </span>
                              </div>
                              <span className="flex-1 text-base sm:text-lg">{option.text}</span>
                              {showAnswer && (
                                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
                                  {isCorrect ? (
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  ) : (isSelected && !isCorrect ? (
                                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  ) : null)}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-palette-cream">
          <div className="flex justify-between items-center">
            <button 
              className={classNames(
                "flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300",
                currentPage === 0 
                  ? "border-2 border-palette-beige text-palette-navy cursor-not-allowed" 
                  : "border-2 border-palette-blue text-palette-blue hover:bg-palette-blue hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-105"
              )}
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            <div className="flex space-x-1 sm:space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={classNames(
                    "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl lg:rounded-2xl text-sm sm:text-base lg:text-lg font-bold transition-all duration-300",
                    currentPage === i 
                      ? "bg-palette-blue text-white shadow-xl" 
                      : "text-palette-navy hover:bg-palette-light-blue hover:shadow-lg transform hover:scale-110"
                  )}
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              className={classNames(
                "flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300",
                currentPage === totalPages - 1 
                  ? "border-2 border-palette-beige text-palette-navy cursor-not-allowed" 
                  : "border-2 border-palette-blue text-palette-blue hover:bg-palette-blue hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-105"
              )}
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
            >
              <span>Next</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Submitted State */}
        {isSubmitted && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-center border-2 border-green-200 mx-4 sm:mx-0">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-3 sm:mb-4 px-4">Quiz Submitted Successfully</h3>
            <p className="text-base sm:text-lg text-palette-navy mb-4 sm:mb-6 px-4">
              You answered {getAnsweredCount()} out of {shuffledQuestions.length} questions
            </p>
            <button 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-palette-blue text-white rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              onClick={handleFinish}
            >
              View Results
            </button>
          </div>
        )}

        {/* Early Submit Modal */}
        {showEarlySubmitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md mx-4 border-2 border-palette-cream">
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-palette-charcoal mb-3 sm:mb-4">Submit Quiz Early?</h3>
                <p className="text-base sm:text-lg text-palette-navy leading-relaxed">
                  You have answered {getAnsweredCount()} out of {shuffledQuestions.length} questions.
                  Unanswered questions will not be counted in your score.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-palette-beige rounded-xl sm:rounded-2xl text-palette-navy font-semibold hover:bg-palette-light-blue transition-all duration-300"
                  onClick={() => setShowEarlySubmitModal(false)}
                >
                  Continue Quiz
                </button>
                <button 
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-xl sm:rounded-2xl font-semibold hover:bg-orange-600 transition-all duration-300 shadow-xl"
                  onClick={confirmEarlySubmit}
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
