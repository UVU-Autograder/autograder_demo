import type { Assignment } from '../types';

/**
 * Sample assignments focused on sorting algorithms
 * Each assignment is ~200-300 lines with clear problem statements,
 * examples, implementation hints, and detailed rubrics.
 */

export const sampleAssignments: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Assignment 1: Bubble Sort
  {
    title: 'Bubble Sort Implementation',
    language: 'python',
    description: 'Implement the bubble sort algorithm to sort a list of integers in ascending order, understanding the compare-and-swap technique.',
    instructions: `# Bubble Sort Implementation

## Problem Statement

Implement the **bubble sort** algorithm to sort a list of integers in ascending order. Bubble sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order.

### Algorithm Description

Bubble sort makes multiple passes through the list:
1. Compare each pair of adjacent elements
2. Swap them if they are in the wrong order (left > right)
3. After each pass, the largest unsorted element "bubbles up" to its correct position
4. Repeat until no swaps are needed (list is sorted)

### Why "Bubble" Sort?

The largest elements bubble up to the end of the list, like bubbles rising to the surface of water.

## Visual Example

**Input:** \`[64, 34, 25, 12, 22, 11, 90]\`

**Pass 1:**
- Compare 64 & 34 → Swap → \`[34, 64, 25, 12, 22, 11, 90]\`
- Compare 64 & 25 → Swap → \`[34, 25, 64, 12, 22, 11, 90]\`
- Compare 64 & 12 → Swap → \`[34, 25, 12, 64, 22, 11, 90]\`
- Compare 64 & 22 → Swap → \`[34, 25, 12, 22, 64, 11, 90]\`
- Compare 64 & 11 → Swap → \`[34, 25, 12, 22, 11, 64, 90]\`
- Compare 64 & 90 → No swap
- Result: **90 is now in correct position**

**Pass 2:** Repeat for remaining elements...

**Output:** \`[11, 12, 22, 25, 34, 64, 90]\`

## Test Cases

\`\`\`python
# Test 1: Random unsorted list
bubble_sort([64, 34, 25, 12, 22, 11, 90])
# Expected: [11, 12, 22, 25, 34, 64, 90]

# Test 2: Already sorted
bubble_sort([1, 2, 3, 4, 5])
# Expected: [1, 2, 3, 4, 5]

# Test 3: Reverse sorted
bubble_sort([5, 4, 3, 2, 1])
# Expected: [1, 2, 3, 4, 5]

# Test 4: Duplicates
bubble_sort([3, 1, 4, 1, 5, 9, 2, 6])
# Expected: [1, 1, 2, 3, 4, 5, 6, 9]

# Test 5: Single element
bubble_sort([42])
# Expected: [42]

# Test 6: Empty list
bubble_sort([])
# Expected: []

# Test 7: Negative numbers
bubble_sort([-5, 3, -2, 8, -1, 0])
# Expected: [-5, -2, -1, 0, 3, 8]
\`\`\`

## Implementation Requirements

### Function Signature
\`\`\`python
def bubble_sort(arr: list[int]) -> list[int]:
    """
    Sort a list of integers using bubble sort algorithm.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
    """
\`\`\`

### Algorithm Steps

1. **Outer loop**: Iterate through the list n-1 times (where n = length)
2. **Inner loop**: Compare adjacent elements from start to unsorted end
3. **Compare & Swap**: If \`arr[j] > arr[j+1]\`, swap them
4. **Optimization**: Track if any swaps occurred; if not, list is sorted (early exit)

### Pseudocode
\`\`\`
function bubble_sort(arr):
    n = length of arr
    
    for i from 0 to n-1:
        swapped = false
        
        for j from 0 to n-i-2:
            if arr[j] > arr[j+1]:
                swap arr[j] and arr[j+1]
                swapped = true
        
        if not swapped:
            break  // Already sorted
    
    return arr
\`\`\`

## Performance Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity (Worst)** | O(n²) - Reverse sorted list |
| **Time Complexity (Best)** | O(n) - Already sorted (with optimization) |
| **Time Complexity (Average)** | O(n²) |
| **Space Complexity** | O(1) - In-place sorting |
| **Stable** | Yes - Equal elements maintain relative order |

## Common Mistakes to Avoid

1. **Off-by-one errors**: Inner loop should go to \`n-i-2\`, not \`n-i-1\`
2. **Forgetting optimization**: Without swap tracking, always runs O(n²)
3. **Not handling edge cases**: Empty list or single element
4. **Wrong comparison**: Use \`>\` for ascending, \`<\` for descending

## Grading Rubric (100 points)

### Correctness (50 points)
- Sorts random unsorted list correctly (10 pts)
- Handles already sorted list (5 pts)
- Handles reverse sorted list (10 pts)
- Handles duplicates correctly (10 pts)
- Handles edge cases (empty, single element) (10 pts)
- Handles negative numbers (5 pts)

### Algorithm Implementation (25 points)
- Correct nested loop structure (10 pts)
- Proper comparison and swapping logic (10 pts)
- Optimization (early exit if no swaps) (5 pts)

### Code Quality (15 points)
- Clean, readable code (5 pts)
- Proper variable names (5 pts)
- Follows Python conventions (5 pts)

### Documentation (10 points)
- Function docstring present (5 pts)
- Inline comments for key steps (5 pts)

---

**Time Limit:** 60 minutes  
**Difficulty:** Beginner-Intermediate
`,
    starterCode: `def bubble_sort(arr: list[int]) -> list[int]:
    """
    Sort a list of integers using bubble sort algorithm.
    
    Bubble sort works by repeatedly stepping through the list,
    comparing adjacent elements and swapping them if they're in wrong order.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
        
    Time Complexity: O(n²) average and worst case, O(n) best case
    Space Complexity: O(1) - sorts in-place
    
    Example:
        >>> bubble_sort([64, 34, 25, 12, 22, 11, 90])
        [11, 12, 22, 25, 34, 64, 90]
    """
    n = len(arr)
    
    # TODO: Implement outer loop (n-1 passes)
    for i in range(n):
        swapped = False
        
        # TODO: Implement inner loop (compare adjacent pairs)
        # Hint: Range should be from 0 to n-i-1
        for j in range(n - i - 1):
            # TODO: Compare adjacent elements and swap if needed
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # Optimization: If no swaps occurred, list is sorted
        if not swapped:
            break
    
    return arr


def test_bubble_sort():
    """Test bubble sort with various cases."""
    print("Testing Bubble Sort...")
    
    # Test 1: Random list
    assert bubble_sort([64, 34, 25, 12, 22, 11, 90]) == [11, 12, 22, 25, 34, 64, 90]
    print("✓ Test 1 passed: Random unsorted list")
    
    # Test 2: Already sorted
    assert bubble_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
    print("✓ Test 2 passed: Already sorted")
    
    # Test 3: Reverse sorted
    assert bubble_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]
    print("✓ Test 3 passed: Reverse sorted")
    
    # Test 4: Duplicates
    assert bubble_sort([3, 1, 4, 1, 5, 9, 2, 6]) == [1, 1, 2, 3, 4, 5, 6, 9]
    print("✓ Test 4 passed: List with duplicates")
    
    # Test 5: Single element
    assert bubble_sort([42]) == [42]
    print("✓ Test 5 passed: Single element")
    
    # Test 6: Empty list
    assert bubble_sort([]) == []
    print("✓ Test 6 passed: Empty list")
    
    # Test 7: Negative numbers
    assert bubble_sort([-5, 3, -2, 8, -1, 0]) == [-5, -2, -1, 0, 3, 8]
    print("✓ Test 7 passed: Negative numbers")
    
    print("\\n✅ All tests passed!")


if __name__ == "__main__":
    test_bubble_sort()
`,
    testCases: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', expectedOutput: '[11, 12, 22, 25, 34, 64, 90]', points: 15 },
      { input: '[5, 4, 3, 2, 1]', expectedOutput: '[1, 2, 3, 4, 5]', points: 15 },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]', points: 10 },
      { input: '[3, 1, 4, 1, 5, 9, 2, 6]', expectedOutput: '[1, 1, 2, 3, 4, 5, 6, 9]', points: 15 },
      { input: '[-5, 3, -2, 8, -1, 0]', expectedOutput: '[-5, -2, -1, 0, 3, 8]', points: 10 },
      { input: '[42]', expectedOutput: '[42]', points: 10 },
      { input: '[]', expectedOutput: '[]', points: 10 },
      { input: '[100, 99, 98, ...large dataset]', expectedOutput: '[1, 2, 3, ...sorted]', points: 15 },
    ],
    rubric: {
      correctness: 50,
      algorithmImplementation: 25,
      codeQuality: 15,
      documentation: 10,
    },
    maxScore: 100,
    isSample: true,
    tags: ['sorting', 'algorithms', 'bubble-sort', 'basic'],
  },

  // Assignment 2: Selection Sort
  {
    title: 'Selection Sort Implementation',
    language: 'python',
    description: 'Implement selection sort algorithm by repeatedly finding the minimum element and placing it at the beginning.',
    instructions: `# Selection Sort Implementation

## Problem Statement

Implement the **selection sort** algorithm to sort a list of integers in ascending order. Selection sort divides the list into sorted and unsorted regions, repeatedly selecting the minimum element from the unsorted region and moving it to the sorted region.

### Algorithm Description

Selection sort works by:
1. Find the minimum element in the unsorted portion
2. Swap it with the first unsorted element
3. Move the boundary between sorted and unsorted portions one position right
4. Repeat until entire list is sorted

## Visual Example

**Input:** \`[64, 25, 12, 22, 11]\`

**Pass 1:** Find min in \`[64, 25, 12, 22, 11]\` → 11  
Swap 64 ↔ 11: \`[11, 25, 12, 22, 64]\`

**Pass 2:** Find min in \`[25, 12, 22, 64]\` → 12  
Swap 25 ↔ 12: \`[11, 12, 25, 22, 64]\`

**Pass 3:** Find min in \`[25, 22, 64]\` → 22  
Swap 25 ↔ 22: \`[11, 12, 22, 25, 64]\`

**Pass 4:** Find min in \`[25, 64]\` → 25  
No swap needed: \`[11, 12, 22, 25, 64]\`

**Output:** \`[11, 12, 22, 25, 64]\`

## Test Cases

\`\`\`python
# Test 1: Random unsorted list
selection_sort([64, 25, 12, 22, 11])
# Expected: [11, 12, 22, 25, 64]

# Test 2: Already sorted
selection_sort([1, 2, 3, 4, 5])
# Expected: [1, 2, 3, 4, 5]

# Test 3: Reverse sorted
selection_sort([9, 7, 5, 3, 1])
# Expected: [1, 3, 5, 7, 9]

# Test 4: Duplicates
selection_sort([4, 2, 4, 1, 3, 2])
# Expected: [1, 2, 2, 3, 4, 4]

# Test 5: Negative numbers
selection_sort([-3, 5, -1, 0, 2, -4])
# Expected: [-4, -3, -1, 0, 2, 5]
\`\`\`

## Implementation Requirements

### Function Signature
\`\`\`python
def selection_sort(arr: list[int]) -> list[int]:
    """
    Sort a list using selection sort algorithm.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
    """
\`\`\`

### Algorithm Steps

1. **Outer loop**: Iterate from 0 to n-2 (i = current sorted boundary)
2. **Find minimum**: Search unsorted portion \`[i...n-1]\` for minimum element
3. **Track index**: Remember position of minimum element
4. **Swap**: Exchange minimum with element at position i
5. **Repeat**: Continue until all elements processed

### Pseudocode
\`\`\`
function selection_sort(arr):
    n = length of arr
    
    for i from 0 to n-2:
        min_index = i
        
        for j from i+1 to n-1:
            if arr[j] < arr[min_index]:
                min_index = j
        
        if min_index != i:
            swap arr[i] and arr[min_index]
    
    return arr
\`\`\`

## Performance Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O(n²) - Always, regardless of input |
| **Space Complexity** | O(1) - In-place sorting |
| **Stable** | No - Can change relative order of equal elements |
| **Comparisons** | n(n-1)/2 - Always the same |
| **Swaps** | O(n) - At most n swaps |

### Advantages
- Simple to understand and implement
- Performs well on small lists
- Minimizes number of swaps (useful if swaps are expensive)

### Disadvantages
- O(n²) time complexity even for nearly sorted lists
- Not stable (equal elements may change order)

## Common Mistakes

1. **Wrong range**: Inner loop should start at \`i+1\`, not \`i\`
2. **Swapping too early**: Only swap after finding minimum
3. **Unnecessary swaps**: Check if \`min_index != i\` before swapping
4. **Wrong comparison**: Use \`<\` for ascending order

## Grading Rubric (100 points)

### Correctness (50 points)
- Sorts random unsorted list (10 pts)
- Handles already sorted list (5 pts)
- Handles reverse sorted list (10 pts)
- Handles duplicates (10 pts)
- Handles negative numbers (10 pts)
- Edge cases (empty, single) (5 pts)

### Algorithm Implementation (30 points)
- Correct outer loop (10 pts)
- Correct minimum finding logic (10 pts)
- Proper swapping mechanism (10 pts)

### Code Quality (12 points)
- Clean, readable code (4 pts)
- Proper variable names (4 pts)
- Python conventions (4 pts)

### Documentation (8 points)
- Function docstring (4 pts)
- Inline comments (4 pts)

---

**Time Limit:** 45 minutes  
**Difficulty:** Beginner
`,
    starterCode: `def selection_sort(arr: list[int]) -> list[int]:
    """
    Sort a list using selection sort algorithm.
    
    Selection sort repeatedly finds the minimum element from unsorted portion
    and places it at the beginning of the unsorted region.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
        
    Time Complexity: O(n²) - always
    Space Complexity: O(1) - in-place sorting
    
    Example:
        >>> selection_sort([64, 25, 12, 22, 11])
        [11, 12, 22, 25, 64]
    """
    n = len(arr)
    
    # TODO: Implement outer loop
    for i in range(n - 1):
        # Assume current element is minimum
        min_index = i
        
        # TODO: Find minimum in unsorted portion
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # TODO: Swap minimum with first unsorted element
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr


def test_selection_sort():
    """Test selection sort with various cases."""
    print("Testing Selection Sort...")
    
    assert selection_sort([64, 25, 12, 22, 11]) == [11, 12, 22, 25, 64]
    print("✓ Test 1 passed")
    
    assert selection_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
    print("✓ Test 2 passed")
    
    assert selection_sort([9, 7, 5, 3, 1]) == [1, 3, 5, 7, 9]
    print("✓ Test 3 passed")
    
    assert selection_sort([4, 2, 4, 1, 3, 2]) == [1, 2, 2, 3, 4, 4]
    print("✓ Test 4 passed")
    
    assert selection_sort([-3, 5, -1, 0, 2, -4]) == [-4, -3, -1, 0, 2, 5]
    print("✓ Test 5 passed")
    
    print("\\n✅ All tests passed!")


if __name__ == "__main__":
    test_selection_sort()
`,
    testCases: [
      { input: '[64, 25, 12, 22, 11]', expectedOutput: '[11, 12, 22, 25, 64]', points: 20 },
      { input: '[9, 7, 5, 3, 1]', expectedOutput: '[1, 3, 5, 7, 9]', points: 20 },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]', points: 15 },
      { input: '[4, 2, 4, 1, 3, 2]', expectedOutput: '[1, 2, 2, 3, 4, 4]', points: 20 },
      { input: '[-3, 5, -1, 0, 2, -4]', expectedOutput: '[-4, -3, -1, 0, 2, 5]', points: 25 },
    ],
    rubric: {
      correctness: 50,
      algorithmImplementation: 30,
      codeQuality: 12,
      documentation: 8,
    },
    maxScore: 100,
    isSample: true,
    tags: ['sorting', 'algorithms', 'selection-sort', 'basic'],
  },

  // Assignment 3: Insertion Sort
  {
    title: 'Insertion Sort Implementation',
    language: 'python',
    description: 'Implement insertion sort by building a sorted array one element at a time, inserting each new element into its correct position.',
    instructions: `# Insertion Sort Implementation

## Problem Statement

Implement the **insertion sort** algorithm to sort a list of integers in ascending order. Insertion sort builds the final sorted array one item at a time by repeatedly taking elements from the unsorted portion and inserting them into their correct position in the sorted portion.

### Algorithm Description

Think of how you sort playing cards in your hand:
1. Start with one card (already "sorted")
2. Pick up the next card
3. Insert it into the correct position among the cards you're already holding
4. Repeat until all cards are picked up

## Visual Example

**Input:** \`[12, 11, 13, 5, 6]\`

**Initial:** \`[12] | 11, 13, 5, 6\` (sorted | unsorted)

**Step 1:** Insert 11  
Compare: 11 < 12 → shift 12 right  
Result: \`[11, 12] | 13, 5, 6\`

**Step 2:** Insert 13  
Compare: 13 > 12 → place after 12  
Result: \`[11, 12, 13] | 5, 6\`

**Step 3:** Insert 5  
Compare: 5 < 13, 5 < 12, 5 < 11 → shift all  
Result: \`[5, 11, 12, 13] | 6\`

**Step 4:** Insert 6  
Compare: 6 > 5, 6 < 11 → insert between  
Result: \`[5, 6, 11, 12, 13]\`

**Output:** \`[5, 6, 11, 12, 13]\`

## Test Cases

\`\`\`python
# Test 1: Random list
insertion_sort([12, 11, 13, 5, 6])
# Expected: [5, 6, 11, 12, 13]

# Test 2: Nearly sorted
insertion_sort([1, 3, 2, 4, 5])
# Expected: [1, 2, 3, 4, 5]

# Test 3: Reverse sorted
insertion_sort([5, 4, 3, 2, 1])
# Expected: [1, 2, 3, 4, 5]

# Test 4: Duplicates
insertion_sort([3, 1, 4, 1, 5, 9, 2, 6, 5])
# Expected: [1, 1, 2, 3, 4, 5, 5, 6, 9]

# Test 5: Negative numbers
insertion_sort([0, -5, 3, -2, 8, -1])
# Expected: [-5, -2, -1, 0, 3, 8]
\`\`\`

## Implementation Requirements

### Function Signature
\`\`\`python
def insertion_sort(arr: list[int]) -> list[int]:
    """
    Sort a list using insertion sort algorithm.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
    """
\`\`\`

### Algorithm Steps

1. **Start at index 1** (assume first element is sorted)
2. **Store current element** as key
3. **Compare with sorted portion** (elements before current)
4. **Shift larger elements right** to make space
5. **Insert key** at correct position
6. **Repeat** for all remaining elements

### Pseudocode
\`\`\`
function insertion_sort(arr):
    n = length of arr
    
    for i from 1 to n-1:
        key = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]  // Shift right
            j = j - 1
        
        arr[j + 1] = key  // Insert key
    
    return arr
\`\`\`

## Performance Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity (Best)** | O(n) - Already sorted |
| **Time Complexity (Average)** | O(n²) |
| **Time Complexity (Worst)** | O(n²) - Reverse sorted |
| **Space Complexity** | O(1) - In-place sorting |
| **Stable** | Yes - Maintains relative order |

### When to Use
- **Small datasets** (< 50 elements)
- **Nearly sorted data** (performs close to O(n))
- **Online sorting** (can sort data as it arrives)
- **Stable sort needed** (preserves order of equal elements)

### Advantages
- Simple implementation
- Efficient for small datasets
- Adaptive (faster on nearly sorted data)
- Stable sorting algorithm
- In-place (no extra memory needed)

## Common Mistakes

1. **Starting at index 0**: Should start at index 1 (first element already "sorted")
2. **Wrong while condition**: Must check \`j >= 0\` AND \`arr[j] > key\`
3. **Off-by-one in insertion**: Insert at \`j + 1\`, not \`j\`
4. **Forgetting to store key**: Must save \`arr[i]\` before shifting

## Grading Rubric (100 points)

### Correctness (50 points)
- Sorts random list correctly (10 pts)
- Handles nearly sorted list efficiently (10 pts)
- Handles reverse sorted list (10 pts)
- Handles duplicates (10 pts)
- Handles negative numbers (5 pts)
- Edge cases (empty, single) (5 pts)

### Algorithm Implementation (30 points)
- Correct outer loop starting at 1 (8 pts)
- Proper key extraction (6 pts)
- Correct while loop conditions (8 pts)
- Proper shifting and insertion (8 pts)

### Code Quality (12 points)
- Clean, readable code (4 pts)
- Proper variable names (4 pts)
- Python conventions (4 pts)

### Documentation (8 points)
- Function docstring (4 pts)
- Inline comments (4 pts)

---

**Time Limit:** 45 minutes  
**Difficulty:** Beginner-Intermediate
`,
    starterCode: `def insertion_sort(arr: list[int]) -> list[int]:
    """
    Sort a list using insertion sort algorithm.
    
    Insertion sort builds the sorted array one element at a time,
    by repeatedly inserting the next element into its correct position.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
        
    Time Complexity: O(n) best case, O(n²) average/worst
    Space Complexity: O(1) - in-place sorting
    
    Example:
        >>> insertion_sort([12, 11, 13, 5, 6])
        [5, 6, 11, 12, 13]
    """
    n = len(arr)
    
    # TODO: Start from second element (index 1)
    for i in range(1, n):
        key = arr[i]  # Current element to insert
        j = i - 1  # Start of sorted portion
        
        # TODO: Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]  # Shift right
            j -= 1
        
        # TODO: Insert key at correct position
        arr[j + 1] = key
    
    return arr


def test_insertion_sort():
    """Test insertion sort with various cases."""
    print("Testing Insertion Sort...")
    
    assert insertion_sort([12, 11, 13, 5, 6]) == [5, 6, 11, 12, 13]
    print("✓ Test 1 passed: Random list")
    
    assert insertion_sort([1, 3, 2, 4, 5]) == [1, 2, 3, 4, 5]
    print("✓ Test 2 passed: Nearly sorted")
    
    assert insertion_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]
    print("✓ Test 3 passed: Reverse sorted")
    
    assert insertion_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]) == [1, 1, 2, 3, 4, 5, 5, 6, 9]
    print("✓ Test 4 passed: Duplicates")
    
    assert insertion_sort([0, -5, 3, -2, 8, -1]) == [-5, -2, -1, 0, 3, 8]
    print("✓ Test 5 passed: Negative numbers")
    
    print("\\n✅ All tests passed!")


if __name__ == "__main__":
    test_insertion_sort()
`,
    testCases: [
      { input: '[12, 11, 13, 5, 6]', expectedOutput: '[5, 6, 11, 12, 13]', points: 20 },
      { input: '[1, 3, 2, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]', points: 20 },
      { input: '[5, 4, 3, 2, 1]', expectedOutput: '[1, 2, 3, 4, 5]', points: 20 },
      { input: '[3, 1, 4, 1, 5, 9, 2, 6, 5]', expectedOutput: '[1, 1, 2, 3, 4, 5, 5, 6, 9]', points: 20 },
      { input: '[0, -5, 3, -2, 8, -1]', expectedOutput: '[-5, -2, -1, 0, 3, 8]', points: 20 },
    ],
    rubric: {
      correctness: 50,
      algorithmImplementation: 30,
      codeQuality: 12,
      documentation: 8,
    },
    maxScore: 100,
    isSample: true,
    tags: ['sorting', 'algorithms', 'insertion-sort', 'intermediate'],
  },

  // Assignment 4: Merge Sort
  {
    title: 'Merge Sort Implementation',
    language: 'python',
    description: 'Implement the efficient divide-and-conquer merge sort algorithm with O(n log n) time complexity.',
    instructions: `# Merge Sort Implementation

## Problem Statement

Implement the **merge sort** algorithm using the divide-and-conquer paradigm. Merge sort is an efficient, stable sorting algorithm with guaranteed O(n log n) time complexity, making it suitable for large datasets.

### Algorithm Description

Merge sort follows the divide-and-conquer strategy:
1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort both halves
3. **Combine**: Merge the two sorted halves into one sorted array

## Visual Example

**Input:** \`[38, 27, 43, 3, 9, 82, 10]\`

\`\`\`
           [38, 27, 43, 3, 9, 82, 10]
                     /        \\
          [38, 27, 43, 3]   [9, 82, 10]
             /      \\          /     \\
        [38, 27]  [43, 3]   [9, 82]  [10]
         /   \\     /   \\     /   \\      |
       [38] [27] [43] [3]  [9] [82]  [10]
         \\   /     \\   /     \\   /      |
        [27, 38]  [3, 43]   [9, 82]  [10]
             \\      /          \\     /
          [3, 27, 38, 43]   [9, 10, 82]
                     \\        /
           [3, 9, 10, 27, 38, 43, 82]
\`\`\`

**Output:** \`[3, 9, 10, 27, 38, 43, 82]\`

## Test Cases

\`\`\`python
# Test 1: Random list
merge_sort([38, 27, 43, 3, 9, 82, 10])
# Expected: [3, 9, 10, 27, 38, 43, 82]

# Test 2: Already sorted
merge_sort([1, 2, 3, 4, 5])
# Expected: [1, 2, 3, 4, 5]

# Test 3: Reverse sorted
merge_sort([9, 7, 5, 3, 1])
# Expected: [1, 3, 5, 7, 9]

# Test 4: Duplicates
merge_sort([5, 2, 8, 2, 9, 1, 5, 5])
# Expected: [1, 2, 2, 5, 5, 5, 8, 9]

# Test 5: Large dataset
merge_sort(list(range(1000, 0, -1)))
# Expected: [1, 2, 3, ..., 1000]
\`\`\`

## Implementation Requirements

### Function Signatures

\`\`\`python
def merge_sort(arr: list[int]) -> list[int]:
    """Main merge sort function."""
    pass

def merge(left: list[int], right: list[int]) -> list[int]:
    """Merge two sorted arrays into one sorted array."""
    pass
\`\`\`

### Algorithm Steps

#### Merge Sort (Divide & Conquer)
1. **Base case**: If array has 0 or 1 element, it's already sorted
2. **Find middle**: Calculate midpoint
3. **Divide**: Split into left and right halves
4. **Recursively sort**: Sort left half and right half
5. **Merge**: Combine sorted halves

#### Merge (Combine)
1. Create result array
2. Compare elements from left and right
3. Add smaller element to result
4. Continue until one array is empty
5. Add remaining elements from other array

### Pseudocode

\`\`\`
function merge_sort(arr):
    if length(arr) <= 1:
        return arr
    
    mid = length(arr) // 2
    left = merge_sort(arr[0:mid])
    right = merge_sort(arr[mid:length])
    
    return merge(left, right)

function merge(left, right):
    result = []
    i = 0, j = 0
    
    while i < length(left) and j < length(right):
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

## Performance Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O(n log n) - Always |
| **Space Complexity** | O(n) - Requires extra space |
| **Stable** | Yes - Equal elements maintain order |
| **Adaptive** | No - Always O(n log n) |
| **Recursive** | Yes - Divide and conquer |

### Why O(n log n)?
- **Dividing**: log n levels (binary split)
- **Merging**: n comparisons per level
- **Total**: n × log n operations

### Advantages
- Guaranteed O(n log n) performance
- Stable sorting
- Predictable behavior
- Good for linked lists

### Disadvantages
- Requires O(n) extra space
- Not in-place
- Slower than quicksort in practice (cache performance)

## Common Mistakes

1. **Wrong base case**: Should return when len <= 1, not len == 0
2. **Off-by-one in split**: \`arr[:mid]\` and \`arr[mid:]\`, not \`arr[mid:]\` and \`arr[mid+1:]\`
3. **Forgetting remaining elements**: Must add leftover elements after main merge loop
4. **Not using <=**: Use \`left[i] <= right[j]\` for stability

## Grading Rubric (100 points)

### Correctness (40 points)
- Sorts random list correctly (10 pts)
- Handles already sorted (5 pts)
- Handles reverse sorted (10 pts)
- Handles duplicates (10 pts)
- Edge cases (empty, single, large) (5 pts)

### Algorithm Implementation (35 points)
- Correct base case (5 pts)
- Proper array splitting (10 pts)
- Correct recursive calls (10 pts)
- Proper merge logic (10 pts)

### Code Quality (15 points)
- Clean, readable code (5 pts)
- Proper variable names (5 pts)
- Python conventions (5 pts)

### Documentation (10 points)
- Function docstrings (5 pts)
- Inline comments (5 pts)

---

**Time Limit:** 60 minutes  
**Difficulty:** Intermediate-Advanced
`,
    starterCode: `def merge_sort(arr: list[int]) -> list[int]:
    """
    Sort a list using merge sort algorithm (divide and conquer).
    
    Merge sort divides the array into halves, recursively sorts them,
    and merges the sorted halves back together.
    
    Args:
        arr: List of integers to sort
        
    Returns:
        Sorted list in ascending order
        
    Time Complexity: O(n log n) - always
    Space Complexity: O(n) - requires extra space for merging
    
    Example:
        >>> merge_sort([38, 27, 43, 3, 9, 82, 10])
        [3, 9, 10, 27, 38, 43, 82]
    """
    # TODO: Base case - array with 0 or 1 element is already sorted
    if len(arr) <= 1:
        return arr
    
    # TODO: Find middle point
    mid = len(arr) // 2
    
    # TODO: Divide array into two halves
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
        
    Example:
        >>> merge([1, 3, 5], [2, 4, 6])
        [1, 2, 3, 4, 5, 6]
    """
    result = []
    i = j = 0
    
    # TODO: Compare elements from both arrays and add smaller to result
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # Use <= for stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # TODO: Add remaining elements (one array is empty)
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result


def test_merge_sort():
    """Test merge sort with various cases."""
    print("Testing Merge Sort...")
    
    assert merge_sort([38, 27, 43, 3, 9, 82, 10]) == [3, 9, 10, 27, 38, 43, 82]
    print("✓ Test 1 passed: Random list")
    
    assert merge_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
    print("✓ Test 2 passed: Already sorted")
    
    assert merge_sort([9, 7, 5, 3, 1]) == [1, 3, 5, 7, 9]
    print("✓ Test 3 passed: Reverse sorted")
    
    assert merge_sort([5, 2, 8, 2, 9, 1, 5, 5]) == [1, 2, 2, 5, 5, 5, 8, 9]
    print("✓ Test 4 passed: Duplicates")
    
    # Test large dataset
    large = list(range(100, 0, -1))
    assert merge_sort(large) == list(range(1, 101))
    print("✓ Test 5 passed: Large dataset")
    
    print("\\n✅ All tests passed!")


if __name__ == "__main__":
    test_merge_sort()
`,
    testCases: [
      { input: '[38, 27, 43, 3, 9, 82, 10]', expectedOutput: '[3, 9, 10, 27, 38, 43, 82]', points: 20 },
      { input: '[9, 7, 5, 3, 1]', expectedOutput: '[1, 3, 5, 7, 9]', points: 20 },
      { input: '[5, 2, 8, 2, 9, 1, 5, 5]', expectedOutput: '[1, 2, 2, 5, 5, 5, 8, 9]', points: 20 },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]', points: 20 },
      { input: 'range(100, 0, -1)', expectedOutput: 'range(1, 101)', points: 20 },
    ],
    rubric: {
      correctness: 40,
      algorithmImplementation: 35,
      codeQuality: 15,
      documentation: 10,
    },
    maxScore: 100,
    isSample: true,
    tags: ['sorting', 'algorithms', 'merge-sort', 'divide-conquer', 'recursion', 'advanced'],
  },

  // Assignment 5: Quick Sort
  {
    title: 'Quick Sort Implementation',
    language: 'python',
    description: 'Implement the efficient quick sort algorithm using partitioning and divide-and-conquer strategy.',
    instructions: `# Quick Sort Implementation

## Problem Statement

Implement the **quick sort** algorithm, one of the most efficient sorting algorithms in practice. Quick sort uses a divide-and-conquer strategy with a partitioning step to sort elements in-place.

### Algorithm Description

Quick sort works by:
1. **Choose a pivot**: Select an element as the pivot (often last element)
2. **Partition**: Rearrange array so elements < pivot are left, elements > pivot are right
3. **Recursively sort**: Apply quick sort to left and right partitions
4. **Combine**: No explicit combine needed (sorted in-place)

## Visual Example

**Input:** \`[10, 7, 8, 9, 1, 5]\`

\`\`\`
Choose pivot = 5

Partition: [1, 5, 8, 9, 7, 10]
           (elements < 5) | pivot | (elements > 5)
           
Left: [1]  (already sorted)
Right: [8, 9, 7, 10]
  Choose pivot = 10
  Partition: [8, 9, 7, 10]
  
  Left: [8, 9, 7]
    Choose pivot = 7
    Partition: [7, 9, 8]
    ...continues

Result: [1, 5, 7, 8, 9, 10]
\`\`\`

## Test Cases

\`\`\`python
# Test 1: Random list
quick_sort([10, 7, 8, 9, 1, 5])
# Expected: [1, 5, 7, 8, 9, 10]

# Test 2: Already sorted
quick_sort([1, 2, 3, 4, 5])
# Expected: [1, 2, 3, 4, 5]

# Test 3: Reverse sorted
quick_sort([10, 8, 6, 4, 2])
# Expected: [2, 4, 6, 8, 10]

# Test 4: Duplicates
quick_sort([3, 6, 3, 1, 6, 3])
# Expected: [1, 3, 3, 3, 6, 6]

# Test 5: Negative numbers
quick_sort([0, -3, 5, -1, 2, -4])
# Expected: [-4, -3, -1, 0, 2, 5]
\`\`\`

## Implementation Requirements

### Function Signatures

\`\`\`python
def quick_sort(arr: list[int]) -> list[int]:
    """Main quick sort function."""
    pass

def partition(arr: list[int], low: int, high: int) -> int:
    """Partition array and return pivot index."""
    pass
\`\`\`

### Algorithm Steps

#### Quick Sort
1. **Base case**: If low >= high, return (0 or 1 element)
2. **Partition**: Get pivot index from partition function
3. **Recursively sort left**: Elements before pivot
4. **Recursively sort right**: Elements after pivot

#### Partition (Lomuto Scheme)
1. Choose pivot (last element)
2. Track partition index (i)
3. For each element:
   - If < pivot, swap with partition index, increment i
4. Place pivot in correct position
5. Return pivot index

### Pseudocode

\`\`\`
function quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j from low to high - 1:
        if arr[j] < pivot:
            i += 1
            swap arr[i] and arr[j]
    
    swap arr[i + 1] and arr[high]
    return i + 1
\`\`\`

## Performance Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity (Best)** | O(n log n) - Balanced partitions |
| **Time Complexity (Average)** | O(n log n) |
| **Time Complexity (Worst)** | O(n²) - Already sorted |
| **Space Complexity** | O(log n) - Recursion stack |
| **Stable** | No - Can change relative order |
| **In-Place** | Yes - Sorts in original array |

### Advantages
- Very fast in practice (cache-friendly)
- In-place sorting (low memory)
- Good average-case performance

### Disadvantages
- Worst case O(n²) on sorted data
- Not stable
- Recursive (stack space)

## Common Mistakes

1. **Wrong pivot choice**: Must use consistent pivot (usually last element)
2. **Off-by-one in partition index**: Return \`i + 1\`, not \`i\`
3. **Wrong recursive calls**: Should be \`[low, pivot-1]\` and \`[pivot+1, high]\`
4. **Inclusive/exclusive confusion**: \`high\` is inclusive in partition
5. **Not swapping pivot**: Must place pivot at correct position

## Grading Rubric (100 points)

### Correctness (40 points)
- Sorts random list correctly (10 pts)
- Handles already sorted (8 pts)
- Handles reverse sorted (10 pts)
- Handles duplicates (7 pts)
- Edge cases (5 pts)

### Algorithm Implementation (35 points)
- Correct base case (5 pts)
- Proper partition logic (15 pts)
- Correct recursive calls (10 pts)
- Proper pivot placement (5 pts)

### Code Quality (15 points)
- Clean, readable code (5 pts)
- Proper variable names (5 pts)
- Python conventions (5 pts)

### Documentation (10 points)
- Function docstrings (5 pts)
- Inline comments (5 pts)

---

**Time Limit:** 75 minutes  
**Difficulty:** Advanced
`,
    starterCode: `def quick_sort(arr: list[int], low: int = 0, high: int = None) -> list[int]:
    """
    Sort a list using quick sort algorithm.
    
    Quick sort uses divide-and-conquer with partitioning.
    Picks a pivot and partitions array around it.
    
    Args:
        arr: List of integers to sort
        low: Starting index (default 0)
        high: Ending index (default len(arr)-1)
        
    Returns:
        Sorted list in ascending order
        
    Time Complexity: O(n log n) average, O(n²) worst
    Space Complexity: O(log n) - recursion stack
    
    Example:
        >>> quick_sort([10, 7, 8, 9, 1, 5])
        [1, 5, 7, 8, 9, 10]
    """
    if high is None:
        high = len(arr) - 1
    
    # TODO: Base case - if low >= high, return
    if low < high:
        # TODO: Get pivot index from partition
        pivot_index = partition(arr, low, high)
        
        # TODO: Recursively sort left partition
        quick_sort(arr, low, pivot_index - 1)
        
        # TODO: Recursively sort right partition
        quick_sort(arr, pivot_index + 1, high)
    
    return arr


def partition(arr: list[int], low: int, high: int) -> int:
    """
    Partition array around pivot (Lomuto partition scheme).
    
    Places elements smaller than pivot on left,
    elements greater on right.
    
    Args:
        arr: Array to partition
        low: Starting index
        high: Ending index (pivot is arr[high])
        
    Returns:
        Final position of pivot
        
    Example:
        >>> arr = [10, 7, 8, 9, 1, 5]
        >>> partition(arr, 0, 5)  # pivot=5
        1  # pivot now at index 1
        >>> arr
        [1, 5, 8, 9, 7, 10]
    """
    # TODO: Choose pivot (last element)
    pivot = arr[high]
    
    # TODO: Track partition index
    i = low - 1
    
    # TODO: Iterate and partition
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # TODO: Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    
    return i + 1


def test_quick_sort():
    """Test quick sort with various cases."""
    print("Testing Quick Sort...")
    
    assert quick_sort([10, 7, 8, 9, 1, 5]) == [1, 5, 7, 8, 9, 10]
    print("✓ Test 1 passed: Random list")
    
    assert quick_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
    print("✓ Test 2 passed: Already sorted")
    
    assert quick_sort([10, 8, 6, 4, 2]) == [2, 4, 6, 8, 10]
    print("✓ Test 3 passed: Reverse sorted")
    
    assert quick_sort([3, 6, 3, 1, 6, 3]) == [1, 3, 3, 3, 6, 6]
    print("✓ Test 4 passed: Duplicates")
    
    assert quick_sort([0, -3, 5, -1, 2, -4]) == [-4, -3, -1, 0, 2, 5]
    print("✓ Test 5 passed: Negative numbers")
    
    print("\\n✅ All tests passed!")


if __name__ == "__main__":
    test_quick_sort()
`,
    testCases: [
      { input: '[10, 7, 8, 9, 1, 5]', expectedOutput: '[1, 5, 7, 8, 9, 10]', points: 20 },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]', points: 20 },
      { input: '[10, 8, 6, 4, 2]', expectedOutput: '[2, 4, 6, 8, 10]', points: 20 },
      { input: '[3, 6, 3, 1, 6, 3]', expectedOutput: '[1, 3, 3, 3, 6, 6]', points: 20 },
      { input: '[0, -3, 5, -1, 2, -4]', expectedOutput: '[-4, -3, -1, 0, 2, 5]', points: 20 },
    ],
    rubric: {
      correctness: 40,
      algorithmImplementation: 35,
      codeQuality: 15,
      documentation: 10,
    },
    maxScore: 100,
    isSample: true,
    tags: ['sorting', 'algorithms', 'quick-sort', 'divide-conquer', 'recursion', 'advanced'],
  },
];
