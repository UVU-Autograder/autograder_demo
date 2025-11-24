"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Upload, FileText, Zap, Award, BarChart3, Clock, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
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
              <div className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 p-2 shadow-lg shadow-blue-500/50">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">UVU Autograder</h1>
                <p className="text-sm text-slate-600">Instructor Dashboard</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Link href="/instructor">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Manage Assignments
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">AI-Powered Code Grading</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Grade 100 Assignments in 10 Minutes
          </h2>
          <p className="text-xl text-slate-600 mb-4">
            Intelligent autograding with rubric-based AI feedback. Focus on teaching while we handle the grading.
          </p>
          <p className="text-lg text-slate-500">
            Upload submissions, get detailed feedback on correctness, code quality, and efficiency—instantly.
          </p>
        </motion.div>

        {/* Value Props */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <Zap className="h-10 w-10 text-blue-600 mb-3" />
              <CardTitle>10x Faster Grading</CardTitle>
              <CardDescription>
                Bulk grade 100+ submissions in minutes with AI-powered evaluation
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CheckCircle2 className="h-10 w-10 text-green-600 mb-3" />
              <CardTitle>Consistent Feedback</CardTitle>
              <CardDescription>
                Every student gets detailed, fair evaluation based on your rubric
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <Award className="h-10 w-10 text-purple-600 mb-3" />
              <CardTitle>Beyond Test Cases</CardTitle>
              <CardDescription>
                AI evaluates code quality, efficiency, and style—not just correctness
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">Quick Actions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/instructor/assignments/new">
                <Card className="h-full cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all">
                  <CardHeader>
                    <Plus className="h-12 w-12 text-blue-600 mb-3" />
                    <CardTitle className="text-2xl">Create Assignment</CardTitle>
                    <CardDescription className="text-base">
                      Set up a new coding assignment with test cases and rubrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Define test cases and evaluation criteria</li>
                      <li>• Configure rubrics for comprehensive grading</li>
                      <li>• Support for Python, Java, C++, JavaScript</li>
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/bulk">
                <Card className="h-full cursor-pointer hover:shadow-lg hover:border-green-500 transition-all">
                  <CardHeader>
                    <Upload className="h-12 w-12 text-green-600 mb-3" />
                    <CardTitle className="text-2xl">Grade Submissions</CardTitle>
                    <CardDescription className="text-base">
                      Upload individual files or bulk CSV for batch grading
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Single submission testing and grading</li>
                      <li>• Bulk CSV upload (student_id, code)</li>
                      <li>• ZIP upload support (coming soon)</li>
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 border">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900 mb-2">Instant</div>
              <div className="text-slate-600">Feedback for students</div>
            </div>
            <div>
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900 mb-2">4 Metrics</div>
              <div className="text-slate-600">Correctness, quality, efficiency, edge cases</div>
            </div>
            <div>
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900 mb-2">AI-Powered</div>
              <div className="text-slate-600">Intelligent code evaluation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p className="font-semibold">UVU Computer Science Department</p>
          <p className="mt-2">AI Autograder Prototype</p>
          <p className="mt-2 text-xs text-slate-500">Powered by Judge0 & OpenRouter AI</p>
        </div>
      </footer>
    </div>
  );
}
