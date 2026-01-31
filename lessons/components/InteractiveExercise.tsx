'use client';

import { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { TestCase, TestResult } from '@/lib/types';
import { executeJavaScriptCode } from '@/lib/codeExecution';

interface InteractiveExerciseProps {
  exerciseId: string;
  title: string;
  instructions: string;
  starterCode: string;
  testCases: TestCase[];
  language?: 'javascript' | 'typescript';
  onComplete?: () => void;
}

export function InteractiveExercise({
  exerciseId,
  title,
  instructions,
  starterCode,
  testCases,
  language = 'javascript',
  onComplete
}: InteractiveExerciseProps) {
  const [code, setCode] = useState(starterCode);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    setIsRunning(true);
    setError(null);
    setShowResults(false);

    try {
      const result = await executeJavaScriptCode(code, testCases);

      if (result.error) {
        setError(result.error);
        setTestResults([]);
      } else {
        setTestResults(result.results);

        // Check if all tests passed
        const allPassed = result.results.every(r => r.passed);
        if (allPassed && onComplete) {
          onComplete();
        }
      }

      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  const passedCount = testResults.filter(r => r.passed).length;
  const totalCount = testResults.length;
  const allPassed = passedCount === totalCount && totalCount > 0;

  return (
    <div className="exercise-container">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: instructions }}
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Your Code:
          </label>
          <button
            onClick={() => setCode(starterCode)}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Reset to starter code
          </button>
        </div>
        <CodeEditor
          initialCode={code}
          language={language}
          onChange={setCode}
          height="350px"
        />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={runTests}
          disabled={isRunning}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          <Play className="w-5 h-5" />
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>

        {showResults && !error && (
          <div className="flex items-center gap-2">
            {allPassed ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-semibold">
                  All tests passed! 🎉
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  {passedCount} / {totalCount} tests passed
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                Error
              </h4>
              <p className="text-sm text-red-800 dark:text-red-300 font-mono">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {showResults && testResults.length > 0 && (
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
            <h4 className="font-semibold">Test Results</h4>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 ${
                  result.passed
                    ? 'bg-green-50 dark:bg-green-900/10'
                    : 'bg-red-50 dark:bg-red-900/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {result.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold mb-2">
                      {result.description}
                    </div>

                    {result.input !== undefined && (
                      <div className="text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Input: </span>
                        <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                          {JSON.stringify(result.input)}
                        </code>
                      </div>
                    )}

                    {!result.passed && (
                      <>
                        {result.expected !== undefined && (
                          <div className="text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Expected: </span>
                            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                              {JSON.stringify(result.expected)}
                            </code>
                          </div>
                        )}

                        {result.actual !== undefined && (
                          <div className="text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Got: </span>
                            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                              {JSON.stringify(result.actual)}
                            </code>
                          </div>
                        )}

                        {result.error && (
                          <div className="text-sm text-red-600 dark:text-red-400 mt-2">
                            {result.error}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
