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
              <div className="rounded-xl bg-blue-100/50 backdrop-blur p-2.5 border-2 border-blue-400/30">
                <Code2 className="h-6 w-6 text-blue-600" strokeWidth={1.5} />
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
                    <div className="h-16 w-16 rounded-2xl bg-blue-100/50 backdrop-blur border-2 border-blue-400/30 flex items-center justify-center mb-5">
                      <Plus className="h-8 w-8 text-blue-600" strokeWidth={2} />
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
                    <div className="h-16 w-16 rounded-2xl bg-purple-100/50 backdrop-blur border-2 border-purple-400/30 flex items-center justify-center mb-5">
                      <FileText className="h-8 w-8 text-purple-600" strokeWidth={2} />
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
                    <div className="h-16 w-16 rounded-2xl bg-green-100/50 backdrop-blur border-2 border-green-400/30 flex items-center justify-center mb-5">
                      <Upload className="h-8 w-8 text-green-600" strokeWidth={2} />
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

      {/* Platform Highlights */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-10"
          >
            <h3 className="text-3xl font-bold mb-3 bg-linear-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">Platform Highlights</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">Enterprise-grade autograding designed for academic excellence and pedagogical precision</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="h-full border-slate-200/50 bg-white/60 backdrop-blur-lg shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-blue-100/50 backdrop-blur border-2 border-blue-400/30 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-blue-600" strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">10x Faster Grading</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Bulk grade 100+ submissions in minutes with AI-powered evaluation and intelligent assessment algorithms
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="h-full border-slate-200/50 bg-white/60 backdrop-blur-lg shadow-lg hover:shadow-xl hover:border-green-300 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-green-100/50 backdrop-blur border-2 border-green-400/30 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-green-600" strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Consistent & Fair Feedback</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Every student receives detailed, equitable evaluation based on your customized rubric criteria
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="h-full border-slate-200/50 bg-white/60 backdrop-blur-lg shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-purple-100/50 backdrop-blur border-2 border-purple-400/30 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-purple-600" strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Holistic Code Analysis</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    AI evaluates code quality, efficiency, style, and architecture—beyond mere test case correctness
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="h-full border-slate-200/50 bg-white/60 backdrop-blur-lg shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-cyan-100/50 backdrop-blur border-2 border-cyan-400/30 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-cyan-600" strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Instant Feedback Loop</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Real-time evaluation provides immediate, actionable insights to accelerate student learning
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="h-full border-slate-200/50 bg-white/60 backdrop-blur-lg shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-orange-100/50 backdrop-blur border-2 border-orange-400/30 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-orange-600" strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Comprehensive Metrics</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Four-dimensional assessment covering correctness, quality, efficiency, and edge case handling
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Card className="h-full border-slate-200/50 bg-white/60 backdrop-blur-lg shadow-lg hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-indigo-100/50 backdrop-blur border-2 border-indigo-400/30 flex items-center justify-center mb-4">
                    <Code2 className="h-6 w-6 text-indigo-600" strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Multi-Language Support</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Python, Java, C++, JavaScript—unified grading experience across diverse programming paradigms
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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
