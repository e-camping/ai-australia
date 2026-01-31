/**
 * GuessRankings component - displays all guesses ranked by similarity
 */

import { GuessData } from "../utils/gameLogic";

interface GuessRankingsProps {
  guesses: GuessData[];
}

export default function GuessRankings({ guesses }: GuessRankingsProps) {
  if (guesses.length === 0) {
    return null;
  }

  // Sort guesses by similarity (descending)
  const sortedGuesses = [...guesses].sort((a, b) => b.similarity - a.similarity);

  // Function to get the CSS class for feedback type
  const getFeedbackClass = (feedback: string): string => {
    return feedback.toLowerCase().replace("_", "-");
  };

  return (
    <div className="guess-rankings">
      <h3>📊 Your Guess Rankings</h3>
      <p className="rankings-subtitle">Ranked from best to worst</p>

      <div className="rankings-list">
        {sortedGuesses.map((guess, index) => (
          <div
            key={`${guess.word}-${index}`}
            className={`ranking-item ${getFeedbackClass(guess.feedback)}`}
          >
            <div className="rank-number">#{index + 1}</div>
            <div className="guess-word">{guess.word}</div>
            <div className="guess-similarity">{guess.similarity.toFixed(2)}%</div>
            <div className="guess-feedback">
              <span className="emoji">{guess.emoji}</span>
              <span className="feedback-text">{guess.feedback.replace("_", " ")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
