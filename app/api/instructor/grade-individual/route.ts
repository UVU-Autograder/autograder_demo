import { NextRequest, NextResponse } from 'next/server';
import { openRouterService } from '@/lib/services/openrouter.service';
import { assignmentStorage } from '@/lib/services/assignment-storage.service';

interface AISettings {
  feedbackLength: "short" | "medium" | "detailed";
  feedbackStyle: "professional" | "conversational" | "technical";
  outputFormat: "paragraphs" | "bullets" | "mixed";
  focusAreas: {
    codeQuality: boolean;
    efficiency: boolean;
    edgeCases: boolean;
    bestPractices: boolean;
    documentation: boolean;
    readability: boolean;
  };
  includeExamples: boolean;
  highlightIssues: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assignmentId, assignment: bodyAssignment, code, settings, testResults } = body;

    // debug: log incoming request keys so we can see what client actually sends
    console.log('grade-individual request received - keys:', Object.keys(body));
    console.log('assignmentId present:', !!assignmentId, 'assignment in body:', !!bodyAssignment);

    // accept full assignment metadata in the request body (preferred for server-side grading)
    if ((!assignmentId && !bodyAssignment) || !code) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    // prefer payload assignment if provided, otherwise attempt to look up by id
    let assignment = bodyAssignment || null;
    if (!assignment && assignmentId) {
      try {
        assignment = assignmentStorage.getById(assignmentId);
      } catch (err) {
        assignment = null;
      }
    }

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Build dynamic prompt based on settings
    const prompt = buildCustomPrompt(assignment, code, settings as AISettings, testResults);

    // Call OpenRouter API with selected model
    const aiResponse = await openRouterService.evaluateCodeWithCustomPrompt(
      prompt,
      assignment.language,
      settings.model // Pass the selected model
    );

    // Parse and structure the response
    const feedback = parseAIResponse(aiResponse, assignment);

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error generating individual feedback:', error);
    return NextResponse.json(
      { error: 'Failed to generate feedback' },
      { status: 500 }
    );
  }
}

