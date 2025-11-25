export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Rubric {
  [key: string]: {
    points: number;
    description: string;
  };
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

// Code analysis requirements
export interface CodeRequirements {
  // Construct requirements
  minFunctions?: number;
  minClasses?: number;
  minLoops?: number;
  minLines?: number;
  maxLines?: number;
  
  // Required constructs (must be present)
  requiredConstructs?: string[]; // e.g., ['if_statement', 'for_loop', 'recursion']
  
  // Forbidden constructs (must not be present)
  forbiddenConstructs?: string[]; // e.g., ['while_loop', 'global_variables']
  
  // Naming convention
  namingConvention?: 'snake_case' | 'camelCase';
  
  // Style requirements
  requireDocstrings?: boolean;
  requireTypeHints?: boolean;
  requireComments?: boolean;
  
  // Output formatting
  requireFString?: boolean;
  requireInputPrompt?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  language: string;
  description: string;
  instructions: string;
  starterCode: string;
  testCases: TestCase[];
  rubric: Rubric;
  isSample?: boolean; // Flag for sample assignments
  tags?: string[]; // Custom tags for categorization
  // New fields for enhanced functionality
  evaluationMethod?: EvaluationMethod;
  codeRequirements?: CodeRequirements;
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
