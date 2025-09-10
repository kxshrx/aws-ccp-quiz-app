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
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body text-center">
            <div className="avatar placeholder mb-4">
              <div className="bg-primary text-primary-content rounded-full w-16">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
            <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
            <h2 className="text-2xl font-bold mb-2">Loading Quiz Data</h2>
            <p className="text-base-content/70">Preparing your AWS practice questions...</p>
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
            </div>
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
