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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

  return (
    <div className="flex h-screen flex-col bg-slate-50">{/* Header */}
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
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
              {assignment.tags && assignment.tags.length > 0 && (
                <div className="flex gap-2">
                  {assignment.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
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
        <div className="w-1/2 overflow-y-auto border-r bg-white p-6">
          <div className="max-w-2xl">
            {/* Title Header */}
            <div className="mb-6 pb-4 border-b border-slate-200">
              <h1 className="text-3xl font-bold text-slate-900">{assignment.title}</h1>
            </div>

            <div className="prose prose-slate max-w-none mb-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => null, // Skip first H1 as it duplicates the title
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-slate-900">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-semibold mt-5 mb-2 text-slate-800">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed text-slate-700">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-slate-700">{children}</li>,
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return <code className="block bg-slate-100 text-slate-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono whitespace-pre border border-slate-300">{children}</code>;
                    }
                    return <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm font-mono">{children}</code>;
                  },
                  pre: ({ children }) => <div className="bg-slate-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono whitespace-pre border border-slate-300">{children}</div>,
                  strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  table: ({ children }) => <div className="overflow-x-auto mb-4"><table className="min-w-full border-2 border-slate-400">{children}</table></div>,
                  thead: ({ children }) => <thead className="bg-slate-100 border-b-2 border-slate-400">{children}</thead>,
                  tbody: ({ children }) => <tbody className="bg-white">{children}</tbody>,
                  tr: ({ children }) => <tr>{children}</tr>,
                  th: ({ children }) => <th className="px-4 py-2 text-left text-xs font-bold text-slate-800 uppercase tracking-wider border border-slate-400 bg-slate-100">{children}</th>,
                  td: ({ children }) => <td className="px-4 py-2 text-sm text-slate-700 border border-slate-300">{children}</td>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4">{children}</blockquote>,
                }}
              >
                {assignment.instructions}
              </ReactMarkdown>
            </div>

            <h3 className="text-lg font-semibold mb-3 mt-8">Test Cases</h3>
            <div className="space-y-4">
              {assignment.testCases.filter(tc => !tc.isHidden).map((testCase) => (
                <Card key={testCase.id}>
                  <CardHeader>
                    <CardTitle className="text-sm">Test Case {testCase.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-600 mb-1">Input:</p>
                      <pre className="bg-slate-50 p-2 rounded text-xs overflow-x-auto font-mono border">
                        {testCase.input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600 mb-1">Expected Output:</p>
                      <pre className="bg-slate-50 p-2 rounded text-xs overflow-x-auto font-mono border">
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
                  <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded border">
                    <div>
                      <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-xs text-slate-600">{value.description}</p>
                    </div>
                    <Badge variant="outline">{value.points} pts</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor and Results */}
        <div className="w-1/2 flex flex-col bg-slate-50">
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage={assignment.language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="light"
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
            <div className="h-1/3 border-t bg-white overflow-y-auto">
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
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock className="h-3 w-3" />
                              <span>{result.executionTime}s</span>
                            </div>
                          )}
                          {!result.passed && (
                            <>
                              <div>
                                <p className="font-semibold text-slate-700 mb-1">Expected:</p>
                                <pre className="bg-slate-50 p-2 rounded overflow-x-auto font-mono border text-xs">
                                  {result.expectedOutput}
                                </pre>
                              </div>
                              <div>
                                <p className="font-semibold text-slate-700 mb-1">Got:</p>
                                <pre className="bg-slate-50 p-2 rounded overflow-x-auto font-mono border text-xs">
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
                    <Card className="mb-4 bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>Final Score</span>
                          <span className="text-2xl text-blue-600">
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
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {gradingResult.aiEvaluation.feedback}
                        </p>
                      </CardContent>
                    </Card>

                    {gradingResult.aiEvaluation.strengths.length > 0 && (
                      <Card className="mb-4 border-green-200 bg-green-50">
                        <CardHeader>
                          <CardTitle className="text-base text-green-800">Strengths</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                            {gradingResult.aiEvaluation.strengths.map((strength, i) => (
                              <li key={i}>{strength}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {gradingResult.aiEvaluation.suggestions.length > 0 && (
                      <Card className="border-orange-200 bg-orange-50">
                        <CardHeader>
                          <CardTitle className="text-base text-orange-800">Suggestions for Improvement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm text-orange-700">
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
