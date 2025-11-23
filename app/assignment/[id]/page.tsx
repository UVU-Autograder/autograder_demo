'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Editor from '@monaco-editor/react';
import { ArrowLeft, Play, Send, Check, X, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import type { Assignment, GradingResult, TestResult } from '@/lib/types';
import { TestResultListSkeleton, GradingFeedbackSkeleton } from '@/components/skeletons/grading-skeleton';

export default function AssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);

  useEffect(() => {
    async function fetchAssignment() {
      const res = await fetch(`/api/assignments/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setAssignment(data);
        setCode(data.starterCode);
      } else {
        router.push('/');
      }
    }
    fetchAssignment();
  }, [params.id, router]);

  const handleRunCode = async () => {
    if (!assignment) return;
    
    toast.info('Running code against test cases...');
    setIsRunning(true);
    setTestResults([]);
    setGradingResult(null);

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId: assignment.id,
          code,
        }),
      });

      const data = await res.json();
      setTestResults(data.testResults);
      
      const passedCount = data.testResults.filter((r: TestResult) => r.passed).length;
      if (passedCount === data.testResults.length) {
        toast.success(`All ${passedCount} test cases passed! 🎉`);
      } else {
        toast.warning(`${passedCount}/${data.testResults.length} test cases passed`);
      }
    } catch (error) {
      console.error('Error running code:', error);
      toast.error('Failed to run code. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!assignment) return;
    
    toast.loading('Submitting for grading...', { id: 'submit' });
    setIsSubmitting(true);
    setGradingResult(null);

    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId: assignment.id,
          code,
        }),
      });

      const data = await res.json();
      setGradingResult(data);
      setTestResults(data.testResults);
      
      toast.success(`Grading complete! Score: ${data.finalScore}/${data.maxScore}`, { id: 'submit' });
    } catch (error) {
      console.error('Error submitting code:', error);
      toast.error('Failed to submit. Please try again.', { id: 'submit' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!assignment) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const difficultyColors = {
    easy: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    hard: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{assignment.title}</h1>
              <Badge className={difficultyColors[assignment.difficulty]}>
                {assignment.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              variant="outline"
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run Code
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Submit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 overflow-y-auto border-r bg-background p-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Problem Description</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{assignment.description}</p>

            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{assignment.instructions}</p>

            <h3 className="text-lg font-semibold mb-3">Test Cases</h3>
            <div className="space-y-4">
              {assignment.testCases.filter(tc => !tc.isHidden).map((testCase) => (
                <Card key={testCase.id}>
                  <CardHeader>
                    <CardTitle className="text-sm">Test Case {testCase.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Input:</p>
                      <pre className="bg-muted/50 p-2 rounded text-xs overflow-x-auto font-mono">
                        {testCase.input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Expected Output:</p>
                      <pre className="bg-muted/50 p-2 rounded text-xs overflow-x-auto font-mono">
                        {testCase.expectedOutput}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Grading Rubric</h3>
              <div className="space-y-2">
                {Object.entries(assignment.rubric).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <div>
                      <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-xs text-muted-foreground">{value.description}</p>
                    </div>
                    <Badge variant="outline">{value.points} pts</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor and Results */}
        <div className="w-1/2 flex flex-col bg-background">
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage={assignment.language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Results Panel */}
          {(testResults.length > 0 || gradingResult) && (
            <div className="h-1/3 border-t bg-card overflow-y-auto">
              <Tabs defaultValue="results" className="h-full flex flex-col">
                <TabsList className="w-full justify-start rounded-none border-b px-4">
                  <TabsTrigger value="results">Test Results</TabsTrigger>
                  {gradingResult && <TabsTrigger value="feedback">AI Feedback</TabsTrigger>}
                </TabsList>

                <TabsContent value="results" className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {testResults.map((result) => (
                      <Card key={result.testCaseId}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm flex items-center gap-2">
                              {result.passed ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <X className="h-4 w-4 text-red-600" />
                              )}
                              Test Case {result.testCaseId}
                            </CardTitle>
                            <Badge variant={result.passed ? "default" : "destructive"}>
                              {result.passed ? "Passed" : "Failed"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs">
                          {result.executionTime && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{result.executionTime}s</span>
                            </div>
                          )}
                          {!result.passed && (
                            <>
                              <div>
                                <p className="font-semibold text-muted-foreground mb-1">Expected:</p>
                                <pre className="bg-muted/50 p-2 rounded overflow-x-auto font-mono">
                                  {result.expectedOutput}
                                </pre>
                              </div>
                              <div>
                                <p className="font-semibold text-muted-foreground mb-1">Got:</p>
                                <pre className="bg-muted/50 p-2 rounded overflow-x-auto font-mono">
                                  {result.actualOutput || result.error}
                                </pre>
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {gradingResult && (
                  <TabsContent value="feedback" className="flex-1 overflow-y-auto p-4">
                    <Card className="mb-4 bg-blue-500/10 border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>Final Score</span>
                          <span className="text-2xl text-blue-400">
                            {gradingResult.finalScore}/{gradingResult.maxScore}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          {gradingResult.passedCount}/{gradingResult.totalCount} test cases passed
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Card className="mb-4">
                      <CardHeader>
                        <CardTitle className="text-base">Rubric Scores</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {Object.entries(gradingResult.aiEvaluation.rubricScores).map(([key, score]) => {
                          const maxPoints = assignment.rubric[key as keyof typeof assignment.rubric]?.points || 0;
                          return (
                            <div key={key} className="flex justify-between items-center">
                              <span className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="font-semibold">{score}/{maxPoints}</span>
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>

                    <Card className="mb-4">
                      <CardHeader>
                        <CardTitle className="text-base">Feedback</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {gradingResult.aiEvaluation.feedback}
                        </p>
                      </CardContent>
                    </Card>

                    {gradingResult.aiEvaluation.strengths.length > 0 && (
                      <Card className="mb-4 border-green-500/30 bg-green-500/10">
                        <CardHeader>
                          <CardTitle className="text-base text-green-400">Strengths</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm text-green-400/90">
                            {gradingResult.aiEvaluation.strengths.map((strength, i) => (
                              <li key={i}>{strength}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {gradingResult.aiEvaluation.suggestions.length > 0 && (
                      <Card className="border-orange-500/30 bg-orange-500/10">
                        <CardHeader>
                          <CardTitle className="text-base text-orange-400">Suggestions for Improvement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm text-orange-400/90">
                            {gradingResult.aiEvaluation.suggestions.map((suggestion, i) => (
                              <li key={i}>{suggestion}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                )}
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
