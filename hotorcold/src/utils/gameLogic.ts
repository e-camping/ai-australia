/**
 * Game logic utilities for the Hot or Cold word guessing game.
 * Scores are cosine distances: 0.0 = identical meaning, 1.0 = completely different.
 */

import { WORD_LIST as IMPORTED_WORD_LIST } from './wordlist';

export const WORD_LIST = IMPORTED_WORD_LIST;

// Interface for a single guess with its score
export interface GuessData {
  word: string;
  score: number; // 0–1000: 1000 = identical meaning, 0 = completely different
}

const API_BASE = '/api';

/**
 * Check that the backend API is reachable.
 */
export async function checkApiHealth(): Promise<boolean> {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) throw new Error('API server not reachable');
  return true;
}

/**
 * Compute cosine distance between a target word and a guess via the API.
 * Returns a value between 0.0 (identical meaning) and 1.0 (completely different).
 */
export async function computeScore(targetWord: string, guessWord: string): Promise<number> {
  const response = await fetch(`${API_BASE}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target: targetWord.toLowerCase(), guess: guessWord.toLowerCase() }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to compute score');
  }

  const data = await response.json();
  return 1000 - Math.round(data.distance * 1000);
}

/**
 * Validate a guess — checks basic format, then confirms it's a real English word
 * via the Free Dictionary API. Returns an error message or null if valid.
 */
export async function validateGuess(guess: string): Promise<string | null> {
  if (!guess || guess.trim() === '') return 'Guess cannot be empty!';
  if (!/^[a-zA-Z]+$/.test(guess.trim())) return 'Guess must contain only letters!';
  if (guess.trim().length < 2) return 'Guess must be at least 2 letters long!';

  const word = guess.trim().toLowerCase();
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) return 'Not a valid English word!';
    return null;
  } catch {
    // If dictionary API is unreachable, allow the guess through
    return null;
  }
}

/**
 * Get emoji and feedback message based on cosine distance.
 */
export function getScoreFeedback(score: number): { emoji: string; message: string } {
  if (score > 900) return { emoji: '🔥', message: 'SCORCHING! Almost identical meaning!' };
  if (score > 800) return { emoji: '🔥', message: 'HOT! Very similar meaning!' };
  if (score > 650) return { emoji: '🌤', message: 'WARM! Related meaning...' };
  if (score > 450) return { emoji: '🧊', message: 'COOL... Loosely connected' };
  return { emoji: '❄️', message: 'COLD... Very different meaning' };
}

/**
 * Get a random word from the word list to use as the target.
 */
export function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}
