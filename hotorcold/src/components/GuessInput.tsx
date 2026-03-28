/**
 * GuessInput component - handles user input for guesses
 */

import { useState } from "react";
import { validateGuess } from "../utils/gameLogic";

interface GuessInputProps {
  onGuess: (guess: string) => void;
  onGiveUp?: () => void;
  disabled?: boolean;
  guessCount?: number;
}

export default function GuessInput({ onGuess, onGiveUp, disabled = false, guessCount = 0 }: GuessInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidating(true);
    try {
      const validationError = await validateGuess(input);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      onGuess(input.trim().toLowerCase());
      setInput("");
    } finally {
      setValidating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (error) setError(null);
  };

  const isDisabled = disabled || validating;

  return (
    <div className="guess-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your guess..."
            disabled={isDisabled}
            className={error ? "error" : ""}
            autoFocus
          />
          <button type="submit" disabled={isDisabled || !input.trim()}>
            {validating ? "Checking..." : "Guess"}
          </button>
          {guessCount >= 10 && onGiveUp && (
            <button type="button" className="give-up-button" onClick={onGiveUp} disabled={isDisabled}>
              Give Up
            </button>
          )}
        </div>
        {error && <div className="error-message">❌ {error}</div>}
      </form>
    </div>
  );
}
