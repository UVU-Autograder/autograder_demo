"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, FileEdit, Trash2, Eye, Settings, BarChart3, BookOpen, Code2, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAssignments } from "@/lib/assignments";
import { DIFFICULTY_LEVELS } from "@/lib/constants";
import { toast } from "sonner";

export default function InstructorDashboard() {
  const assignments = getAssignments();
  const [activeTab, setActiveTab] = useState("assignments");

  const stats = [
    {
      title: "Total Assignments",
      value: assignments.length,
      icon: BookOpen,
      gradient: "from-blue-600 to-blue-500",
      shadow: "shadow-blue-500/50",
    },
    {
      title: "Total Test Cases",
      value: assignments.reduce((sum, a) => sum + a.testCases.length, 0),
      icon: Code2,
      gradient: "from-purple-600 to-purple-500",
      shadow: "shadow-purple-500/50",
    },
    {
      title: "Active Students",
      value: "24",
      icon: BarChart3,
      gradient: "from-green-600 to-green-500",
      shadow: "shadow-green-500/50",
    },
    {
      title: "Submissions",
      value: "156",
      icon: FileEdit,
      gradient: "from-orange-600 to-orange-500",
      shadow: "shadow-orange-500/50",
    },
  ];

  const handleDelete = (id: string) => {
    toast.error("Delete functionality coming soon");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
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
              <div className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 p-2 shadow-lg shadow-blue-500/50">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Instructor Dashboard
                </h1>
                <p className="text-sm text-slate-600">Manage assignments and settings</p>
              </div>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`rounded-lg bg-gradient-to-br ${stat.gradient} p-3 shadow-lg ${stat.shadow}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="testcases">Test Cases</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Assignments</h2>
                <p className="text-slate-600">Manage your course assignments</p>
              </div>
              <Link href="/instructor/assignments/new">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Assignment
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {assignments.map((assignment, index) => {
                const difficulty = DIFFICULTY_LEVELS[assignment.difficulty];
                return (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl">{assignment.title}</CardTitle>
                              <Badge className={`${difficulty.bgColor} ${difficulty.textColor} ${difficulty.borderColor} border`}>
                                {difficulty.label}
                              </Badge>
                              <Badge variant="outline">{assignment.language}</Badge>
                            </div>
                            <CardDescription>{assignment.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/assignment/${assignment.id}`}>
                              <Button variant="ghost" size="icon" title="View">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/instructor/assignments/${assignment.id}/edit`}>
                              <Button variant="ghost" size="icon" title="Edit">
                                <FileEdit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Delete"
                              onClick={() => handleDelete(assignment.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-6 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            <span>{assignment.testCases.length} test cases</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            <span>
                              {Object.values(assignment.rubric).reduce((sum, r) => sum + r.points, 0)} points
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="testcases">
            <Card>
              <CardHeader>
                <CardTitle>Test Case Management</CardTitle>
                <CardDescription>Advanced test case configuration coming soon</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Code2 className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600">This feature is under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI Grading Settings</CardTitle>
                <CardDescription>Configure AI model and feedback preferences</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Settings className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                <p className="text-slate-600">This feature is under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Student Analytics</CardTitle>
                <CardDescription>View submission statistics and performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                <p className="text-slate-600">This feature is under development</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
