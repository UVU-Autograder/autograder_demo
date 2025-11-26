export interface AIModel {
  id: string;
  name: string;
}

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3 (Free) ⭐',
  },
  {
    id: 'qwen/qwq-32b-preview',
    name: 'Qwen QwQ 32B (Free)',
  },
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash (Free)',
  },
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1 Reasoning (Free)',
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B (Free)',
  },
  {
    id: 'meta-llama/llama-3.1-8b-instruct:free',
    name: 'Llama 3.1 8B (Free)',
  },
];

export const DEFAULT_MODEL = AVAILABLE_MODELS[0];
