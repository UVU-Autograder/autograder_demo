// Sample assignments - loaded from JSON files
import type { Assignment } from '@/lib/services/assignment-storage.service';
import bubbleSortData from './bubble-sort.json';
import insertionSortData from './insertion-sort.json';
import mergeSortData from './merge-sort.json';

export const sampleAssignments = [
  bubbleSortData,
  insertionSortData,
  mergeSortData,
] as Array<Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>>;
