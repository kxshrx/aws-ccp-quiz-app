export default function ResultsPage({ score, onRetry, onHome }) {
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding Performance!";
    if (percentage >= 80) return "Excellent Work!";
    if (percentage >= 70) return "Great Job!";
    if (percentage >= 60) return "Good Effort!";
    return "Keep Studying!";
  };

  const getBadgeColor = (percentage) => {
    if (percentage >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (percentage >= 60) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getMotivationalTip = (percentage) => {
    if (percentage >= 90) return "You're ready for the real exam! Keep up the excellent work.";
    if (percentage >= 80) return "Strong performance! Review any missed topics and you'll be exam-ready.";
    if (percentage >= 70) return "Good foundation! Focus on weak areas for improvement.";
    if (percentage >= 60) return "You're on the right track. More practice will boost your confidence.";
    return "Focus on understanding the concepts better. Practice makes perfect!";
  };

  const isEarlySubmission = score.total < score.totalQuestions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-palette-cream via-palette-warm-white to-palette-light-blue">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-palette-blue to-palette-light-blue rounded-4xl shadow-2xl mb-6 sm:mb-8">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 714.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 713.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 710 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 710-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 713.138-3.138z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-palette-charcoal mb-4 sm:mb-6 leading-tight px-4">
              Quiz Results
            </h1>
            {isEarlySubmission && (
              <div className="inline-block bg-orange-100 text-orange-800 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold border-2 border-orange-200 mb-6 sm:mb-8 mx-4">
                Early Submission - {score.total} of {score.totalQuestions} questions answered
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {/* Score Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 border-palette-cream">
              <div className="text-center">
                {/* Score Circle */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="relative">
                    <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-palette-beige"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2.51 * score.percentage} ${2.51 * (100 - score.percentage)}`}
                        className="text-palette-blue transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${getScoreColor(score.percentage)}`}>
                        {score.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Message */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-palette-charcoal mb-3 sm:mb-4 px-4">
                    {getScoreMessage(score.percentage)}
                  </h2>
                  <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold border-2 ${getBadgeColor(score.percentage)} mx-4`}>
                    {score.correct} correct out of {score.total} answered
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="bg-palette-light-blue rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-palette-blue mx-4 sm:mx-0">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-palette-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-base sm:text-lg text-palette-navy leading-relaxed">{getMotivationalTip(score.percentage)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Stats Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 border-palette-cream">
              <h3 className="text-2xl sm:text-3xl font-bold text-palette-charcoal mb-6 sm:mb-8 text-center flex items-center justify-center space-x-2 sm:space-x-3 px-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Performance Breakdown</span>
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {/* Correct Answers */}
                <div className="flex items-center justify-between p-4 sm:p-6 bg-green-50 rounded-xl sm:rounded-2xl border-2 border-green-200">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-green-800">Correct Answers</div>
                      <div className="text-base sm:text-lg text-green-600">Well done!</div>
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-green-600">{score.correct}</div>
                </div>

                {/* Incorrect Answers */}
                <div className="flex items-center justify-between p-4 sm:p-6 bg-red-50 rounded-xl sm:rounded-2xl border-2 border-red-200">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-red-800">Incorrect Answers</div>
                      <div className="text-base sm:text-lg text-red-600">Review these topics</div>
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-red-600">{score.total - score.correct}</div>
                </div>

                {/* Unanswered (if early submission) */}
                {isEarlySubmission && (
                  <div className="flex items-center justify-between p-4 sm:p-6 bg-orange-50 rounded-xl sm:rounded-2xl border-2 border-orange-200">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-orange-800">Unanswered</div>
                        <div className="text-base sm:text-lg text-orange-600">Skipped questions</div>
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-orange-600">{score.totalQuestions - score.total}</div>
                  </div>
                )}

                {/* Accuracy Rate */}
                <div className="border-t-2 border-palette-beige pt-4 sm:pt-6">
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-semibold text-palette-navy mb-2 sm:mb-3">Accuracy Rate</div>
                    <div className="text-4xl sm:text-5xl font-bold text-palette-blue mb-3 sm:mb-4">
                      {score.percentage}%
                    </div>
                    <div className="w-full bg-palette-beige rounded-full h-4 sm:h-6 mb-2 sm:mb-3">
                      <div 
                        className="bg-gradient-to-r from-palette-blue to-palette-light-blue h-4 sm:h-6 rounded-full transition-all duration-1000 ease-out shadow-lg" 
                        style={{ width: `${score.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-base sm:text-lg text-palette-navy">
                      Based on {score.total} answered questions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 border-2 border-palette-cream mx-4 sm:mx-0">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button 
                className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-palette-blue text-white rounded-xl sm:rounded-2xl text-lg sm:text-xl font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3"
                onClick={onRetry}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Retry Quiz</span>
              </button>
              <button 
                className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 border-2 border-palette-blue text-palette-blue rounded-xl sm:rounded-2xl text-lg sm:text-xl font-semibold hover:bg-palette-blue hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3"
                onClick={onHome}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
