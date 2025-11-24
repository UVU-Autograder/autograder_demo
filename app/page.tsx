"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Upload, FileText, Zap, Award, BarChart3, Clock, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
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
              <div className="rounded-xl bg-linear-to-br from-blue-600 to-purple-600 p-2.5 shadow-lg shadow-blue-500/30">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">UVU Autograder</h1>
                <p className="text-sm text-slate-600">AI-Powered Code Grading</p>
              </div>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-200/60 mb-6 shadow-sm">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-semibold">AI-Powered Code Grading</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Fast, Fair, and Scalable Grading for Every Class
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
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">10x Faster Grading</CardTitle>
              <CardDescription className="text-base">
                Bulk grade 100+ submissions in minutes with AI-powered evaluation
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Consistent Feedback</CardTitle>
              <CardDescription className="text-base">
                Every student gets detailed, fair evaluation based on your rubric
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Beyond Test Cases</CardTitle>
              <CardDescription className="text-base">
                AI evaluates code quality, efficiency, and style—not just correctness
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/instructor/assignments/new">
                <Card className="h-full cursor-pointer border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-blue-400 transition-all duration-300">
                  <CardHeader>
                    <div className="h-14 w-14 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                      <Plus className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">Create Assignment</CardTitle>
                    <CardDescription className="text-base">
                      Set up a new coding assignment with test cases and rubrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        Define test cases and evaluation criteria
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        Configure rubrics for comprehensive grading
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        Support for Python, Java, C++, JavaScript
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/instructor">
                <Card className="h-full cursor-pointer border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-purple-400 transition-all duration-300">
                  <CardHeader>
                    <div className="h-14 w-14 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                      <FileText className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">Manage Assignments</CardTitle>
                    <CardDescription className="text-base">
                      View, edit, and organize all your coding assignments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                        Browse all assignments
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                        Duplicate and customize templates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                        Track assignment statistics
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/bulk">
                <Card className="h-full cursor-pointer border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-green-400 transition-all duration-300">
                  <CardHeader>
                    <div className="h-14 w-14 rounded-xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                      <Upload className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">Grade Submissions</CardTitle>
                    <CardDescription className="text-base">
                      Upload individual files, CSV, or ZIP for batch grading
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        Single submission testing and grading
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        Bulk CSV upload (student_id, code)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        ZIP upload with auto student ID parsing
                      </li>
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
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-slate-200/60 shadow-2xl shadow-slate-200/50">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="h-14 w-14 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">Instant</div>
              <div className="text-slate-600">Feedback for students</div>
            </div>
            <div>
              <div className="h-14 w-14 rounded-xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">4 Metrics</div>
              <div className="text-slate-600">Correctness, quality, efficiency, edge cases</div>
            </div>
            <div>
              <div className="h-14 w-14 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                <Award className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">AI-Powered</div>
              <div className="text-slate-600">Intelligent code evaluation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200/60 bg-white/80 backdrop-blur-xl py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p className="font-semibold text-slate-800">UVU Computer Science Department</p>
          <p className="mt-2">AI Autograder Prototype</p>
          <p className="mt-2 text-xs text-slate-500">Powered by Judge0 & OpenRouter AI</p>
        </div>
      </footer>
    </div>
  );
}
