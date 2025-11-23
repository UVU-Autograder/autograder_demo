"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { SUPPORTED_LANGUAGES, DEFAULT_RUBRIC } from "@/lib/constants";

export default function NewAssignment() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");

  // Form state
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [language, setLanguage] = useState("python");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [testCases, setTestCases] = useState([
    { input: "", expectedOutput: "", hidden: false },
  ]);
  const [rubric, setRubric] = useState(DEFAULT_RUBRIC);

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
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (testCases.some(tc => !tc.input.trim() || !tc.expectedOutput.trim())) {
      toast.error("All test cases must have input and output");
      return;
    }

    // In a real app, this would save to a database
    toast.success("Assignment created successfully!");
    router.push("/instructor");
  };

  const totalPoints = Object.values(rubric).reduce((sum, r) => sum + r.points, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Create New Assignment
                </h1>
                <p className="text-sm text-muted-foreground">Design a new coding challenge</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Button variant="outline" onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Assignment
              </Button>
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="code">Code & Instructions</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
                <CardDescription>Basic information about the assignment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Fibonacci Sequence"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")}
                      className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief description of the problem..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>Detailed problem description for students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Write detailed instructions here..."
                  rows={10}
                  className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Starter Code</CardTitle>
                <CardDescription>Initial code template for students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <textarea
                  value={starterCode}
                  onChange={(e) => setStarterCode(e.target.value)}
                  placeholder="def fibonacci(n):\n    # Write your code here\n    pass"
                  rows={10}
                  className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Test Cases</CardTitle>
                    <CardDescription>Define input and expected output pairs</CardDescription>
                  </div>
                  <Button onClick={addTestCase} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Test Case
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {testCases.map((testCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Test Case {index + 1}</span>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={testCase.hidden}
                            onChange={(e) => updateTestCase(index, "hidden", e.target.checked)}
                            className="rounded"
                          />
                          Hidden
                        </label>
                      </div>
                      {testCases.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTestCase(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Input</label>
                        <textarea
                          value={testCase.input}
                          onChange={(e) => updateTestCase(index, "input", e.target.value)}
                          placeholder="5"
                          rows={3}
                          className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expected Output</label>
                        <textarea
                          value={testCase.expectedOutput}
                          onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                          placeholder="5"
                          rows={3}
                          className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Grading Rubric</CardTitle>
                    <CardDescription>Configure point distribution</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-base">
                    Total: {totalPoints} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(rubric).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={value.points}
                        onChange={(e) => updateRubricPoints(key, parseInt(e.target.value) || 0)}
                        min="0"
                        max="100"
                        className="w-20 px-3 py-1 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      />
                      <span className="text-sm text-muted-foreground">pts</span>
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
