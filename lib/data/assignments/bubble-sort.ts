import type { Assignment } from '../../types';

export const bubbleSortAssignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Bubble Sort Implementation',
  language: 'python',
  description: 'Implement bubble sort algorithm to understand the compare-and-swap technique for sorting.',
  instructions: `# Bubble Sort Implementation

## Problem Statement

Implement the **bubble sort** algorithm to sort a list of integers in ascending order. Bubble sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order.

### Algorithm Description

Bubble sort makes multiple passes through the list:
1. Compare each pair of adjacent elements
2. Swap them if they are in the wrong order (left > right)
3. After each pass, the largest unsorted element "bubbles up" to its correct position
4. Repeat until no swaps are needed (list is sorted)

## Visual Example

**Input:** \`[64, 34, 25, 12, 22]\`

**Pass 1:**
- Compare 64 & 34 → Swap → \`[34, 64, 25, 12, 22]\`
- Compare 64 & 25 → Swap → \`[34, 25, 64, 12, 22]\`
- Compare 64 & 12 → Swap → \`[34, 25, 12, 64, 22]\`
- Compare 64 & 22 → Swap → \`[34, 25, 12, 22, 64]\`
- Result: **64 is now in correct position**

**Pass 2:** Repeat for remaining elements...

**Output:** \`[12, 22, 25, 34, 64]\`

## Test Cases

\`\`\`python
bubble_sort([64, 34, 25, 12, 22])  # Expected: [12, 22, 25, 34, 64]
bubble_sort([5, 4, 3, 2, 1])       # Expected: [1, 2, 3, 4, 5]
bubble_sort([1, 2, 3, 4, 5])       # Expected: [1, 2, 3, 4, 5]
bubble_sort([3, 1, 4, 1, 5, 9])    # Expected: [1, 1, 3, 4, 5, 9]
bubble_sort([])                    # Expected: []
\`\`\`

## Algorithm Steps

1. **Outer loop**: Iterate through the list n-1 times
2. **Inner loop**: Compare adjacent elements from start to unsorted end
3. **Compare & Swap**: If \`arr[j] > arr[j+1]\`, swap them
4. **Optimization**: Track if swaps occurred; if not, list is sorted

## Pseudocode

\`\`\`
for i from 0 to n-1:
    swapped = false
    for j from 0 to n-i-2:
        if arr[j] > arr[j+1]:
            swap arr[j] and arr[j+1]
            swapped = true
    if not swapped:
        break
\`\`\`

## Performance

| Metric | Value |
|--------|-------|
| **Time (Best)** | O(n) - Already sorted |
| **Time (Average)** | O(n²) |
| **Time (Worst)** | O(n²) - Reverse sorted |
| **Space** | O(1) - In-place |

## Grading Rubric (100 points)

- **Correctness (50 pts)**: Sorts all test cases correctly
- **Algorithm (25 pts)**: Proper nested loops and swapping
- **Code Quality (15 pts)**: Clean, readable code
- **Documentation (10 pts)**: Docstring and comments
`,
  starterCode: `def bubble_sort(arr: list[int]) -> list[int]:
    """
    Sort a list using bubble sort algorithm.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
    """
    n = len(arr)
    
    # TODO: Implement outer loop
    for i in range(n):
        swapped = False
        
        # TODO: Implement inner loop (compare adjacent pairs)
        for j in range(n - i - 1):
            # TODO: Compare and swap if needed
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # Optimization: exit if no swaps
        if not swapped:
            break
    
    return arr


# Test your implementation
if __name__ == "__main__":
    print(bubble_sort([64, 34, 25, 12, 22]))
    print(bubble_sort([5, 4, 3, 2, 1]))
    print(bubble_sort([1, 2, 3, 4, 5]))
`,
  testCases: [
    { input: '[64, 34, 25, 12, 22]', expectedOutput: '[12, 22, 25, 34, 64]', points: 20 },
    { input: '[5, 4, 3, 2, 1]', expectedOutput: '[1, 2, 3, 4, 5]', points: 20 },
    { input: '[1, 2, 3, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]', points: 20 },
    { input: '[3, 1, 4, 1, 5, 9]', expectedOutput: '[1, 1, 3, 4, 5, 9]', points: 20 },
    { input: '[]', expectedOutput: '[]', points: 20 },
  ],
  rubric: {
    correctness: 50,
    algorithmImplementation: 25,
    codeQuality: 15,
    documentation: 10,
  },
  maxScore: 100,
  isSample: true,
  tags: ['sorting', 'bubble-sort', 'beginner'],
};
