import { v4 as uuidv4 } from 'uuid';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  language: string;
  instructions: string;
  starterCode?: string;
  testCases: TestCase[];
  rubric: Rubric;
  codeRequirements?: any; // CodeRequirements type
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  dueDate?: Date;
  maxScore: number;
  isSample?: boolean;
  tags?: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  hidden: boolean;
}

export interface Rubric {
  [key: string]: { points: number; description: string };
}

/**
 * Service for managing assignments using localStorage
 * TODO: Replace with database in production
 */
class AssignmentStorageService {
  private storageKey = 'autograder_assignments';

  /**
   * Get all assignments from storage
   */
  getAll(): Assignment[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      
      const assignments = JSON.parse(data);
      // Parse dates
      return assignments.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
        dueDate: a.dueDate ? new Date(a.dueDate) : undefined,
      }));
    } catch (error) {
      console.error('Error loading assignments:', error);
      return [];
    }
  }

  /**
   * Get assignment by ID
   */
  getById(id: string): Assignment | null {
    const assignments = this.getAll();
    return assignments.find(a => a.id === id) || null;
  }

  /**
   * Create new assignment
   */
  create(data: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Assignment {
    const assignment: Assignment = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const assignments = this.getAll();
    assignments.push(assignment);
    this.saveAll(assignments);
    
    return assignment;
  }

  /**
   * Update existing assignment
   */
  update(id: string, data: Partial<Assignment>): Assignment | null {
    const assignments = this.getAll();
    const index = assignments.findIndex(a => a.id === id);
    
    if (index === -1) return null;

    assignments[index] = {
      ...assignments[index],
      ...data,
      id, // Prevent ID change
      updatedAt: new Date(),
    };

    this.saveAll(assignments);
    return assignments[index];
  }

  /**
   * Delete assignment
   */
  delete(id: string): boolean {
    const assignments = this.getAll();
    const filtered = assignments.filter(a => a.id !== id);
    
    if (filtered.length === assignments.length) return false;
    
    this.saveAll(filtered);
    return true;
  }

  /**
   * Save all assignments to storage
   */
  private saveAll(assignments: Assignment[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(assignments));
    } catch (error) {
      console.error('Error saving assignments:', error);
      throw new Error('Failed to save assignments');
    }
  }

  /**
   * Clear all assignments (for testing)
   */
  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Get assignments count
   */
  count(): number {
    return this.getAll().length;
  }

  /**
   * Search assignments by title or description
   */
  search(query: string): Assignment[] {
    const assignments = this.getAll();
    const lowerQuery = query.toLowerCase();
    
    return assignments.filter(a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Filter assignments by language
   */
  filterByLanguage(language: string): Assignment[] {
    return this.getAll().filter(a => 
      a.language.toLowerCase() === language.toLowerCase()
    );
  }

  /**
   * Filter sample assignments
   */
  filterSamples(): Assignment[] {
    return this.getAll().filter(a => a.isSample === true);
  }

  /**
   * Filter by tags
   */
  filterByTag(tag: string): Assignment[] {
    return this.getAll().filter(a => 
      a.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  /**
   * Initialize with sample assignments on first load
   */
  initializeWithSamples(samples: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>[]): void {
    if (typeof window === 'undefined') return;
    
    const existing = this.getAll();
    if (existing.length === 0) {
      const now = new Date();
      const assignmentsWithIds = samples.map((assignment, index) => ({
        ...assignment,
        id: `sample-${Date.now()}-${index}`,
        createdAt: now,
        updatedAt: now,
        isSample: true,
        maxScore: 100,
      }));
      
      this.saveAll(assignmentsWithIds);
    }
  }
}

export const assignmentStorage = new AssignmentStorageService();
