import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';

export interface AIEvaluationRequest {
  code: string;
  language: string;
  assignmentTitle: string;
  assignmentDescription: string;
  testResults: {
    passed: number;
    total: number;
    failures: string[];
  };
  rubric: Record<string, { points: number; description: string }>;
  codeAnalysis?: {
    passed: boolean;
    score: number;
    totalChecks: number;
    failures: string[];
  };
}

export interface AIEvaluationResponse {
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

export class OpenRouterService {
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || OPENROUTER_API_KEY;
    this.model = model || OPENROUTER_MODEL;
  }

  async evaluateCode(request: AIEvaluationRequest): Promise<AIEvaluationResponse> {
    const prompt = this.buildPrompt(request);

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert programming instructor evaluating student code. Provide constructive, detailed feedback in JSON format.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          response_format: { type: 'json_object' },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
            'X-Title': 'UVU Autograder',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('OpenRouter API error:', error);
      
      // Fallback response if API fails
      return this.getFallbackEvaluation(request);
    }
  }

  private buildPrompt(request: AIEvaluationRequest): string {
    const { code, language, assignmentTitle, assignmentDescription, testResults, rubric, codeAnalysis } = request;

    return `You are evaluating a student's code submission for a programming assignment.

**Assignment: ${assignmentTitle}**
${assignmentDescription}

**Programming Language:** ${language}

**Student Code:**
\`\`\`${language}
${code}
\`\`\`

**Test Results:**
- Tests Passed: ${testResults.passed}/${testResults.total}
${testResults.failures.length > 0 ? `- Failed Tests:\n${testResults.failures.map(f => `  * ${f}`).join('\n')}` : ''}

${codeAnalysis ? `**Code Requirements Analysis:**
- Requirements Met: ${codeAnalysis.score}/${codeAnalysis.totalChecks}
- Overall: ${codeAnalysis.passed ? '✅ PASSED' : '❌ FAILED'}
${codeAnalysis.failures.length > 0 ? `- Failed Requirements:\n${codeAnalysis.failures.map(f => `  * ${f}`).join('\n')}` : ''}
` : ''}

**Grading Rubric:**
${Object.entries(rubric).map(([key, val]) => `- ${key}: ${val.points} points - ${val.description}`).join('\n')}

**Instructions:**
Evaluate the code based on the rubric criteria${codeAnalysis ? ' and the code requirements analysis' : ''}. Provide:
1. Detailed feedback on the code quality, correctness, and efficiency
2. Scores for each rubric criterion (0 to max points)
3. Specific suggestions for improvement${codeAnalysis && !codeAnalysis.passed ? ' (including failed requirements)' : ''}
4. Strengths of the current implementation

${codeAnalysis && !codeAnalysis.passed ? 'NOTE: The code failed some required constructs/patterns. Consider this in your evaluation.\n' : ''}

Return your evaluation in the following JSON format:
{
  "feedback": "Overall detailed feedback (2-3 paragraphs)",
  "rubricScores": {
    "correctness": <number>,
    "codeQuality": <number>,
    "efficiency": <number>,
    "edgeCases": <number>
  },
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "strengths": ["strength 1", "strength 2"]
}`;
  }

  private getFallbackEvaluation(request: AIEvaluationRequest): AIEvaluationResponse {
    const passRate = request.testResults.passed / request.testResults.total;
    const correctnessScore = Math.round(
      (passRate * request.rubric.correctness.points)
    );

    return {
      feedback: `Your code passed ${request.testResults.passed} out of ${request.testResults.total} test cases. ${
        passRate === 1
          ? 'Great job! All tests passed.'
          : 'Review the failed test cases to improve your solution.'
      }`,
      rubricScores: {
        correctness: correctnessScore,
        codeQuality: Math.round(request.rubric.codeQuality.points * 0.7),
        efficiency: Math.round(request.rubric.efficiency.points * 0.7),
        edgeCases: Math.round(request.rubric.edgeCases.points * passRate),
      },
      suggestions: [
        'Consider adding more comments to explain your logic',
        'Test your code with edge cases',
        'Review the problem requirements carefully',
      ],
      strengths: [
        passRate > 0.5 ? 'Good understanding of the problem' : 'Code compiles successfully',
      ],
    };
  }
  
  async evaluateCodeWithCustomPrompt(
    prompt: string,
    language: string,
    model?: string
  ): Promise<string> {
    const selectedModel = model || this.model;
    
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: selectedModel,
          messages: [
            {
              role: 'system',
              content: `You are an expert ${language} programming instructor evaluating student code. Provide detailed, constructive feedback in JSON format.`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          response_format: { type: 'json_object' },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
            'X-Title': 'UVU Autograder',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }
}

export const openRouterService = new OpenRouterService();
