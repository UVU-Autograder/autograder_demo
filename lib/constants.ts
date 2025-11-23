import { Assignment } from './types';

export const SUPPORTED_LANGUAGES = {
  python: { id: 71, name: 'Python 3', monaco: 'python' },
  javascript: { id: 63, name: 'JavaScript (Node.js)', monaco: 'javascript' },
  java: { id: 62, name: 'Java', monaco: 'java' },
  cpp: { id: 54, name: 'C++', monaco: 'cpp' },
  c: { id: 50, name: 'C', monaco: 'c' },
  typescript: { id: 74, name: 'TypeScript', monaco: 'typescript' },
} as const;

export const DIFFICULTY_LEVELS = {
  easy: {
    label: 'Easy',
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  medium: {
    label: 'Medium',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  hard: {
    label: 'Hard',
    color: 'bg-gradient-to-r from-red-500 to-pink-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
} as const;

export const DEFAULT_RUBRIC = {
  correctness: {
    points: 50,
    description: 'Code produces correct output for all test cases',
  },
  codeQuality: {
    points: 20,
    description: 'Code is clean, readable, and follows best practices',
  },
  efficiency: {
    points: 15,
    description: 'Solution uses optimal time and space complexity',
  },
  edgeCases: {
    points: 15,
    description: 'Handles edge cases and error conditions properly',
  },
};

export const AI_MODELS = [
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet (Recommended)', cost: 'High' },
  { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', cost: 'High' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', cost: 'Low' },
  { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo', cost: 'Low' },
] as const;

export const FEEDBACK_STYLES = {
  detailed: {
    label: 'Detailed',
    description: 'Comprehensive feedback with examples and explanations',
  },
  concise: {
    label: 'Concise',
    description: 'Brief, focused feedback on key issues',
  },
  encouraging: {
    label: 'Encouraging',
    description: 'Positive, supportive tone emphasizing strengths',
  },
  strict: {
    label: 'Strict',
    description: 'Critical analysis focusing on improvements',
  },
} as const;

export const DEFAULT_AI_SETTINGS = {
  model: 'anthropic/claude-3.5-sonnet',
  feedbackStyle: 'detailed',
  includeExamples: true,
  includeSuggestions: true,
  emphasizeStrengths: true,
  temperature: 0.7,
};
