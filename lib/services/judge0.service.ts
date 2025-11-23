import axios from 'axios';

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'http://localhost:2358';

export interface SubmissionResult {
  stdout: string | null;
  stderr: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
  compile_output: string | null;
}

export interface ExecutionRequest {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit?: number;
  memory_limit?: number;
}

// Language IDs for Judge0
export const LANGUAGE_IDS = {
  javascript: 63,  // Node.js
  python: 71,      // Python 3
  java: 62,        // Java
  cpp: 54,         // C++ (GCC 9.2.0)
  c: 50,           // C (GCC 9.2.0)
  typescript: 74,  // TypeScript
} as const;

export class Judge0Service {
  private apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || JUDGE0_API_URL;
  }

  /**
   * Submit code for execution
   */
  async submitCode(request: ExecutionRequest): Promise<string> {
    try {
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
      });

      return response.data.token;
    } catch (error) {
      console.error('Judge0 submission error:', error);
      throw new Error('Failed to submit code to Judge0');
    }
  }

  /**
   * Get submission result
   */
  async getSubmission(token: string): Promise<SubmissionResult> {
    try {
      const response = await axios.get(`${this.apiUrl}/submissions/${token}`, {
        params: { base64_encoded: true },
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
    } catch (error) {
      console.error('Judge0 get submission error:', error);
      throw new Error('Failed to get submission result from Judge0');
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

export const judge0Service = new Judge0Service();
