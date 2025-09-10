// Utility function to shuffle an array
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Parse markdown content to extract questions
export function parseMarkdownQuestions(markdownContent) {
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
          const correctLetters = correctAnswer.replace('Correct answer: ', '').split(',').map(l => l.trim());
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
    
    // Check for answer line
    if (line.includes('Correct answer:')) {
      correctAnswer = line;
    }
  }
  
  // Add the last question if exists
  if (currentQuestion && currentQuestion.options.length > 0) {
    if (correctAnswer) {
      const correctLetters = correctAnswer.replace('Correct answer: ', '').split(',').map(l => l.trim());
      correctLetters.forEach(letter => {
        const correctIndex = letter.charCodeAt(0) - 65;
        if (currentQuestion.options[correctIndex]) {
          currentQuestion.options[correctIndex].isCorrect = true;
        }
      });
    }
    questions.push(currentQuestion);
  }
  
  return questions;
}

// Load and parse all quiz files
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
  let loadedFiles = 0;
  
  for (const file of quizFiles) {
    try {
      const response = await fetch(`/quiz-data/${file}`);
      if (response.ok) {
        const content = await response.text();
        const questions = parseMarkdownQuestions(content);
        if (questions.length > 0) {
          quizData[file] = questions;
          allQuestions.push(...questions);
          loadedFiles++;
        }
      }
    } catch (error) {
      console.warn(`Failed to load ${file}:`, error);
    }
  }
  
  console.log(`Successfully loaded ${loadedFiles} quiz files with ${allQuestions.length} total questions`);
  
  return { allQuestions, quizData };
}

// Get random questions for master quiz
export function getRandomQuestions(questions, count = 65) {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
