"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, BookOpen, Award, Sparkles, Zap, Target, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAssignments } from "@/lib/assignments";
import { DIFFICULTY_LEVELS } from "@/lib/constants";

export default function Home() {
  const assignments = getAssignments();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">UVU Autograder</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Code Evaluation</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Link href="/instructor">
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Instructor
                </Button>
              </Link>
              <Link href="/bulk">
                <Button variant="outline" className="gap-2">
                  <Award className="h-4 w-4" />
                  Bulk Grade
                </Button>
              </Link>
              <ThemeToggle />
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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">AI-Powered Evaluation</span>
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Master Coding with Instant Feedback
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Practice coding problems and receive detailed AI-powered feedback on correctness, code quality, and efficiency
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-muted-foreground">Instant Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              <span className="text-muted-foreground">Smart Rubrics</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-muted-foreground">AI Feedback</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">Practice Problems</h3>
          <p className="text-muted-foreground">Select an assignment to start coding and get instant AI feedback</p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {assignments.map((assignment, index) => {
            const difficulty = DIFFICULTY_LEVELS[assignment.difficulty];
            return (
              <motion.div key={assignment.id} variants={item}>
                <Card className="group h-full hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`${difficulty.bgColor} ${difficulty.textColor} ${difficulty.borderColor} border`}>
                        {difficulty.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {assignment.language}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-400 transition-colors">{assignment.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {assignment.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{assignment.testCases.length} test cases</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/assignment/${assignment.id}`} className="w-full">
                      <Button className="w-full group-hover:bg-blue-600 transition-colors">
                        Solve Challenge
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-background/50 backdrop-blur py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>UVU Computer Science Department • Autograder Demo Prototype</p>
          <p className="mt-2 text-xs">Powered by Judge0 & OpenRouter AI</p>
        </div>
      </footer>
    </div>
  );
}
