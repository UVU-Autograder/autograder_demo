import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import type { Assignment } from "@/lib/services/assignment-storage.service";

interface AssignmentDetailsCardProps {
  assignment: Assignment;
  showTestCases: boolean;
  onToggleTestCases: () => void;
}

export function AssignmentDetailsCard({
  assignment,
  showTestCases,
  onToggleTestCases,
}: AssignmentDetailsCardProps) {
  return (
    <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg">Assignment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {/* Instructions - Full Markdown */}
        <div>
          <span className="font-semibold text-slate-700 mb-3 block">Assignment Instructions:</span>
          <div className="text-slate-600 prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2 text-slate-900">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold mt-3 mb-2 text-slate-900">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-semibold mt-2 mb-1 text-slate-800">{children}</h3>,
                p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="ml-4">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  if (isBlock) {
                    return <pre className="bg-slate-900 text-slate-100 p-3 rounded-md overflow-x-auto mb-2 text-xs"><code>{children}</code></pre>;
                  }
                  return <code className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-xs font-mono">{children}</code>;
                },
                pre: ({ children }) => <div className="mb-2">{children}</div>,
                table: ({ children }) => <table className="min-w-full text-xs divide-y divide-slate-200 mb-2">{children}</table>,
                thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
                tbody: ({ children }) => <tbody className="divide-y divide-slate-100">{children}</tbody>,
                tr: ({ children }) => <tr>{children}</tr>,
                th: ({ children }) => <th className="px-3 py-1.5 text-left font-semibold text-slate-700">{children}</th>,
                td: ({ children }) => <td className="px-3 py-1.5 text-slate-600">{children}</td>,
              }}
            >
              {assignment.instructions || assignment.description}
            </ReactMarkdown>
          </div>
        </div>

        {/* Test Cases - Collapsible */}
        <div>
          <button
            onClick={onToggleTestCases}
            className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Test Cases</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                {assignment.testCases.length}
              </span>
            </div>
            {showTestCases ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {showTestCases && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-2 max-h-64 overflow-y-auto"
            >
              {assignment.testCases.map((testCase, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">
                      Test Case #{idx + 1}
                    </span>
                    <span className="text-xs text-slate-500">
                      {testCase.hidden ? "Hidden" : "Visible"}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-medium text-slate-600">Input:</span>
                      <code className="ml-2 px-1.5 py-0.5 bg-white rounded font-mono">
                        {testCase.input}
                      </code>
                    </div>
                    <div>
                      <span className="font-medium text-slate-600">Expected:</span>
                      <code className="ml-2 px-1.5 py-0.5 bg-white rounded font-mono">
                        {testCase.expectedOutput}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-slate-200/50">
          <div>
            <span className="font-semibold text-slate-700">Max Score:</span>
            <span className="ml-2 text-slate-600">{assignment.maxScore} pts</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
