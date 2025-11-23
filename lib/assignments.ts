import assignments from '@/data/assignments.json';
import type { Assignment } from './types';

export function getAssignments(): Assignment[] {
  return assignments as Assignment[];
}

export function getAssignmentById(id: string): Assignment | undefined {
  return assignments.find((a) => a.id === id) as Assignment | undefined;
}
