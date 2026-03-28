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
      <h2>Semantic Distance</h2>

      <div className="instructions-content">
        <h3>HOW TO PLAY:</h3>
        <ul>
          <li>I've secretly chosen a word from a list of 3,600+ common English words</li>
          <li>Guess any valid English word — it doesn't need to be in the list</li>
          <li>After each guess you'll see a <strong>score</strong> from 0 to 1000</li>
          <li><strong>Higher score = closer in meaning to the target</strong></li>
        </ul>

        <div className="feedback-guide">
          <div className="feedback-item hot">
            <span className="emoji">🔥</span>
            <div>
              <strong>Score &gt; 800</strong>
              <p>Very similar meaning — you're on fire!</p>
            </div>
          </div>

          <div className="feedback-item warm">
            <span className="emoji">🌤</span>
            <div>
              <strong>Score 650 – 800</strong>
              <p>Related meaning — getting warmer</p>
            </div>
          </div>

          <div className="feedback-item cold">
            <span className="emoji">🧊</span>
            <div>
              <strong>Score 450 – 650</strong>
              <p>Loosely connected — getting cooler</p>
            </div>
          </div>

          <div className="feedback-item ice-cold">
            <span className="emoji">❄️</span>
            <div>
              <strong>Score &lt; 450</strong>
              <p>Very different meaning — ice cold!</p>
            </div>
          </div>
        </div>

        <div className="how-it-works">
          <h3>🧠 HOW IT WORKS:</h3>
          <p>
            Each word is converted into a vector of numbers by an <strong>AI language model</strong>.
            Your score is the <strong>cosine distance</strong> between your guess and the target —
            how far apart their meanings are in "semantic space".
          </p>
          <p className="example">
            <strong>Example:</strong> If the target is "ocean":
          </p>
          <ul className="example-list">
            <li><strong>950</strong> — "sea" (nearly identical)</li>
            <li><strong>820</strong> — "wave" (closely related)</li>
            <li><strong>690</strong> — "water" (somewhat related)</li>
            <li><strong>280</strong> — "forest" (unrelated)</li>
          </ul>
        </div>

        <ul>
          <li><strong>Score of 1000 = exact semantic match</strong></li>
          <li>Your guess must be a real English word (checked automatically)</li>
          <li>Think about synonyms, related concepts, or the same category as the target</li>
        </ul>
      </div>

      <button className="start-button" onClick={onStart}>
        Start Playing
      </button>
    </div>
  );
}
