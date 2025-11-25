import type { Assignment } from '@/lib/types';

/**
 * Sample assignments for classroom use
 * These cover various topics typically taught in introductory programming courses
 */
export const sampleAssignments: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // INTRO LEVEL ASSIGNMENTS (Weeks 1-3)
  {
    title: "Hello World Personalized",
    difficulty: "intro",
    language: "python",
    description: "Learn basic input/output operations by creating a personalized greeting program.",
    instructions: `# Assignment: Personalized Hello World

## Learning Objectives
- Understand basic input() and print() functions
- Practice string concatenation
- Use f-strings for formatted output

## Requirements
1. Prompt the user for their first name
2. Prompt the user for their favorite color
3. Print a personalized greeting that includes both pieces of information

## Example Output
\`\`\`
What is your first name? Alice
What is your favorite color? blue
Hello, Alice! I love the color blue too!
\`\`\`

## Grading Criteria
- Correctness: Program runs without errors (40 pts)
- Input Handling: Properly prompts for both inputs (20 pts)
- Output Format: Follows example format (20 pts)
- Code Quality: Clean, readable code with comments (20 pts)`,
    starterCode: `# Personalized Hello World
# Your Name: [Student Name]
# Date: [Today's Date]

def main():
    # TODO: Get user's first name
    
    # TODO: Get user's favorite color
    
    # TODO: Print personalized greeting
    
    pass

if __name__ == "__main__":
    main()`,
    testCases: [
      {
        id: 1,
        input: "Alice\nblue",
        expectedOutput: "Hello, Alice! I love the color blue too!",
        isHidden: false
      },
      {
        id: 2,
        input: "Bob\nred",
        expectedOutput: "Hello, Bob! I love the color red too!",
        isHidden: false
      },
      {
        id: 3,
        input: "Charlie\ngreen",
        expectedOutput: "Hello, Charlie! I love the color green too!",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 40,
        description: "Program executes without errors and produces correct output"
      },
      codeQuality: {
        points: 20,
        description: "Code is clean, well-commented, and follows Python conventions"
      },
      efficiency: {
        points: 20,
        description: "Uses appropriate string formatting techniques"
      },
      edgeCases: {
        points: 20,
        description: "Handles different inputs correctly"
      }
    }
  },

  {
    title: "Simple Calculator",
    difficulty: "intro",
    language: "python",
    description: "Build a basic calculator that performs arithmetic operations on two numbers.",
    instructions: `# Assignment: Simple Calculator

## Learning Objectives
- Work with numeric data types (int, float)
- Use arithmetic operators (+, -, *, /)
- Practice if/elif/else statements
- Handle user input conversion

## Requirements
1. Prompt user for two numbers
2. Prompt user for an operation (+, -, *, /)
3. Perform the calculation
4. Display the result with proper formatting

## Example Output
\`\`\`
Enter first number: 10
Enter second number: 5
Enter operation (+, -, *, /): +
Result: 10 + 5 = 15
\`\`\`

## Special Cases
- For division, check for division by zero
- Round results to 2 decimal places

## Grading Criteria
- All four operations work correctly (40 pts)
- Handles division by zero (20 pts)
- Proper output formatting (20 pts)
- Code organization and comments (20 pts)`,
    starterCode: `# Simple Calculator
# Your Name: [Student Name]

def calculator():
    # TODO: Get first number from user
    num1 = 0
    
    # TODO: Get second number from user
    num2 = 0
    
    # TODO: Get operation from user
    operation = ""
    
    # TODO: Perform calculation based on operation
    result = 0
    
    # TODO: Print result in format: "num1 operation num2 = result"
    
    pass

if __name__ == "__main__":
    calculator()`,
    testCases: [
      {
        id: 1,
        input: "10\n5\n+",
        expectedOutput: "10 + 5 = 15",
        isHidden: false
      },
      {
        id: 2,
        input: "20\n4\n/",
        expectedOutput: "20 / 4 = 5.0",
        isHidden: false
      },
      {
        id: 3,
        input: "7\n3\n*",
        expectedOutput: "7 * 3 = 21",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 40,
        description: "All arithmetic operations produce correct results"
      },
      codeQuality: {
        points: 20,
        description: "Well-organized code with clear variable names"
      },
      efficiency: {
        points: 20,
        description: "Handles division by zero and edge cases"
      },
      edgeCases: {
        points: 20,
        description: "Proper formatting and rounding of results"
      }
    }
  },

  // INTERMEDIATE LEVEL ASSIGNMENTS (Weeks 4-7)
  {
    title: "Grade Calculator with Lists",
    difficulty: "intermediate",
    language: "python",
    description: "Process a list of student scores to calculate statistics and assign letter grades.",
    instructions: `# Assignment: Grade Calculator

## Learning Objectives
- Work with lists and list operations
- Use loops (for/while) to process data
- Implement conditional logic for grade assignment
- Calculate basic statistics (average, min, max)

## Requirements
1. Accept a list of test scores (0-100)
2. Calculate the average score
3. Find the highest and lowest scores
4. Assign letter grades based on this scale:
   - A: 90-100
   - B: 80-89
   - C: 70-79
   - D: 60-69
   - F: 0-59
5. Display all statistics and letter grade

## Example Output
\`\`\`
Scores: [85, 92, 78, 90, 88]
Average: 86.6
Highest: 92
Lowest: 78
Letter Grade: B
\`\`\`

## Grading Criteria
- Correct average calculation (25 pts)
- Accurate min/max identification (25 pts)
- Proper letter grade assignment (30 pts)
- Code quality and efficiency (20 pts)`,
    starterCode: `# Grade Calculator
# Your Name: [Student Name]

def calculate_grade_stats(scores):
    """
    Calculate statistics for a list of test scores.
    
    Args:
        scores: List of numeric scores (0-100)
        
    Returns:
        Dictionary with 'average', 'highest', 'lowest', 'letter_grade'
    """
    # TODO: Calculate average
    
    # TODO: Find highest score
    
    # TODO: Find lowest score
    
    # TODO: Determine letter grade based on average
    
    return {
        'average': 0,
        'highest': 0,
        'lowest': 0,
        'letter_grade': 'F'
    }

def main():
    # Test with sample data
    test_scores = [85, 92, 78, 90, 88]
    results = calculate_grade_stats(test_scores)
    
    print(f"Scores: {test_scores}")
    print(f"Average: {results['average']:.1f}")
    print(f"Highest: {results['highest']}")
    print(f"Lowest: {results['lowest']}")
    print(f"Letter Grade: {results['letter_grade']}")

if __name__ == "__main__":
    main()`,
    testCases: [
      {
        id: 1,
        input: "[85, 92, 78, 90, 88]",
        expectedOutput: "Average: 86.6\nHighest: 92\nLowest: 78\nLetter Grade: B",
        isHidden: false
      },
      {
        id: 2,
        input: "[95, 98, 100, 92, 97]",
        expectedOutput: "Average: 96.4\nHighest: 100\nLowest: 92\nLetter Grade: A",
        isHidden: false
      },
      {
        id: 3,
        input: "[65, 70, 68, 72, 69]",
        expectedOutput: "Average: 68.8\nHighest: 72\nLowest: 65\nLetter Grade: D",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 50,
        description: "Accurate calculations for average, min, max, and letter grade"
      },
      codeQuality: {
        points: 20,
        description: "Clean code with proper function structure and documentation"
      },
      efficiency: {
        points: 15,
        description: "Efficient use of list operations and built-in functions"
      },
      edgeCases: {
        points: 15,
        description: "Handles boundary cases in grade assignment"
      }
    }
  },

  {
    title: "Password Validator",
    difficulty: "intermediate",
    language: "python",
    description: "Create a function that validates passwords based on security requirements.",
    instructions: `# Assignment: Password Validator

## Learning Objectives
- Use string methods (isdigit, isalpha, isupper, islower)
- Implement complex conditional logic
- Work with boolean operations
- Practice defensive programming

## Password Requirements
A valid password must:
1. Be at least 8 characters long
2. Contain at least one uppercase letter
3. Contain at least one lowercase letter
4. Contain at least one digit
5. Contain at least one special character (!@#$%^&*)

## Function Signature
\`\`\`python
def validate_password(password: str) -> tuple[bool, list[str]]:
    """
    Returns: (is_valid, list_of_failed_requirements)
    """
\`\`\`

## Example Output
\`\`\`
Password: "Hello123"
Valid: False
Missing: Special character

Password: "Hello123!"
Valid: True
\`\`\`

## Grading Criteria
- All validation checks implemented (40 pts)
- Returns correct format (20 pts)
- Handles edge cases (empty string, etc.) (20 pts)
- Code clarity and documentation (20 pts)`,
    starterCode: `# Password Validator
# Your Name: [Student Name]

def validate_password(password):
    """
    Validate a password against security requirements.
    
    Args:
        password: String to validate
        
    Returns:
        tuple: (is_valid: bool, failed_requirements: list)
    """
    failed_requirements = []
    
    # TODO: Check minimum length (8 characters)
    
    # TODO: Check for at least one uppercase letter
    
    # TODO: Check for at least one lowercase letter
    
    # TODO: Check for at least one digit
    
    # TODO: Check for at least one special character (!@#$%^&*)
    
    is_valid = len(failed_requirements) == 0
    return is_valid, failed_requirements

def main():
    # Test passwords
    test_passwords = [
        "Hello123!",
        "hello123",
        "HELLO123!",
        "Hello!",
        "HelloWorld"
    ]
    
    for pwd in test_passwords:
        valid, failures = validate_password(pwd)
        print(f"Password: {pwd}")
        print(f"Valid: {valid}")
        if not valid:
            print(f"Missing: {', '.join(failures)}")
        print()

if __name__ == "__main__":
    main()`,
    testCases: [
      {
        id: 1,
        input: "Hello123!",
        expectedOutput: "Valid: True",
        isHidden: false
      },
      {
        id: 2,
        input: "hello123",
        expectedOutput: "Valid: False\nMissing: Uppercase letter, Special character",
        isHidden: false
      },
      {
        id: 3,
        input: "Short1!",
        expectedOutput: "Valid: False\nMissing: Minimum length",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 40,
        description: "All validation requirements properly checked"
      },
      codeQuality: {
        points: 25,
        description: "Clean, readable code with good variable names"
      },
      efficiency: {
        points: 15,
        description: "Efficient string processing"
      },
      edgeCases: {
        points: 20,
        description: "Handles edge cases like empty strings and special characters"
      }
    }
  },

  // ADVANCED LEVEL ASSIGNMENTS (Weeks 8+)
  {
    title: "Student Records Manager (Dictionary & File I/O)",
    difficulty: "advanced",
    language: "python",
    description: "Build a system to manage student records using dictionaries and file operations.",
    instructions: `# Assignment: Student Records Manager

## Learning Objectives
- Work with nested dictionaries
- Implement file I/O operations
- Create a menu-driven program
- Practice data persistence

## Features to Implement
1. **Add Student**: Store student info (name, ID, grades)
2. **View Student**: Display student information
3. **Update Grades**: Modify student grades
4. **Calculate GPA**: Compute GPA from grades
5. **Save to File**: Persist data to JSON file
6. **Load from File**: Read data from JSON file

## Data Structure
\`\`\`python
{
    "S001": {
        "name": "Alice Smith",
        "grades": {"Math": 90, "English": 85, "Science": 92}
    }
}
\`\`\`

## Menu Options
\`\`\`
1. Add Student
2. View Student
3. Update Grade
4. Calculate GPA
5. Save Data
6. Load Data
7. Exit
\`\`\`

## Grading Criteria
- All menu options work correctly (40 pts)
- Proper file I/O handling (20 pts)
- Correct GPA calculation (20 pts)
- Error handling and code quality (20 pts)`,
    starterCode: `# Student Records Manager
# Your Name: [Student Name]

import json

class StudentManager:
    def __init__(self):
        self.students = {}
    
    def add_student(self, student_id, name, grades=None):
        """Add a new student to the system."""
        # TODO: Implement
        pass
    
    def view_student(self, student_id):
        """Display student information."""
        # TODO: Implement
        pass
    
    def update_grade(self, student_id, subject, grade):
        """Update a student's grade for a subject."""
        # TODO: Implement
        pass
    
    def calculate_gpa(self, student_id):
        """Calculate GPA for a student (4.0 scale)."""
        # TODO: Implement
        # 90-100: 4.0, 80-89: 3.0, 70-79: 2.0, 60-69: 1.0, <60: 0.0
        pass
    
    def save_to_file(self, filename="students.json"):
        """Save student data to a JSON file."""
        # TODO: Implement
        pass
    
    def load_from_file(self, filename="students.json"):
        """Load student data from a JSON file."""
        # TODO: Implement
        pass

def main():
    manager = StudentManager()
    
    # TODO: Implement menu-driven interface
    # Display menu, get user choice, call appropriate methods
    
    pass

if __name__ == "__main__":
    main()`,
    testCases: [
      {
        id: 1,
        input: "add:S001:Alice:Math-90,English-85",
        expectedOutput: "Student S001 added successfully",
        isHidden: false
      },
      {
        id: 2,
        input: "gpa:S001",
        expectedOutput: "GPA for S001: 3.5",
        isHidden: false
      },
      {
        id: 3,
        input: "update:S001:Math:95",
        expectedOutput: "Grade updated successfully",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 40,
        description: "All features work correctly with proper data handling"
      },
      codeQuality: {
        points: 20,
        description: "Well-structured OOP design with clear methods"
      },
      efficiency: {
        points: 20,
        description: "Efficient data structures and file operations"
      },
      edgeCases: {
        points: 20,
        description: "Handles errors (missing files, invalid IDs, etc.)"
      }
    }
  },

  {
    title: "Recursive Fibonacci with Memoization",
    difficulty: "advanced",
    language: "python",
    description: "Implement Fibonacci sequence using recursion and optimize with memoization.",
    instructions: `# Assignment: Fibonacci with Memoization

## Learning Objectives
- Understand recursion and recursive functions
- Learn about memoization and caching
- Analyze time complexity improvements
- Work with decorators (optional bonus)

## Requirements
1. Implement recursive Fibonacci function
2. Add memoization to optimize performance
3. Compare execution times with/without memoization
4. Handle edge cases (n=0, n=1)

## Mathematical Definition
\`\`\`
fib(0) = 0
fib(1) = 1
fib(n) = fib(n-1) + fib(n-2) for n > 1
\`\`\`

## Expected Performance
- Without memo: fib(35) takes several seconds
- With memo: fib(35) completes instantly

## Function Signatures
\`\`\`python
def fibonacci_recursive(n: int) -> int:
    """Basic recursive implementation"""
    
def fibonacci_memoized(n: int, memo: dict = None) -> int:
    """Optimized with memoization"""
\`\`\`

## Grading Criteria
- Correct recursive implementation (30 pts)
- Proper memoization technique (30 pts)
- Handles base cases correctly (20 pts)
- Code documentation and testing (20 pts)`,
    starterCode: `# Recursive Fibonacci with Memoization
# Your Name: [Student Name]

import time

def fibonacci_recursive(n):
    """
    Calculate nth Fibonacci number using basic recursion.
    Warning: Slow for large n!
    
    Args:
        n: The position in Fibonacci sequence (0-indexed)
        
    Returns:
        The nth Fibonacci number
    """
    # TODO: Implement base cases (n=0, n=1)
    
    # TODO: Implement recursive case
    
    pass

def fibonacci_memoized(n, memo=None):
    """
    Calculate nth Fibonacci number using memoization.
    Much faster for large n!
    
    Args:
        n: The position in Fibonacci sequence
        memo: Dictionary to cache computed values
        
    Returns:
        The nth Fibonacci number
    """
    # TODO: Initialize memo dictionary if None
    
    # TODO: Check if result already in memo
    
    # TODO: Implement base cases
    
    # TODO: Compute and store in memo
    
    pass

def compare_performance():
    """Compare execution times of both implementations."""
    test_n = 30
    
    # Test recursive (careful with large n!)
    start = time.time()
    result1 = fibonacci_recursive(test_n)
    time1 = time.time() - start
    
    # Test memoized
    start = time.time()
    result2 = fibonacci_memoized(test_n)
    time2 = time.time() - start
    
    print(f"Fibonacci({test_n}) = {result1}")
    print(f"Recursive time: {time1:.6f} seconds")
    print(f"Memoized time: {time2:.6f} seconds")
    print(f"Speedup: {time1/time2:.1f}x faster")

if __name__ == "__main__":
    # Test both implementations
    print("Testing Fibonacci implementations:\\n")
    
    # Small values
    for i in range(10):
        print(f"fib({i}) = {fibonacci_memoized(i)}")
    
    print("\\nPerformance Comparison:")
    compare_performance()`,
    testCases: [
      {
        id: 1,
        input: "5",
        expectedOutput: "5",
        isHidden: false
      },
      {
        id: 2,
        input: "10",
        expectedOutput: "55",
        isHidden: false
      },
      {
        id: 3,
        input: "20",
        expectedOutput: "6765",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 30,
        description: "Both implementations produce correct Fibonacci numbers"
      },
      codeQuality: {
        points: 20,
        description: "Clear, well-documented code with proper structure"
      },
      efficiency: {
        points: 30,
        description: "Memoization correctly implemented and significantly faster"
      },
      edgeCases: {
        points: 20,
        description: "Handles base cases and edge cases properly"
      }
    }
  },

  {
    title: "Text File Word Frequency Analyzer",
    difficulty: "advanced",
    language: "python",
    description: "Analyze text files to count word frequencies and generate statistics.",
    instructions: `# Assignment: Word Frequency Analyzer

## Learning Objectives
- File reading and text processing
- Work with dictionaries for counting
- String manipulation and cleaning
- Data sorting and reporting

## Features to Implement
1. Read text from a file
2. Clean and normalize words (lowercase, remove punctuation)
3. Count word frequencies
4. Find top N most common words
5. Calculate statistics (total words, unique words, average length)
6. Export results to a formatted report

## Example Output
\`\`\`
=== Text Analysis Report ===
File: sample.txt
Total words: 150
Unique words: 75
Average word length: 4.5

Top 10 Most Common Words:
1. the - 15 occurrences
2. and - 12 occurrences
3. is - 8 occurrences
...
\`\`\`

## Requirements
- Ignore common stop words (optional bonus)
- Handle multiple files (optional bonus)
- Case-insensitive counting
- Remove punctuation properly

## Grading Criteria
- Correct word counting (30 pts)
- Proper text cleaning (25 pts)
- Accurate statistics (20 pts)
- Report formatting and code quality (25 pts)`,
    starterCode: `# Word Frequency Analyzer
# Your Name: [Student Name]

import string
from collections import Counter

class TextAnalyzer:
    def __init__(self, filename):
        self.filename = filename
        self.word_counts = {}
        self.total_words = 0
        self.unique_words = 0
    
    def read_file(self):
        """Read text from file."""
        # TODO: Implement file reading
        # Handle FileNotFoundError
        pass
    
    def clean_word(self, word):
        """
        Clean a word by removing punctuation and converting to lowercase.
        
        Args:
            word: String to clean
            
        Returns:
            Cleaned word string
        """
        # TODO: Remove punctuation and convert to lowercase
        pass
    
    def count_words(self, text):
        """
        Count word frequencies in text.
        
        Args:
            text: String containing the text to analyze
        """
        # TODO: Split text into words
        # TODO: Clean each word
        # TODO: Count frequencies using dictionary
        pass
    
    def get_top_words(self, n=10):
        """
        Get the n most common words.
        
        Args:
            n: Number of top words to return
            
        Returns:
            List of tuples (word, count) sorted by frequency
        """
        # TODO: Sort words by frequency
        pass
    
    def calculate_stats(self):
        """Calculate text statistics."""
        # TODO: Calculate total words, unique words, avg length
        pass
    
    def generate_report(self):
        """Generate and print formatted analysis report."""
        # TODO: Create formatted report
        pass

def main():
    # Example usage
    analyzer = TextAnalyzer("sample.txt")
    analyzer.read_file()
    analyzer.calculate_stats()
    analyzer.generate_report()

if __name__ == "__main__":
    main()`,
    testCases: [
      {
        id: 1,
        input: "the cat and the dog",
        expectedOutput: "Total: 5, Unique: 4, Most common: the (2)",
        isHidden: false
      },
      {
        id: 2,
        input: "Hello, World! Hello Python.",
        expectedOutput: "Total: 4, Unique: 3, Most common: hello (2)",
        isHidden: false
      },
      {
        id: 3,
        input: "Testing word frequency counting in text.",
        expectedOutput: "Total: 6, Unique: 6",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 30,
        description: "Accurate word counting and frequency calculation"
      },
      codeQuality: {
        points: 25,
        description: "Well-organized OOP structure with clear methods"
      },
      efficiency: {
        points: 20,
        description: "Efficient text processing and data structures"
      },
      edgeCases: {
        points: 25,
        description: "Handles punctuation, case sensitivity, and file errors"
      }
    }
  }
];

/**
 * Seed sample assignments into localStorage
 * Call this function on first app load or via a button
 */
export function seedSampleAssignments() {
  if (typeof window === 'undefined') return;
  
  try {
    const existingData = localStorage.getItem('autograder_assignments');
    const existingAssignments = existingData ? JSON.parse(existingData) : [];
    
    // Only seed if no assignments exist
    if (existingAssignments.length === 0) {
      const now = new Date();
      const assignmentsWithIds = sampleAssignments.map((assignment, index) => ({
        ...assignment,
        id: `sample-${index + 1}`,
        createdAt: now,
        updatedAt: now,
      }));
      
      localStorage.setItem('autograder_assignments', JSON.stringify(assignmentsWithIds));
      console.log(`Seeded ${assignmentsWithIds.length} sample assignments`);
      return assignmentsWithIds.length;
    }
    
    return 0;
  } catch (error) {
    console.error('Error seeding sample assignments:', error);
    return 0;
  }
}
