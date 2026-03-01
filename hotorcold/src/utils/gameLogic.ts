/**
 * Game logic utilities for the Hot or Cold word guessing game
 * Uses pre-computed sentence transformer embeddings via API
 */

import { WORD_LIST as IMPORTED_WORD_LIST } from './wordlist';

export const WORD_LIST = IMPORTED_WORD_LIST;

// Interface for word rankings
export interface WordRanking {
  word: string;
  similarity: number;
  rank: number; // 1 = most similar, higher = less similar
}

// Interface for guess data
export interface GuessData {
  word: string;
  rank: number;
  totalWords: number;
  similarity: number;
}

const API_BASE = '/api';

/**
 * Check that the backend API is reachable.
 */
export async function checkApiHealth(): Promise<boolean> {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) {
    throw new Error('API server not reachable');
  }
  return true;
}

/**
 * Compute rankings for all words compared to a target word via the API.
 * Returns an array of WordRanking objects sorted by similarity (most similar first).
 */
export async function computeWordRankings(targetWord: string): Promise<WordRanking[]> {
  const response = await fetch(`${API_BASE}/rankings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target: targetWord.toLowerCase() })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to compute rankings');
  }

  const data = await response.json();
  return data.rankings as WordRanking[];
}

/**
 * Find the rank of a guessed word in the pre-computed rankings.
 */
export function processGuess(
  guess: string,
  rankings: WordRanking[]
): GuessData {
  const guessLower = guess.toLowerCase().trim();

  const ranking = rankings.find(r => r.word.toLowerCase() === guessLower);

  if (!ranking) {
    throw new Error("NOT_IN_WORD_LIST");
  }

  return {
    word: guessLower,
    rank: ranking.rank,
    totalWords: rankings.length,
    similarity: ranking.similarity
  };
}

/**
 * Get emoji and feedback message based on rank.
 */
export function getRankFeedback(rank: number, totalWords: number): { emoji: string; message: string } {
  const percentile = (rank / totalWords) * 100;

  if (rank === 1) {
    return { emoji: "🔥", message: "INCREDIBLE! You found the #1 closest word!" };
  } else if (rank <= 3) {
    return { emoji: "🔥", message: "SO HOT! You're in the top 3!" };
  } else if (percentile <= 20) {
    return { emoji: "🔥", message: "HOT! Top 20%!" };
  } else if (percentile <= 40) {
    return { emoji: "🌤", message: "WARM! Getting closer..." };
  } else if (percentile <= 60) {
    return { emoji: "🧊", message: "COOL... Keep trying" };
  } else if (percentile <= 80) {
    return { emoji: "❄️", message: "COLD... Not quite there" };
  } else {
    return { emoji: "❄️", message: "ICE COLD... Very different meaning" };
  }
}

/**
 * Validate a guess - must be alphabetic and not empty.
 */
export function validateGuess(guess: string): string | null {
  if (!guess || guess.trim() === "") {
    return "Guess cannot be empty!";
  }

  if (!/^[a-zA-Z\s]+$/.test(guess)) {
    return "Guess must contain only letters (no numbers or symbols)!";
  }

  if (guess.trim().length < 2) {
    return "Guess must be at least 2 letters long!";
  }

  const guessLower = guess.toLowerCase().trim();
  const isInWordList = WORD_LIST.some(word => word.toLowerCase() === guessLower);

  if (!isInWordList) {
    return "Not in word list!";
  }

  return null;
}

/**
 * Get a random word from the word list.
 */
export function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}
