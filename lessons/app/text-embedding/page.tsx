'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';
import { HotColdGame } from '@/components/HotColdGame';
import { InteractiveExercise } from '@/components/InteractiveExercise';
import { markLessonComplete } from '@/lib/progressTracker';

export default function TextEmbeddingLesson() {
  const handleComplete = () => {
    markLessonComplete('4');
  };

  return (
    <LessonLayout
      title="Text Embedding"
      description="Learn how computers represent words as vectors to understand meaning"
      currentSlug="text-embedding"
      lessonId="4"
      type="game"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What Are Text Embeddings?</h2>
        <p className="mb-4">
          Computers don't understand words like humans do. They only understand numbers. So how do we teach a computer
          what "cat" or "happy" means? We use <strong>text embeddings</strong>!
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold mb-2">Simple Definition:</p>
          <p>
            A <strong>text embedding</strong> is a way to represent a word (or sentence) as a list of numbers
            (a vector). Similar words get similar numbers.
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-3">Example: Word to Vector</h3>
        <CodeExample
          language="javascript"
          code={`// Instead of just the word "cat", we represent it as numbers:
const cat = [0.2, 0.8, 0.1, 0.9, 0.3];

// Similar words have similar numbers:
const dog = [0.3, 0.7, 0.2, 0.8, 0.4];  // Similar to cat!

// Very different words have very different numbers:
const pizza = [0.9, 0.1, 0.7, 0.2, 0.8];  // Not similar to cat

// Now the computer can measure "similarity" using math!`}
        />

        <p className="mt-4 mb-4">
          The magic is that words with similar <em>meanings</em> end up with similar numbers. Words like
          "cat" and "dog" will have similar vectors, but "cat" and "pizza" won't.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How Do We Measure Similarity?</h2>
        <p className="mb-4">
          Once we have words as vectors (lists of numbers), we can measure how similar they are using
          <strong> cosine similarity</strong> or other distance metrics.
        </p>

        <h3 className="text-xl font-semibold mb-3">Simple Similarity: Character Overlap</h3>
        <p className="mb-4">
          A basic way to measure word similarity is to count how many letters they have in common:
        </p>

        <CodeExample
          title="Character-Based Similarity"
          language="javascript"
          code={`function simpleSimilarity(word1, word2) {
  // Get unique characters from each word
  const chars1 = new Set(word1.toLowerCase());
  const chars2 = new Set(word2.toLowerCase());

  // Find common characters
  const common = [...chars1].filter(c => chars2.has(c));

  // Jaccard similarity: intersection / union
  const union = new Set([...chars1, ...chars2]);
  const similarity = common.length / union.size;

  return similarity;
}

// Examples
simpleSimilarity("cat", "hat");    // 0.5 (share 'a' and 't')
simpleSimilarity("cat", "dog");    // 0.0 (no common letters)
simpleSimilarity("happy", "happen"); // 0.57 (share h, a, p)`}
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">Advanced: Semantic Embeddings</h3>
        <p className="mb-4">
          Real AI models use much more sophisticated embeddings that capture <em>meaning</em>, not just letters.
          These are learned from massive amounts of text:
        </p>

        <CodeExample
          language="javascript"
          code={`// Modern embedding models understand that these are similar in meaning:
similarity("king", "queen");     // High similarity (both royalty)
similarity("walk", "run");       // High similarity (both movement)
similarity("doctor", "hospital"); // High similarity (related concepts)

// Even though they share no letters!
// The model learned from seeing how words are used in context.`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Play the Hot or Cold Game!</h2>
        <p className="mb-4">
          Try this game to experience how text embeddings work. The game picks a random word, and you have
          to guess it. After each guess, you'll get feedback on how "similar" your guess is to the target word.
        </p>

        <HotColdGame />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How Embeddings Are Used in AI</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🔍 Search Engines</h3>
            <p className="text-sm">
              When you search "how to fix a leaky faucet", embeddings help find results about
              "repairing dripping sinks" even though the words are different.
            </p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">💬 Chatbots</h3>
            <p className="text-sm">
              Embeddings help AI understand that "What's the weather?" and "How's it outside?" are asking
              the same thing.
            </p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🌐 Translation</h3>
            <p className="text-sm">
              Words in different languages with similar meanings get similar embeddings, helping translation
              models work better.
            </p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">📝 Recommendations</h3>
            <p className="text-sm">
              If you like articles about "machine learning", embeddings help recommend articles about
              "artificial intelligence" and "neural networks".
            </p>
          </div>
        </div>
      </section>

      <InteractiveExercise
        exerciseId="embedding-similarity"
        title="Exercise: Implement String Similarity"
        instructions={`
          <p>Implement a function that calculates how similar two words are based on their characters.</p>
          <p><strong>Algorithm:</strong></p>
          <ol>
            <li>Convert both words to lowercase</li>
            <li>Get the unique characters from each word</li>
            <li>Count how many characters they have in common (intersection)</li>
            <li>Count total unique characters across both words (union)</li>
            <li>Return: intersection size / union size</li>
          </ol>
          <p><strong>Example:</strong> "cat" and "hat" share 'a' and 't' (2 chars). Union has 'c', 'a', 't', 'h' (4 chars). Similarity = 2/4 = 0.5</p>
        `}
        starterCode={`function wordSimilarity(word1, word2) {
  // Convert to lowercase
  const w1 = word1.toLowerCase();
  const w2 = word2.toLowerCase();

  // Get unique characters from each word

  // Find common characters (intersection)

  // Find all unique characters (union)

  // Return similarity score (intersection / union)

}`}
        testCases={[
          {
            input: ['cat', 'hat'],
            expectedOutput: 0.5,
            description: 'Words with 2 common letters out of 4 total'
          },
          {
            input: ['cat', 'dog'],
            expectedOutput: 0.0,
            description: 'Words with no common letters'
          },
          {
            input: ['cat', 'cat'],
            expectedOutput: 1.0,
            description: 'Identical words should have similarity 1.0'
          },
          {
            input: ['hello', 'jello'],
            expectedOutput: 0.6,
            description: 'Words with 3 common letters (e, l, o) out of 5 total'
          },
          {
            input: ['abc', 'def'],
            expectedOutput: 0.0,
            description: 'Completely different words'
          }
        ]}
        language="javascript"
        onComplete={handleComplete}
      />

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>Text embeddings convert words into vectors (lists of numbers)</li>
          <li>Similar words get similar vectors, allowing computers to understand meaning</li>
          <li>We can measure similarity using math (cosine similarity, Jaccard similarity, etc.)</li>
          <li>Modern AI models learn embeddings from massive amounts of text data</li>
          <li>Embeddings power search engines, chatbots, translation, and more</li>
        </ul>
      </section>
    </LessonLayout>
  );
}
