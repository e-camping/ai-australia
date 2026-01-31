/**
 * Instructions component - displays game rules and how to play
 */

interface InstructionsProps {
  onStart: () => void;
}

export default function Instructions({ onStart }: InstructionsProps) {
  return (
    <div className="instructions">
      <h1>🎮 HOT OR COLD</h1>
      <h2>Semantic Similarity Edition</h2>

      <div className="instructions-content">
        <h3>HOW TO PLAY:</h3>
        <ul>
          <li>I've secretly chosen a word from my word list</li>
          <li>Try to guess it by thinking about word <strong>meanings</strong></li>
          <li>After each guess, I'll tell you how similar the <strong>meaning</strong> is:</li>
        </ul>

        <div className="feedback-guide">
          <div className="feedback-item hot">
            <span className="emoji">🔥</span>
            <div>
              <strong>HOT</strong>
              <p>75-100% similar - Very close in meaning!</p>
            </div>
          </div>

          <div className="feedback-item warm">
            <span className="emoji">🌤</span>
            <div>
              <strong>WARM</strong>
              <p>50-74% similar - Related concepts...</p>
            </div>
          </div>

          <div className="feedback-item cold">
            <span className="emoji">🧊</span>
            <div>
              <strong>COLD</strong>
              <p>25-49% similar - Somewhat connected</p>
            </div>
          </div>

          <div className="feedback-item ice-cold">
            <span className="emoji">❄️</span>
            <div>
              <strong>ICE COLD</strong>
              <p>0-24% similar - Very different meanings</p>
            </div>
          </div>
        </div>

        <div className="how-it-works">
          <h3>🧠 HOW IT WORKS:</h3>
          <p>
            This game uses <strong>AI-powered semantic similarity</strong> to compare word meanings.
            Instead of comparing letter patterns, it understands the <em>actual meaning</em> of words!
          </p>
          <p className="example">
            <strong>Example:</strong> If the target is "computer", guessing "laptop" will score higher than "compute"
            because they have similar meanings, even though "compute" shares more letters.
          </p>
        </div>

        <ul>
          <li>You'll see the exact semantic similarity score (0-100%)</li>
          <li>All your guesses are ranked from closest to furthest in meaning</li>
          <li>Think about synonyms, related concepts, and word meanings!</li>
        </ul>
      </div>

      <button className="start-button" onClick={onStart}>
        Start Playing
      </button>
    </div>
  );
}
