import { codeExecutionService } from './code-execution.factory';
import { openRouterService } from './openrouter.service';
import { codeAnalysisService } from './code-analysis.service';
import type { Assignment, TestResult, GradingResult, CodeRequirements } from '../types';

export class GradingService {
  async gradeSubmission(
    assignment: Assignment,
    code: string
  ): Promise<GradingResult> {
    // Step 1: Check code requirements (if specified)
    let codeAnalysisResult = null;
    if (assignment.codeRequirements && assignment.language.toLowerCase() === 'python') {
      codeAnalysisResult = codeAnalysisService.validateRequirements(
        code,
        assignment.codeRequirements
      );
    }

    // Step 2: Run all test cases
    const testResults = await this.runTestCases(assignment, code);

    // Calculate test score
    const passedCount = testResults.filter((t) => t.passed).length;
    const totalCount = testResults.length;
    const testPassRate = passedCount / totalCount;

    // Step 3: Get AI evaluation with code analysis context
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
      codeAnalysis: codeAnalysisResult ? {
        passed: codeAnalysisResult.passed,
        score: codeAnalysisResult.score,
        totalChecks: codeAnalysisResult.totalChecks,
        failures: codeAnalysisResult.checks
          .filter((c) => !c.passed)
          .map((c) => c.message),
      } : undefined,
    });

    // Step 4: Calculate final score
    // If code requirements failed critical checks, cap the score
    const requirementsPenalty = codeAnalysisResult && !codeAnalysisResult.passed ? 0.7 : 1.0;
    
    const testScore = aiEvaluation.rubricScores.correctness;
    
    const baseScore =
      aiEvaluation.rubricScores.correctness +
      aiEvaluation.rubricScores.codeQuality +
      aiEvaluation.rubricScores.efficiency +
      aiEvaluation.rubricScores.edgeCases;

    const finalScore = Math.round(baseScore * requirementsPenalty);

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
      aiEvaluation: {
        ...aiEvaluation,
        // Add code analysis feedback to suggestions
        suggestions: [
          ...aiEvaluation.suggestions,
          ...(codeAnalysisResult?.checks
            .filter((c) => !c.passed)
            .map((c) => c.message) || []),
        ],
        // Add code analysis passed checks to strengths
        strengths: [
          ...aiEvaluation.strengths,
          ...(codeAnalysisResult?.checks
            .filter((c) => c.passed)
            .slice(0, 3) // Only include top 3
            .map((c) => c.message.replace('✓ ', '')) || []),
        ],
      },
      finalScore,
      maxScore,
      gradedAt: new Date(),
    };
  }

  private async runTestCases(
    assignment: Assignment,
    code: string
  ): Promise<TestResult[]> {
    const languageId = codeExecutionService.getLanguageId(assignment.language);
    const results: TestResult[] = [];

    for (const testCase of assignment.testCases) {
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
