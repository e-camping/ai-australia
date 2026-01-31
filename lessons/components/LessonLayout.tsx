'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { ContinueButton } from './ContinueButton';
import { getNextLesson, getPreviousLesson, getLessonProgress } from '@/lib/lessonConfig';
import { markLessonComplete, isLessonComplete } from '@/lib/progressTracker';

interface LessonLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  currentSlug: string;
  lessonId: string;
  type?: 'interactive' | 'theory' | 'game';
}

export function LessonLayout({
  children,
  title,
  description,
  currentSlug,
  lessonId,
  type = 'theory'
}: LessonLayoutProps) {
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCompleted(isLessonComplete(lessonId));
  }, [lessonId]);

  const nextLesson = getNextLesson(currentSlug);
  const previousLesson = getPreviousLesson(currentSlug);
  const progress = getLessonProgress(currentSlug);

  const handleMarkComplete = () => {
    markLessonComplete(lessonId);
    setCompleted(true);
  };

  const handleContinue = () => {
    if (!completed && type !== 'interactive') {
      handleMarkComplete();
    }
  };

  return (
    <div className="lesson-container">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Lesson {progress.current} of {progress.total}</span>
          <span>{progress.percentage}% complete</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {completed && mounted && (
            <CheckCircle className="w-6 h-6 text-green-600" />
          )}
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
        {description && (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        {children}
      </div>

      {/* Mark as complete button (for theory lessons) */}
      {type === 'theory' && !completed && mounted && (
        <div className="mb-6">
          <button
            onClick={handleMarkComplete}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Complete
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="lesson-nav">
        <div>
          {previousLesson && (
            <Link
              href={`/${previousLesson.slug}`}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <div>
                <div className="text-sm">Previous</div>
                <div className="font-semibold">{previousLesson.title}</div>
              </div>
            </Link>
          )}
        </div>

        <div>
          {nextLesson && (
            <ContinueButton
              nextLesson={nextLesson.slug}
              nextTitle={nextLesson.title}
              onContinue={handleContinue}
            />
          )}
        </div>
      </nav>
    </div>
  );
}
