import { useState } from 'react';
import type { GradingResult, TestResult } from '@/lib/types';

interface UseGradingOptions {
  onSuccess?: (result: GradingResult) => void;
  onError?: (error: Error) => void;
}

export function useGrading(options?: UseGradingOptions) {
  const [isGrading, setIsGrading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runCode = async (assignmentId: string, code: string) => {
    setIsRunning(true);
    setError(null);
    setTestResults([]);
    setGradingResult(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignmentId, code }),
      });

      if (!response.ok) {
        throw new Error('Failed to run code');
      }

      const data = await response.json();
      setTestResults(data.testResults);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async (assignmentId: string, code: string) => {
    setIsGrading(true);
    setError(null);
    setGradingResult(null);

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignmentId, code }),
      });

      if (!response.ok) {
        throw new Error('Failed to grade submission');
      }

      const data = await response.json();
      setGradingResult(data);
      setTestResults(data.testResults);
      options?.onSuccess?.(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsGrading(false);
    }
  };

  const reset = () => {
    setTestResults([]);
    setGradingResult(null);
    setError(null);
    setIsRunning(false);
    setIsGrading(false);
  };

  return {
    isGrading,
    isRunning,
    testResults,
    gradingResult,
    error,
    runCode,
    submitCode,
    reset,
  };
}
