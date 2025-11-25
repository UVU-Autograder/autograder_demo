export interface AIModel {
  id: string;
  name: string;
}

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'deepseek/deepseek-chat-v3.1:free',
    name: 'DeepSeek V3.1 (Free) ⭐',
  },
  {
    id: 'qwen/qwen3-coder:free',
    name: 'Qwen3 Coder (Free)',
  },
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash (Free)',
  },
  {
    id: 'deepseek/deepseek-r1-0528:free',
    name: 'DeepSeek R1 Reasoning (Free)',
  },
  {
    id: 'x-ai/grok-4.1-fast:free',
    name: 'Grok 4.1 Fast (Free)',
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B (Free)',
  },
];

export const DEFAULT_MODEL = AVAILABLE_MODELS[0];
