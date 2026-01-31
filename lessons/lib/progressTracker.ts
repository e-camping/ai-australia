import { LessonProgress } from './types';

const PROGRESS_KEY = 'ai-lessons-progress';

/**
 * Load lesson progress from localStorage
 */
export function loadProgress(): LessonProgress {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }

  return {};
}

/**
 * Save lesson progress to localStorage
 */
export function saveProgress(progress: LessonProgress): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

/**
 * Mark a lesson as completed
 */
export function markLessonComplete(lessonId: string): void {
  const progress = loadProgress();
  progress[lessonId] = true;
  saveProgress(progress);
}

/**
 * Check if a lesson is completed
 */
export function isLessonComplete(lessonId: string): boolean {
  const progress = loadProgress();
  return progress[lessonId] === true;
}

/**
 * Get completion percentage across all lessons
 */
export function getCompletionPercentage(totalLessons: number): number {
  const progress = loadProgress();
  const completedCount = Object.values(progress).filter(Boolean).length;
  return Math.round((completedCount / totalLessons) * 100);
}

/**
 * Get number of completed lessons
 */
export function getCompletedCount(): number {
  const progress = loadProgress();
  return Object.values(progress).filter(Boolean).length;
}

/**
 * Reset all progress (for testing or user request)
 */
export function resetProgress(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
}

/**
 * Get all completed lesson IDs
 */
export function getCompletedLessonIds(): string[] {
  const progress = loadProgress();
  return Object.keys(progress).filter(id => progress[id]);
}
