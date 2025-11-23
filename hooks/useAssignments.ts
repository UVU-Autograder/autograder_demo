import { useState, useEffect } from 'react';
import type { Assignment } from '@/lib/types';

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/assignments');
      
      if (!response.ok) {
        throw new Error('Failed to fetch assignments');
      }
      
      const data = await response.json();
      setAssignments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getAssignment = async (id: string): Promise<Assignment | null> => {
    try {
      const response = await fetch(`/api/assignments/${id}`);
      
      if (!response.ok) {
        throw new Error('Assignment not found');
      }
      
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    }
  };

  const refetch = () => {
    fetchAssignments();
  };

  return {
    assignments,
    loading,
    error,
    getAssignment,
    refetch,
  };
}
