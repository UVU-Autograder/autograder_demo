"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    } else {
      toast.error("Assignment not found");
      router.push("/instructor");
    }
  }, [params.id, router]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40">
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
                  <Badge className={DIFFICULTY_COLORS[assignment.difficulty]}>
                    {assignment.difficulty === "intro"
                      ? "Intro Level"
                      : assignment.difficulty === "intermediate"
                      ? "Intermediate"
                      : "Advanced"}
                  </Badge>
                  <Badge variant="outline" className="font-mono">
                    {assignment.language}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mt-1">Individual Grading Interface</p>
              </div>
            </div>
            <Button
              onClick={runTests}
              disabled={!code || isRunningTests}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              {isRunningTests ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run Tests
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT PANEL - Code Editor */}
          <div className="space-y-4">
            <CodeEditorPanel
              code={code}
              fileName={fileName}
              language={assignment.language}
              onCodeChange={setCode}
              onFileDrop={handleFileDrop}
              onRemoveFile={handleRemoveFile}
            />
          </div>

          {/* RIGHT PANEL - Grading & Feedback */}
          <div className="space-y-4">
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
      </div>
    </div>
  );
}
