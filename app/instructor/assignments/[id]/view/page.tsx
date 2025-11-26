"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Edit, 
  Play,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  FileCode,
  Award,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import { assignmentStorage, type Assignment } from "@/lib/services/assignment-storage.service";
import { CodeEditor } from "@/components/code-editor";

export default function ViewAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [showTestCases, setShowTestCases] = useState(true);
  const [showRubric, setShowRubric] = useState(true);

  const difficultyColors = {
    intro: "bg-blue-100 text-blue-700 border-blue-300",
    intermediate: "bg-purple-100 text-purple-700 border-purple-300",
    advanced: "bg-red-100 text-red-700 border-red-300",
  };

  useEffect(() => {
    const assignmentData = assignmentStorage.getById(params.id as string);
    if (assignmentData) {
      setAssignment(assignmentData);
    } else {
      router.push("/instructor");
    }
  }, [params.id, router]);

  if (!assignment) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  const visibleTestCases = assignment.testCases.filter(tc => !tc.hidden);
  const hiddenTestCases = assignment.testCases.filter(tc => tc.hidden);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/instructor">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{assignment.title}</h1>
                <p className="text-sm text-slate-600">View Assignment Details</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/instructor/assignments/${assignment.id}/edit`}>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Link href={`/instructor/assignments/${assignment.id}/grade`}>
                <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Play className="h-4 w-4" />
                  Grade Submission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{assignment.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${difficultyColors[assignment.difficulty]} border`}>
                        {assignment.difficulty}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Code2 className="h-3 w-3" />
                        {assignment.language}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Award className="h-3 w-3" />
                        {assignment.maxScore} pts
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <FileCode className="h-3 w-3" />
                        {assignment.testCases.length} test cases
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Description</h3>
                  <div className="prose prose-sm max-w-none text-slate-600">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-3">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="ml-4">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children }) => <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono text-slate-800">{children}</code>,
                        h3: ({ children }) => <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-sm font-semibold text-slate-800 mt-3 mb-2">{children}</h4>,
                      }}
                    >
                      {assignment.description}
                    </ReactMarkdown>
                  </div>
                </div>

                <div className="border-t border-slate-200/50 pt-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Instructions</h3>
                  <div className="prose prose-sm max-w-none text-slate-600">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => null, // Skip first H1 as it duplicates the title
                        h2: ({ children }) => <h2 className="text-base font-bold text-slate-900 mt-4 mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold text-slate-800 mt-3 mb-2">{children}</h3>,
                        p: ({ children }) => <p className="mb-3">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="ml-4">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children }) => <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono text-slate-800">{children}</code>,
                      }}
                    >
                      {assignment.instructions}
                    </ReactMarkdown>
                  </div>
                </div>

                {assignment.starterCode && (
                  <div className="border-t border-slate-200/50 pt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Starter Code</h3>
                    <div className="rounded-lg overflow-hidden border border-slate-200">
                      <CodeEditor
                        value={assignment.starterCode}
                        language={assignment.language}
                        onChange={() => {}}
                        readOnly={true}
                        height="300px"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Cases Card */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
              <CardHeader className="cursor-pointer" onClick={() => setShowTestCases(!showTestCases)}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-blue-600" />
                      Test Cases
                      <Badge variant="outline" className="ml-2">
                        {assignment.testCases.length}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {visibleTestCases.length} visible, {hiddenTestCases.length} hidden
                    </CardDescription>
                  </div>
                  {showTestCases ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </CardHeader>
              {showTestCases && (
                <CardContent>
                  <Tabs defaultValue="visible" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="visible" className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Visible ({visibleTestCases.length})
                      </TabsTrigger>
                      <TabsTrigger value="hidden" className="gap-2">
                        <XCircle className="h-4 w-4" />
                        Hidden ({hiddenTestCases.length})
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="visible" className="space-y-3">
                      {visibleTestCases.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-8">No visible test cases</p>
                      ) : (
                        visibleTestCases.map((testCase, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 rounded-lg bg-gradient-to-br from-green-50/50 to-emerald-50/30 border border-green-200/50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold text-slate-700">
                                Test Case #{idx + 1}
                              </span>
                              <Badge variant="outline" className="text-xs bg-white">
                                Visible
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-slate-700">Input:</span>
                                <code className="ml-2 px-2 py-1 bg-white rounded font-mono text-slate-800 inline-block">
                                  {testCase.input}
                                </code>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Expected Output:</span>
                                <code className="ml-2 px-2 py-1 bg-white rounded font-mono text-slate-800 inline-block">
                                  {testCase.expectedOutput}
                                </code>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </TabsContent>
                    
                    <TabsContent value="hidden" className="space-y-3">
                      {hiddenTestCases.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-8">No hidden test cases</p>
                      ) : (
                        hiddenTestCases.map((testCase, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 rounded-lg bg-gradient-to-br from-slate-50/50 to-slate-100/30 border border-slate-200/50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold text-slate-700">
                                Test Case #{visibleTestCases.length + idx + 1}
                              </span>
                              <Badge variant="outline" className="text-xs bg-white">
                                Hidden
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-slate-700">Input:</span>
                                <code className="ml-2 px-2 py-1 bg-white rounded font-mono text-slate-800 inline-block">
                                  {testCase.input}
                                </code>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Expected Output:</span>
                                <code className="ml-2 px-2 py-1 bg-white rounded font-mono text-slate-800 inline-block">
                                  {testCase.expectedOutput}
                                </code>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Metadata Card */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Assignment Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-slate-700">Created:</span>
                  <p className="text-slate-600 mt-1">
                    {new Date(assignment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Last Updated:</span>
                  <p className="text-slate-600 mt-1">
                    {new Date(assignment.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {assignment.dueDate && (
                  <div>
                    <span className="font-semibold text-slate-700">Due Date:</span>
                    <p className="text-slate-600 mt-1">
                      {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
                {assignment.createdBy && (
                  <div>
                    <span className="font-semibold text-slate-700">Created By:</span>
                    <p className="text-slate-600 mt-1">{assignment.createdBy}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Rubric Card */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
              <CardHeader className="cursor-pointer" onClick={() => setShowRubric(!showRubric)}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Award className="h-5 w-5 text-purple-600" />
                      Grading Rubric
                    </CardTitle>
                    <CardDescription>
                      Total: {assignment.maxScore} points
                    </CardDescription>
                  </div>
                  {showRubric ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </CardHeader>
              {showRubric && (
                <CardContent className="space-y-4">
                  {Object.entries(assignment.rubric).map(([key, value]) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-lg bg-gradient-to-br from-purple-50/50 to-blue-50/30 border border-purple-200/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-800 capitalize text-sm">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <Badge variant="outline" className="bg-white">
                          {value.points} pts
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600">{value.description}</p>
                    </motion.div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/instructor/assignments/${assignment.id}/edit`} className="block">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Assignment
                  </Button>
                </Link>
                <Link href={`/instructor/assignments/${assignment.id}/grade`} className="block">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Play className="h-4 w-4" />
                    Grade Submission
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
