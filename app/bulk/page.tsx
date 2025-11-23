'use client';

import { useState } from 'react';
import Link from 'next/link';
import Papa from 'papaparse';
import { ArrowLeft, Upload, Download, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import type { GradingResult } from '@/lib/types';

interface BulkSubmission {
  studentName: string;
  assignmentId: string;
  code: string;
}

interface BulkResult extends BulkSubmission {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: GradingResult;
  error?: string;
}

export default function BulkGradingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [submissions, setSubmissions] = useState<BulkResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      parseCSV(uploadedFile);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse<BulkSubmission>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const bulkResults: BulkResult[] = results.data.map((row) => ({
          ...row,
          status: 'pending' as const,
        }));
        setSubmissions(bulkResults);
        toast.success(`Loaded ${bulkResults.length} submissions from CSV`);
      },
      error: (error) => {
        console.error('CSV parse error:', error);
        toast.error('Failed to parse CSV file. Please check the format.');
      },
    });
  };

  const processSubmissions = async () => {
    toast.info(`Starting bulk grading for ${submissions.length} submissions...`);
    setIsProcessing(true);
    setProgress(0);

    for (let i = 0; i < submissions.length; i++) {
      const submission = submissions[i];
      
      // Update status to processing
      setSubmissions(prev => 
        prev.map((s, idx) => 
          idx === i ? { ...s, status: 'processing' as const } : s
        )
      );

      try {
        const res = await fetch('/api/grade', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assignmentId: submission.assignmentId,
            code: submission.code,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          setSubmissions(prev =>
            prev.map((s, idx) =>
              idx === i ? { ...s, status: 'completed' as const, result } : s
            )
          );
        } else {
          throw new Error('Grading failed');
        }
      } catch (error) {
        setSubmissions(prev =>
          prev.map((s, idx) =>
            idx === i
              ? {
                  ...s,
                  status: 'failed' as const,
                  error: error instanceof Error ? error.message : 'Unknown error',
                }
              : s
          )
        );
      }

      setProgress(((i + 1) / submissions.length) * 100);
    }

    setIsProcessing(false);
    
    const completedCount = submissions.filter(s => s.status === 'completed').length;
    const failedCount = submissions.filter(s => s.status === 'failed').length;
    
    if (failedCount === 0) {
      toast.success(`Bulk grading complete! All ${completedCount} submissions graded successfully. 🎉`);
    } else {
      toast.warning(`Bulk grading complete: ${completedCount} succeeded, ${failedCount} failed`);
    }
  };

  const exportResults = () => {
    const csvData = submissions
      .filter(s => s.status === 'completed' && s.result)
      .map(s => ({
        'Student Name': s.studentName,
        'Assignment ID': s.assignmentId,
        'Score': `${s.result!.finalScore}/${s.result!.maxScore}`,
        'Tests Passed': `${s.result!.passedCount}/${s.result!.totalCount}`,
        'Correctness': s.result!.aiEvaluation.rubricScores.correctness,
        'Code Quality': s.result!.aiEvaluation.rubricScores.codeQuality,
        'Efficiency': s.result!.aiEvaluation.rubricScores.efficiency,
        'Edge Cases': s.result!.aiEvaluation.rubricScores.edgeCases,
        'Feedback': s.result!.aiEvaluation.feedback.replace(/\n/g, ' '),
      }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `grading_results_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast.success(`Exported ${csvData.length} results to CSV file`);
  };

  const completedCount = submissions.filter(s => s.status === 'completed').length;
  const failedCount = submissions.filter(s => s.status === 'failed').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Bulk Grading</h1>
              <p className="text-sm text-slate-600">Upload CSV file with student submissions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Submissions</CardTitle>
            <CardDescription>
              CSV file should have columns: studentName, assignmentId, code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <label className="flex-1">
                <div className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors bg-slate-50">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-600">
                      {file ? file.name : 'Click to upload CSV file'}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </label>
            </div>

            {submissions.length > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  {submissions.length} submission{submissions.length !== 1 ? 's' : ''} loaded
                </p>
                <div className="flex gap-2">
                  {completedCount > 0 && (
                    <Button onClick={exportResults} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                  )}
                  <Button
                    onClick={processSubmissions}
                    disabled={isProcessing || submissions.length === 0}
                    size="sm"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Start Grading'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Bar */}
        {isProcessing && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing submissions...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        {(completedCount > 0 || failedCount > 0) && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{submissions.length}</p>
                  <p className="text-sm text-slate-600">Total</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                  <p className="text-sm text-green-700">Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{failedCount}</p>
                  <p className="text-sm text-red-700">Failed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Table */}
        {submissions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Grading Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Student</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Assignment</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Score</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Tests Passed</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Feedback Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission, idx) => (
                      <tr key={idx} className="border-b hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          {submission.status === 'completed' && (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          )}
                          {submission.status === 'failed' && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          {submission.status === 'processing' && (
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          )}
                          {submission.status === 'pending' && (
                            <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">{submission.studentName}</td>
                        <td className="px-4 py-3 text-sm font-mono">{submission.assignmentId}</td>
                        <td className="px-4 py-3 text-sm">
                          {submission.result ? (
                            <span className="font-semibold">
                              {submission.result.finalScore}/{submission.result.maxScore}
                            </span>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {submission.result ? (
                            `${submission.result.passedCount}/${submission.result.totalCount}`
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {submission.result ? (
                            <p className="max-w-md truncate text-slate-600">
                              {submission.result.aiEvaluation.feedback}
                            </p>
                          ) : submission.error ? (
                            <p className="text-red-600">{submission.error}</p>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CSV Format Help */}
        {submissions.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>CSV Format Example</CardTitle>
              <CardDescription>Your CSV file should follow this format:</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-slate-950 border p-4 text-sm text-slate-50 overflow-x-auto font-mono">
{`studentName,assignmentId,code
John Doe,fizzbuzz,"def fizzbuzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append('FizzBuzz')
        elif i % 3 == 0:
            result.append('Fizz')
        elif i % 5 == 0:
            result.append('Buzz')
        else:
            result.append(str(i))
    return result

if __name__ == '__main__':
    import sys
    n = int(input())
    result = fizzbuzz(n)
    for item in result:
        print(item)"
Jane Smith,two-sum,"def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

if __name__ == '__main__':
    import json
    data = input()
    parsed = json.loads(data)
    nums = parsed['nums']
    target = parsed['target']
    result = two_sum(nums, target)
    print(json.dumps(result))"`}
              </pre>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
