'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Trash2, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { SUPPORTED_LANGUAGES, DEFAULT_RUBRIC } from '@/lib/constants';
import type { Assignment, TestCase } from '@/lib/types';
import { assignmentStorage } from '@/lib/services/assignment-storage.service';

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
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
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
              <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Core details about the assignment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Assignment Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Two Sum, Binary Search"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-white/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty *</Label>
                      <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                        <SelectTrigger id="difficulty" className="bg-white/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-sm font-medium">Programming Language *</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language" className="bg-white/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(SUPPORTED_LANGUAGES).map(([key, lang]) => (
                            <SelectItem key={key} value={key}>{lang.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the problem students need to solve..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="bg-white/50"
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
              <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                  <CardDescription>Detailed implementation guidance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="instructions" className="text-sm font-medium">Implementation Instructions *</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Explain what function/method students should implement..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows={5}
                      className="bg-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="starter-code" className="text-sm font-medium">Starter Code (Optional)</Label>
                    <Textarea
                      id="starter-code"
                      placeholder="def function_name():\n    # Your code here\n    pass"
                      value={starterCode}
                      onChange={(e) => setStarterCode(e.target.value)}
                      rows={10}
                      className="font-mono text-sm bg-slate-900 text-slate-100 placeholder:text-slate-500"
                    />
                    <p className="text-xs text-slate-600">
                      Provide a template or function signature for students to start with
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Test Cases Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Test Cases</CardTitle>
                    <CardDescription>Define inputs and expected outputs</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={addTestCase}
                    className="gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                    <Card className="bg-linear-to-br from-slate-50 to-blue-50/30 border-slate-200/60">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">Test {index + 1}</Badge>
                            {testCase.isHidden && (
                              <Badge variant="secondary" className="text-xs">Hidden</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Label htmlFor={`hidden-${testCase.id}`} className="text-xs text-slate-600">
                                Hidden
                              </Label>
                              <Switch
                                id={`hidden-${testCase.id}`}
                                checked={testCase.isHidden}
                                onCheckedChange={(checked) => updateTestCase(testCase.id, 'isHidden', checked)}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTestCase(testCase.id)}
                              disabled={testCases.length === 1}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor={`input-${testCase.id}`} className="text-xs font-medium">Input</Label>
                          <Textarea
                            id={`input-${testCase.id}`}
                            placeholder="Input for this test case..."
                            value={testCase.input}
                            onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                            rows={2}
                            className="font-mono text-xs bg-white/70"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`output-${testCase.id}`} className="text-xs font-medium">Expected Output</Label>
                          <Textarea
                            id={`output-${testCase.id}`}
                            placeholder="Expected output for this test case..."
                            value={testCase.expectedOutput}
                            onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                            rows={2}
                            className="font-mono text-xs bg-white/70"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Rubric */}
            <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <CardTitle>Grading Rubric</CardTitle>
                <CardDescription>Configure point distribution for evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(rubric).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-linear-to-r from-slate-50 to-blue-50/30 rounded-lg border border-slate-200/50"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-slate-600">{value.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        className="w-20 text-center font-semibold bg-white/70"
                        value={value.points}
                        onChange={(e) => setRubric({
                          ...rubric,
                          [key]: { ...value, points: parseInt(e.target.value) || 0 }
                        })}
                      />
                      <span className="text-sm text-slate-600">pts</span>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg text-white">
                    <span className="font-semibold text-lg">Total Points</span>
                    <span className="text-2xl font-bold">
                      {Object.values(rubric).reduce((sum, r) => sum + r.points, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