function buildCustomPrompt(
  assignment: any,
  code: string,
  settings: AISettings,
  testResults?: any[]
): string {
  const focusAreasText = Object.entries(settings.focusAreas)
    .filter(([_, enabled]) => enabled)
    .map(([area]) => area)
    .join(', ');

  let lengthInstruction = '';
  if (settings.feedbackLength === 'short') {
    lengthInstruction = 'Provide concise feedback in 1 paragraph (max 100 words) plus 3-5 bullet points for key improvements.';
  } else if (settings.feedbackLength === 'detailed') {
    lengthInstruction = 'Provide comprehensive analysis in 4-5 detailed paragraphs covering code structure, correctness, quality, efficiency, and best practices. Include specific examples.';
  } else {
    lengthInstruction = 'Provide moderate feedback in 2-3 paragraphs plus bullet points for improvements and suggestions.';
  }

  let styleInstruction = '';
  if (settings.feedbackStyle === 'professional') {
    styleInstruction = 'Use formal academic tone, professional terminology, and objective analysis.';
  } else if (settings.feedbackStyle === 'conversational') {
    styleInstruction = 'Use friendly, encouraging language. Be supportive and motivational while providing constructive feedback.';
  } else {
    styleInstruction = 'Use technical terminology, reference algorithms/data structures, mention time/space complexity where relevant, cite programming principles (SOLID, DRY, KISS, etc.).';
  }

  let formatInstruction = '';
  if (settings.outputFormat === 'bullets') {
    formatInstruction = 'Format all feedback as bullet points. Use concise, actionable statements.';
  } else if (settings.outputFormat === 'mixed') {
    formatInstruction = 'Combine paragraphs for summaries with bullet points for specific items (strengths, improvements, suggestions).';
  } else {
    formatInstruction = 'Format feedback in well-structured paragraphs.';
  }

  const examplesInstruction = settings.includeExamples
    ? 'Include code examples in your suggestions showing how to improve the code.'
    : 'Provide suggestions without code examples.';

  const highlightInstruction = settings.highlightIssues
    ? 'Reference specific line numbers or code sections when identifying issues.'
    : 'Provide general feedback without line-specific references.';

  let testResultsContext = '';
  if (testResults && testResults.length > 0) {
    const passed = testResults.filter((r: any) => r.passed).length;
    testResultsContext = `\n**Test Results:**\n- Tests Passed: ${passed}/${testResults.length}\n${
      passed < testResults.length
        ? `- Some tests failed. Consider this in your evaluation of correctness.\n`
        : '- All tests passed successfully.\n'
    }`;
  }

  return `You are an expert programming instructor evaluating student code for the following assignment:

**Assignment: ${assignment.title}**
${assignment.description}

**Programming Language:** ${assignment.language}

**Student Code:**
\`\`\`${assignment.language}
${code}
\`\`\`
${testResultsContext}
**Grading Rubric:**
${Object.entries(assignment.rubric)
  .map(([key, val]: [string, any]) => `- ${key}: ${val.points} points - ${val.description}`)
  .join('\n')}

**Evaluation Instructions:**
${lengthInstruction}
${styleInstruction}
${formatInstruction}
${examplesInstruction}
${highlightInstruction}

**Focus Areas:** ${focusAreasText}

Evaluate the code and provide your feedback in the following JSON format:
{
  "overallScore": <number 0-100>,
  "grade": "<letter grade A/B/C/D/F>",
  "summary": "<brief overall assessment>",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "suggestions": [
    {
      "title": "suggestion title",
      "description": "detailed suggestion",
      "code": "${settings.includeExamples ? '<optional code example>' : ''}"
    }
  ],
  "rubricScores": {
    "correctness": <number>,
    "codeQuality": <number>,
    "efficiency": <number>,
    "edgeCases": <number>
  },
  "testAnalysis": {
    "passed": ${testResults ? testResults.filter((r: any) => r.passed).length : 0},
    "total": ${testResults ? testResults.length : 0},
    "details": "<brief test analysis>"
  },
  "metrics": {
    "linesOfCode": <number>,
    "complexity": "<low/medium/high>",
    "commentRatio": "<percentage>"
  }
}`;
}

function parseAIResponse(response: string, assignment: any): any {
  try {
    const parsed = JSON.parse(response);
    
    // Ensure all required fields exist with defaults
    return {
      overallScore: parsed.overallScore || 0,
      grade: parsed.grade || 'F',
      summary: parsed.summary || 'No summary provided',
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
      suggestions: parsed.suggestions || [],
      rubricScores: {
        correctness: parsed.rubricScores?.correctness || 0,
        codeQuality: parsed.rubricScores?.codeQuality || 0,
        efficiency: parsed.rubricScores?.efficiency || 0,
        edgeCases: parsed.rubricScores?.edgeCases || 0,
      },
      testAnalysis: parsed.testAnalysis || null,
      metrics: parsed.metrics || null,
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    
    // Fallback response
    return {
      overallScore: 50,
      grade: 'C',
      summary: 'Unable to generate detailed feedback. Please try again.',
      strengths: ['Code compiles successfully'],
      improvements: ['Review the assignment requirements', 'Test with more edge cases'],
      suggestions: [
        {
          title: 'General Improvement',
          description: 'Review your code logic and ensure all requirements are met.',
        },
      ],
      rubricScores: {
        correctness: Math.round(assignment.rubric.correctness.points * 0.5),
        codeQuality: Math.round(assignment.rubric.codeQuality.points * 0.5),
        efficiency: Math.round(assignment.rubric.efficiency.points * 0.5),
        edgeCases: Math.round(assignment.rubric.edgeCases.points * 0.5),
      },
      testAnalysis: null,
      metrics: null,
    };
  }
}
