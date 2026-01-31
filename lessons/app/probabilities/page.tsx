'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { InteractiveExercise } from '@/components/InteractiveExercise';
import { CodeExample } from '@/components/CodeExample';
import { markLessonComplete } from '@/lib/progressTracker';

export default function ProbabilitiesLesson() {
  const handleComplete = () => {
    markLessonComplete('1');
  };

  return (
    <LessonLayout
      title="Probabilities: AI Predicting Next Words"
      description="Learn how AI models predict the next word using logits and probability distributions"
      currentSlug="probabilities"
      lessonId="1"
      type="interactive"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How AI Predicts Next Words</h2>
        <p className="mb-4">
          When an AI model like GPT predicts the next word in a sentence, it doesn't just pick one word randomly.
          Instead, it gives every possible word a <strong>score</strong> and then converts those scores into
          <strong> probabilities</strong>.
        </p>

        <h3 className="text-xl font-semibold mb-3">Step 1: Logits</h3>
        <p className="mb-4">
          First, the model produces <strong>logits</strong> - raw numbers that can be positive, negative, or zero.
          These represent how likely the model thinks each word is. Higher numbers mean more likely.
        </p>

        <CodeExample
          title="Example Logits"
          language="javascript"
          code={`// Logits for possible next words
const logits = {
  "cat": 2.5,
  "dog": 3.1,
  "bird": 1.2,
  "fish": -0.5
};`}
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">Step 2: Softmax (Probabilities)</h3>
        <p className="mb-4">
          Then, the model converts these logits into <strong>probabilities</strong> using the <strong>softmax function</strong>.
          The softmax function ensures that:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>All probabilities are between 0 and 1</li>
          <li>All probabilities add up to exactly 1.0 (100%)</li>
          <li>Higher logits become higher probabilities</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">The Softmax Formula</h3>
        <p className="mb-4">
          For each word, the softmax probability is calculated as:
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 text-center">
          <code className="text-lg">
            P(word) = e<sup>logit(word)</sup> / Σ(e<sup>logit(all words)</sup>)
          </code>
        </div>

        <p className="mb-4">
          In simpler terms:
        </p>
        <ol className="list-decimal pl-8 mb-4">
          <li>Take e (Euler's number, about 2.718) to the power of each logit</li>
          <li>Add up all those exponential values</li>
          <li>Divide each exponential value by the sum</li>
        </ol>

        <CodeExample
          title="Softmax Example"
          language="javascript"
          code={`function softmax(logits) {
  // Step 1: Compute e^logit for each value
  const exps = logits.map(logit => Math.exp(logit));

  // Step 2: Sum all exponentials
  const sumExps = exps.reduce((a, b) => a + b, 0);

  // Step 3: Divide each by the sum
  const probabilities = exps.map(exp => exp / sumExps);

  return probabilities;
}

// Example
const logits = [2.5, 3.1, 1.2, -0.5];
const probs = softmax(logits);
console.log(probs);
// Output: [0.281, 0.505, 0.076, 0.138]
// These add up to 1.0!`}
        />
      </section>

      <InteractiveExercise
        exerciseId="probabilities-softmax"
        title="Exercise: Implement Softmax"
        instructions={`
          <p>Now it's your turn! Implement the <code>softmax</code> function that converts an array of logits into probabilities.</p>
          <p><strong>Requirements:</strong></p>
          <ul>
            <li>Take an array of numbers (logits) as input</li>
            <li>Return an array of probabilities</li>
            <li>All probabilities should be between 0 and 1</li>
            <li>All probabilities should sum to 1.0</li>
          </ul>
          <p><strong>Hints:</strong></p>
          <ul>
            <li>Use <code>Math.exp(x)</code> to compute e<sup>x</sup></li>
            <li>Use <code>array.map()</code> to transform each element</li>
            <li>Use <code>array.reduce()</code> to sum the elements</li>
          </ul>
        `}
        starterCode={`function softmax(logits) {
  // Step 1: Compute e^logit for each value

  // Step 2: Sum all exponentials

  // Step 3: Divide each by the sum to get probabilities

}`}
        testCases={[
          {
            input: [[1.0, 2.0, 3.0]],
            expectedOutput: [0.09003057317038046, 0.24472847105479764, 0.6652409557748219],
            description: 'Simple ascending logits'
          },
          {
            input: [[0.0, 0.0, 0.0]],
            expectedOutput: [0.3333333333333333, 0.3333333333333333, 0.3333333333333333],
            description: 'Equal logits should give equal probabilities'
          },
          {
            input: [[2.5, 3.1, 1.2, -0.5]],
            expectedOutput: [0.2808, 0.5054, 0.0764, 0.1374],
            description: 'Mixed positive and negative logits'
          },
          {
            input: [[10.0, -10.0]],
            expectedOutput: [0.9999546021312976, 0.00004539786870243779],
            description: 'Extreme logits'
          },
          {
            input: [[5.0]],
            expectedOutput: [1.0],
            description: 'Single logit should give probability 1.0'
          }
        ]}
        language="javascript"
        onComplete={handleComplete}
      />

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Why This Matters</h2>
        <p className="mb-4">
          Understanding probabilities is fundamental to AI because:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li><strong>Decision Making:</strong> AI models use probabilities to decide which word to generate next</li>
          <li><strong>Confidence:</strong> Higher probabilities mean the model is more confident</li>
          <li><strong>Sampling:</strong> Models can randomly sample based on probabilities to generate diverse outputs</li>
          <li><strong>Temperature:</strong> Models can adjust how "creative" they are by scaling logits before softmax</li>
        </ul>
      </section>
    </LessonLayout>
  );
}
