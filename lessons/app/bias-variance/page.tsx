'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';

export default function BiasVarianceLesson() {
  return (
    <LessonLayout
      title="Bias and Variance"
      description="Understanding model accuracy, overfitting, and underfitting"
      currentSlug="bias-variance"
      lessonId="2"
      type="theory"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What Are Bias and Variance?</h2>
        <p className="mb-4">
          When training a machine learning model, we care about two things:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li><strong>How accurate</strong> the model is on average (bias)</li>
          <li><strong>How consistent</strong> the model's predictions are (variance)</li>
        </ul>
        <p className="mb-4">
          Think of it like shooting arrows at a target:
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Low Bias, Low Variance (Ideal)</h3>
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-4">
          <p className="mb-2">🎯 <strong>Like a skilled archer:</strong></p>
          <ul className="list-disc pl-8">
            <li>All arrows hit near the center (accurate)</li>
            <li>All arrows are close together (consistent)</li>
            <li>The model makes accurate predictions and doesn't vary much between different training sets</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-3">High Bias, Low Variance (Underfitting)</h3>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="mb-2">⚠️ <strong>Like aiming to the side:</strong></p>
          <ul className="list-disc pl-8">
            <li>All arrows consistently miss in the same direction</li>
            <li>The model is consistently wrong in the same way</li>
            <li><strong>Underfitting:</strong> The model is too simple and hasn't learned enough patterns</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-3">Low Bias, High Variance (Overfitting)</h3>
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
          <p className="mb-2">❌ <strong>Like shooting randomly:</strong></p>
          <ul className="list-disc pl-8">
            <li>Arrows spread all over the target</li>
            <li>The model performs differently on different data</li>
            <li><strong>Overfitting:</strong> The model learned the training data too well, including noise and errors</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Overfitting vs Underfitting</h2>

        <h3 className="text-xl font-semibold mb-3">Overfitting (High Variance, Low Bias)</h3>
        <p className="mb-4">
          <strong>Problem:</strong> Too few pieces of data in training, or model is too complex.
        </p>
        <p className="mb-4">
          The model memorizes the training data instead of learning general patterns. It's like a student
          who memorizes the answers to practice problems but can't solve new ones.
        </p>

        <CodeExample
          title="Example: Overfitting in Polynomial Regression"
          language="javascript"
          code={`// Training data: a few points
const trainingData = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 5 },
  { x: 4, y: 7 }
];

// Overfitted model: uses a 10th degree polynomial
// It perfectly fits all training points, but...
function overfittedModel(x) {
  // Crazy complex formula that passes through all training points
  return 0.001*x**10 - 0.05*x**9 + 0.8*x**8 - ... + 2*x;
}

// Problem: Terrible predictions on new data
overfittedModel(2.5);  // Returns 15.2 (expected: ~4.5)
overfittedModel(10);   // Returns -9431 (wildly wrong!)

// The model learned the noise, not the pattern`}
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">Underfitting (Low Variance, High Bias)</h3>
        <p className="mb-4">
          <strong>Problem:</strong> Model is too simple to capture the real patterns.
        </p>
        <p className="mb-4">
          The model doesn't learn enough from the training data. It's like trying to draw a circle with only straight lines.
        </p>

        <CodeExample
          title="Example: Underfitting"
          language="javascript"
          code={`// Training data: clearly curved relationship
const trainingData = [
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 16 },
  { x: 5, y: 25 }  // y = x^2
];

// Underfitted model: just a straight line
function underfittedModel(x) {
  return 6*x - 5;  // y = 6x - 5 (linear)
}

// Problem: Can't capture the curved pattern
underfittedModel(1);  // Returns 1 ✓ (lucky!)
underfittedModel(3);  // Returns 13 (expected: 9) ✗
underfittedModel(5);  // Returns 25 ✓ (lucky again!)
// Average error is high because it's too simple`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">The Bias-Variance Tradeoff</h2>
        <p className="mb-4">
          There's always a tradeoff between bias and variance:
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-300 dark:border-blue-700">
                <th className="text-left py-2">Model Complexity</th>
                <th className="text-left py-2">Bias</th>
                <th className="text-left py-2">Variance</th>
                <th className="text-left py-2">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-200 dark:border-blue-800">
                <td className="py-3">Too Simple</td>
                <td className="py-3">High ↑</td>
                <td className="py-3">Low ↓</td>
                <td className="py-3">Underfitting</td>
              </tr>
              <tr className="border-b border-blue-200 dark:border-blue-800">
                <td className="py-3"><strong>Just Right</strong></td>
                <td className="py-3"><strong>Low ↓</strong></td>
                <td className="py-3"><strong>Low ↓</strong></td>
                <td className="py-3"><strong>Good Model</strong></td>
              </tr>
              <tr>
                <td className="py-3">Too Complex</td>
                <td className="py-3">Low ↓</td>
                <td className="py-3">High ↑</td>
                <td className="py-3">Overfitting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How to Find the Balance</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">To Reduce Overfitting:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Get more training data</li>
              <li>Use a simpler model</li>
              <li>Use regularization (penalize complexity)</li>
              <li>Use cross-validation</li>
              <li>Remove irrelevant features</li>
            </ul>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">To Reduce Underfitting:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use a more complex model</li>
              <li>Add more relevant features</li>
              <li>Train for more iterations</li>
              <li>Reduce regularization</li>
              <li>Fix data quality issues</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Learn More</h2>
        <p className="mb-4">
          For a deeper dive into the bias-variance tradeoff, check out:
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Bias-Variance Tradeoff on Wikipedia →
        </a>
      </section>
    </LessonLayout>
  );
}
