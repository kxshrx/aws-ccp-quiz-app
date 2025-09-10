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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h1 className="text-6xl font-bold text-palette-charcoal mb-6 leading-tight">
              AWS Cloud Practitioner
              <span className="block text-palette-blue mt-2">Certification Practice</span>
            </h1>
            <p className="text-xl text-palette-navy max-w-3xl mx-auto leading-relaxed mb-8">
              Master AWS fundamentals with targeted practice sessions and comprehensive assessments designed for certification success
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

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Individual Quiz Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-palette-cream hover:border-palette-blue hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-palette-blue to-palette-light-blue rounded-3xl shadow-xl mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-palette-charcoal mb-4">Topic-Focused Practice</h2>
                <p className="text-lg text-palette-navy leading-relaxed">
                  Target specific AWS domains with individual practice sessions
                </p>
              </div>
              
              <div className="mb-8">
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
              </div>
              
              <button 
                className={classNames(
                  "w-full py-4 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-xl",
                  selectedQuiz 
                    ? "bg-palette-blue text-white hover:bg-opacity-90 hover:shadow-2xl transform hover:scale-105" 
                    : "bg-palette-beige text-palette-navy cursor-not-allowed"
                )}
                onClick={handleIndividualQuiz}
                disabled={!selectedQuiz}
              >
                Start Practice Session
              </button>

              <div className="mt-6 p-4 bg-palette-light-blue rounded-2xl text-center">
                <p className="text-palette-navy font-medium">Perfect for focused learning on specific AWS topics</p>
              </div>
            </div>

            {/* Comprehensive Assessment Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-palette-cream hover:border-palette-blue hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-palette-beige to-palette-cream rounded-3xl shadow-xl mb-6">
                  <svg className="w-10 h-10 text-palette-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-palette-charcoal mb-4">Comprehensive Assessment</h2>
                <p className="text-lg text-palette-navy leading-relaxed">
                  Full-length exam simulation covering all AWS domains
                </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-palette-soft-gray rounded-2xl">
                  <div className="text-3xl font-bold text-palette-blue mb-2">65</div>
                  <div className="text-lg text-palette-navy">Questions</div>
                </div>
                <div className="text-center p-6 bg-palette-soft-gray rounded-2xl">
                  <div className="text-3xl font-bold text-palette-blue mb-2">90min</div>
                  <div className="text-lg text-palette-navy">Suggested</div>
                </div>
              </div>
              
              <button 
                className="w-full py-4 px-6 rounded-2xl text-lg font-semibold bg-gradient-to-r from-palette-beige to-palette-cream text-palette-charcoal hover:shadow-2xl transition-all duration-300 shadow-xl transform hover:scale-105"
                onClick={handleMasterQuiz}
              >
                Start Comprehensive Assessment
              </button>

              <div className="mt-6 p-4 bg-palette-light-blue rounded-2xl text-center">
                <p className="text-palette-navy font-medium">Full exam simulation for final certification preparation</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-3xl shadow-xl px-8 py-6 border-2 border-palette-cream">
              <p className="text-lg text-palette-navy">
                Questions sourced from{' '}
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
