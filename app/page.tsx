import Link from "next/link";
import { Code2, BookOpen, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAssignments } from "@/lib/assignments";

export default function Home() {
  const assignments = getAssignments();

  const difficultyColors = {
    easy: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    hard: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">UVU Autograder</h1>
                <p className="text-sm text-slate-600">AI-Powered Code Evaluation</p>
              </div>
            </div>
            <Link href="/bulk">
              <Button variant="outline" className="gap-2">
                <Award className="h-4 w-4" />
                Bulk Grading
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Practice Problems</h2>
          <p className="text-slate-600">Select an assignment to start coding and get instant AI feedback</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={difficultyColors[assignment.difficulty]}>
                    {assignment.difficulty.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {assignment.language}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{assignment.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {assignment.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BookOpen className="h-4 w-4" />
                  <span>{assignment.testCases.length} test cases</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/assignment/${assignment.id}`} className="w-full">
                  <Button className="w-full">Solve Challenge</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>UVU Computer Science Department • Autograder Demo Prototype</p>
        </div>
      </footer>
    </div>
  );
}
