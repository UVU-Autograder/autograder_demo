import axios from 'axios';

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.RAPIDAPI_KEY || '';

interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
}

interface ExecutionRequest {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

class CodeExecutionService {
  private languageMap: { [key: string]: number } = {
    python: 71,      // Python 3.8.1
    java: 62,        // Java (OpenJDK 13.0.1)
    cpp: 54,         // C++ (GCC 9.2.0)
    javascript: 63,  // JavaScript (Node.js 12.14.0)
    typescript: 74,  // TypeScript (3.7.4)
  };

  getLanguageId(language: string): number {
    const langId = this.languageMap[language.toLowerCase()];
    if (!langId) {
      throw new Error(`Unsupported language: ${language}`);
    }
    return langId;
  }

  async executeCode(request: ExecutionRequest): Promise<ExecutionResult> {
    try {
      // Create submission
      const submissionResponse = await axios.post(
        `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
        {
          source_code: request.source_code,
          language_id: request.language_id,
          stdin: request.stdin || '',
          expected_output: request.expected_output || null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': JUDGE0_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );

      const result = submissionResponse.data;

      return {
        stdout: result.stdout || null,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: {
          id: result.status?.id || 0,
          description: result.status?.description || 'Unknown',
        },
        time: result.time || null,
        memory: result.memory || null,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Code execution failed: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async executeBatch(requests: ExecutionRequest[]): Promise<ExecutionResult[]> {
    const promises = requests.map((req) => this.executeCode(req));
    return Promise.all(promises);
  }
}

export const codeExecutionService = new CodeExecutionService();
