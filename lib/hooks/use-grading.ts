import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { Assignment } from "@/lib/services/assignment-storage.service";
import type { TestResult } from "@/lib/types";
import type { AISettings, AIFeedback } from "@/lib/types/grading.types";

interface UseGradingProps {
  assignment: Assignment | null;
  code: string;
}

export function useGrading({ assignment, code }: UseGradingProps) {
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);

  const runTests = useCallback(async () => {
    if (!code || !assignment) {
      toast.error("Please upload code first");
      return;
    }

    setIsRunningTests(true);
    try {
      const response = await fetch("/api/instructor/run-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: assignment.language,
          testCases: assignment.testCases,
        }),
      });

      const data = await response.json();

      if (!data.testResults || !Array.isArray(data.testResults)) {
        toast.error("Invalid test results received");
        return;
      }

      setTestResults(data.testResults);

      const passed = data.testResults.filter((tr: TestResult) => tr.passed).length;
      const total = data.testResults.length;

      toast.success(`Tests completed: ${passed}/${total} passed`);
    } catch (error) {
      toast.error("Failed to run tests");
      console.error(error);
    } finally {
      setIsRunningTests(false);
    }
  }, [code, assignment]);

  const generateFeedback = useCallback(async (aiSettings: AISettings) => {
    if (!code || !assignment) {
      toast.error("Please upload code first");
      return;
    }

    setIsGeneratingFeedback(true);
    try {
      const response = await fetch("/api/instructor/grade-individual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId: assignment.id,
          // include full assignment metadata so server routes that can't access client localStorage
          // can still use the assignment details to build prompts and rubric
          assignment: {
            title: assignment.title,
            language: assignment.language,
            description: assignment.description,
            instructions: assignment.instructions,
            testCases: assignment.testCases,
            rubric: assignment.rubric,
            maxScore: assignment.maxScore,
            tags: assignment.tags,
            isSample: assignment.isSample,
          },
          code,
          settings: aiSettings,
          testResults: testResults.length > 0 ? testResults : undefined,
        }),
      });

      const data = await response.json();

      if (data.error) {
        const errorMsg = data.details
          ? `${data.error}\n${data.details}`
          : data.error;
        toast.error(errorMsg, { duration: 8000 });
        return;
      }

      setAiFeedback(data);
      toast.success("AI feedback generated successfully!");
    } catch (error) {
      toast.error("Failed to generate feedback");
      console.error(error);
    } finally {
      setIsGeneratingFeedback(false);
    }
  }, [code, assignment, testResults]);

  return {
    isRunningTests,
    isGeneratingFeedback,
    testResults,
    aiFeedback,
    runTests,
    generateFeedback,
  };
}
