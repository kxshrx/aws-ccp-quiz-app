export default function ResultsPage({ score, onRetry, onHome }) {
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-error";
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding Performance! 🌟";
    if (percentage >= 80) return "Excellent Work! �";
    if (percentage >= 70) return "Great Job! 👍";
    if (percentage >= 60) return "Good Effort! �";
    return "Keep Studying! 💪";
  };

  const getBadgeType = (percentage) => {
    if (percentage >= 80) return "badge-success";
    if (percentage >= 60) return "badge-warning";
    return "badge-error";
  };

  const getMotivationalTip = (percentage) => {
    if (percentage >= 90) return "You're ready for the real exam! Keep up the excellent work.";
    if (percentage >= 80) return "Strong performance! Review any missed topics and you'll be exam-ready.";
    if (percentage >= 70) return "Good foundation! Focus on weak areas for improvement.";
    if (percentage >= 60) return "You're on the right track. More practice will boost your confidence.";
    return "Don't give up! Every expert was once a beginner. Keep practicing!";
  };

  const isEarlySubmission = score.total < score.totalQuestions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="avatar placeholder mb-6">
              <div className="bg-primary text-primary-content rounded-full w-20">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Quiz Results
            </h1>
            {isEarlySubmission && (
              <div className="badge badge-warning badge-lg mb-4">
                Early Submission - {score.total} of {score.totalQuestions} questions answered
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Score Card */}
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body text-center">
                {/* Score Circle */}
                <div className="flex justify-center mb-6">
                  <div className="radial-progress bg-base-300 text-primary-content border-8 border-primary" 
                       style={{ "--value": score.percentage, "--size": "12rem", "--thickness": "1rem" }}>
                    <span className={`text-4xl font-bold ${getScoreColor(score.percentage)}`}>
                      {score.percentage}%
                    </span>
                  </div>
                </div>

                {/* Score Message */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {getScoreMessage(score.percentage)}
                  </h2>
                  <div className={`badge ${getBadgeType(score.percentage)} badge-lg`}>
                    {score.correct} correct out of {score.total} answered
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div className="text-left">
                    <div className="text-sm">{getMotivationalTip(score.percentage)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Stats Card */}
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-6 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Performance Breakdown
                </h3>

                <div className="space-y-4">
                  {/* Correct Answers */}
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-success text-success-content rounded-full w-10">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">Correct Answers</div>
                        <div className="text-sm text-base-content/60">Well done!</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-success">{score.correct}</div>
                  </div>

                  {/* Incorrect Answers */}
                  <div className="flex items-center justify-between p-4 bg-error/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-error text-error-content rounded-full w-10">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">Incorrect Answers</div>
                        <div className="text-sm text-base-content/60">Review these topics</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-error">{score.total - score.correct}</div>
                  </div>

                  {/* Unanswered (if early submission) */}
                  {isEarlySubmission && (
                    <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-warning text-warning-content rounded-full w-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">Unanswered</div>
                          <div className="text-sm text-base-content/60">Skipped questions</div>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-warning">{score.totalQuestions - score.total}</div>
                    </div>
                  )}

                  {/* Accuracy Rate */}
                  <div className="divider">Accuracy Rate</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {score.percentage}%
                    </div>
                    <progress 
                      className="progress progress-primary w-full h-4" 
                      value={score.percentage} 
                      max="100"
                    ></progress>
                    <div className="text-sm text-base-content/60 mt-2">
                      Based on {score.total} answered questions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card bg-base-100 shadow-xl mt-8">
            <div className="card-body">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={onRetry}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry Quiz
                </button>
                <button 
                  className="btn btn-outline btn-lg"
                  onClick={onHome}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>
          </div>

          {/* Study Tips */}
          {score.percentage < 80 && (
            <div className="card bg-base-100 shadow-xl mt-8">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Study Recommendations
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-bold">Review AWS Documentation</h4>
                      <div className="text-xs">Study official AWS whitepapers and service documentation</div>
                    </div>
                  </div>
                  <div className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h4 className="font-bold">Practice More Questions</h4>
                      <div className="text-xs">Take more practice exams to identify weak areas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
