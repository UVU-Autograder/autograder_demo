import type { Assignment } from '../../types';

export const insertionSortAssignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Insertion Sort Implementation',
  language: 'python',
  description: 'Implement insertion sort by building a sorted array one element at a time.',
  instructions: `# Insertion Sort Implementation

## Problem Statement

Implement the **insertion sort** algorithm to sort a list of integers. Insertion sort builds the sorted array by repeatedly taking elements from the unsorted portion and inserting them into their correct position.

### Algorithm Description

Think of sorting playing cards:
1. Start with one card (already "sorted")
2. Pick up the next card
3. Insert it into the correct position among cards you're holding
4. Repeat until all cards are picked up

## Visual Example

**Input:** \`[12, 11, 13, 5, 6]\`

\`\`\`
[12] | 11, 13, 5, 6         (sorted | unsorted)
[11, 12] | 13, 5, 6          Insert 11
[11, 12, 13] | 5, 6          Insert 13
[5, 11, 12, 13] | 6          Insert 5
[5, 6, 11, 12, 13]           Insert 6
\`\`\`

**Output:** \`[5, 6, 11, 12, 13]\`

## Test Cases

\`\`\`python
insertion_sort([12, 11, 13, 5, 6])  # Expected: [5, 6, 11, 12, 13]
insertion_sort([5, 4, 3, 2, 1])     # Expected: [1, 2, 3, 4, 5]
insertion_sort([1, 3, 2, 4, 5])     # Expected: [1, 2, 3, 4, 5]
insertion_sort([3, 1, 4, 1, 5])     # Expected: [1, 1, 3, 4, 5]
\`\`\`

## Algorithm Steps

1. **Start at index 1** (first element already "sorted")
2. **Store current element** as key
3. **Compare with sorted portion** (elements before current)
4. **Shift larger elements right** to make space
5. **Insert key** at correct position
6. **Repeat** for remaining elements

## Pseudocode

\`\`\`
for i from 1 to n-1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]  # Shift right
        j = j - 1
    arr[j + 1] = key  # Insert
\`\`\`

## Performance

| Metric | Value |
|--------|-------|
| **Time (Best)** | O(n) - Already sorted |
| **Time (Average)** | O(n²) |
| **Time (Worst)** | O(n²) - Reverse sorted |
| **Space** | O(1) - In-place |

## When to Use

- Small datasets (< 50 elements)
- Nearly sorted data (very efficient)
- Online sorting (sort data as it arrives)

## Grading Rubric (100 points)

- **Correctness (50 pts)**: Handles all test cases
- **Algorithm (30 pts)**: Proper insertion logic
- **Code Quality (12 pts)**: Clean implementation
- **Documentation (8 pts)**: Clear docstrings
`,
  starterCode: `def insertion_sort(arr: list[int]) -> list[int]:
    """
    Sort a list using insertion sort algorithm.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
    """
    n = len(arr)
    
    # TODO: Start from second element (index 1)
    for i in range(1, n):
        key = arr[i]  # Current element to insert
        j = i - 1     # Start of sorted portion
        
        # TODO: Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # TODO: Insert key at correct position
        arr[j + 1] = key
    
    return arr


# Test your implementation
if __name__ == "__main__":
    print(insertion_sort([12, 11, 13, 5, 6]))
    print(insertion_sort([5, 4, 3, 2, 1]))
    print(insertion_sort([1, 3, 2, 4, 5]))
`,
  testCases: [
    { input: '[12, 11, 13, 5, 6]', expectedOutput: '[5, 6, 11, 12, 13]', points: 25 },
    { input: '[5, 4, 3, 2, 1]', expectedOutput: '[1, 2, 3, 4, 5]', points: 25 },
    { input: '[1, 3, 2, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]', points: 25 },
    { input: '[3, 1, 4, 1, 5]', expectedOutput: '[1, 1, 3, 4, 5]', points: 25 },
  ],
  rubric: {
    correctness: 50,
    algorithmImplementation: 30,
    codeQuality: 12,
    documentation: 8,
  },
  maxScore: 100,
  isSample: true,
  tags: ['sorting', 'insertion-sort', 'intermediate'],
};
