"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, FileEdit, Trash2, Copy, BarChart3, BookOpen, Code2, ArrowLeft, Search, MoreVertical, Download, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FancyGradeButton } from "@/components/ui/fancy-grade-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { assignmentStorage, Assignment } from "@/lib/services/assignment-storage.service";
import { sampleAssignments } from "@/lib/data/sample-assignments";
import ReactMarkdown from "react-markdown";

export default function InstructorDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Auto-load sample assignments on first visit
    assignmentStorage.initializeWithSamples(sampleAssignments);
    loadAssignments();
  }, []);

  const loadAssignments = () => {
    setAssignments(assignmentStorage.getAll());
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      assignmentStorage.delete(id);
      loadAssignments();
      toast.success("Assignment deleted");
    }
  };

  const handleDuplicate = (assignment: Assignment) => {
    const duplicate = assignmentStorage.create({
      ...assignment,
      title: `${assignment.title} (Copy)`,
    });
    loadAssignments();
    toast.success(`Created copy: "${duplicate.title}"`);
  };

  const filteredAssignments = assignments.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTestCases = assignments.reduce((sum, a) => sum + a.testCases.length, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-purple-50/40">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="rounded-lg bg-blue-100/50 backdrop-blur p-2 border-2 border-blue-400/30\">
                <Code2 className="h-6 w-6 text-blue-600" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Assignments
                </h1>
                <p className="text-sm text-slate-600">{assignments.length} total</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <Link href="/instructor/assignments/new">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Assignment
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">Total Assignments</p>
                  <p className="text-4xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{assignments.length}</p>
                </div>
                <div className="rounded-xl bg-blue-100/50 backdrop-blur p-4 border-2 border-blue-400/30">
                  <BookOpen className="h-7 w-7 text-blue-600" strokeWidth={1.5} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">Total Test Cases</p>
                  <p className="text-4xl font-bold bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{totalTestCases}</p>
                </div>
                <div className="rounded-xl bg-purple-100/50 backdrop-blur p-4 border-2 border-purple-400/30">
                  <Code2 className="h-7 w-7 text-purple-600" strokeWidth={1.5} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">Total Points</p>
                  <p className="text-4xl font-bold bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent">{assignments.reduce((sum, a) => sum + (a.maxScore || 0), 0)}</p>
                </div>
                <div className="rounded-xl bg-green-100/50 backdrop-blur p-4 border-2 border-green-400/30">
                  <BarChart3 className="h-7 w-7 text-green-600" strokeWidth={1.5} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search */}
        <Card className="mb-6 border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-lg shadow-slate-200/50">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </CardContent>
        </Card>

        {/* Assignments Grid */}
        {filteredAssignments.length === 0 ? (
          <Card className="text-center py-12 border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50">
            <CardContent>
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                {searchQuery ? "No assignments match your search" : "No assignments yet"}
              </h3>
              <p className="text-slate-500 mb-6">
                {searchQuery ? "Try a different search term" : "Create your first assignment to get started"}
              </p>
              <Link href="/instructor/assignments/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Left: Assignment Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                              {assignment.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {assignment.isSample && (
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                  Sample
                                </Badge>
                              )}
                              <Badge variant="outline" className="font-mono text-xs">
                                {assignment.language}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {assignment.testCases.length} test cases
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {assignment.maxScore || 0} points
                              </Badge>
                              {assignment.tags && assignment.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Description with Markdown */}
                        <div className="prose prose-sm max-w-none text-slate-600 mb-4">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                              code: ({ children }) => <code className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-xs font-mono">{children}</code>,
                            }}
                          >
                            {assignment.description}
                          </ReactMarkdown>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Created {new Date(assignment.createdAt).toLocaleDateString()}</span>
                          {assignment.dueDate && (
                            <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>

                      {/* Right: Action Buttons */}
                      <div className="flex flex-col gap-2 shrink-0">
                        <Link href={`/instructor/assignments/${assignment.id}/grade`}>
                          <FancyGradeButton size="sm" />
                        </Link>
                        
                        <Link href={`/assignment/${assignment.id}`}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-32 gap-2 border-slate-300 hover:bg-slate-50"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                        
                        <Link href={`/instructor/assignments/${assignment.id}/edit`}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-32 gap-2 border-slate-300 hover:bg-slate-50"
                          >
                            <FileEdit className="h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-32 gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                          onClick={() => handleDelete(assignment.id, assignment.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
