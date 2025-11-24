import axios from 'axios';
import { 
  ICodeExecutionService, 
  SubmissionResult, 
  ExecutionRequest 
} from './code-execution.interface';

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'http://localhost:2358';

// Language IDs for Judge0
const LANGUAGE_IDS = {
  javascript: 63,  // Node.js
  python: 71,      // Python 3
  java: 62,        // Java
  cpp: 54,         // C++ (GCC 9.2.0)
  c: 50,           // C (GCC 9.2.0)
  typescript: 74,  // TypeScript
} as const;

/**
 * Judge0 implementation of code execution service
 */
export class Judge0Service implements ICodeExecutionService {
  private apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || JUDGE0_API_URL;
  }

  /**
   * Submit code for execution
   */
  async submitCode(request: ExecutionRequest): Promise<string> {
    try {
      const headers: Record<string, string> = {};
      
      // Add RapidAPI headers if using RapidAPI endpoint
      if (this.apiUrl.includes('rapidapi.com')) {
        const apiKey = process.env.RAPIDAPI_KEY;
        if (!apiKey) {
          throw new Error(
            '⚠️ RapidAPI key not configured. Please add RAPIDAPI_KEY to your .env.local file. ' +
            'Get your free key at: https://rapidapi.com/judge0-official/api/judge0-ce'
          );
        }
        headers['X-RapidAPI-Key'] = apiKey;
        headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
      }

      const response = await axios.post(`${this.apiUrl}/submissions`, {
        source_code: Buffer.from(request.source_code).toString('base64'),
        language_id: request.language_id,
        stdin: request.stdin ? Buffer.from(request.stdin).toString('base64') : undefined,
        expected_output: request.expected_output 
          ? Buffer.from(request.expected_output).toString('base64') 
          : undefined,
        cpu_time_limit: request.cpu_time_limit || 5,
        memory_limit: request.memory_limit || 256000, // 256 MB in KB
      }, {
        params: { base64_encoded: true },
        headers,
      });

      return response.data.token;
    } catch (error: any) {
      console.error('Judge0 submission error:', error.response?.data || error.message);
      
      // Handle specific error cases
      if (error.response?.status === 429) {
        throw new Error(
          '⚠️ API quota exceeded! You\'ve reached the daily limit (50 requests/day on free tier). ' +
          'Upgrade at: https://rapidapi.com/judge0-official/api/judge0-ce/pricing'
        );
      }
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error(
          '⚠️ Authentication failed. Please check your RAPIDAPI_KEY in .env.local. ' +
          'Get a free key at: https://rapidapi.com/judge0-official/api/judge0-ce'
        );
      }
      
      if (error.code === 'ECONNREFUSED') {
        throw new Error(
          '⚠️ Cannot connect to Judge0 API. If using localhost, make sure Docker is running. ' +
          'Otherwise, check your JUDGE0_API_URL in .env.local'
        );
      }
      
      throw new Error(
        error.message || 'Failed to submit code. Please check your internet connection and try again.'
      );
    }
  }

  /**
   * Get submission result
   */
  async getSubmission(token: string): Promise<SubmissionResult> {
    try {
      const headers: Record<string, string> = {};
      
      // Add RapidAPI headers if using RapidAPI endpoint
      if (this.apiUrl.includes('rapidapi.com')) {
        const apiKey = process.env.RAPIDAPI_KEY;
        if (!apiKey) {
          throw new Error('⚠️ RapidAPI key not configured. Please add RAPIDAPI_KEY to your .env.local file.');
        }
        headers['X-RapidAPI-Key'] = apiKey;
        headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
      }

      const response = await axios.get(`${this.apiUrl}/submissions/${token}`, {
        params: { base64_encoded: true },
        headers,
      });

      const data = response.data;

      return {
        stdout: data.stdout ? Buffer.from(data.stdout, 'base64').toString() : null,
        stderr: data.stderr ? Buffer.from(data.stderr, 'base64').toString() : null,
        status: data.status,
        time: data.time,
        memory: data.memory,
        compile_output: data.compile_output 
          ? Buffer.from(data.compile_output, 'base64').toString() 
          : null,
      };
    } catch (error: any) {
      console.error('Judge0 get submission error:', error.response?.data || error.message);
      
      if (error.response?.status === 429) {
        throw new Error('⚠️ API quota exceeded! Daily limit reached.');
      }
      
      throw new Error(
        error.message || 'Failed to retrieve code execution results. Please try again.'
      );
    }
  }

  /**
   * Submit and wait for result (blocking)
   */
  async executeCode(request: ExecutionRequest): Promise<SubmissionResult> {
    const token = await this.submitCode(request);
    
    // Poll for result
    let result = await this.getSubmission(token);
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds max wait

    while (result.status.id <= 2 && attempts < maxAttempts) {
      // Status 1: In Queue, 2: Processing
      await new Promise(resolve => setTimeout(resolve, 500));
      result = await this.getSubmission(token);
      attempts++;
    }

    return result;
  }

  /**
   * Get language ID from language name
   */
  getLanguageId(language: string): number {
    const normalized = language.toLowerCase();
    return LANGUAGE_IDS[normalized as keyof typeof LANGUAGE_IDS] || LANGUAGE_IDS.javascript;
  }
}
