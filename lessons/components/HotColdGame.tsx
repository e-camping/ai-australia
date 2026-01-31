'use client';

import { useState, useEffect } from 'react';
import { Flame, Snowflake, ThermometerSun, Trophy, RotateCcw } from 'lucide-react';

// Simple word list for the game
const WORD_LIST = [
  'apple', 'banana', 'orange', 'grape', 'mango', 'peach', 'cherry', 'lemon',
  'cat', 'dog', 'bird', 'fish', 'rabbit', 'turtle', 'hamster', 'snake',
  'car', 'truck', 'bike', 'train', 'plane', 'boat', 'bus', 'motorcycle',
  'book', 'pen', 'paper', 'pencil', 'desk', 'chair', 'table', 'lamp',
  'pizza', 'burger', 'pasta', 'salad', 'soup', 'rice', 'bread', 'cheese',
  'happy', 'sad', 'angry', 'excited', 'calm', 'nervous', 'proud', 'shy',
  'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white',
  'run', 'walk', 'jump', 'swim', 'fly', 'climb', 'dance', 'sing'
];

interface Guess {
  word: string;
  similarity: number;
  feedback: string;
  temperature: 'freezing' | 'cold' | 'cool' | 'warm' | 'hot' | 'burning';
}

// Simple character-based similarity (like character frequency vectors)
function computeSimilarity(word1: string, word2: string): number {
  const w1 = word1.toLowerCase();
  const w2 = word2.toLowerCase();

  // Character overlap approach
  const chars1 = new Set(w1.split(''));
  const chars2 = new Set(w2.split(''));

  const intersection = new Set([...chars1].filter(c => chars2.has(c)));
  const union = new Set([...chars1, ...chars2]);

  const charSimilarity = intersection.size / union.size;

  // Length similarity bonus
  const lengthSimilarity = 1 - Math.abs(w1.length - w2.length) / Math.max(w1.length, w2.length);

  // Combined similarity
  return (charSimilarity * 0.7 + lengthSimilarity * 0.3);
}

function getTemperature(similarity: number): Guess['temperature'] {
  if (similarity >= 0.9) return 'burning';
  if (similarity >= 0.7) return 'hot';
  if (similarity >= 0.5) return 'warm';
  if (similarity >= 0.3) return 'cool';
  if (similarity >= 0.15) return 'cold';
  return 'freezing';
}

function getFeedback(temperature: Guess['temperature']): string {
  const feedbacks = {
    burning: '🔥 BURNING HOT! You're almost there!',
    hot: '🌡️ Hot! Very close!',
    warm: '☀️ Warm... getting warmer!',
    cool: '🌤️ Cool. Not quite there.',
    cold: '❄️ Cold. Pretty far off.',
    freezing: '🧊 Freezing! Way off!'
  };
  return feedbacks[temperature];
}

export function HotColdGame() {
  const [targetWord, setTargetWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState<Guess[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(randomWord);
    setCurrentGuess('');
    setGuessHistory([]);
    setGameWon(false);
    setAttempts(0);
  };

  const makeGuess = () => {
    const guess = currentGuess.toLowerCase().trim();

    if (!guess) return;

    const similarity = computeSimilarity(guess, targetWord);
    const temperature = getTemperature(similarity);
    const feedback = getFeedback(temperature);

    const newGuess: Guess = {
      word: guess,
      similarity: Math.round(similarity * 100),
      feedback,
      temperature
    };

    setGuessHistory([newGuess, ...guessHistory]);
    setAttempts(attempts + 1);

    // Check if won (very high similarity or exact match)
    if (guess === targetWord || similarity >= 0.95) {
      setGameWon(true);
    }

    setCurrentGuess('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      makeGuess();
    }
  };

  const getTemperatureIcon = (temp: Guess['temperature']) => {
    switch (temp) {
      case 'burning':
      case 'hot':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'warm':
        return <ThermometerSun className="w-5 h-5 text-orange-500" />;
      case 'cool':
        return <ThermometerSun className="w-5 h-5 text-blue-300" />;
      case 'cold':
      case 'freezing':
        return <Snowflake className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          🎯 Hot or Cold Word Game
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Try to guess the target word! I'll tell you if you're getting "hotter" or "colder" based on how
          similar your guess is to the target word.
        </p>
      </div>

      {!gameWon ? (
        <>
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your guess..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={gameWon}
              />
              <button
                onClick={makeGuess}
                disabled={!currentGuess.trim() || gameWon}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                Guess
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Attempts: {attempts}
            </div>
          </div>

          {guessHistory.length > 0 && (
            <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                Latest Guess:
              </h4>
              <div className="flex items-center gap-3">
                {getTemperatureIcon(guessHistory[0].temperature)}
                <span className="text-2xl font-bold">{guessHistory[0].word}</span>
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  ({guessHistory[0].similarity}% similar)
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold">
                {guessHistory[0].feedback}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="mb-6 p-6 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-lg text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
            🎉 You Won!
          </h3>
          <p className="text-lg mb-2">
            The word was: <span className="font-bold text-green-700 dark:text-green-300">{targetWord}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            You guessed it in {attempts} {attempts === 1 ? 'attempt' : 'attempts'}!
          </p>
          <button
            onClick={resetGame}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      )}

      {guessHistory.length > 1 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Previous Guesses:</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {guessHistory.slice(1).map((guess, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
              >
                {getTemperatureIcon(guess.temperature)}
                <span className="font-semibold">{guess.word}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {guess.similarity}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-500 ml-auto">
                  {guess.temperature}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {guessHistory.length === 0 && !gameWon && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <p>Make your first guess to start!</p>
          <p className="text-sm mt-2">Hint: Try common words like "cat", "apple", or "happy"</p>
        </div>
      )}
    </div>
  );
}
