'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';
import { Database, Filter, Split, Target } from 'lucide-react';

export default function TrainingTestingLesson() {
  return (
    <LessonLayout
      title="Training and Testing Data"
      description="Understanding what data is, how to clean it, and why we split it"
      currentSlug="training-testing"
      lessonId="3"
      type="theory"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Database className="w-8 h-8 text-blue-600" />
          What Is Data?
        </h2>
        <p className="mb-4">
          In machine learning, <strong>data</strong> is the information we use to teach AI models.
          It's like giving examples to a student so they can learn patterns and make predictions.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3">Types of Data:</h3>
          <ul className="space-y-2">
            <li><strong>Text:</strong> Sentences, documents, social media posts</li>
            <li><strong>Numbers:</strong> Prices, temperatures, ages, measurements</li>
            <li><strong>Images:</strong> Photos, medical scans, satellite imagery</li>
            <li><strong>Audio:</strong> Speech, music, environmental sounds</li>
            <li><strong>Video:</strong> Movies, surveillance footage, tutorials</li>
          </ul>
        </div>

        <p className="mb-4">
          Each piece of data usually has:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li><strong>Features (inputs):</strong> The information we give to the model</li>
          <li><strong>Labels (outputs):</strong> The correct answer we want the model to predict</li>
        </ul>

        <CodeExample
          title="Example: House Price Data"
          language="javascript"
          code={`const housingData = [
  // Features →              Label
  { size: 1500, bedrooms: 3, location: "urban",  price: 300000 },
  { size: 2000, bedrooms: 4, location: "suburb", price: 450000 },
  { size: 1200, bedrooms: 2, location: "rural",  price: 200000 },
  { size: 2500, bedrooms: 5, location: "urban",  price: 600000 }
];

// Goal: Predict price given size, bedrooms, and location`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Filter className="w-8 h-8 text-green-600" />
          Cleaning Data
        </h2>
        <p className="mb-4">
          Real-world data is messy! Before training a model, we need to <strong>clean</strong> it.
          Think of it like washing vegetables before cooking - you need to remove dirt and bad pieces.
        </p>

        <h3 className="text-xl font-semibold mb-3">Common Data Problems:</h3>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4">
            <h4 className="font-semibold mb-2">1. Missing Values</h4>
            <p className="text-sm mb-2">Some data points are incomplete</p>
            <CodeExample
              language="javascript"
              code={`const data = [
  { age: 25, salary: 50000 },
  { age: null, salary: 60000 },  // Missing age!
  { age: 35, salary: null }       // Missing salary!
];`}
              showLineNumbers={false}
            />
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4">
            <h4 className="font-semibold mb-2">2. Outliers</h4>
            <p className="text-sm mb-2">Extreme values that don't make sense</p>
            <CodeExample
              language="javascript"
              code={`const ages = [25, 30, 28, 35, 999, 27, 32];
//                              ↑ Outlier - probably an error!`}
              showLineNumbers={false}
            />
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4">
            <h4 className="font-semibold mb-2">3. Inconsistent Formats</h4>
            <p className="text-sm mb-2">Same information written differently</p>
            <CodeExample
              language="javascript"
              code={`const locations = ["New York", "NY", "new york", "NEW YORK"];
// All refer to the same place but written differently!`}
              showLineNumbers={false}
            />
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4">
            <h4 className="font-semibold mb-2">4. Duplicates</h4>
            <p className="text-sm mb-2">Same data point appears multiple times</p>
            <CodeExample
              language="javascript"
              code={`const users = [
  { id: 1, name: "Alice" },
  { id: 1, name: "Alice" },  // Duplicate!
  { id: 2, name: "Bob" }
];`}
              showLineNumbers={false}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Data Cleaning Solutions:</h3>

        <CodeExample
          title="Common Cleaning Techniques"
          language="javascript"
          code={`function cleanData(data) {
  // 1. Remove duplicates
  const uniqueData = [...new Set(data.map(JSON.stringify))].map(JSON.parse);

  // 2. Handle missing values
  const filledData = uniqueData.map(item => ({
    ...item,
    age: item.age || 0,                    // Fill with 0
    salary: item.salary || getMean(data)   // Fill with average
  }));

  // 3. Remove outliers
  const cleanedData = filledData.filter(item => {
    return item.age > 0 && item.age < 120  // Reasonable age range
        && item.salary > 0 && item.salary < 1000000;
  });

  // 4. Standardize formats
  const standardized = cleanedData.map(item => ({
    ...item,
    location: item.location.toLowerCase().trim()
  }));

  return standardized;
}

// Example usage
const dirtyData = [
  { age: 25, salary: 50000, location: "New York" },
  { age: null, salary: 60000, location: "NY" },
  { age: 999, salary: 70000, location: "  new york  " },
  { age: 35, salary: 55000, location: "New York" }
];

const clean = cleanData(dirtyData);
console.log(clean);
// Now all data is consistent and valid!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Split className="w-8 h-8 text-purple-600" />
          Training vs Testing Data
        </h2>
        <p className="mb-4">
          We don't use <em>all</em> our data to train the model. Instead, we <strong>split</strong> it into two parts:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Training Data (70-80%)
            </h3>
            <p className="mb-3">
              Used to <strong>teach</strong> the model by showing it examples with correct answers.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Model learns patterns from this data</li>
              <li>Updates its internal parameters</li>
              <li>Like practice problems for a student</li>
            </ul>
          </div>

          <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Testing Data (20-30%)
            </h3>
            <p className="mb-3">
              Used to <strong>evaluate</strong> how well the model performs on new, unseen data.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Model has never seen this data before</li>
              <li>Reveals if model learned or memorized</li>
              <li>Like the final exam for a student</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Why Split the Data?</h3>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="mb-2">
            <strong>Without splitting:</strong> The model might just memorize the training data (overfitting)
            and perform poorly on real-world data it hasn't seen.
          </p>
          <p>
            <strong>With splitting:</strong> We can test if the model truly learned general patterns
            or just memorized specific examples.
          </p>
        </div>

        <CodeExample
          title="Splitting Data in JavaScript"
          language="javascript"
          code={`function trainTestSplit(data, testSize = 0.2) {
  // Shuffle the data randomly
  const shuffled = data.sort(() => Math.random() - 0.5);

  // Calculate split point
  const splitIndex = Math.floor(data.length * (1 - testSize));

  // Split into training and testing
  const trainData = shuffled.slice(0, splitIndex);
  const testData = shuffled.slice(splitIndex);

  return { trainData, testData };
}

// Example
const allData = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 6 },
  { x: 4, y: 8 },
  { x: 5, y: 10 }
];

const { trainData, testData } = trainTestSplit(allData, 0.2);

console.log("Training:", trainData);  // 4 items (80%)
console.log("Testing:", testData);    // 1 item (20%)

// Train model on trainData
// Evaluate model on testData`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <div className="space-y-4">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <strong className="text-blue-600 dark:text-blue-400">1. Clean Your Data:</strong>
            <p className="mt-2">Handle missing values, remove outliers, fix inconsistencies, and remove duplicates.</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <strong className="text-green-600 dark:text-green-400">2. Split Your Data:</strong>
            <p className="mt-2">Always keep some data aside for testing (typically 20-30%).</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <strong className="text-purple-600 dark:text-purple-400">3. Never Touch Test Data During Training:</strong>
            <p className="mt-2">The model should never see test data until final evaluation, or results will be misleading.</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <strong className="text-orange-600 dark:text-orange-400">4. Quality Over Quantity:</strong>
            <p className="mt-2">Clean, relevant data beats lots of messy data every time.</p>
          </div>
        </div>
      </section>
    </LessonLayout>
  );
}
