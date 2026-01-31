'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';
import { Brain, Sparkles, Zap } from 'lucide-react';

export default function LLMsLesson() {
  return (
    <LessonLayout
      title="Large Language Models (LLMs)"
      description="Bringing it all together - how LLMs use everything you've learned"
      currentSlug="llms"
      lessonId="9"
      type="theory"
    >
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-500 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Congratulations! 🎉
        </h2>
        <p className="text-lg">
          You've completed all the foundational lessons. Now let's see how everything comes together in
          <strong> Large Language Models</strong> - the technology behind ChatGPT, Claude, and other AI assistants!
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          What Are LLMs?
        </h2>
        <p className="mb-4">
          <strong>Large Language Models (LLMs)</strong> are AI systems that understand and generate human language.
          They're "large" because they:
        </p>
        <ul className="list-disc pl-8 mb-4 space-y-2">
          <li>Have billions (or trillions) of parameters (learned patterns)</li>
          <li>Are trained on massive amounts of text from the internet</li>
          <li>Can perform many language tasks without specific training</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold mb-2">Examples of LLMs:</p>
          <ul className="space-y-1">
            <li>💬 <strong>ChatGPT</strong> (OpenAI) - Conversational AI</li>
            <li>🤖 <strong>Claude</strong> (Anthropic) - Helpful AI assistant</li>
            <li>🔍 <strong>Gemini</strong> (Google) - Multimodal AI</li>
            <li>🦙 <strong>LLaMA</strong> (Meta) - Open-source model</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-8 h-8 text-yellow-600" />
          How LLMs Use Everything You Learned
        </h2>
        <p className="mb-4">
          LLMs combine ALL the concepts from previous lessons. Let's connect the dots:
        </p>

        <div className="space-y-6">
          <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              📊 Lesson 1: Probabilities
            </h3>
            <p className="mb-3">
              LLMs predict the next word using <strong>probability distributions</strong>. Remember softmax?
            </p>
            <CodeExample
              language="javascript"
              code={`// LLM generates: "The cat sat on the..."
const nextWordProbabilities = {
  "mat": 0.45,    // Most likely
  "floor": 0.30,  // Second choice
  "chair": 0.15,  // Less likely
  "moon": 0.01    // Very unlikely
};

// The model samples from these probabilities to generate text!`}
              showLineNumbers={false}
            />
          </div>

          <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              ⚖️ Lesson 2: Bias and Variance
            </h3>
            <p className="mb-3">
              LLMs must balance <strong>bias and variance</strong> during training:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Too simple:</strong> Model can't learn language patterns (underfitting)</li>
              <li><strong>Too complex:</strong> Model memorizes training data (overfitting)</li>
              <li><strong>Just right:</strong> Generalizes well to new conversations</li>
            </ul>
          </div>

          <div className="border-2 border-purple-500 rounded-lg p-6 bg-purple-50 dark:bg-purple-900/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              📚 Lesson 3: Training and Testing Data
            </h3>
            <p className="mb-3">
              LLMs are trained on massive text datasets, then tested on new conversations:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Training:</strong> Books, websites, articles (billions of words)</li>
              <li><strong>Testing:</strong> New prompts the model has never seen</li>
              <li><strong>Data cleaning:</strong> Removing harmful or low-quality content</li>
            </ul>
          </div>

          <div className="border-2 border-yellow-500 rounded-lg p-6 bg-yellow-50 dark:bg-yellow-900/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              🔤 Lesson 4: Text Embeddings
            </h3>
            <p className="mb-3">
              LLMs use <strong>embeddings</strong> to understand word meanings and relationships:
            </p>
            <CodeExample
              language="javascript"
              code={`// In the LLM's embedding space:
similarity("king", "queen") → 0.85 (high)
similarity("Paris", "France") → 0.78 (related)
similarity("cat", "pizza") → 0.12 (low)

// The model understands that "monarch" and "ruler" mean similar things!`}
              showLineNumbers={false}
            />
          </div>

          <div className="border-2 border-red-500 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              🔢 Lesson 6: Tokens
            </h3>
            <p className="mb-3">
              LLMs process text as <strong>tokens</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Input text is broken into tokens</li>
              <li>Each token gets an embedding</li>
              <li>The model predicts the next token</li>
              <li>Token limits affect conversation length (e.g., 4000 tokens)</li>
            </ul>
          </div>

          <div className="border-2 border-orange-500 rounded-lg p-6 bg-orange-50 dark:bg-orange-900/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              🎯 Lessons 7-8: Decision Trees & Regression
            </h3>
            <p className="mb-3">
              While LLMs don't use decision trees directly, they learn similar <strong>decision patterns</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>If context is formal → use formal language</li>
              <li>If question about code → provide code examples</li>
              <li>If asked for explanation → break down concepts</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">The Transformer Architecture</h2>
        <p className="mb-4">
          LLMs are built using the <strong>Transformer architecture</strong>, which introduced a powerful mechanism
          called <strong>attention</strong>.
        </p>

        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 mb-6">
          <p className="font-semibold mb-2">What is Attention?</p>
          <p className="mb-3">
            Attention allows the model to focus on relevant words when processing text. For example:
          </p>
          <p className="text-sm italic mb-2">
            "The animal didn't cross the street because <strong>it</strong> was too tired."
          </p>
          <p className="text-sm">
            The model knows <strong>"it"</strong> refers to <strong>"the animal"</strong>, not "the street",
            because it pays attention to context!
          </p>
        </div>

        <CodeExample
          title="Simplified Attention Concept"
          language="javascript"
          code={`// When processing "it was too tired"
const attentionScores = {
  "The": 0.05,
  "animal": 0.85,    // High attention - "it" refers to this!
  "didn't": 0.02,
  "cross": 0.03,
  "the": 0.01,
  "street": 0.04     // Low attention
};

// The model understands relationships between words!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How LLMs Are Trained</h2>
        <ol className="list-decimal pl-8 space-y-4">
          <li>
            <strong>Pre-training (Learning Language):</strong>
            <p className="text-sm mt-1">
              The model reads massive amounts of text and learns to predict the next word. This teaches it
              grammar, facts, reasoning, and more.
            </p>
          </li>

          <li>
            <strong>Fine-tuning (Learning to be Helpful):</strong>
            <p className="text-sm mt-1">
              The model is trained on conversations with human feedback to learn how to be a good assistant.
            </p>
          </li>

          <li>
            <strong>Reinforcement Learning (RLHF):</strong>
            <p className="text-sm mt-1">
              Humans rate different responses, and the model learns which responses are better. This is like
              giving the AI a "grade" on its answers.
            </p>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What LLMs Can Do</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">💬 Conversation</h4>
            <p className="text-sm">Chat naturally about any topic</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">✍️ Writing</h4>
            <p className="text-sm">Generate articles, stories, emails</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">💻 Coding</h4>
            <p className="text-sm">Write and explain code</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">🌐 Translation</h4>
            <p className="text-sm">Translate between languages</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">📝 Summarization</h4>
            <p className="text-sm">Condense long documents</p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">🎓 Teaching</h4>
            <p className="text-sm">Explain complex topics simply</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Limitations and Challenges</h2>
        <div className="space-y-3">
          <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4">
            <strong>⚠️ Hallucinations:</strong> Sometimes LLMs make up false information confidently
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4">
            <strong>📅 Knowledge Cutoff:</strong> Training data has a cutoff date - models don't know recent events
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4">
            <strong>🎲 Inconsistency:</strong> Same prompt can give different responses each time
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4">
            <strong>💰 Cost:</strong> Large models are expensive to train and run
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">The Future of LLMs</h2>
        <p className="mb-4">
          LLMs are evolving rapidly. Future directions include:
        </p>
        <ul className="list-disc pl-8 space-y-2">
          <li><strong>Multimodal models:</strong> Understanding images, video, and audio alongside text</li>
          <li><strong>Longer context:</strong> Processing entire books instead of just pages</li>
          <li><strong>Better reasoning:</strong> Solving complex math and logic problems</li>
          <li><strong>Efficiency:</strong> Smaller models that run on phones</li>
          <li><strong>Safety:</strong> More reliable and less prone to errors</li>
        </ul>
      </section>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-500 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">🎓 You Did It!</h2>
        <p className="text-lg mb-4">
          You've completed all 9 lessons and learned the fundamentals of AI and machine learning!
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          From probabilities to LLMs, you now understand how modern AI works. Keep exploring,
          building, and learning. The future of AI is in your hands!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold">Probabilities ✓</span>
          <span className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold">Bias & Variance ✓</span>
          <span className="px-4 py-2 bg-purple-600 text-white rounded-full font-semibold">Data ✓</span>
          <span className="px-4 py-2 bg-yellow-600 text-white rounded-full font-semibold">Embeddings ✓</span>
          <span className="px-4 py-2 bg-red-600 text-white rounded-full font-semibold">Images ✓</span>
          <span className="px-4 py-2 bg-orange-600 text-white rounded-full font-semibold">Tokens ✓</span>
          <span className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold">Trees ✓</span>
          <span className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold">Regression ✓</span>
          <span className="px-4 py-2 bg-teal-600 text-white rounded-full font-semibold">LLMs ✓</span>
        </div>
      </div>
    </LessonLayout>
  );
}
