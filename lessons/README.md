# AI Lessons - Interactive Learning Platform

An interactive, multi-page lesson platform teaching AI and machine learning concepts using React, TypeScript, and Next.js.

## Features

- 🎓 **9 Comprehensive Lessons** covering AI fundamentals
- 💻 **Interactive Code Exercises** with live testing
- 🎮 **Hot or Cold Game** for learning text embeddings
- ✅ **Progress Tracking** with localStorage
- 🎨 **Beautiful UI** with Tailwind CSS
- 🌙 **Dark Mode** support
- 📱 **Responsive Design** for all devices

## Lessons Included

1. **Probabilities** - AI predicting next words, logits to probabilities (Interactive)
2. **Bias and Variance** - Model accuracy, overfitting/underfitting (Theory)
3. **Training and Testing Data** - Data concepts and cleaning (Theory)
4. **Text Embedding** - Word vectors and Hot/Cold game (Game)
5. **Image Classification** - How neural networks see images (Theory)
6. **Tokens and System Prompts** - Tokenization and AI behavior (Interactive)
7. **Decision Trees** - Tree-based predictions (Interactive)
8. **Linear vs Logistic Models** - Regression comparison (Interactive)
9. **Large Language Models** - How LLMs work (Theory)

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
lessons/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Landing page
│   ├── probabilities/           # Lesson 1
│   ├── bias-variance/           # Lesson 2
│   ├── training-testing/        # Lesson 3
│   ├── text-embedding/          # Lesson 4
│   ├── image-classification/    # Lesson 5
│   ├── tokens/                  # Lesson 6
│   ├── decision-trees/          # Lesson 7
│   ├── linear-logistic/         # Lesson 8
│   └── llms/                    # Lesson 9
├── components/                   # Reusable React components
│   ├── LessonLayout.tsx         # Lesson wrapper
│   ├── CodeEditor.tsx           # Monaco editor
│   ├── InteractiveExercise.tsx  # Code exercises
│   ├── CodeExample.tsx          # Syntax highlighting
│   ├── ContinueButton.tsx       # Navigation
│   ├── LessonNavigation.tsx     # Sidebar
│   └── HotColdGame.tsx          # Embedding game
├── lib/                          # Utility functions
│   ├── lessonConfig.ts          # Lesson metadata
│   ├── codeExecution.ts         # Code testing
│   ├── progressTracker.ts       # Progress storage
│   └── types.ts                 # TypeScript types
└── public/                       # Static assets
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - VS Code-powered code editor
- **Lucide React** - Beautiful icons

## Features in Detail

### Interactive Exercises
- Live code editor with syntax highlighting
- Real-time test execution
- Immediate feedback on solutions
- Progress tracking

### Progress Tracking
- Automatically saves completed lessons
- Visual progress indicators
- Persistent across sessions (localStorage)

### Lesson Navigation
- Sidebar with all lessons
- "Continue" buttons between lessons
- Free navigation (no locked lessons)
- Progress percentage display

## Development

### Adding a New Lesson

1. Create a new directory in `app/` (e.g., `app/new-lesson/`)
2. Create `page.tsx` with your lesson content
3. Add lesson metadata to `lib/lessonConfig.ts`
4. Use existing components for consistency

### Customization

- Modify `lib/lessonConfig.ts` to change lesson order or metadata
- Edit `app/globals.css` for styling changes
- Update `lib/progressTracker.ts` to change progress tracking behavior

## Troubleshooting

### Monaco Editor Not Loading
If the code editor doesn't load:
- Check browser console for errors
- Ensure JavaScript is enabled
- Try clearing browser cache

### Progress Not Saving
- Check that localStorage is enabled in your browser
- Clear browser data and try again
- Progress is stored per browser/device

### Node Version Warning
If you see a Node version warning:
- Upgrade to Node.js 18.17.0 or higher
- Or continue anyway (may work with minor issues)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

Built for AI education at AI Australia
