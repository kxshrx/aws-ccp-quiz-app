# AWS Certified Cloud Practitioner Quiz App

A comprehensive practice quiz application for the AWS Certified Cloud Practitioner (CCP) certification exam. This interactive web application provides both topic-focused practice sessions and full exam simulations to help you prepare for your AWS certification.

![AWS CCP Quiz App](https://img.shields.io/badge/AWS-CCP%20Quiz-orange?style=for-the-badge&logo=amazon-aws)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan?style=for-the-badge&logo=tailwindcss)

## 🚀 Features

### 📚 **Topic-Focused Practice**
- Practice specific AWS domains with targeted sessions
- Choose from multiple practice exams covering different topics
- Immediate feedback on your answers
- Progress tracking throughout your session

### 🎯 **Comprehensive Assessment**
- Full exam simulation with 65 questions
- Questions from all AWS CCP exam domains
- Exam-like conditions and timing
- Detailed performance breakdown by domain

### 💡 **Smart Quiz Engine**
- Support for multiple-choice and multi-answer questions
- Partial credit scoring system
- Clean, intuitive interface without visual clutter
- Sticky progress bar for easy navigation
- Real-time answer validation and feedback

### 🎨 **Beautiful Design**
- Vibrant, professional color palette
- Responsive design that works on all devices
- Smooth animations and transitions
- Accessibility-focused interface

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3.4.0 + DaisyUI 5.1.10
- **Question Parsing**: Custom Markdown parser
- **State Management**: React Hooks
- **Deployment Ready**: Optimized build configuration

## 🏗️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd aws-ccp-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
aws-ccp-quiz-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── HomePage.jsx   # Landing page with quiz selection
│   │   ├── QuizPage.jsx   # Main quiz interface
│   │   └── ResultsPage.jsx # Results and performance breakdown
│   ├── data/             # Quiz questions (Markdown files)
│   ├── utils/            # Utility functions and parsers
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles and Tailwind imports
│   └── main.jsx          # Application entry point
├── tailwind.config.js    # Tailwind configuration with custom theme
├── vite.config.js        # Vite build configuration
└── package.json          # Project dependencies and scripts
```

## 🎯 Usage Guide

### Starting a Practice Session

1. **Topic-Focused Practice**: 
   - Select a specific domain from the dropdown
   - Click "Start Topic Practice" to begin
   - Practice targeted questions for focused learning

2. **Comprehensive Assessment**:
   - Click "Start Comprehensive Assessment" 
   - Take the full 65-question exam simulation
   - Get detailed performance analysis

### During the Quiz

- **Navigation**: Use the progress bar to jump between questions
- **Answering**: Click on options (A, B, C, D) to select answers
- **Multi-Answer**: Some questions allow multiple correct answers
- **Review**: Review your answers before submitting

### After Completion

- **Instant Results**: See your score immediately
- **Performance Breakdown**: Analyze results by domain
- **Answer Review**: See correct answers with explanations

## 🎨 Customization

### Color Palette
The app uses a carefully crafted color palette defined in `tailwind.config.js`:

- **Cream**: `#F5EFE6` - Primary background
- **Beige**: `#E8DFCA` - Secondary background  
- **Blue**: `#6D94C5` - Primary accent
- **Light Blue**: `#CBDCEB` - Secondary accent

### Adding Questions
Place your quiz questions in Markdown format in the `src/data/` directory. The parser supports:

- Multiple choice questions
- Multi-answer questions  
- Code snippets and formatting
- Explanations for answers

## 📝 Content Attribution & Licensing

### Question Content
The quiz questions in this application are sourced from:

**Repository**: [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes)
**License**: MIT License
**Author**: Nirav Kanan

#### Original License Terms
```
MIT License

Copyright (c) 2023 Nirav Kanan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Quiz Application Code
The quiz application interface, design, and functionality are original work.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. **Code Style**: Follow the existing code style and formatting
2. **Components**: Keep components focused and reusable
3. **Testing**: Test your changes across different devices and browsers
4. **Documentation**: Update README if you add new features

## 📧 Support

If you encounter any issues or have questions about using the quiz app:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## 🎓 AWS Certification Resources

This quiz app is designed to supplement your AWS CCP exam preparation. We recommend also:

- **Official AWS Documentation**: [AWS Cloud Practitioner Essentials](https://aws.amazon.com/training/course-descriptions/cloud-practitioner-essentials/)
- **AWS Training**: [AWS Skill Builder](https://skillbuilder.aws/)
- **Practice Tests**: Use this app alongside official AWS practice exams
- **Hands-on Experience**: Create a free AWS account for practical experience

## 📊 Exam Information

**AWS Certified Cloud Practitioner (CLF-C02)**
- **Duration**: 90 minutes
- **Questions**: 65 questions (50 scored, 15 unscored)
- **Format**: Multiple choice and multiple response
- **Passing Score**: 700/1000
- **Cost**: $100 USD

**Exam Domains:**
1. Cloud Concepts (24%)
2. Security and Compliance (30%)  
3. Cloud Technology and Services (34%)
4. Billing, Pricing, and Support (12%)

## 🏆 Good Luck!

We hope this quiz application helps you succeed in your AWS Certified Cloud Practitioner certification journey. Remember, practice makes perfect!

---

**Disclaimer**: This application is for educational purposes only. AWS and the AWS logo are trademarks of Amazon Web Services, Inc. This application is not affiliated with or endorsed by Amazon Web Services.
