import type { Assignment } from '../../types';

export const mergeSortAssignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Merge Sort Implementation',
  language: 'python',
  description: 'Implement efficient divide-and-conquer merge sort with O(n log n) complexity.',
  instructions: `# Merge Sort Implementation

## Problem Statement

Implement the **merge sort** algorithm using divide-and-conquer. Merge sort is an efficient, stable sorting algorithm with guaranteed O(n log n) time complexity.

### Algorithm Description

Merge sort follows divide-and-conquer:
1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort both halves
3. **Combine**: Merge the two sorted halves

## Visual Example

**Input:** \`[38, 27, 43, 3, 9]\`

\`\`\`
         [38, 27, 43, 3, 9]
              /        \\
      [38, 27, 43]   [3, 9]
        /     \\        /   \\
    [38, 27] [43]   [3]   [9]
     /   \\     |     |     |
   [38] [27] [43]   [3]   [9]
     \\   /     |     |     |
   [27, 38] [43]   [3]   [9]
       \\    /        \\   /
    [27, 38, 43]    [3, 9]
           \\        /
      [3, 9, 27, 38, 43]
\`\`\`

**Output:** \`[3, 9, 27, 38, 43]\`

## Test Cases

\`\`\`python
merge_sort([38, 27, 43, 3, 9])  # Expected: [3, 9, 27, 38, 43]
merge_sort([5, 4, 3, 2, 1])     # Expected: [1, 2, 3, 4, 5]
merge_sort([1, 2, 3, 4, 5])     # Expected: [1, 2, 3, 4, 5]
merge_sort([5, 2, 8, 2, 9])     # Expected: [2, 2, 5, 8, 9]
\`\`\`

## Implementation Requirements

You need two functions:

### merge_sort(arr)
1. **Base case**: If array has ≤1 element, return it
2. **Find middle**: Calculate midpoint
3. **Divide**: Split into left and right halves
4. **Recursively sort**: Sort both halves
5. **Merge**: Combine sorted halves

### merge(left, right)
1. Create result array
2. Compare elements from left and right
3. Add smaller element to result
4. Repeat until one array is empty
5. Add remaining elements

## Pseudocode

\`\`\`
function merge_sort(arr):
    if length(arr) <= 1:
        return arr
    mid = length(arr) // 2
    left = merge_sort(arr[0:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

function merge(left, right):
    result = []
    i = 0, j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

## Performance

| Metric | Value |
|--------|-------|
| **Time** | O(n log n) - Always |
| **Space** | O(n) - Requires extra space |
| **Stable** | Yes |

### Why O(n log n)?
- **Dividing**: log n levels (binary split)
- **Merging**: n comparisons per level
- **Total**: n × log n operations

## Grading Rubric (100 points)

- **Correctness (40 pts)**: Sorts all test cases
- **Algorithm (35 pts)**: Proper divide-and-conquer with merge
- **Code Quality (15 pts)**: Clean, readable
- **Documentation (10 pts)**: Docstrings
`,
  starterCode: `def merge_sort(arr: list[int]) -> list[int]:
    """
    Sort a list using merge sort (divide and conquer).
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
    """
    # TODO: Base case - array with 0 or 1 element
    if len(arr) <= 1:
        return arr
    
    # TODO: Find middle and divide
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # TODO: Recursively sort both halves
    left = merge_sort(left)
    right = merge_sort(right)
    
    # TODO: Merge the sorted halves
    return merge(left, right)


def merge(left: list[int], right: list[int]) -> list[int]:
    """
    Merge two sorted arrays into one sorted array.
    
    Args:
        left: First sorted array
        right: Second sorted array
        
    Returns:
        Merged sorted array
    """
    result = []
    i = j = 0
    
    # TODO: Compare and merge
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # TODO: Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result


# Test your implementation
if __name__ == "__main__":
    print(merge_sort([38, 27, 43, 3, 9]))
    print(merge_sort([5, 4, 3, 2, 1]))
`,
  testCases: [
    { input: '[38, 27, 43, 3, 9]', expectedOutput: '[3, 9, 27, 38, 43]', points: 25 },
    { input: '[5, 4, 3, 2, 1]', expectedOutput: '[1, 2, 3, 4, 5]', points: 25 },
    { input: '[1, 2, 3, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]', points: 25 },
    { input: '[5, 2, 8, 2, 9]', expectedOutput: '[2, 2, 5, 8, 9]', points: 25 },
  ],
  rubric: {
    correctness: 40,
    algorithmImplementation: 35,
    codeQuality: 15,
    documentation: 10,
  },
  maxScore: 100,
  isSample: true,
  tags: ['sorting', 'merge-sort', 'divide-conquer', 'recursion', 'advanced'],
};
