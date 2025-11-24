"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, FileEdit, Trash2, Copy, BarChart3, BookOpen, Code2, ArrowLeft, Search, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { assignmentStorage, Assignment } from "@/lib/services/assignment-storage.service";

export default function InstructorDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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

  const difficultyColors = {
    easy: "bg-green-100 text-green-700 border-green-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    hard: "bg-red-100 text-red-700 border-red-300",
  };

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
              <div className="rounded-lg bg-linear-to-br from-blue-600 to-blue-500 p-2 shadow-lg shadow-blue-500/50">
                <Code2 className="h-6 w-6 text-white" />
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
                <div className="rounded-xl bg-linear-to-br from-blue-600 to-blue-500 p-4 shadow-xl shadow-blue-500/30">
                  <BookOpen className="h-7 w-7 text-white" />
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
                <div className="rounded-xl bg-linear-to-br from-purple-600 to-purple-500 p-4 shadow-xl shadow-purple-500/30">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">Total Points</p>
                  <p className="text-4xl font-bold bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent">{assignments.reduce((sum, a) => sum + a.maxScore, 0)}</p>
                </div>
                <div className="rounded-xl bg-linear-to-br from-green-600 to-green-500 p-4 shadow-xl shadow-green-500/30">
                  <BarChart3 className="h-7 w-7 text-white" />
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
              <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-blue-400 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{assignment.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={difficultyColors[assignment.difficulty]}>
                            {assignment.difficulty}
                          </Badge>
                          <Badge variant="outline" className="font-mono text-xs">
                            {assignment.language}
                          </Badge>
                        </div>
                      </div>
                      <div className="relative group">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                        <div className="absolute right-0 top-8 hidden group-hover:block bg-white border rounded-lg shadow-lg py-1 w-40 z-10">
                          <button
                            onClick={() => handleDuplicate(assignment)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Copy className="h-3 w-3" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleDelete(assignment.id, assignment.title)}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {assignment.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span>{assignment.testCases.length} test cases</span>
                      <span>{assignment.maxScore} points</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Created {new Date(assignment.createdAt).toLocaleDateString()}
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
