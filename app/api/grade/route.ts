import { NextRequest, NextResponse } from 'next/server';
import { getAssignmentById } from '@/lib/assignments';
import { gradingService } from '@/lib/services/grading.service';

export async function POST(request: NextRequest) {
  try {
    const { assignmentId, code } = await request.json();

    const assignment = getAssignmentById(assignmentId);
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    const result = await gradingService.gradeSubmission(assignment, code);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Grade API error:', error);
    return NextResponse.json(
      { error: 'Failed to grade submission' },
      { status: 500 }
    );
  }
}
