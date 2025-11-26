"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Save, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { SUPPORTED_LANGUAGES, DEFAULT_RUBRIC } from "@/lib/constants";
import { CodeRequirementsEditor } from "@/components/code-requirements-editor";
import { CodeRequirements } from "@/lib/types";
import { assignmentStorage } from "@/lib/services/assignment-storage.service";
import { CodeEditor } from "@/components/code-editor";

export default function NewAssignment() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");

  // Form state
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<"intro" | "intermediate" | "advanced">("intro");
  const [language, setLanguage] = useState("python");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [testCases, setTestCases] = useState([
    { input: "", expectedOutput: "", hidden: false },
  ]);
  const [rubric, setRubric] = useState(DEFAULT_RUBRIC);
  const [codeRequirements, setCodeRequirements] = useState<CodeRequirements>({});
  const [expandedTestCase, setExpandedTestCase] = useState<number | null>(0);

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "", hidden: false }]);
  };

  const removeTestCase = (index: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter((_, i) => i !== index));
    }
  };

  const updateTestCase = (index: number, field: string, value: string | boolean) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const updateRubricPoints = (category: string, points: number) => {
    setRubric({
      ...rubric,
      [category]: {
        ...rubric[category as keyof typeof rubric],
        points,
      },
    });
  };

  const handleSave = () => {
    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title");
      setActiveTab("basic");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description");
      setActiveTab("basic");
      return;
    }
    if (testCases.some(tc => !tc.input.trim() || !tc.expectedOutput.trim())) {
      toast.error("All test cases must have input and output");
      setActiveTab("testing");
      return;
    }

    try {
      // Calculate max score from rubric
      const maxScore = Object.values(rubric).reduce((sum, r) => sum + r.points, 0);

      // Save assignment
      const assignment = assignmentStorage.create({
        title: title.trim(),
        description: description.trim(),
        language,
        instructions: instructions.trim(),
        starterCode: starterCode.trim() || undefined,
        testCases,
        rubric,
        codeRequirements,
        maxScore,
      } as any);

      toast.success(`Assignment "${assignment.title}" created successfully!`);
      
      // Redirect to instructor dashboard after short delay
      setTimeout(() => {
        router.push("/instructor");
      }, 500);
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.error("Failed to create assignment. Please try again.");
    }
  };

  const totalPoints = Object.values(rubric).reduce((sum, r) => sum + r.points, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Link href="/instructor">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Create New Assignment
                </h1>
                <p className="text-sm text-slate-600">Design a new coding challenge with AI-powered grading</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Button 
                onClick={handleSave} 
                className="gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30"
              >
                <Save className="h-4 w-4" />
                Save Assignment
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="code">Code & Instructions</TabsTrigger>
            <TabsTrigger value="requirements">Code Requirements</TabsTrigger>
            <TabsTrigger value="testing">Testing & Rubric</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  Assignment Details
                </CardTitle>
                <CardDescription>Basic information about the assignment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Fibonacci Sequence"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Difficulty Level</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as "intro" | "intermediate" | "advanced")}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="intro">Intro Level (Weeks 1-3)</option>
                      <option value="intermediate">Intermediate (Weeks 4-7)</option>
                      <option value="advanced">Advanced (Weeks 8+)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      {Object.entries(SUPPORTED_LANGUAGES).map(([key, lang]) => (
                        <option key={key} value={key}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief description of the problem..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  Instructions
                </CardTitle>
                <CardDescription>Detailed problem description for students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Write detailed instructions here..."
                  rows={10}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none font-mono text-sm"
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Starter Code
                </CardTitle>
                <CardDescription>Initial code template for students (optional)</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <CodeEditor
                  value={starterCode}
                  onChange={setStarterCode}
                  language={language}
                  height="300px"
                  placeholder={`# Starter code for ${language}\n# Students will build upon this template\n\ndef solution():\n    # TODO: Implement your solution here\n    pass`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6">
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  Code Analysis Requirements
                </CardTitle>
                <CardDescription>
                  Define what constructs, patterns, and style rules the code must follow.
                  These requirements will be automatically checked during grading.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeRequirementsEditor
                  requirements={codeRequirements}
                  onChange={setCodeRequirements}
                  language={language}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      Test Cases
                    </CardTitle>
                    <CardDescription>Define input and expected output pairs</CardDescription>
                  </div>
                  <Button onClick={addTestCase} size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/30">
                    <Plus className="h-4 w-4" />
                    Add Test Case
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {testCases.map((testCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative border border-slate-200 bg-linear-to-br from-white/80 to-slate-50/80 backdrop-blur rounded-xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all"
                  >
                    {/* Collapsible Header */}
                    <button
                      onClick={() => setExpandedTestCase(expandedTestCase === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 hover:bg-white/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white text-sm font-bold shadow-md">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <span className="font-semibold text-slate-800">Test Case {index + 1}</span>
                          {testCase.hidden && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Hidden</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {testCases.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTestCase(index);
                            }}
                            className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {expandedTestCase === index ? (
                          <ChevronUp className="h-5 w-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence>
                      {expandedTestCase === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-slate-200"
                        >
                          <div className="p-5 space-y-4 bg-white/30">
                            <label className="flex items-center gap-2 text-sm text-slate-700">
                              <input
                                type="checkbox"
                                checked={testCase.hidden}
                                onChange={(e) => updateTestCase(index, "hidden", e.target.checked)}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="font-medium">Hidden from students</span>
                            </label>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Input</label>
                                <textarea
                                  value={testCase.input}
                                  onChange={(e) => updateTestCase(index, "input", e.target.value)}
                                  placeholder="5"
                                  rows={3}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none font-mono text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Expected Output</label>
                                <textarea
                                  value={testCase.expectedOutput}
                                  onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                                  placeholder="5"
                                  rows={3}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none font-mono text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      Grading Rubric
                    </CardTitle>
                    <CardDescription>Configure point distribution</CardDescription>
                  </div>
                  <Badge className="text-base px-4 py-1.5 bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-md">
                    Total: {totalPoints} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(rubric).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-slate-200 bg-linear-to-r from-white/80 to-slate-50/60 backdrop-blur rounded-xl hover:shadow-md transition-all">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-sm text-slate-600">{value.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={value.points}
                        onChange={(e) => updateRubricPoints(key, parseInt(e.target.value) || 0)}
                        min="0"
                        max="100"
                        className="w-20 px-3 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-center font-semibold"
                      />
                      <span className="text-sm font-medium text-slate-600">pts</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
