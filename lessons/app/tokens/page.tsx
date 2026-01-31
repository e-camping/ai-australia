'use client';

import { useState } from 'react';
import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';
import { Scissors } from 'lucide-react';

export default function TokensLesson() {
  const [inputText, setInputText] = useState('Hello, how are you?');
  const [tokens, setTokens] = useState<string[]>([]);

  // Simple tokenization (split by spaces and punctuation)
  const tokenize = () => {
    const tokenized = inputText
      .split(/(\s+|[.,!?;:])/)
      .filter(t => t.trim() !== '');
    setTokens(tokenized);
  };

  return (
    <LessonLayout
      title="Tokens and System Prompts"
      description="Understand how AI breaks down text and how system prompts guide behavior"
      currentSlug="tokens"
      lessonId="6"
      type="interactive"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Scissors className="w-8 h-8 text-blue-600" />
          What Are Tokens?
        </h2>
        <p className="mb-4">
          When you type a message to an AI, it doesn't process your text character by character or even word by word.
          Instead, it breaks it down into <strong>tokens</strong>.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold mb-2">What is a Token?</p>
          <p>
            A <strong>token</strong> is a chunk of text - it could be a word, part of a word, or even punctuation.
            AI models read and generate text one token at a time.
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-3">Examples of Tokenization</h3>
        <CodeExample
          language="javascript"
          code={`// Simple tokenization (by spaces and punctuation)
"Hello world!" → ["Hello", "world", "!"]

// More complex: breaking down words
"unhappiness" → ["un", "happiness"]
"running" → ["run", "ning"]

// Common words might be single tokens
"the" → ["the"]
"cat" → ["cat"]

// Rare or long words might be multiple tokens
"antidisestablishmentarianism" → ["anti", "dis", "establish", "ment", "arian", "ism"]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Interactive Tokenizer</h2>
        <p className="mb-4">
          Try tokenizing your own text! This is a simplified tokenizer that splits by spaces and punctuation.
        </p>

        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Enter text to tokenize:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              rows={3}
              placeholder="Type something..."
            />
          </div>

          <button
            onClick={tokenize}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Tokenize
          </button>

          {tokens.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Tokens ({tokens.length}):</h4>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded font-mono text-sm"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Why Tokens Matter</h2>
        <div className="space-y-4">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
              1. Efficiency
            </h3>
            <p className="text-sm">
              Processing tokens is more efficient than individual characters. Common words are single tokens,
              making the AI faster.
            </p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">
              2. Understanding
            </h3>
            <p className="text-sm">
              Tokens help AI understand word structure and meaning. Breaking "unhappy" into "un" + "happy"
              helps the model understand negation.
            </p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
              3. Cost and Limits
            </h3>
            <p className="text-sm">
              AI APIs often charge by token count. Models also have token limits (e.g., 4000 tokens max).
              Understanding tokens helps you manage costs and message length.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">System Prompts</h2>
        <p className="mb-4">
          A <strong>system prompt</strong> is a special instruction given to an AI model that tells it how to behave.
          It's like setting the "personality" or "role" of the AI.
        </p>

        <h3 className="text-xl font-semibold mb-3">Examples of System Prompts</h3>

        <CodeExample
          title="Helpful Assistant"
          language="javascript"
          code={`const systemPrompt = "You are a helpful assistant who answers questions clearly and concisely.";

// User: "What is Python?"
// AI: "Python is a popular programming language known for its simplicity and readability..."`}
        />

        <CodeExample
          title="Creative Writer"
          language="javascript"
          code={`const systemPrompt = "You are a creative writer who speaks in metaphors and poetic language.";

// User: "What is Python?"
// AI: "Ah, Python! Like a serpent gliding through code, elegant and powerful..."`}
        />

        <CodeExample
          title="Teacher for Kids"
          language="javascript"
          code={`const systemPrompt = "You are a friendly teacher explaining things to 10-year-olds. Use simple words and fun examples.";

// User: "What is Python?"
// AI: "Python is like LEGO blocks for computers! You can build cool games and robots with it!"`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How System Prompts Change Behavior</h2>
        <p className="mb-4">
          The same question can get very different answers depending on the system prompt:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">System Prompt</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">User Question</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">AI Response</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Be concise</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">What is AI?</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">AI is computer intelligence.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Be detailed</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">What is AI?</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">AI, or Artificial Intelligence, refers to computer systems designed to perform tasks that typically require human intelligence, such as learning, reasoning, problem-solving...</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Be funny</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">What is AI?</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">AI is when computers try to be smart... like me pretending I understand your weird questions! 🤖</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li><strong>Tokens</strong> are chunks of text that AI processes one at a time</li>
          <li>Tokenization breaks text into words, subwords, or characters</li>
          <li>Token count affects API costs and model limits</li>
          <li><strong>System prompts</strong> set the behavior and personality of an AI</li>
          <li>Different system prompts can dramatically change how an AI responds</li>
          <li>Good system prompts are clear, specific, and aligned with your goal</li>
        </ul>
      </section>
    </LessonLayout>
  );
}
