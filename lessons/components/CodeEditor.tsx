'use client';

import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  language: 'javascript' | 'typescript' | 'python';
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
  theme?: 'vs-dark' | 'light';
}

export function CodeEditor({
  initialCode,
  language,
  onChange,
  height = '400px',
  readOnly = false,
  theme = 'vs-dark'
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="bg-gray-900 rounded-lg p-4 text-gray-400 flex items-center justify-center"
        style={{ height }}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={initialCode}
        value={initialCode}
        onChange={(value) => onChange(value || '')}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          readOnly,
          folding: true,
          bracketPairColorization: {
            enabled: true
          },
          padding: {
            top: 16,
            bottom: 16
          },
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          smoothScrolling: true,
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
            Loading editor...
          </div>
        }
      />
    </div>
  );
}
