/**
 * GameBoard component - main game interface with distance-based scoring
 */

import { useState } from "react";
import {
  getRandomWord,
  computeScore,
  getScoreFeedback,
  GuessData,
} from "../utils/gameLogic";
import GuessInput from "./GuessInput";
import GuessRankings from "./GuessRankings";

interface GameBoardProps {
  onReset: () => void;
}

export default function GameBoard({ onReset }: GameBoardProps) {
  const [targetWord] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState<GuessData[]>([]);
  const [currentGuess, setCurrentGuess] = useState<GuessData | null>(null);
  const [won, setWon] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const handleGuess = async (guess: string) => {
    if (guess.toLowerCase().trim() === targetWord.toLowerCase()) {
      setWon(true);
      setGuessCount((prev) => prev + 1);
      return;
    }

    setProcessing(true);
    try {
      const score = await computeScore(targetWord, guess);
      const guessData: GuessData = { word: guess, score };
      setGuesses((prev) => [...prev, guessData]);
      setCurrentGuess(guessData);
      setGuessCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error computing score:", error);
      alert("Error computing score. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleGiveUp = () => setGaveUp(true);
  const handlePlayAgain = () => onReset();

  return (
    <div className="game-board">
      <div className="game-header">
        <h1>🎮 HOT OR COLD</h1>
        <p className="game-subtitle">Semantic Distance</p>
        <button className="reset-button" onClick={handlePlayAgain}>
          New Game
        </button>
      </div>

      {gaveUp ? (
        <div className="victory-screen">
          <div className="victory-content">
            <div className="victory-emoji">😔</div>
            <h2>GAME OVER</h2>
            <p className="victory-message">The word was:</p>
            <div className="victory-word">{targetWord.toUpperCase()}</div>
            <p className="victory-stats">
              You made <strong>{guessCount}</strong> {guessCount === 1 ? "guess" : "guesses"}.
            </p>
            <button className="play-again-button" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
          {guesses.length > 0 && (
            <div className="final-rankings">
              <h3>Your Journey:</h3>
              <GuessRankings guesses={guesses} />
            </div>
          )}
        </div>
      ) : !won ? (
        <>
          <div className="game-info">
            <div className="info-card">
              <span className="label">Target Word Length:</span>
              <span className="value">{targetWord.length} letters</span>
            </div>
            <div className="info-card">
              <span className="label">Guess Count:</span>
              <span className="value">{guessCount}</span>
            </div>
          </div>

          <GuessInput onGuess={handleGuess} onGiveUp={handleGiveUp} disabled={won || processing} guessCount={guessCount} />

          {processing && (
            <div className="processing-indicator">
              <div className="spinner"></div>
              <p>Computing score...</p>
            </div>
          )}

          {currentGuess && !processing && (
            <div className="current-feedback rank-feedback">
              <div className="rank-display">
                <div className="rank-emoji">{getScoreFeedback(currentGuess.score).emoji}</div>
                <div className="rank-info">
                  <div className="rank-number">
                    Score: <strong>{currentGuess.score}</strong>
                    <span className="score-hint"> / 1000 (higher = closer)</span>
                  </div>
                  <div className="rank-message">
                    {getScoreFeedback(currentGuess.score).message}
                  </div>
                  <div className="rank-word">
                    Your guess: <strong>{currentGuess.word}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          <GuessRankings guesses={guesses} />
        </>
      ) : (
        <div className="victory-screen">
          <div className="victory-content">
            <div className="victory-emoji">🎉</div>
            <h2>CONGRATULATIONS!</h2>
            <p className="victory-message">You found the word!</p>
            <div className="victory-word">{targetWord.toUpperCase()}</div>
            <p className="victory-stats">
              You guessed it in <strong>{guessCount}</strong> {guessCount === 1 ? "guess" : "guesses"}!
            </p>
            <button className="play-again-button" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
          {guesses.length > 0 && (
            <div className="final-rankings">
              <h3>Your Journey:</h3>
              <GuessRankings guesses={guesses} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
