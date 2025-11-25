import { NextRequest, NextResponse } from 'next/server';
import { codeExecutionService } from '@/lib/services/code-execution.service';

interface TestCase {
  input: string;
  expectedOutput: string;
  hidden: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { code, language, testCases } = await req.json();

    if (!code || !language || !testCases) {
      return NextResponse.json(
        { error: 'Missing required fields: code, language, testCases' },
        { status: 400 }
      );
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: 'testCases must be a non-empty array' },
        { status: 400 }
      );
    }

    const languageId = codeExecutionService.getLanguageId(language);
    const testResults = [];

    // Execute code against each test case
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      
      try {
        const result = await codeExecutionService.executeCode({
          source_code: code,
          language_id: languageId,
          stdin: testCase.input,
          expected_output: testCase.expectedOutput,
        });

        const actualOutput = (result.stdout || '').trim();
        const expectedOutput = testCase.expectedOutput.trim();
        const passed = actualOutput === expectedOutput && result.status.id === 3; // Status 3 = Accepted

        testResults.push({
          testCaseId: i + 1,
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.stdout,
          error: result.stderr || result.compile_output || null,
          executionTime: result.time,
          memory: result.memory,
        });
      } catch (error) {
        testResults.push({
          testCaseId: i + 1,
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: null,
          error: error instanceof Error ? error.message : 'Execution failed',
          executionTime: null,
          memory: null,
        });
      }
    }

    return NextResponse.json({
      testResults,
      summary: {
        total: testResults.length,
        passed: testResults.filter(r => r.passed).length,
        failed: testResults.filter(r => !r.passed).length,
      }
    });
  } catch (error) {
    console.error('Error running tests:', error);
    return NextResponse.json(
      { error: 'Failed to execute tests', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
