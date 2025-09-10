import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { loadQuizData, getRandomQuestions } from './utils/quizParser';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [quizData, setQuizData] = useState({ allQuestions: [], quizData: {} });
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [quizType, setQuizType] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeQuizData = async () => {
      try {
        const data = await loadQuizData();
        setQuizData(data);
      } catch (error) {
        console.error('Failed to load quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeQuizData();
  }, []);

  const handleStartQuiz = (type, file = '') => {
    if (type === 'master') {
      const randomQuestions = getRandomQuestions(quizData.allQuestions, 65);
      setCurrentQuiz(randomQuestions);
      setQuizType('master');
    } else if (type === 'individual' && file) {
      const questions = quizData.quizData[file] || [];
      setCurrentQuiz(questions);
      setQuizType('individual');
      setSelectedFile(file);
    }
    setCurrentView('quiz');
  };

  const handleQuizFinish = (quizScore) => {
    setScore(quizScore);
    setCurrentView('results');
  };

  const handleRetry = () => {
    if (quizType === 'master') {
      const randomQuestions = getRandomQuestions(quizData.allQuestions, 65);
      setCurrentQuiz(randomQuestions);
    } else {
      const questions = quizData.quizData[selectedFile] || [];
      setCurrentQuiz(questions);
    }
    setCurrentView('quiz');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentQuiz([]);
    setScore(null);
    setQuizType('');
    setSelectedFile('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-palette-cream via-palette-warm-white to-palette-light-blue flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-palette-cream">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-palette-blue rounded-3xl mb-6">
              <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-palette-charcoal mb-2">Loading Quiz</h2>
            <p className="text-palette-navy">Preparing your AWS practice questions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'home') {
    return (
      <HomePage 
        onStartQuiz={handleStartQuiz}
        quizFiles={Object.keys(quizData.quizData)}
      />
    );
  }

  if (currentView === 'quiz') {
    return (
      <QuizPage 
        questions={currentQuiz}
        quizType={quizType}
        onFinish={handleQuizFinish}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentView === 'results') {
    return (
      <ResultsPage 
        score={score}
        onRetry={handleRetry}
        onHome={handleBackToHome}
      />
    );
  }

  return null;
}

export default App;
