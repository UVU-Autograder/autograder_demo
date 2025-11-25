export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: string;
  speed: 'Very Fast' | 'Fast' | 'Medium' | 'Slow';
  cost: '$' | '$$' | '$$$';
  contextWindow: string;
  recommended?: boolean;
}

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Best for detailed code analysis and comprehensive feedback',
    icon: '🧠',
    speed: 'Fast',
    cost: '$$',
    contextWindow: '200K',
    recommended: true,
  },
  {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Excellent for comprehensive feedback and code understanding',
    icon: '🤖',
    speed: 'Medium',
    cost: '$$$',
    contextWindow: '128K',
  },
  {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini Pro 1.5',
    provider: 'Google',
    description: 'Fast and accurate grading with good code analysis',
    icon: '✨',
    speed: 'Very Fast',
    cost: '$',
    contextWindow: '1M',
  },
  {
    id: 'meta-llama/llama-3.1-70b-instruct',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    description: 'Open-source, cost-effective with solid performance',
    icon: '🦙',
    speed: 'Fast',
    cost: '$',
    contextWindow: '128K',
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Latest multimodal model with excellent reasoning',
    icon: '🚀',
    speed: 'Fast',
    cost: '$$',
    contextWindow: '128K',
  },
];

export const DEFAULT_MODEL = AVAILABLE_MODELS[0]; // Claude 3.5 Sonnet
