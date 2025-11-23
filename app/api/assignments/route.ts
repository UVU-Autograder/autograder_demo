import { NextResponse } from 'next/server';
import { getAssignments } from '@/lib/assignments';

export async function GET() {
  try {
    const assignments = getAssignments();
    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}
