'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { SUPPORTED_LANGUAGES, DEFAULT_RUBRIC } from '@/lib/constants';
import type { TestCase } from '@/lib/types';
import { assignmentStorage } from '@/lib/services/assignment-storage.service';
import { CodeEditor } from '@/components/code-editor';

export default function EditAssignment() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [language, setLanguage] = useState('python');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [starterCode, setStarterCode] = useState('');
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [rubric, setRubric] = useState(DEFAULT_RUBRIC);

  useEffect(() => {
    function loadAssignment() {
      try {
        const assignment = assignmentStorage.getById(params.id as string);
        if (!assignment) {
          toast.error('Assignment not found');
          router.push('/instructor');
          return;
        }
        
        setTitle(assignment.title);
        setDifficulty((assignment as any).difficulty || 'medium');
        setLanguage(assignment.language);
        setDescription(assignment.description);
        setInstructions(assignment.instructions);
        setStarterCode(assignment.starterCode || '');
        setTestCases(assignment.testCases.map((tc, idx) => ({
          id: idx,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isHidden: tc.hidden
        })));
        setRubric(assignment.rubric as any);
      } catch (error) {
        toast.error('Failed to load assignment');
        router.push('/instructor');
      } finally {
        setLoading(false);
      }
    }
    
    loadAssignment();
  }, [params.id, router]);

  const addTestCase = () => {
    const newId = Math.max(0, ...testCases.map(tc => tc.id)) + 1;
    setTestCases([...testCases, { id: newId, input: '', expectedOutput: '', isHidden: false }]);
  };

  const removeTestCase = (id: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id));
    } else {
      toast.error('Must have at least one test case');
    }
  };

  const updateTestCase = (id: number, field: keyof TestCase, value: any) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const handleSave = () => {
    if (!title || !description || !instructions) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (testCases.some(tc => !tc.input || !tc.expectedOutput)) {
      toast.error('Please complete all test cases');
      return;
    }

    try {
      const existingAssignment = assignmentStorage.getById(params.id as string);
      if (!existingAssignment) {
        toast.error('Assignment not found');
        return;
      }

      // Calculate max score from rubric
      const maxScore = Object.values(rubric).reduce((sum, item) => sum + item.points, 0);

      // Map difficulty
      const difficultyMap: Record<string, 'intro' | 'intermediate' | 'advanced'> = {
        'easy': 'intro',
        'medium': 'intermediate',
        'hard': 'advanced'
      };

      const updatedAssignment = {
        ...existingAssignment,
        title,
        description,
        difficulty: difficultyMap[difficulty] || 'intro',
        language,
        instructions,
        starterCode,
        testCases: testCases.map(tc => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          hidden: tc.isHidden
        })),
        rubric,
        maxScore,
        updatedAt: new Date()
      };

      assignmentStorage.update(params.id as string, updatedAssignment);
      
      toast.success('Assignment updated successfully!', {
        description: 'Changes have been saved'
      });

      setTimeout(() => {
        router.push('/instructor');
      }, 1000);
    } catch (error) {
      toast.error('Failed to update assignment');
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) {
      try {
        assignmentStorage.delete(params.id as string);
        toast.success('Assignment deleted');
        setTimeout(() => {
          router.push('/instructor');
        }, 500);
      } catch (error) {
        toast.error('Failed to delete assignment');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading assignment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/instructor">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Edit Assignment</h1>
                <p className="text-sm text-slate-600">Modify existing assignment details</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="destructive" size="sm" onClick={handleDelete} className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
              <Link href={`/instructor/assignments/${params.id}/view`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={handleSave}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="code">Code & Instructions</TabsTrigger>
            <TabsTrigger value="testing">Test Cases & Rubric</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    Basic Information
                  </CardTitle>
                  <CardDescription>Core details about the assignment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Assignment Title *</label>
                    <input
                      id="title"
                      type="text"
                      placeholder="e.g., Two Sum, Binary Search"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Difficulty *</label>
                      <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Programming Language *</label>
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        {Object.entries(SUPPORTED_LANGUAGES).map(([key, lang]) => (
                          <option key={key} value={key}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Description *</label>
                    <textarea
                      id="description"
                      placeholder="Describe the problem students need to solve..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Code & Instructions Tab */}
          <TabsContent value="code" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    Instructions
                  </CardTitle>
                  <CardDescription>Detailed implementation guidance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Implementation Instructions *</label>
                    <textarea
                      id="instructions"
                      placeholder="Explain what function/method students should implement..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Starter Code (Optional)</label>
                    <CodeEditor
                      value={starterCode}
                      onChange={setStarterCode}
                      language={language}
                      height="300px"
                      placeholder={`# Starter code for ${language}\n# Students will build upon this template\n\ndef solution():\n    # TODO: Implement your solution here\n    pass`}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Test Cases Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      Test Cases
                    </CardTitle>
                    <CardDescription>Define inputs and expected outputs</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={addTestCase}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md shadow-blue-500/30"
                  >
                    <Plus className="h-4 w-4" />
                    Add Test Case
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {testCases.map((testCase, index) => (
                  <motion.div
                    key={testCase.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/60">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold shadow-md">
                              {index + 1}
                            </div>
                            <span className="font-semibold text-slate-800">Test Case {index + 1}</span>
                            {testCase.isHidden && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Hidden</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 text-sm text-slate-700">
                              <input
                                type="checkbox"
                                checked={testCase.isHidden}
                                onChange={(e) => updateTestCase(testCase.id, 'isHidden', e.target.checked)}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="font-medium">Hidden</span>
                            </label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTestCase(testCase.id)}
                              disabled={testCases.length === 1}
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Input</label>
                          <textarea
                            id={`input-${testCase.id}`}
                            placeholder="Input for this test case..."
                            value={testCase.input}
                            onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none font-mono text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Expected Output</label>
                          <textarea
                            id={`output-${testCase.id}`}
                            placeholder="Expected output for this test case..."
                            value={testCase.expectedOutput}
                            onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none font-mono text-sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Rubric */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      Grading Rubric
                    </CardTitle>
                    <CardDescription>Configure point distribution for evaluation</CardDescription>
                  </div>
                  <Badge className="text-base px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md">
                    Total: {Object.values(rubric).reduce((sum, r) => sum + r.points, 0)} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(rubric).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-white/80 to-slate-50/60 rounded-lg border border-slate-200/50 hover:shadow-md transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-slate-600">{value.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        className="w-20 px-3 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-center font-semibold"
                        value={value.points}
                        min="0"
                        max="100"
                        onChange={(e) => setRubric({
                          ...rubric,
                          [key]: { ...value, points: parseInt(e.target.value) || 0 }
                        })}
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
