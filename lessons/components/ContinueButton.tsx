'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ContinueButtonProps {
  nextLesson: string | null;
  nextTitle?: string;
  onContinue?: () => void;
  disabled?: boolean;
}

export function ContinueButton({
  nextLesson,
  nextTitle,
  onContinue,
  disabled = false
}: ContinueButtonProps) {
  if (!nextLesson) {
    return null;
  }

  const handleClick = () => {
    if (onContinue) {
      onContinue();
    }
  };

  if (disabled) {
    return (
      <button
        disabled
        className="continue-btn opacity-50 cursor-not-allowed flex items-center gap-2"
        title="Complete the exercise to continue"
      >
        Continue to {nextTitle || 'Next Lesson'}
        <ArrowRight className="w-5 h-5" />
      </button>
    );
  }

  return (
    <Link
      href={`/${nextLesson}`}
      className="continue-btn flex items-center gap-2 inline-flex"
      onClick={handleClick}
    >
      Continue to {nextTitle || 'Next Lesson'}
      <ArrowRight className="w-5 h-5" />
    </Link>
  );
}
