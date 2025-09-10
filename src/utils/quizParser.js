// Utility function to shuffle an array
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Simplified but robust markdown parser
export function parseMarkdownQuestions(markdownContent, filename = 'unknown') {
  const questions = [];
  const lines = markdownContent.split('\n');
  
  let currentQuestion = null;
  let correctAnswer = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for question line (starts with number followed by dot)
    if (line.match(/^\d+\.\s+.+/)) {
      // Save previous question if exists
      if (currentQuestion && currentQuestion.options.length > 0) {
        // Mark the correct option(s)
        if (correctAnswer) {
          const correctLetters = correctAnswer.replace(/.*Correct [aA]nswer:\s*/, '').split(',').map(l => l.trim().toUpperCase());
          correctLetters.forEach(letter => {
            const correctIndex = letter.charCodeAt(0) - 65; // Convert A,B,C,D to 0,1,2,3
            if (currentQuestion.options[correctIndex]) {
              currentQuestion.options[correctIndex].isCorrect = true;
            }
          });
        }
        questions.push(currentQuestion);
      }
      
      // Extract question text
      const questionText = line.replace(/^\d+\.\s+/, '').trim();
      currentQuestion = {
        question: questionText,
        options: []
      };
      correctAnswer = null;
    }
    
    // Check for option lines (starts with - A. or - B. etc.)
    if (line.match(/^\s*-\s+[A-D]\.\s+.+/)) {
      if (currentQuestion) {
        const optionText = line.replace(/^\s*-\s+[A-D]\.\s+/, '').trim();
        
        currentQuestion.options.push({
          text: optionText,
          isCorrect: false // Will be set later when we find the answer
        });
      }
    }
    
    // Check for answer line (handle both direct format and HTML details format)
    if (line.includes('Correct answer:') || line.includes('Correct Answer:')) {
      correctAnswer = line.trim();
    }
  }
  
  // Add the last question if exists
  if (currentQuestion && currentQuestion.options.length > 0) {
    if (correctAnswer) {
      const correctLetters = correctAnswer.replace(/.*Correct [aA]nswer:\s*/, '').split(',').map(l => l.trim().toUpperCase());
      correctLetters.forEach(letter => {
        const correctIndex = letter.charCodeAt(0) - 65;
        if (currentQuestion.options[correctIndex]) {
          currentQuestion.options[correctIndex].isCorrect = true;
        }
      });
    }
    questions.push(currentQuestion);
  }
  
  // Validate that each question has at least one correct answer
  const validQuestions = questions.filter(q => q.options.some(opt => opt.isCorrect));
  
  if (filename !== 'unknown') {
    console.log(`📊 ${filename}: Parsed ${questions.length} questions, ${validQuestions.length} have correct answers`);
    if (questions.length !== validQuestions.length) {
      console.warn(`⚠️ ${filename}: ${questions.length - validQuestions.length} questions without correct answers`);
    }
  }
  
  return validQuestions;
}

// Load and parse all quiz files with enhanced error reporting
export async function loadQuizData() {
  const quizFiles = [
    'practice-exam-1.md', 'practice-exam-2.md', 'practice-exam-3.md',
    'practice-exam-4.md', 'practice-exam-5.md', 'practice-exam-6.md',
    'practice-exam-7.md', 'practice-exam-8.md', 'practice-exam-9.md',
    'practice-exam-10.md', 'practice-exam-11.md', 'practice-exam-12.md',
    'practice-exam-13.md', 'practice-exam-14.md', 'practice-exam-15.md',
    'practice-exam-16.md', 'practice-exam-17.md', 'practice-exam-18.md',
    'practice-exam-19.md', 'practice-exam-20.md', 'practice-exam-21.md',
    'practice-exam-22.md', 'practice-exam-23.md'
  ];
  
  const allQuestions = [];
  const quizData = {};
  const loadingResults = {
    successful: [],
    failed: [],
    empty: []
  };
  
  console.log(`🚀 Starting to load ${quizFiles.length} quiz files...`);
  console.log(`📁 Files to load:`, quizFiles);
  
  // Test if we can access the quiz-data directory at all
  try {
    const testResponse = await fetch('/quiz-data/');
    console.log(`📂 Directory access test:`, testResponse.status, testResponse.statusText);
  } catch (error) {
    console.warn(`📂 Directory access failed:`, error);
  }
  
  for (const file of quizFiles) {
    console.log(`🔄 Attempting to load: ${file}`);
    try {
      const response = await fetch(`/quiz-data/${file}`);
      console.log(`📡 Response for ${file}:`, response.status, response.ok);
      if (response.ok) {
        const content = await response.text();
        const questions = parseMarkdownQuestions(content, file);
        
        if (questions.length > 0) {
          quizData[file] = questions;
          allQuestions.push(...questions);
          loadingResults.successful.push({ file, questionCount: questions.length });
          console.log(`✅ ${file}: ${questions.length} questions loaded`);
        } else {
          loadingResults.empty.push(file);
          console.warn(`⚠️ ${file}: File loaded but no valid questions extracted`);
        }
      } else {
        loadingResults.failed.push({ file, reason: `HTTP ${response.status}: ${response.statusText}` });
        console.error(`❌ ${file}: Failed to fetch - ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      loadingResults.failed.push({ file, reason: error.message });
      console.error(`❌ ${file}: Exception during loading -`, error);
    }
  }
  
  // Summary report
  console.log(`\n📋 LOADING SUMMARY:`);
  console.log(`✅ Successfully loaded: ${loadingResults.successful.length} files`);
  console.log(`⚠️ Empty files: ${loadingResults.empty.length} files`);
  console.log(`❌ Failed to load: ${loadingResults.failed.length} files`);
  console.log(`📊 Total questions: ${allQuestions.length}`);
  console.log(`📝 Quiz files available in dropdown: ${Object.keys(quizData).length}`);
  
  if (loadingResults.failed.length > 0) {
    console.group('Failed files details:');
    loadingResults.failed.forEach(({ file, reason }) => {
      console.log(`- ${file}: ${reason}`);
    });
    console.groupEnd();
  }
  
  if (loadingResults.empty.length > 0) {
    console.group('Empty files:');
    loadingResults.empty.forEach(file => {
      console.log(`- ${file}`);
    });
    console.groupEnd();
  }
  
  return { allQuestions, quizData };
}

// Get random questions for master quiz
export function getRandomQuestions(questions, count = 65) {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
