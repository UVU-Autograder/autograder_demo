import { NextRequest, NextResponse } from 'next/server';
import { getAssignmentById } from '@/lib/assignments';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const assignment = getAssignmentById(id);

  if (!assignment) {
    return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
  }

  return NextResponse.json(assignment);
}
