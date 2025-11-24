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

// Evaluation method types
export type EvaluationMethod = 
  | { type: 'unit-test' }
  | { type: 'output-match'; fuzzyMatch?: boolean }
  | { type: 'function-signature'; functions: { name: string; params: string[] }[] }
  | { type: 'pattern-match'; required?: string[]; forbidden?: string[] }
  | { type: 'custom'; script: string };

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
  // New fields for enhanced functionality
  evaluationMethod?: EvaluationMethod;
  timeLimit?: number; // seconds, default 5
  memoryLimit?: number; // KB, default 256000
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
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

export interface AIEvaluation {
  feedback: string;
  rubricScores: {
    correctness: number;
    codeQuality: number;
    efficiency: number;
    edgeCases: number;
  };
  suggestions: string[];
  strengths: string[];
}

export interface GradingResult {
  assignment: Assignment;
  code: string;
  testResults: TestResult[];
  passedCount: number;
  totalCount: number;
  testScore: number;
  aiEvaluation: AIEvaluation;
  finalScore: number;
  maxScore: number;
  gradedAt: Date;
}

// New types for instructor workflow
export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName?: string;
  code: string;
  language: string;
  submittedAt: Date;
  
  // Grading results
  status: 'pending' | 'grading' | 'graded' | 'error';
  testResults?: TestResult[];
  aiEvaluation?: AIEvaluation;
  finalScore?: number;
  maxScore: number;
  gradedAt?: Date;
  
  // Metadata
  filename: string;
  fileSize: number;
  attemptNumber: number;
  isLate: boolean;
  
  // Manual review
  manualOverride?: {
    score: number;
    comment: string;
    reviewedAt: Date;
  };
}

export interface BulkUploadResult {
  total: number;
  successful: number;
  failed: number;
  submissions: Submission[];
  errors: {
    filename: string;
    error: string;
  }[];
}
