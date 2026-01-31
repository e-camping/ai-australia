# Hot or Cold Word Guessing Game 🧠

A beautiful, AI-powered word guessing game where you try to find a secret word based on **semantic similarity** (meaning) rather than spelling!

Built with **React**, **TypeScript**, **Vite**, and **TensorFlow.js**.

## 🎮 How to Play

1. The computer secretly selects a word from a list
2. You guess words by thinking about their **meanings**
3. After each guess, you get feedback on how similar the **meaning** is:
   - 🔥 **HOT** (75-100% similar) - Very close in meaning!
   - 🌤 **WARM** (50-74% similar) - Related concepts...
   - 🧊 **COLD** (25-49% similar) - Somewhat connected
   - ❄️ **ICE COLD** (0-24% similar) - Very different meanings
4. You also get an exact semantic similarity score (0-100%)
5. All your guesses are ranked from closest to furthest in meaning
6. Think about synonyms, related concepts, and word meanings!

**Example:** If the target is "computer", guessing "laptop" will score higher than "compute" because they have similar meanings, even though "compute" shares more letters.

## 🧠 What Makes This Special?

This game uses **AI-powered semantic similarity** via TensorFlow.js and the Universal Sentence Encoder model. Instead of comparing letter patterns, it understands the **actual meaning** of words!

- "king" and "queen" → High similarity (related concepts)
- "king" and "kingdom" → Lower similarity (different meanings despite shared spelling)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Game

```bash
# Start the development server
npm run dev
```

The game will open in your browser at `http://localhost:5173`

**Note:** The first time you load the game, it will download the Universal Sentence Encoder model (~50MB). This is cached for subsequent loads.

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## ✨ Features

- 🧠 **AI-Powered Semantic Similarity** - Uses TensorFlow.js and Universal Sentence Encoder
- ✅ Beautiful, modern UI with smooth animations
- ✅ Fully responsive design (mobile-friendly)
- ✅ Random word selection from 25+ words
- ✅ Real-time meaning-based similarity calculation
- ✅ Hot/Warm/Cold/Ice Cold feedback with visual indicators
- ✅ Numerical similarity scores (0-100%)
- ✅ Live rankings of all guesses (best to worst by meaning)
- ✅ Input validation (letters only)
- ✅ Guess counter
- ✅ Model loading screen with progress indicator
- ✅ Victory screen with statistics
- ✅ Play again / New game functionality
- ✅ TypeScript for type safety
- ✅ Clean, well-commented code

## 🎯 How It Works

### Semantic Similarity

The game uses the **Universal Sentence Encoder**, a neural network trained by Google that converts words and sentences into high-dimensional vectors (embeddings). These embeddings capture the semantic meaning of words.

1. **Word Embedding**: Each word is converted into a 512-dimensional vector
2. **Cosine Similarity**: The angle between vectors is calculated
3. **Similarity Score**: Converted to a percentage (0-100%)

### Example Comparisons:
- Target: "computer"
  - "laptop" → ~85% (synonym, very similar meaning)
  - "technology" → ~70% (related concept)
  - "keyboard" → ~65% (related device)
  - "coding" → ~60% (related activity)
  - "apple" → ~15% (completely different)

## 📁 Project Structure

```
hotorcold/
├── src/
│   ├── components/
│   │   ├── GameBoard.tsx       # Main game interface
│   │   ├── GuessInput.tsx      # Input form for guesses
│   │   ├── GuessRankings.tsx   # Display ranked guesses
│   │   ├── Instructions.tsx    # Game instructions screen
│   │   └── ModelLoader.tsx     # AI model loading screen
│   ├── utils/
│   │   └── gameLogic.ts        # Semantic similarity logic (TensorFlow.js)
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Component styles
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TensorFlow.js** - Machine learning in the browser
- **Universal Sentence Encoder** - Google's semantic similarity model
- **CSS3** - Modern styling with gradients and animations

## 📝 Development Notes

### Code Quality
- Full TypeScript coverage with strict type checking
- Comprehensive comments explaining AI logic
- Clean component architecture
- Responsive design patterns
- Memory management for TensorFlow tensors

### Performance
- Model is loaded once and cached
- Efficient tensor disposal to prevent memory leaks
- Fast Vite dev server with HMR (Hot Module Replacement)
- Optimized production builds

### AI Model
- Model size: ~50MB (cached after first load)
- Inference time: ~100-300ms per guess
- Runs entirely in the browser (no server required)
- Works offline after initial model download

## 🎨 Customization

You can easily customize the game by modifying:

- **Word list**: Edit `WORD_LIST` in [src/utils/gameLogic.ts](src/utils/gameLogic.ts)
- **Similarity thresholds**: Adjust values in `getFeedback()` function in [src/utils/gameLogic.ts](src/utils/gameLogic.ts)
- **Colors and styling**: Modify CSS variables in [src/index.css](src/index.css)
- **UI components**: Customize React components in [src/components/](src/components/)

## 🧪 Technical Details

### Semantic Similarity Calculation

```typescript
// 1. Load the Universal Sentence Encoder model
const model = await use.load();

// 2. Convert words to embeddings (512-dimensional vectors)
const embeddings = await model.embed([word1, word2]);

// 3. Calculate cosine similarity between vectors
const similarity = cosineSimilarity(embedding1, embedding2);

// 4. Convert to percentage (0-100%)
const percentage = similarity * 100;
```

### Why Cosine Similarity?

Cosine similarity measures the angle between two vectors, which is perfect for semantic similarity:
- 1.0 (0°) = identical meaning
- 0.0 (90°) = unrelated
- Values typically range from 0.0 to 1.0 for word meanings

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and add your own features!

Some ideas:
- Add more word categories
- Multi-language support
- Difficulty levels
- Leaderboard system
- Hint system

## 🙏 Credits

- **Universal Sentence Encoder** - Google Research
- **TensorFlow.js** - TensorFlow team
- **React** - Meta/Facebook

---

**Enjoy the game!** 🎮✨🧠

*Challenge yourself to think about word meanings, not just spelling!*
