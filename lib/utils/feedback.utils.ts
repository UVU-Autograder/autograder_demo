import type { AIFeedback } from "@/lib/types/grading.types";

export function formatFeedbackForClipboard(
  feedback: AIFeedback,
  customComments?: string
): string {
  let text = `=== AI GRADING FEEDBACK ===\n\n`;
  text += `Overall Score: ${feedback.overallScore}/100\n`;
  text += `Grade: ${feedback.grade}\n\n`;
  text += `Summary:\n${feedback.summary}\n\n`;

  if (feedback.strengths && feedback.strengths.length > 0) {
    text += `Strengths:\n`;
    feedback.strengths.forEach((s, i) => {
      text += `${i + 1}. ${s}\n`;
    });
    text += `\n`;
  }

  if (feedback.improvements && feedback.improvements.length > 0) {
    text += `Areas for Improvement:\n`;
    feedback.improvements.forEach((imp, i) => {
      text += `${i + 1}. ${imp}\n`;
    });
    text += `\n`;
  }

  if (feedback.suggestions && feedback.suggestions.length > 0) {
    text += `Suggestions:\n`;
    feedback.suggestions.forEach((sug, i) => {
      text += `${i + 1}. ${sug.title}: ${sug.description}\n`;
      if (sug.code) {
        text += `   Code: ${sug.code}\n`;
      }
    });
    text += `\n`;
  }

  if (feedback.rubricScores) {
    text += `Rubric Breakdown:\n`;
    Object.entries(feedback.rubricScores).forEach(([key, value]) => {
      text += `- ${key}: ${value}/100\n`;
    });
    text += `\n`;
  }

  if (customComments) {
    text += `Instructor Comments:\n${customComments}\n`;
  }

  return text;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
