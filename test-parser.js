import { parseMarkdownQuestions } from './src/utils/quizParser.js';
import fs from 'fs';

// Test with the first practice exam
const testFile = './public/quiz-data/practice-exam-1.md';
const content = fs.readFileSync(testFile, 'utf8');

console.log('Testing parser with practice-exam-1.md...');
console.log('First 500 characters:');
console.log(content.substring(0, 500));
console.log('\n=== PARSING RESULTS ===');

const questions = parseMarkdownQuestions(content, 'practice-exam-1.md');
console.log(`Total questions parsed: ${questions.length}`);

if (questions.length > 0) {
  console.log('\nFirst question:');
  console.log('Question:', questions[0].question);
  console.log('Options:', questions[0].options);
  console.log('Correct options:', questions[0].options.filter(opt => opt.isCorrect));
}
