'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';
import { InteractiveExercise } from '@/components/InteractiveExercise';
import { markLessonComplete } from '@/lib/progressTracker';

export default function LinearLogisticLesson() {
  const handleComplete = () => {
    markLessonComplete('8');
  };

  return (
    <LessonLayout
      title="Linear vs Logistic Models"
      description="Compare linear regression and logistic regression for different prediction tasks"
      currentSlug="linear-logistic"
      lessonId="8"
      type="interactive"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Two Types of Predictions</h2>
        <p className="mb-4">
          In machine learning, we often need to make two kinds of predictions:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="text-lg font-semibold mb-3">📈 Continuous Values</h3>
            <p className="mb-3 text-sm">Predicting a number that can be any value</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>House price: $250,000</li>
              <li>Temperature: 72.5°F</li>
              <li>Sales: $45,328.12</li>
            </ul>
            <p className="mt-3 font-semibold text-blue-700 dark:text-blue-300">
              → Use Linear Regression
            </p>
          </div>

          <div className="border-2 border-purple-500 rounded-lg p-6 bg-purple-50 dark:bg-purple-900/20">
            <h3 className="text-lg font-semibold mb-3">✅ Categories/Classes</h3>
            <p className="mb-3 text-sm">Predicting which category something belongs to</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Email: Spam or Not Spam</li>
              <li>Tumor: Benign or Malignant</li>
              <li>Will Buy: Yes or No</li>
            </ul>
            <p className="mt-3 font-semibold text-purple-700 dark:text-purple-300">
              → Use Logistic Regression
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Linear Regression</h2>
        <p className="mb-4">
          Linear regression fits a straight line (or plane) through your data to predict continuous values.
          It's like finding the "best fit" line in a scatter plot.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold mb-2">The Formula:</p>
          <code className="text-lg">y = mx + b</code>
          <ul className="mt-2 text-sm space-y-1">
            <li><strong>y</strong> = predicted value</li>
            <li><strong>x</strong> = input feature</li>
            <li><strong>m</strong> = slope (weight)</li>
            <li><strong>b</strong> = y-intercept (bias)</li>
          </ul>
        </div>

        <CodeExample
          title="Linear Regression Example: Predicting House Price"
          language="javascript"
          code={`function predictHousePrice(squareFeet) {
  // Model learned from data:
  const slope = 150;     // $150 per square foot
  const intercept = 50000; // Base price

  const price = slope * squareFeet + intercept;
  return price;
}

// Examples
predictHousePrice(1000); // $200,000
predictHousePrice(1500); // $275,000
predictHousePrice(2000); // $350,000

// Output is continuous - can be any number!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Logistic Regression</h2>
        <p className="mb-4">
          Despite its name, logistic regression is for <strong>classification</strong>, not regression!
          It predicts the probability that something belongs to a category (usually between 0 and 1).
        </p>

        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 mb-6">
          <p className="font-semibold mb-2">The Formula:</p>
          <code className="text-lg">probability = 1 / (1 + e<sup>-(mx + b)</sup>)</code>
          <p className="mt-2 text-sm">
            This is called the <strong>sigmoid function</strong> - it squashes any number into a range between 0 and 1.
          </p>
        </div>

        <CodeExample
          title="Logistic Regression Example: Email Spam Detection"
          language="javascript"
          code={`function predictSpam(numSuspiciousWords) {
  // Model learned from data:
  const weight = 0.8;
  const bias = -2.0;

  // Calculate the logit
  const logit = weight * numSuspiciousWords + bias;

  // Apply sigmoid function to get probability
  const probability = 1 / (1 + Math.exp(-logit));

  // Classify: if probability > 0.5, it's spam
  const isSpam = probability > 0.5;

  return { probability, isSpam };
}

// Examples
predictSpam(1);  // { probability: 0.31, isSpam: false }
predictSpam(3);  // { probability: 0.69, isSpam: true }
predictSpam(5);  // { probability: 0.92, isSpam: true }

// Output is a probability (0-1) + a category!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Differences</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Aspect</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Linear Regression</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Logistic Regression</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold">Purpose</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Predict continuous values</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Predict categories/classes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold">Output Range</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">-∞ to +∞ (any number)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">0 to 1 (probability)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold">Function</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">y = mx + b (linear)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">sigmoid(mx + b) (S-curve)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold">Example</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Predicting house price</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Spam detection</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <InteractiveExercise
        exerciseId="sigmoid-function"
        title="Exercise: Implement the Sigmoid Function"
        instructions={`
          <p>The sigmoid function is crucial for logistic regression. It converts any number into a probability between 0 and 1.</p>
          <p><strong>Formula:</strong> sigmoid(x) = 1 / (1 + e<sup>-x</sup>)</p>
          <p><strong>Properties:</strong></p>
          <ul>
            <li>When x is large positive → output approaches 1</li>
            <li>When x is 0 → output is 0.5</li>
            <li>When x is large negative → output approaches 0</li>
          </ul>
          <p><strong>Hint:</strong> Use <code>Math.exp(x)</code> to calculate e<sup>x</sup></p>
        `}
        starterCode={`function sigmoid(x) {
  // Implement the sigmoid function
  // sigmoid(x) = 1 / (1 + e^(-x))

}`}
        testCases={[
          {
            input: [0],
            expectedOutput: 0.5,
            description: 'sigmoid(0) should be 0.5'
          },
          {
            input: [2],
            expectedOutput: 0.8807970779778823,
            description: 'sigmoid(2) for positive value'
          },
          {
            input: [-2],
            expectedOutput: 0.11920292202211755,
            description: 'sigmoid(-2) for negative value'
          },
          {
            input: [10],
            expectedOutput: 0.9999546021312976,
            description: 'sigmoid(10) should be close to 1'
          },
          {
            input: [-10],
            expectedOutput: 0.00004539786870243776,
            description: 'sigmoid(-10) should be close to 0'
          }
        ]}
        language="javascript"
        onComplete={handleComplete}
      />

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">When to Use Each Model</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Use Linear Regression when:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>You need to predict a continuous number</li>
              <li>The relationship between inputs and output is roughly linear</li>
              <li>Examples: prices, temperatures, ages, distances</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Use Logistic Regression when:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>You need to classify into categories (usually 2 categories)</li>
              <li>You want probability scores along with classifications</li>
              <li>Examples: spam/not spam, pass/fail, yes/no decisions</li>
            </ul>
          </div>
        </div>
      </section>
    </LessonLayout>
  );
}
