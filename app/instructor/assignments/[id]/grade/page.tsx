"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { assignmentStorage, type Assignment } from "@/lib/services/assignment-storage.service";
import { useGrading } from "@/lib/hooks/use-grading";
import { useCodeUpload } from "@/lib/hooks/use-code-upload";
import { DEFAULT_AI_SETTINGS } from "@/lib/types/grading.types";
import type { AISettings } from "@/lib/types/grading.types";
import { formatFeedbackForClipboard, copyToClipboard } from "@/lib/utils/feedback.utils";
import { CodeEditorPanel } from "@/components/grading/code-editor-panel";
import { AssignmentDetailsCard } from "@/components/grading/assignment-details-card";
import { AIGradingPanel } from "@/components/grading/ai-grading-panel";
import { AIFeedbackDisplay } from "@/components/grading/ai-feedback-display";

const DIFFICULTY_COLORS = {
  intro: "bg-blue-100 text-blue-700 border-blue-300",
  intermediate: "bg-purple-100 text-purple-700 border-purple-300",
  advanced: "bg-red-100 text-red-700 border-red-300",
} as const;

export default function GradeIndividualPage() {
  const params = useParams();
  const router = useRouter();
  
  // State
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [customComments, setCustomComments] = useState("");
  const [aiSettings, setAiSettings] = useState<AISettings>(DEFAULT_AI_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);

  // Custom hooks
  const {
    isRunningTests,
    isGeneratingFeedback,
    testResults,
    aiFeedback,
    runTests,
    generateFeedback,
  } = useGrading({ assignment, code });

  const { handleFileDrop, handleRemoveFile } = useCodeUpload({
    onCodeChange: setCode,
    onFileNameChange: setFileName,
  });

  // Load assignment
  useEffect(() => {
    const assignmentData = assignmentStorage.getById(params.id as string);
    if (assignmentData) {
      setAssignment(assignmentData);
      // Load starter code right here
      if (assignmentData.starterCode) {
        setCode(assignmentData.starterCode);
      }
    } else {
      toast.error("Assignment not found");
      router.push("/instructor");
    }
  }, [params.id, router]);

  // Drag handler for resizable panels
  const handleMouseDown = () => setIsDragging(true);
  
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const container = document.getElementById('resizable-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
    if (newWidth > 25 && newWidth < 75) {
      setLeftWidth(newWidth);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, leftWidth]);

  // Handlers
  const handleCopyFeedback = async () => {
    if (!aiFeedback) return;

    try {
      const text = formatFeedbackForClipboard(aiFeedback, customComments);
      await copyToClipboard(text);
      toast.success("Feedback copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy feedback");
    }
  };

  const handleExportPDF = () => {
    toast.info("PDF export coming soon!");
    // TODO: Implement PDF export
  };

  // Loading state
  if (!assignment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-purple-50/40">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/instructor">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-800">{assignment.title}</h1>
                  {assignment.tags && assignment.tags.length > 0 && (
                    <>
                      {assignment.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </>
                  )}
                  <Badge variant="outline" className="font-mono">
                    {assignment.language}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mt-1">Individual Grading Interface</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Resizable Layout */}
      <div className="h-[calc(100vh-80px)] overflow-hidden">
        <div id="resizable-container" className="flex h-full">
          {/* LEFT PANEL - Assignment Info & AI Grading */}
          <div 
            className="overflow-y-auto px-6 py-6 bg-white/50 backdrop-blur-sm"
            style={{ width: `${leftWidth}%` }}
          >
            <div className="max-w-4xl space-y-6">
              {/* Assignment Details with Full Instructions */}
              <AssignmentDetailsCard
                assignment={assignment}
                showTestCases={showTestCases}
                onToggleTestCases={() => setShowTestCases(!showTestCases)}
              />

              <AIGradingPanel
                aiSettings={aiSettings}
                onSettingsChange={setAiSettings}
                isGeneratingFeedback={isGeneratingFeedback}
                onGenerateFeedback={() => generateFeedback(aiSettings)}
                showAdvancedSettings={showAdvancedSettings}
                onToggleAdvancedSettings={() => setShowAdvancedSettings(!showAdvancedSettings)}
              />

              <AIFeedbackDisplay
                feedback={aiFeedback}
                customComments={customComments}
                onCustomCommentsChange={setCustomComments}
                onCopyFeedback={handleCopyFeedback}
                onExportPDF={handleExportPDF}
              />
            </div>
          </div>

          {/* DRAGGABLE DIVIDER */}
          <div 
            className="w-1 bg-slate-300 hover:bg-blue-500 cursor-col-resize transition-colors relative group"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-12 bg-slate-400 group-hover:bg-blue-500 rounded-full shadow-lg flex items-center justify-center transition-colors">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>

          {/* RIGHT PANEL - Code Editor, Console & Test Results */}
          <div 
            className="overflow-y-auto px-6 py-6"
            style={{ width: `${100 - leftWidth}%` }}
          >
            <div className="max-w-5xl space-y-6">
              {/* Code Editor */}
              <CodeEditorPanel
                code={code}
                fileName={fileName}
                language={assignment.language}
                onCodeChange={setCode}
                onFileDrop={handleFileDrop}
                onRemoveFile={handleRemoveFile}
              />
              
              {/* Run Button */}
              <div className="flex justify-center">
                <Button
                  onClick={runTests}
                  disabled={!code || isRunningTests}
                  size="lg"
                  className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg font-semibold"
                >
                  {isRunningTests ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Run Tests
                    </>
                  )}
                </Button>
              </div>

              {/* Console Output */}
              {testResults.length > 0 && testResults.some(t => t.actualOutput || t.error) && (
                <Card className="border-slate-200/60 bg-slate-900 shadow-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-mono text-green-400 flex items-center gap-2">
                      <span>$</span>
                      <span>Console Output</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="bg-black/50 rounded-lg p-4 max-h-64 overflow-y-auto font-mono text-sm">
                      {testResults.map((result, idx) => (
                        <div key={idx} className="mb-4 last:mb-0">
                          <div className="text-cyan-400 mb-1">
                            # Test Case {result.testCaseId}
                          </div>
                          {result.actualOutput && (
                            <div className="text-green-300 whitespace-pre-wrap">
                              {result.actualOutput}
                            </div>
                          )}
                          {result.error && (
                            <div className="text-red-400 whitespace-pre-wrap mt-1">
                              Error: {result.error}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Test Cases with Results */}
              <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Test Cases</span>
                    {testResults.length > 0 && (
                      <span className="text-sm font-normal">
                        <span className="text-green-600 font-semibold">
                          {testResults.filter(t => t.passed).length} Passed
                        </span>
                        <span className="mx-2 text-slate-400">/</span>
                        <span className="text-red-600 font-semibold">
                          {testResults.filter(t => !t.passed).length} Failed
                        </span>
                        <span className="mx-2 text-slate-400">/</span>
                        <span className="text-slate-600">
                          {testResults.length} Total
                        </span>
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assignment.testCases.map((testCase, idx) => {
                      const result = testResults.find(r => r.testCaseId === idx + 1);
                      const isPassed = result?.passed;
                      const isFailed = result && !result.passed;
                      
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isPassed
                              ? 'bg-green-50 border-green-400 shadow-sm'
                              : isFailed
                              ? 'bg-red-50 border-red-400 shadow-sm'
                              : 'bg-slate-50 border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-sm">
                              Test Case #{idx + 1}
                              {testCase.hidden && (
                                <span className="ml-2 text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded">
                                  Hidden
                                </span>
                              )}
                            </span>
                            {result && (
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                                  isPassed
                                    ? 'bg-green-600 text-white'
                                    : 'bg-red-600 text-white'
                                }`}
                              >
                                {isPassed ? (
                                  <>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    PASSED
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    FAILED
                                  </>
                                )}
                              </span>
                            )}
                          </div>
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="font-medium text-slate-700">Input:</span>
                              <code className="ml-2 px-2 py-1 bg-white rounded text-slate-800">
                                {testCase.input}
                              </code>
                            </div>
                            <div>
                              <span className="font-medium text-slate-700">Expected Output:</span>
                              <code className="ml-2 px-2 py-1 bg-white rounded text-slate-800">
                                {testCase.expectedOutput}
                              </code>
                            </div>
                            {isFailed && result && (
                              <div className="mt-2 pt-2 border-t border-red-200">
                                <span className="font-medium text-red-700">Actual Output:</span>
                                <code className="ml-2 px-2 py-1 bg-red-100 rounded text-red-900">
                                  {result.actualOutput || 'null'}
                                </code>
                              </div>
                            )}
                          </div>
                          {result?.executionTime && (
                            <div className="mt-2 text-xs text-slate-600">
                              ⚡ {result.executionTime}s
                              {result.memory && ` • ${result.memory} KB`}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
