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

// Popular Free Models on OpenRouter:
// - deepseek/deepseek-chat:free (Best for code, 671B params)
// - google/gemini-flash-1.5:free (Fast, good quality)
// - meta-llama/llama-3.1-8b-instruct:free (Llama 3.1)
// - qwen/qwen-2-7b-instruct:free (Qwen 2)
// - microsoft/phi-3-mini-128k-instruct:free (Small, fast)

export const DEFAULT_AI_SETTINGS: AISettings = {
  model: "deepseek/deepseek-chat:free", // Free model - or use env var
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
