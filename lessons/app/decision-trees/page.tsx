'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';
import { InteractiveExercise } from '@/components/InteractiveExercise';
import { markLessonComplete } from '@/lib/progressTracker';

export default function DecisionTreesLesson() {
  const handleComplete = () => {
    markLessonComplete('7');
  };

  return (
    <LessonLayout
      title="Decision Trees"
      description="Learn how decision trees make predictions through a series of yes/no questions"
      currentSlug="decision-trees"
      lessonId="7"
      type="interactive"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What is a Decision Tree?</h2>
        <p className="mb-4">
          A <strong>decision tree</strong> is like playing "20 Questions". You make a series of yes/no decisions
          until you reach a conclusion. It's one of the simplest and most intuitive machine learning algorithms.
        </p>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 mb-6">
          <h3 className="font-semibold mb-3">Example: Should I play outside?</h3>
          <pre className="text-sm font-mono whitespace-pre">
{`Is it raining?
├─ Yes → Is it heavily raining?
│  ├─ Yes → Stay inside
│  └─ No → Wear a jacket and go!
└─ No → Is it hot?
   ├─ Yes → Bring water and go!
   └─ No → Just go!`}
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How Decision Trees Work</h2>
        <p className="mb-4">
          Decision trees split data based on features (questions) to make predictions:
        </p>

        <ol className="list-decimal pl-8 space-y-3 mb-6">
          <li><strong>Start at the root:</strong> The first question/decision</li>
          <li><strong>Follow branches:</strong> Answer questions based on the data</li>
          <li><strong>Reach a leaf:</strong> Get the final prediction</li>
        </ol>

        <CodeExample
          title="Example: Predicting if someone will buy a product"
          language="javascript"
          code={`const tree = {
  question: "age > 30?",
  yes: {
    question: "income > 50000?",
    yes: { prediction: "Buy" },      // Older + Higher income → Buy
    no: { prediction: "Don't Buy" }  // Older + Lower income → Don't Buy
  },
  no: {
    question: "has_kids?",
    yes: { prediction: "Buy" },      // Younger + Has kids → Buy
    no: { prediction: "Don't Buy" }  // Younger + No kids → Don't Buy
  }
};`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Making Predictions with Decision Trees</h2>
        <CodeExample
          title="Traversing a Decision Tree"
          language="javascript"
          code={`function predict(tree, data) {
  // If we're at a leaf node, return the prediction
  if (tree.prediction) {
    return tree.prediction;
  }

  // Extract feature and threshold from question
  // e.g., "age > 30" → feature="age", threshold=30
  const [feature, operator, threshold] = parseQuestion(tree.question);

  // Evaluate the condition
  const value = data[feature];
  const condition = operator === ">"
    ? value > threshold
    : value <= threshold;

  // Recursively follow the appropriate branch
  return condition
    ? predict(tree.yes, data)
    : predict(tree.no, data);
}

// Example usage
const person = { age: 35, income: 60000, has_kids: false };
const prediction = predict(tree, person);
console.log(prediction); // "Buy"`}
        />
      </section>

      <InteractiveExercise
        exerciseId="decision-tree-prediction"
        title="Exercise: Implement Decision Tree Prediction"
        instructions={`
          <p>Implement a function that traverses a decision tree to make a prediction.</p>
          <p><strong>The tree structure:</strong></p>
          <ul>
            <li>Each node has a <code>feature</code> to check and a <code>threshold</code> to compare against</li>
            <li>If the feature value > threshold, go to <code>left</code> branch</li>
            <li>Otherwise, go to <code>right</code> branch</li>
            <li>Leaf nodes have a <code>value</code> (the prediction) instead of branches</li>
          </ul>
          <p><strong>Hint:</strong> Use recursion! Check if it's a leaf node first, otherwise recurse on left or right.</p>
        `}
        starterCode={`function predictTree(tree, data) {
  // Base case: if this is a leaf node (has a 'value'), return the prediction

  // Recursive case: check the feature value against threshold
  // If data[tree.feature] > tree.threshold, go left
  // Otherwise, go right

}`}
        testCases={[
          {
            input: [
              {
                feature: 'age',
                threshold: 30,
                left: { value: 'young' },
                right: { value: 'old' }
              },
              { age: 25 }
            ],
            expectedOutput: 'young',
            description: 'Simple tree: age <= 30'
          },
          {
            input: [
              {
                feature: 'age',
                threshold: 30,
                left: { value: 'young' },
                right: { value: 'old' }
              },
              { age: 35 }
            ],
            expectedOutput: 'old',
            description: 'Simple tree: age > 30'
          },
          {
            input: [
              {
                feature: 'age',
                threshold: 30,
                left: {
                  feature: 'income',
                  threshold: 50000,
                  left: { value: 'low' },
                  right: { value: 'medium' }
                },
                right: { value: 'high' }
              },
              { age: 25, income: 40000 }
            ],
            expectedOutput: 'low',
            description: 'Nested tree: young and low income'
          },
          {
            input: [
              {
                feature: 'age',
                threshold: 30,
                left: {
                  feature: 'income',
                  threshold: 50000,
                  left: { value: 'low' },
                  right: { value: 'medium' }
                },
                right: { value: 'high' }
              },
              { age: 40, income: 70000 }
            ],
            expectedOutput: 'high',
            description: 'Nested tree: old (income irrelevant)'
          }
        ]}
        language="javascript"
        onComplete={handleComplete}
      />

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Advantages and Disadvantages</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300">
              ✅ Advantages
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Easy to understand and interpret</li>
              <li>Works with both numbers and categories</li>
              <li>Requires little data preparation</li>
              <li>Can handle non-linear relationships</li>
              <li>Fast to train and predict</li>
            </ul>
          </div>

          <div className="border-2 border-red-500 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-semibold mb-3 text-red-700 dark:text-red-300">
              ⚠️ Disadvantages
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Can easily overfit (too specific to training data)</li>
              <li>Sensitive to small changes in data</li>
              <li>Not great for very complex patterns</li>
              <li>Biased towards features with more values</li>
              <li>Can create very deep trees</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Real-World Applications</h2>
        <div className="space-y-4">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <strong className="text-blue-600 dark:text-blue-400">Medical Diagnosis</strong>
            <p className="mt-2 text-sm">Doctors use decision trees to diagnose diseases based on symptoms.</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <strong className="text-green-600 dark:text-green-400">Loan Approval</strong>
            <p className="mt-2 text-sm">Banks use decision trees to decide whether to approve loans.</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <strong className="text-purple-600 dark:text-purple-400">Customer Segmentation</strong>
            <p className="mt-2 text-sm">Companies categorize customers into groups for targeted marketing.</p>
          </div>
        </div>
      </section>
    </LessonLayout>
  );
}
