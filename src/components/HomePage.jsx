import { useState } from 'react';
import classNames from 'classnames';

export default function HomePage({ onStartQuiz, quizFiles }) {
  const [selectedQuiz, setSelectedQuiz] = useState('');

  const handleIndividualQuiz = () => {
    if (selectedQuiz) {
      onStartQuiz('individual', selectedQuiz);
    }
  };

  const handleMasterQuiz = () => {
    onStartQuiz('master');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-palette-cream via-palette-warm-white to-palette-light-blue">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-palette-blue rounded-4xl shadow-2xl mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-palette-charcoal mb-6 leading-tight">
              AWS CCP Certification Practice
            </h1>
            <p className="text-xl text-palette-navy max-w-3xl mx-auto leading-relaxed mb-8">
              Master the AWS Certified Cloud Practitioner exam with comprehensive practice sessions and real-world scenarios
            </p>
            
            <div className="flex justify-center space-x-12">
              <div className="text-center p-6 bg-white rounded-3xl shadow-xl">
                <div className="text-4xl font-bold text-palette-blue mb-2">{quizFiles.length}</div>
                <div className="text-lg text-palette-navy">Topic-Focused Sessions</div>
              </div>
              <div className="text-center p-6 bg-white rounded-3xl shadow-xl">
                <div className="text-4xl font-bold text-palette-blue mb-2">65</div>
                <div className="text-lg text-palette-navy">Comprehensive Assessment</div>
              </div>
            </div>
          </div>

          {/* Quiz Options */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Topic-Focused Practice */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-palette-cream hover:shadow-3xl transition-all duration-300 h-full flex flex-col">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-palette-light-blue rounded-3xl mb-6">
                  <svg className="w-8 h-8 text-palette-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-palette-charcoal mb-4">Topic-Focused Practice</h2>
                <p className="text-lg text-palette-navy leading-relaxed">
                  Focus on specific AWS domains with targeted practice sessions
                </p>
              </div>
              
              <div className="flex-1 space-y-6">
                <label className="block text-lg font-semibold text-palette-charcoal mb-4">
                  Choose Practice Session
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-palette-soft-gray border-2 border-palette-beige rounded-2xl px-6 py-4 text-palette-charcoal text-lg focus:outline-none focus:border-palette-blue transition-colors appearance-none pr-12"
                    value={selectedQuiz}
                    onChange={(e) => setSelectedQuiz(e.target.value)}
                  >
                    <option value="">Select a topic-focused session...</option>
                    {quizFiles.map(file => (
                      <option key={file} value={file}>
                        {file.replace('.md', '').replace(/practice-exam-(\d+)/, 'Practice Session $1')}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-6 h-6 text-palette-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-palette-light-blue rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-palette-charcoal mb-3">Session Features</h3>
                  <ul className="space-y-2 text-palette-navy">
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Targeted domain practice</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Immediate feedback</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Progress tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <button 
                className={classNames(
                  "w-full py-4 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-xl mt-6",
                  selectedQuiz 
                    ? "bg-palette-blue text-white hover:bg-opacity-90 hover:shadow-2xl transform hover:scale-105" 
                    : "bg-palette-beige text-palette-navy cursor-not-allowed"
                )}
                onClick={handleIndividualQuiz}
                disabled={!selectedQuiz}
              >
                Start Topic Practice
              </button>
            </div>

            {/* Comprehensive Assessment */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-palette-cream hover:shadow-3xl transition-all duration-300 h-full flex flex-col">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-palette-light-blue rounded-3xl mb-6">
                  <svg className="w-8 h-8 text-palette-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-palette-charcoal mb-4">Comprehensive Assessment</h2>
                <p className="text-lg text-palette-navy leading-relaxed">
                  Take the full exam simulation with 65 questions across all domains
                </p>
              </div>
              
              <div className="flex-1 space-y-6">
                <div className="mb-4">
                  <div className="text-lg font-semibold text-palette-charcoal mb-4">
                    Ready to Begin Assessment
                  </div>
                  <div className="w-full bg-palette-soft-gray border-2 border-palette-beige rounded-2xl px-6 py-4 text-palette-charcoal text-lg">
                    Full exam simulation - 65 questions
                  </div>
                </div>
                
                <div className="bg-palette-light-blue rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-palette-charcoal mb-3">Assessment Details</h3>
                  <ul className="space-y-2 text-palette-navy">
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>65 questions from all exam domains</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Exam-like conditions and timing</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Detailed performance breakdown</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <button 
                className="w-full py-4 px-6 bg-palette-blue text-white rounded-2xl text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mt-6"
                onClick={handleMasterQuiz}
              >
                Start Comprehensive Assessment
              </button>
            </div>
          </div>

          {/* Attribution */}
          <div className="text-center">
            <div className="bg-white rounded-3xl shadow-xl p-6 inline-block">
              <p className="text-palette-navy text-lg">
                Content sourced from{' '}
                <a 
                  href="https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-palette-blue hover:underline font-semibold"
                >
                  kananinirav/AWS-Certified-Cloud-Practitioner-Notes
                </a>
                {' '}• MIT Licensed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
