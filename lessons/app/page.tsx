'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Gamepad2, GraduationCap } from 'lucide-react';
import { lessons } from '@/lib/lessonConfig';
import { getCompletionPercentage, getCompletedCount } from '@/lib/progressTracker';
import { useEffect, useState } from 'react';

export default function Home() {
  const [completedCount, setCompletedCount] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCompletedCount(getCompletedCount());
    setCompletionPercentage(getCompletionPercentage(lessons.length));
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'interactive':
        return <Code className="w-6 h-6" />;
      case 'game':
        return <Gamepad2 className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'interactive':
        return 'Interactive Exercise';
      case 'game':
        return 'Game';
      default:
        return 'Theory';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'interactive':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'game':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  return (
    <div className="lesson-container py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-12 h-12 text-blue-600" />
          <h1 className="text-5xl font-bold">AI Lessons</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Learn artificial intelligence and machine learning concepts through interactive lessons,
          code exercises, and fun games.
        </p>

        {mounted && completedCount > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-blue-900 dark:text-blue-100">
                Your Progress
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3 mb-2">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {completedCount} of {lessons.length} lessons completed
            </p>
          </div>
        )}
      </div>

      {/* Lessons Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/${lesson.slug}`}
              className="group border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300 group-hover:scale-110 transition-transform">
                  {getIcon(lesson.type)}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Lesson {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lesson.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getTypeBadgeColor(lesson.type)}`}>
                  {getTypeLabel(lesson.type)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {lesson.duration}
                </span>
              </div>

              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Start lesson
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Complete all {lessons.length} lessons to master AI fundamentals!
        </p>
      </div>
    </div>
  );
}
