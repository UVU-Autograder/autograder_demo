import { NextRequest, NextResponse } from 'next/server';
import { getAssignmentById } from '@/lib/assignments';
import { judge0Service } from '@/lib/services/judge0.service';
import type { TestResult } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { assignmentId, code } = await request.json();

    const assignment = getAssignmentById(assignmentId);
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    const languageId = judge0Service.getLanguageId(assignment.language);
    const testResults: TestResult[] = [];

    // Run only visible test cases for "Run Code"
    const visibleTests = assignment.testCases.filter(tc => !tc.isHidden);

    for (const testCase of visibleTests) {
      try {
        const result = await judge0Service.executeCode({
          source_code: code,
          language_id: languageId,
          stdin: testCase.input,
          expected_output: testCase.expectedOutput,
        });

        const actualOutput = (result.stdout || '').trim();
        const expectedOutput = testCase.expectedOutput.trim();
        const passed = actualOutput === expectedOutput && result.status.id === 3;

        testResults.push({
          testCaseId: testCase.id,
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.stdout,
          error: result.stderr || result.compile_output,
          executionTime: result.time,
          memory: result.memory,
        });
      } catch (error) {
        testResults.push({
          testCaseId: testCase.id,
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

    return NextResponse.json({ testResults });
  } catch (error) {
    console.error('Execute API error:', error);
    return NextResponse.json(
      { error: 'Failed to execute code' },
      { status: 500 }
    );
  }
}
