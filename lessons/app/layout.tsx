import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LessonNavigation } from '@/components/LessonNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Lessons - Learn AI and Machine Learning Concepts',
  description: 'Interactive lessons on AI, machine learning, and data science concepts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <LessonNavigation />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
