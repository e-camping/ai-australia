'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle2, Circle, BookOpen } from 'lucide-react';
import { lessons } from '@/lib/lessonConfig';
import { isLessonComplete } from '@/lib/progressTracker';
import { useEffect, useState } from 'react';

export function LessonNavigation() {
  const pathname = usePathname();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load completed lessons from localStorage
    const completed = new Set<string>();
    lessons.forEach(lesson => {
      if (isLessonComplete(lesson.id)) {
        completed.add(lesson.id);
      }
    });
    setCompletedLessons(completed);
  }, [pathname]); // Reload when path changes

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const currentSlug = pathname.split('/')[1];

  return (
    <nav className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen p-6 sticky top-0 overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">AI Lessons</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {completedLessons.size} of {lessons.length} completed
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedLessons.size / lessons.length) * 100}%`
            }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          const isCurrent = lesson.slug === currentSlug;

          return (
            <li key={lesson.id}>
              <Link
                href={`/${lesson.slug}`}
                className={`
                  flex items-start gap-3 p-3 rounded-lg transition-colors
                  ${isCurrent
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : isCurrent ? (
                    <Circle className="w-5 h-5 text-blue-600 fill-blue-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Lesson {index + 1}
                  </div>
                  <div className="text-sm leading-tight">
                    {lesson.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {lesson.duration}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
