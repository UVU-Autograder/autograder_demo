'use client';

import { useState } from 'react';
import Link from 'next/link';
import Papa from 'papaparse';
import { ArrowLeft, Upload, Download, Loader2, CheckCircle2, XCircle, FileArchive, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { submissionService } from '@/lib/services/submission.service';
import type { GradingResult, Submission } from '@/lib/types';

interface BulkSubmission {
  studentId: string;
  studentName?: string;
  fileName: string;
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
  const [fileType, setFileType] = useState<'csv' | 'zip' | null>(null);
  const [assignmentId, setAssignmentId] = useState<string>('');
  const [submissions, setSubmissions] = useState<BulkResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    const fileName = uploadedFile.name.toLowerCase();
    
    if (fileName.endsWith('.csv')) {
      setFile(uploadedFile);
      setFileType('csv');
      parseCSV(uploadedFile);
    } else if (fileName.endsWith('.zip')) {
      if (!assignmentId.trim()) {
        toast.error('Please enter an Assignment ID before uploading ZIP file');
        event.target.value = ''; // Reset file input
        return;
      }
      setFile(uploadedFile);
      setFileType('zip');
      await parseZIP(uploadedFile);
    } else {
      toast.error('Please upload a CSV or ZIP file');
      event.target.value = '';
    }
  };

  const parseZIP = async (file: File) => {
    setIsParsing(true);
    toast.info('Extracting submissions from ZIP file...');

    try {
      // For now, assume Python files. In production, get language from assignment
      const result = await submissionService.parseZipFile(file, assignmentId.trim(), 'python');
      
      const bulkResults: BulkResult[] = result.submissions.map((submission) => ({
        studentId: submission.studentId,
        studentName: submission.studentId,
        fileName: submission.filename,
        assignmentId: submission.assignmentId,
        code: submission.code,
        status: 'pending' as const,
      }));

      setSubmissions(bulkResults);
      
      if (result.failed > 0) {
        toast.warning(
          `Loaded ${result.successful} of ${result.total} submissions. ${result.failed} failed (check console for details).`
        );
        console.error('ZIP parsing errors:', result.errors);
      } else {
        toast.success(`Successfully loaded ${result.successful} submissions from ZIP`);
      }
    } catch (error) {
      console.error('ZIP parse error:', error);
      toast.error('Failed to parse ZIP file. Please check the format.');
      setFile(null);
      setFileType(null);
    } finally {
      setIsParsing(false);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse<{ studentName?: string; studentId?: string; assignmentId: string; code: string }>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const bulkResults: BulkResult[] = results.data.map((row) => ({
          studentId: row.studentId || row.studentName || 'unknown',
          studentName: row.studentName || row.studentId,
          fileName: 'from-csv',
          assignmentId: row.assignmentId,
          code: row.code,
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
        'Student ID': s.studentId,
        'Student Name': s.studentName || s.studentId,
        'File Name': s.fileName,
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-purple-50/40">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm">
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
        <Card className="mb-8 border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Upload Submissions</CardTitle>
            <CardDescription>
              Upload CSV file with student data or ZIP file with student code submissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Assignment ID input for ZIP uploads */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Assignment ID {fileType === 'zip' && <span className="text-red-600">*</span>}
              </label>
              <input
                type="text"
                value={assignmentId}
                onChange={(e) => setAssignmentId(e.target.value)}
                placeholder="e.g., fizzbuzz, two-sum, recursion-lab"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isParsing || isProcessing}
              />
              <p className="mt-1 text-xs text-slate-500">
                Required for ZIP uploads. For CSV, this can be left empty if your CSV has assignmentId column.
              </p>
            </div>

            {/* File upload area */}
            <div className="flex items-center gap-4">
              <label className="flex-1">
                <div className={`flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                  isParsing 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                }`}>
                  <div className="text-center">
                    {isParsing ? (
                      <>
                        <Loader2 className="mx-auto h-8 w-8 text-blue-600 animate-spin" />
                        <p className="mt-2 text-sm text-blue-600">Parsing file...</p>
                      </>
                    ) : file ? (
                      <>
                        {fileType === 'zip' ? (
                          <FileArchive className="mx-auto h-8 w-8 text-slate-600" />
                        ) : (
                          <File className="mx-auto h-8 w-8 text-slate-600" />
                        )}
                        <p className="mt-2 text-sm font-medium text-slate-700">{file.name}</p>
                        <p className="text-xs text-slate-500">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-600">
                          Click to upload CSV or ZIP file
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          CSV: studentId, assignmentId, code | ZIP: studentid_file.py
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".csv,.zip"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isParsing || isProcessing}
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
          <Card className="mb-8 border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50">
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
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-lg shadow-slate-200/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">{submissions.length}</p>
                  <p className="text-sm text-slate-600 font-medium mt-1">Total</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-300/60 bg-linear-to-br from-green-50/80 to-green-100/60 backdrop-blur-xl shadow-lg shadow-green-200/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{completedCount}</p>
                  <p className="text-sm text-green-700 font-medium mt-1">Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-300/60 bg-linear-to-br from-red-50/80 to-red-100/60 backdrop-blur-xl shadow-lg shadow-red-200/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">{failedCount}</p>
                  <p className="text-sm text-red-700 font-medium mt-1">Failed</p>
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
                      <th className="px-4 py-3 text-left text-sm font-semibold">Student ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">File Name</th>
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
                        <td className="px-4 py-3 text-sm font-mono">{submission.studentId}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate" title={submission.fileName}>
                          {submission.fileName}
                        </td>
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

        {/* Format Help */}
        {submissions.length === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CSV Format */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <File className="h-5 w-5" />
                  CSV Format Example
                </CardTitle>
                <CardDescription>Upload CSV with student data and code</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-xs text-slate-900 overflow-x-auto font-mono">
{`studentId,assignmentId,code
u1234567,fizzbuzz,"def fizzbuzz(n):
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
    return result"
u7654321,fizzbuzz,"def fizzbuzz(n):
    return ['FizzBuzz' if i%15==0 else 'Fizz' if i%3==0 else 'Buzz' if i%5==0 else str(i) for i in range(1,n+1)]"`}
                </pre>
                <p className="mt-3 text-xs text-slate-600">
                  <strong>Required columns:</strong> studentId (or studentName), assignmentId, code
                </p>
              </CardContent>
            </Card>

            {/* ZIP Format */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <FileArchive className="h-5 w-5" />
                  ZIP Format Example
                </CardTitle>
                <CardDescription>Upload ZIP with individual student files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 font-mono text-xs text-slate-900">
                    <div className="text-blue-600">submissions.zip/</div>
                    <div className="ml-4">├── u1234567_fizzbuzz.py</div>
                    <div className="ml-4">├── u7654321_fizzbuzz.py</div>
                    <div className="ml-4">├── u9999999_fizzbuzz.py</div>
                    <div className="ml-4">└── u1111111_fizzbuzz.py</div>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>Filename patterns:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li><code className="bg-slate-100 px-1 rounded">studentid_assignment.py</code> - Recommended</li>
                      <li><code className="bg-slate-100 px-1 rounded">studentid.py</code> - Student ID only</li>
                      <li><code className="bg-slate-100 px-1 rounded">assignment_studentid.py</code> - Reversed</li>
                    </ul>
                    <p className="mt-2"><strong>Note:</strong> Enter Assignment ID above before uploading ZIP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
