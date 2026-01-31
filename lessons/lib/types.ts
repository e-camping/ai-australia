// Lesson types and interfaces

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: 'interactive' | 'theory' | 'game';
  duration: string;
}

export interface TestCase {
  input: any[];
  expectedOutput: any;
  description: string;
}

export interface TestResult {
  description: string;
  passed: boolean;
  input?: any[];
  expected?: any;
  actual?: any;
  error?: string;
}

export interface ExerciseConfig {
  exerciseId: string;
  title: string;
  instructions: string;
  starterCode: string;
  testCases: TestCase[];
  language: 'javascript' | 'typescript';
  hints?: string[];
}

export interface LessonProgress {
  [lessonId: string]: boolean;
}

export interface CodeExecutionResult {
  success: boolean;
  results: TestResult[];
  error?: string;
}
