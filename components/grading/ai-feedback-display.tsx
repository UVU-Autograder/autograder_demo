import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  Award, 
  TrendingUp, 
  Lightbulb, 
  AlertCircle, 
  Copy, 
  Download 
} from "lucide-react";
import type { AIFeedback } from "@/lib/types/grading.types";

interface AIFeedbackDisplayProps {
  feedback: AIFeedback | null;
  customComments: string;
  onCustomCommentsChange: (comments: string) => void;
  onCopyFeedback: () => void;
  onExportPDF: () => void;
}

export function AIFeedbackDisplay({
  feedback,
  customComments,
  onCustomCommentsChange,
  onCopyFeedback,
  onExportPDF,
}: AIFeedbackDisplayProps) {
  if (!feedback) {
    return (
      <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
        <CardContent className="py-12 text-center">
          <Lightbulb className="h-12 w-12 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-sm">
            Generate AI feedback to see detailed analysis
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <Card className="border-slate-200/60 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl overflow-hidden">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-1">Overall Score</p>
                <p className="text-4xl font-bold text-slate-800">{feedback.overallScore}/100</p>
                <Badge className="mt-2 bg-purple-600 text-white">{feedback.grade}</Badge>
              </div>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {feedback.overallScore}
              </div>
            </div>
            <p className="text-sm text-slate-700 mt-4 leading-relaxed">{feedback.summary}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strengths */}
      {feedback.strengths && feedback.strengths.length > 0 && (
        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-green-700">
              <TrendingUp className="h-5 w-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {feedback.strengths.map((strength, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 rounded-lg bg-green-50/50 border border-green-200/50"
              >
                <p className="text-sm text-slate-700">{strength}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Improvements */}
      {feedback.improvements && feedback.improvements.length > 0 && (
        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
              <AlertCircle className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {feedback.improvements.map((improvement, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 rounded-lg bg-orange-50/50 border border-orange-200/50"
              >
                <p className="text-sm text-slate-700">{improvement}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {feedback.suggestions && feedback.suggestions.length > 0 && (
        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
              <Lightbulb className="h-5 w-5" />
              Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {feedback.suggestions.map((suggestion, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-lg bg-blue-50/50 border border-blue-200/50"
              >
                <p className="font-semibold text-sm text-slate-800 mb-1">{suggestion.title}</p>
                <p className="text-sm text-slate-700 mb-2">{suggestion.description}</p>
                {suggestion.code && (
                  <pre className="bg-slate-800 text-slate-100 p-3 rounded text-xs overflow-x-auto">
                    <code>{suggestion.code}</code>
                  </pre>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Rubric Breakdown */}
      {feedback.rubricScores && (
        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Rubric Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(feedback.rubricScores || {}).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{value}/100</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Custom Comments */}
      <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg">Instructor Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={customComments}
            onChange={(e) => onCustomCommentsChange(e.target.value)}
            placeholder="Add your custom feedback or comments..."
            className="min-h-[100px] resize-none"
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={onCopyFeedback} variant="outline" className="flex-1 gap-2">
          <Copy className="h-4 w-4" />
          Copy Feedback
        </Button>
        <Button onClick={onExportPDF} variant="outline" className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}
