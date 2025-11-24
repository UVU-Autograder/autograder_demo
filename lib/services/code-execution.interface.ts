/**
 * Abstract interface for code execution services
 * This allows easy switching between Judge0, Piston, or any other provider
 */

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

/**
 * Code execution service interface
 * Implement this for any new execution provider (Judge0, Piston, etc.)
 */
export interface ICodeExecutionService {
  /**
   * Submit code and wait for result (blocking)
   */
  executeCode(request: ExecutionRequest): Promise<SubmissionResult>;

  /**
   * Submit code for execution (non-blocking)
   */
  submitCode(request: ExecutionRequest): Promise<string>;

  /**
   * Get submission result by token
   */
  getSubmission(token: string): Promise<SubmissionResult>;

  /**
   * Get language ID from language name
   */
  getLanguageId(language: string): number;
}
