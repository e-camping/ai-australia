/**
 * Game logic utilities for the Hot or Cold word guessing game
 * Uses semantic similarity (meaning-based) instead of character similarity
 */

import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs';

// Word list for the game (at least 20 words with diverse meanings)
export const WORD_LIST = [
  "python", "computer", "keyboard", "program", "function",
  "variable", "database", "internet", "software", "hardware",
  "algorithm", "network", "terminal", "browser", "developer",
  "application", "security", "memory", "processor", "interface",
  "system", "server", "coding", "digital", "technology"
];

// Feedback types
export type FeedbackType = "HOT" | "WARM" | "COLD" | "ICE_COLD";

export interface GuessData {
  word: string;
  similarity: number;
  feedback: FeedbackType;
  emoji: string;
}

// Singleton model instance
let modelInstance: use.UniversalSentenceEncoder | null = null;
let modelLoadingPromise: Promise<use.UniversalSentenceEncoder> | null = null;

/**
 * Load the Universal Sentence Encoder model.
 * This is called once and the model is reused for all similarity calculations.
 */
export async function loadModel(): Promise<use.UniversalSentenceEncoder> {
  // If model is already loaded, return it
  if (modelInstance) {
    return modelInstance;
  }

  // If model is currently loading, wait for that promise
  if (modelLoadingPromise) {
    return modelLoadingPromise;
  }

  // Start loading the model
  modelLoadingPromise = use.load();
  modelInstance = await modelLoadingPromise;

  console.log('Universal Sentence Encoder model loaded successfully');
  return modelInstance;
}

/**
 * Calculate cosine similarity between two vectors.
 * Returns a value between -1 and 1, where 1 means identical.
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}

/**
 * Calculate semantic similarity between two words using Universal Sentence Encoder.
 * Returns a percentage (0-100) representing how similar the meanings are.
 */
export async function calculateSemanticSimilarity(word1: string, word2: string): Promise<number> {
  try {
    const model = await loadModel();

    // Embed both words
    const embeddings = await model.embed([word1.toLowerCase(), word2.toLowerCase()]);
    const embeddingsArray = await embeddings.array();

    // Calculate cosine similarity
    const similarity = cosineSimilarity(embeddingsArray[0], embeddingsArray[1]);

    // Convert from [-1, 1] range to [0, 100] percentage
    // Cosine similarity is already in [0, 1] for semantic similarity typically
    // We'll normalize it to percentage and ensure it's positive
    const percentage = Math.max(0, similarity) * 100;

    // Clean up tensors to prevent memory leaks
    embeddings.dispose();

    return Math.round(percentage * 100) / 100; // Round to 2 decimal places
  } catch (error) {
    console.error('Error calculating semantic similarity:', error);
    throw error;
  }
}

/**
 * Get temperature-based feedback and emoji based on similarity percentage.
 * Thresholds adjusted for semantic similarity (typically lower than string similarity)
 */
export function getFeedback(similarity: number): { type: FeedbackType; emoji: string } {
  // Semantic similarity typically has lower scores, so we adjust thresholds
  if (similarity >= 75) {
    return { type: "HOT", emoji: "🔥" };
  } else if (similarity >= 50) {
    return { type: "WARM", emoji: "🌤" };
  } else if (similarity >= 25) {
    return { type: "COLD", emoji: "🧊" };
  } else {
    return { type: "ICE_COLD", emoji: "❄️" };
  }
}

/**
 * Validate a guess - must be alphabetic and not empty.
 * Returns an error message if invalid, or null if valid.
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

  return null;
}

/**
 * Get a random word from the word list.
 */
export function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

/**
 * Process a guess and return the guess data.
 * This is now async because it needs to calculate semantic similarity.
 */
export async function processGuess(guess: string, target: string): Promise<GuessData> {
  const similarity = await calculateSemanticSimilarity(guess, target);
  const { type, emoji } = getFeedback(similarity);

  return {
    word: guess.toLowerCase().trim(),
    similarity,
    feedback: type,
    emoji
  };
}

/**
 * Check if the model is loaded.
 */
export function isModelLoaded(): boolean {
  return modelInstance !== null;
}
