/**
 * GuessRankings component - displays all guesses sorted by distance score (ascending)
 */

import { GuessData, getScoreFeedback } from "../utils/gameLogic";

interface GuessRankingsProps {
  guesses: GuessData[];
}

function getScoreClass(score: number): string {
  if (score > 900) return "rank-top";
  if (score > 800) return "rank-hot";
  if (score > 650) return "rank-warm";
  if (score > 450) return "rank-cool";
  return "rank-cold";
}

export default function GuessRankings({ guesses }: GuessRankingsProps) {
  if (guesses.length === 0) return null;

  // Sort by score descending — higher score = closer to target = better
  const sortedGuesses = [...guesses].sort((a, b) => b.score - a.score);

  return (
    <div className="guess-rankings">
      <h3>📊 Your Guess History</h3>
      <p className="rankings-subtitle">Sorted by score (higher = closer to target)</p>

      <div className="rankings-list">
        {sortedGuesses.map((guess, index) => {
          const feedback = getScoreFeedback(guess.score);
          return (
            <div
              key={`${guess.word}-${index}`}
              className={`ranking-item ${getScoreClass(guess.score)}`}
            >
              <div className="guess-position">#{index + 1}</div>
              <div className="guess-word">{guess.word}</div>
              <div className="guess-rank">
                Score: <strong>{guess.score}</strong>/1000
              </div>
              <div className="guess-feedback">
                <span className="emoji">{feedback.emoji}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
