'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeExampleProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeExample({
  code,
  language = 'javascript',
  title,
  showLineNumbers = true
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const lines = code.split('\n');

  return (
    <div className="code-example relative group">
      {title && (
        <div className="text-sm text-gray-400 mb-2 font-semibold">
          {title}
        </div>
      )}

      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>
      </div>

      <pre className="overflow-x-auto">
        <code className={`language-${language} text-sm`}>
          {showLineNumbers ? (
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, index) => (
                  <tr key={index}>
                    <td className="text-gray-500 text-right pr-4 select-none border-r border-gray-700 align-top">
                      {index + 1}
                    </td>
                    <td className="pl-4 text-gray-100">
                      {line || '\n'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span className="text-gray-100">{code}</span>
          )}
        </code>
      </pre>

      {language && (
        <div className="absolute top-3 left-3 text-xs text-gray-500 uppercase font-semibold">
          {language}
        </div>
      )}
    </div>
  );
}
