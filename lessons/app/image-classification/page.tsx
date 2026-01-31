'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';
import { Image, Eye, Layers } from 'lucide-react';

export default function ImageClassificationLesson() {
  return (
    <LessonLayout
      title="Image Classification"
      description="Learn how neural networks classify images and what they see"
      currentSlug="image-classification"
      lessonId="5"
      type="theory"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Image className="w-8 h-8 text-purple-600" />
          What is Image Classification?
        </h2>
        <p className="mb-4">
          <strong>Image classification</strong> is teaching a computer to recognize what's in a picture.
          Can it tell the difference between a cat and a dog? A car and a bicycle? That's image classification!
        </p>

        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 mb-6">
          <h3 className="font-semibold mb-3">Examples of Image Classification:</h3>
          <ul className="space-y-2">
            <li>📸 <strong>Photo Apps:</strong> Automatically tagging people in photos</li>
            <li>🏥 <strong>Medical Imaging:</strong> Detecting diseases in X-rays and scans</li>
            <li>🚗 <strong>Self-Driving Cars:</strong> Identifying pedestrians, stop signs, and other vehicles</li>
            <li>🔒 <strong>Security:</strong> Facial recognition for unlocking phones</li>
            <li>🛒 <strong>Shopping:</strong> Visual search - upload a photo to find similar products</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Eye className="w-8 h-8 text-blue-600" />
          How Computers "See" Images
        </h2>
        <p className="mb-4">
          To us, an image is a picture. To a computer, an image is just a grid of numbers representing pixel colors.
        </p>

        <CodeExample
          title="How a Computer Sees a 3x3 Image"
          language="javascript"
          code={`// A tiny 3x3 grayscale image (0 = black, 255 = white)
const image = [
  [0,   128, 255],  // Top row: black, gray, white
  [64,  192, 128],  // Middle row
  [255, 0,   64]    // Bottom row
];

// For color images, each pixel has 3 numbers (Red, Green, Blue)
const colorPixel = [255, 0, 0]; // Pure red pixel

// A real image might be 1920x1080 pixels = 2,073,600 numbers!`}
        />

        <p className="mt-4 mb-4">
          The challenge: How do we go from millions of numbers to "this is a cat"?
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Layers className="w-8 h-8 text-green-600" />
          Convolutional Neural Networks (CNNs)
        </h2>
        <p className="mb-4">
          The most common way to classify images is using <strong>Convolutional Neural Networks (CNNs)</strong>.
          These are special neural networks designed for image processing.
        </p>

        <h3 className="text-xl font-semibold mb-3">How CNNs Work (Simplified):</h3>

        <div className="space-y-6 mb-6">
          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Layer 1: Detect Simple Features
            </h4>
            <p className="text-sm mb-2">
              The first layers detect basic patterns like edges, corners, and colors.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Horizontal edges: ─────</li>
              <li>Vertical edges: |||||</li>
              <li>Corners: └ ┐ ┘ ┌</li>
              <li>Circles, curves</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              Layer 2-3: Combine Into Shapes
            </h4>
            <p className="text-sm mb-2">
              Middle layers combine simple features into more complex shapes.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Eyes (two circles with edges)</li>
              <li>Wheels (circles with patterns)</li>
              <li>Windows (rectangles with frames)</li>
              <li>Fur texture, scales, etc.</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Final Layers: Recognize Objects
            </h4>
            <p className="text-sm mb-2">
              Later layers recognize complete objects by combining shapes.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Cat: fur texture + whiskers + pointed ears + eyes</li>
              <li>Car: wheels + windows + headlights + body shape</li>
              <li>Tree: trunk + branches + leaves</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-lg font-semibold mb-2">The CNN Pipeline:</p>
          <code className="text-sm">
            Raw Pixels → Edges/Colors → Shapes/Textures → Parts → Objects → Classification
          </code>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Training an Image Classifier</h2>
        <p className="mb-4">
          To train an image classifier, you need:
        </p>

        <ol className="list-decimal pl-8 space-y-3 mb-6">
          <li>
            <strong>Labeled Data:</strong> Thousands (or millions) of images with labels
            <CodeExample
              language="javascript"
              code={`const trainingData = [
  { image: "cat1.jpg", label: "cat" },
  { image: "dog1.jpg", label: "dog" },
  { image: "cat2.jpg", label: "cat" },
  // ... thousands more ...
];`}
              showLineNumbers={false}
            />
          </li>

          <li>
            <strong>Training Process:</strong> The model learns patterns by:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Looking at each image</li>
              <li>Making a prediction</li>
              <li>Comparing to the correct label</li>
              <li>Adjusting its internal weights to improve</li>
            </ul>
          </li>

          <li>
            <strong>Testing:</strong> Evaluate on images the model has never seen before
          </li>
        </ol>

        <CodeExample
          title="Conceptual Training Code"
          language="javascript"
          code={`// Pseudocode for training an image classifier
function trainImageClassifier(trainingImages) {
  const model = new CNN();

  for (let epoch = 0; epoch < 100; epoch++) {
    for (let { image, label } of trainingImages) {
      // Forward pass: make a prediction
      const prediction = model.predict(image);

      // Calculate error
      const error = calculateError(prediction, label);

      // Backward pass: adjust weights to reduce error
      model.updateWeights(error);
    }
  }

  return model;
}

// After training:
const model = trainImageClassifier(catDogImages);
const newImage = loadImage("mystery.jpg");
const result = model.predict(newImage);
console.log(result); // { cat: 0.92, dog: 0.08 }`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Image Classification Models</h2>
        <div className="space-y-4">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">ResNet</h3>
            <p className="text-sm">Very deep network (50-152 layers) that can recognize 1000+ object categories</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">VGG</h3>
            <p className="text-sm">Simple architecture, great for transfer learning (using pre-trained models)</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">MobileNet</h3>
            <p className="text-sm">Lightweight model designed to run on phones and embedded devices</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">YOLO (You Only Look Once)</h3>
            <p className="text-sm">Fast model for real-time object detection (finds multiple objects and their locations)</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Challenges in Image Classification</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2">🔄 Rotation & Scale</h4>
            <p className="text-sm">Same object from different angles or sizes</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2">💡 Lighting</h4>
            <p className="text-sm">Bright, dark, shadows can change appearance</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2">🎭 Occlusion</h4>
            <p className="text-sm">Parts of the object are hidden or blocked</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2">🌈 Background</h4>
            <p className="text-sm">Complex or similar-colored backgrounds</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>Images are grids of numbers (pixels) to computers</li>
          <li>CNNs learn hierarchical features: edges → shapes → objects</li>
          <li>Training requires thousands of labeled images</li>
          <li>Modern models can classify 1000+ different object types</li>
          <li>Image classification powers many real-world applications</li>
          <li>Challenges include lighting, rotation, and occlusion</li>
        </ul>
      </section>
    </LessonLayout>
  );
}
