/**
 * GameBoard component - main game interface
 */

import { useState } from "react";
import { getRandomWord, processGuess, GuessData } from "../utils/gameLogic";
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

  const handleGuess = async (guess: string) => {
    // Check if the guess is correct (exact match)
    if (guess.toLowerCase().trim() === targetWord.toLowerCase()) {
      setWon(true);
      setGuessCount((prev) => prev + 1);
      return;
    }

    // Process the guess (calculate semantic similarity)
    setProcessing(true);
    try {
      const guessData = await processGuess(guess, targetWord);
      setGuesses((prev) => [...prev, guessData]);
      setCurrentGuess(guessData);
      setGuessCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error processing guess:", error);
      alert("Error processing your guess. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handlePlayAgain = () => {
    onReset();
  };

  return (
    <div className="game-board">
      <div className="game-header">
        <h1>🎮 HOT OR COLD</h1>
        <p className="game-subtitle">Semantic Similarity Edition</p>
        <button className="reset-button" onClick={handlePlayAgain}>
          New Game
        </button>
      </div>

      {!won ? (
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

          <GuessInput onGuess={handleGuess} disabled={won || processing} />

          {processing && (
            <div className="processing-indicator">
              <div className="spinner"></div>
              <p>Analyzing semantic similarity...</p>
            </div>
          )}

          {currentGuess && !processing && (
            <div className={`current-feedback ${currentGuess.feedback.toLowerCase().replace("_", "-")}`}>
              <div className="feedback-emoji">{currentGuess.emoji}</div>
              <div className="feedback-details">
                <div className="feedback-type">{currentGuess.feedback.replace("_", " ")}</div>
                <div className="feedback-similarity">Semantic Similarity: {currentGuess.similarity.toFixed(2)}%</div>
                <div className="feedback-hint">
                  {currentGuess.similarity >= 75 && "Your word means something very similar!"}
                  {currentGuess.similarity >= 50 && currentGuess.similarity < 75 && "Getting closer in meaning!"}
                  {currentGuess.similarity >= 25 && currentGuess.similarity < 50 && "The meanings are somewhat related..."}
                  {currentGuess.similarity < 25 && "The meanings are very different!"}
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
