import { judge0Service } from './judge0.service';
import { openRouterService } from './openrouter.service';
import type { Assignment, TestResult, GradingResult } from '../types';

export class GradingService {
  async gradeSubmission(
    assignment: Assignment,
    code: string
  ): Promise<GradingResult> {
    // Step 1: Run all test cases
    const testResults = await this.runTestCases(assignment, code);

    // Calculate test score
    const passedCount = testResults.filter((t) => t.passed).length;
    const totalCount = testResults.length;
    const testPassRate = passedCount / totalCount;

    // Step 2: Get AI evaluation
    const aiEvaluation = await openRouterService.evaluateCode({
      code,
      language: assignment.language,
      assignmentTitle: assignment.title,
      assignmentDescription: assignment.description,
      testResults: {
        passed: passedCount,
        total: totalCount,
        failures: testResults
          .filter((t) => !t.passed)
          .map((t) => `Test ${t.testCaseId}: Expected "${t.expectedOutput}" but got "${t.actualOutput}"`),
      },
      rubric: assignment.rubric,
    });

    // Step 3: Calculate final score
    // Test score is weighted from AI rubric correctness score
    const testScore = aiEvaluation.rubricScores.correctness;
    
    const finalScore =
      aiEvaluation.rubricScores.correctness +
      aiEvaluation.rubricScores.codeQuality +
      aiEvaluation.rubricScores.efficiency +
      aiEvaluation.rubricScores.edgeCases;

    const maxScore =
      assignment.rubric.correctness.points +
      assignment.rubric.codeQuality.points +
      assignment.rubric.efficiency.points +
      assignment.rubric.edgeCases.points;

    return {
      assignment,
      code,
      testResults,
      passedCount,
      totalCount,
      testScore,
      aiEvaluation,
      finalScore: Math.round(finalScore),
      maxScore,
      gradedAt: new Date(),
    };
  }

  private async runTestCases(
    assignment: Assignment,
    code: string
  ): Promise<TestResult[]> {
    const languageId = judge0Service.getLanguageId(assignment.language);
    const results: TestResult[] = [];

    for (const testCase of assignment.testCases) {
      try {
        const result = await judge0Service.executeCode({
          source_code: code,
          language_id: languageId,
          stdin: testCase.input,
          expected_output: testCase.expectedOutput,
        });

        const actualOutput = (result.stdout || '').trim();
        const expectedOutput = testCase.expectedOutput.trim();
        const passed = actualOutput === expectedOutput && result.status.id === 3; // Status 3 = Accepted

        results.push({
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
        results.push({
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

    return results;
  }
}

export const gradingService = new GradingService();
