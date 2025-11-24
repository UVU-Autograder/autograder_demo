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

      {/* Hero Section - Quick Actions */}
      <section className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-200/60 mb-4 shadow-sm">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-semibold">AI-Powered Code Grading</span>
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Fast, Fair, and Scalable Grading for Every Class
          </h2>
          <p className="text-lg text-slate-600">
            Intelligent autograding with rubric-based AI feedback. Focus on teaching while we handle the grading.
          </p>
        </motion.div>
      </section>

      {/* Quick Actions - Hero Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/instructor/assignments/new">
                <Card className="h-full cursor-pointer border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-blue-500/20 hover:shadow-3xl hover:shadow-blue-500/30 hover:border-blue-400 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 shadow-xl shadow-blue-500/40">
                      <Plus className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3">Create Assignment</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Set up a new coding assignment with test cases and rubrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-sm"></div>
                        Define test cases and criteria
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-sm"></div>
                        Configure comprehensive rubrics
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-sm"></div>
                        Python, Java, C++, JavaScript
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/instructor">
                <Card className="h-full cursor-pointer border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-purple-500/20 hover:shadow-3xl hover:shadow-purple-500/30 hover:border-purple-400 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-5 shadow-xl shadow-purple-500/40">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3">Manage Assignments</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      View, edit, and organize all your coding assignments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500 shadow-sm"></div>
                        Browse all assignments
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500 shadow-sm"></div>
                        Duplicate and customize
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500 shadow-sm"></div>
                        Track statistics
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/bulk">
                <Card className="h-full cursor-pointer border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-green-500/20 hover:shadow-3xl hover:shadow-green-500/30 hover:border-green-400 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center mb-5 shadow-xl shadow-green-500/40">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3">Grade Submissions</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Upload CSV or ZIP files for instant batch grading
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-sm"></div>
                        Single or bulk submissions
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-sm"></div>
                        CSV & ZIP upload support
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-sm"></div>
                        Auto student ID parsing
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props - Subtle Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center text-slate-700">Why Instructors Love It</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-slate-200/50 bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-3 shadow-md shadow-blue-400/20">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">10x Faster Grading</CardTitle>
                <CardDescription className="text-sm">
                  Bulk grade 100+ submissions in minutes with AI-powered evaluation
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-slate-200/50 bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-green-400 to-green-500 flex items-center justify-center mb-3 shadow-md shadow-green-400/20">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Consistent Feedback</CardTitle>
                <CardDescription className="text-sm">
                  Every student gets detailed, fair evaluation based on your rubric
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-slate-200/50 bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-400 to-purple-500 flex items-center justify-center mb-3 shadow-md shadow-purple-400/20">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Beyond Test Cases</CardTitle>
                <CardDescription className="text-sm">
                  AI evaluates code quality, efficiency, and style—not just correctness
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats/Features - Minimal */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-10 border border-slate-200/50 shadow-md">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="h-12 w-12 rounded-lg bg-linear-to-br from-blue-400 to-blue-500 flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-400/20">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-700 mb-1">Instant</div>
              <div className="text-sm text-slate-600">Feedback for students</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded-lg bg-linear-to-br from-green-400 to-green-500 flex items-center justify-center mx-auto mb-3 shadow-md shadow-green-400/20">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-700 mb-1">4 Metrics</div>
              <div className="text-sm text-slate-600">Comprehensive evaluation</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded-lg bg-linear-to-br from-purple-400 to-purple-500 flex items-center justify-center mx-auto mb-3 shadow-md shadow-purple-400/20">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-700 mb-1">AI-Powered</div>
              <div className="text-sm text-slate-600">Intelligent evaluation</div>
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
