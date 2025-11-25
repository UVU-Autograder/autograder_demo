export interface AISettings {
  model: string; // Model ID from AVAILABLE_MODELS
  feedbackLength: "short" | "medium" | "detailed";
  feedbackStyle: "professional" | "conversational" | "technical";
  outputFormat: "paragraphs" | "bullets" | "mixed";
  focusAreas: {
    codeQuality: boolean;
    efficiency: boolean;
    edgeCases: boolean;
    bestPractices: boolean;
    documentation: boolean;
    readability: boolean;
  };
  includeExamples: boolean;
  highlightIssues: boolean;
}

export interface AIFeedback {
  overallScore: number;
  grade: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  suggestions: Array<{
    title: string;
    description: string;
    code?: string;
  }>;
  rubricScores: {
    correctness: number;
    codeQuality: number;
    efficiency: number;
    edgeCases: number;
  };
  testAnalysis?: {
    passed: number;
    total: number;
    details: string;
  };
  metrics?: {
    linesOfCode: number;
    complexity: string;
    commentRatio: string;
  };
}

export const DEFAULT_AI_SETTINGS: AISettings = {
  model: "anthropic/claude-3.5-sonnet", // Default to Claude 3.5 Sonnet
  feedbackLength: "medium",
  feedbackStyle: "technical",
  outputFormat: "mixed",
  focusAreas: {
    codeQuality: true,
    efficiency: true,
    edgeCases: true,
    bestPractices: true,
    documentation: true,
    readability: true,
  },
  includeExamples: false,
  highlightIssues: true,
};
