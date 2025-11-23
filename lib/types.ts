export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Rubric {
  correctness: {
    points: number;
    description: string;
  };
  codeQuality: {
    points: number;
    description: string;
  };
  efficiency: {
    points: number;
    description: string;
  };
  edgeCases: {
    points: number;
    description: string;
  };
}

export interface Assignment {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  description: string;
  instructions: string;
  starterCode: string;
  testCases: TestCase[];
  rubric: Rubric;
}

export interface TestResult {
  testCaseId: number;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string | null;
  error: string | null;
  executionTime: string | null;
  memory: number | null;
}

export interface GradingResult {
  assignment: Assignment;
  code: string;
  testResults: TestResult[];
  passedCount: number;
  totalCount: number;
  testScore: number;
  aiEvaluation: {
    feedback: string;
    rubricScores: {
      correctness: number;
      codeQuality: number;
      efficiency: number;
      edgeCases: number;
    };
    suggestions: string[];
    strengths: string[];
  };
  finalScore: number;
  maxScore: number;
  gradedAt: Date;
}
