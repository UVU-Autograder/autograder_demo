import type { Assignment } from '@/lib/types';

/**
 * Enhanced sample assignments with rich descriptions and data structures/algorithms
 */
export const enhancedAssignments: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // DATA STRUCTURES - ARRAYS & LISTS
  {
    title: "Two Sum Problem",
    language: "python",
    description: "Classic algorithmic problem: Find two numbers in an array that add up to a target sum. Learn hash table optimization techniques.",
    instructions: `# Two Sum Problem - Hash Table Technique

## Problem Description
Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.
You may assume that each input has exactly one solution, and you may not use the same element twice.

## Examples
Example 1:
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] == 9, so return [0, 1]

Example 2:
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

## Constraints
- 2 <= len(nums) <= 10^4
- -10^9 <= nums[i] <= 10^9
- Only one valid answer exists

## Algorithm Strategy
Use a hash table (dictionary) to achieve O(n) time complexity:
1. Iterate through array once
2. For each number, calculate complement = target - current_number
3. Check if complement exists in hash table
4. If yes, return indices; if no, add current number to hash table

## Time Complexity Requirements
- Brute Force (nested loops): O(n²) - NOT acceptable
- Hash Table approach: O(n) - REQUIRED

## Rubric (100 points)
- Correctness (40 pts): Returns correct indices for all test cases
- Efficiency (30 pts): Uses O(n) hash table approach, not brute force
- Edge Cases (15 pts): Handles negative numbers, zero, duplicates
- Code Quality (15 pts): Clean code, proper variable names, comments`,
    starterCode: `def two_sum(nums, target):
    """
    Find two numbers that add up to target.
    
    Args:
        nums: List of integers
        target: Target sum
        
    Returns:
        List of two indices [i, j] where nums[i] + nums[j] == target
    """
    # TODO: Create hash table to store seen numbers
    seen = {}
    
    # TODO: Iterate through array
    for i, num in enumerate(nums):
        # TODO: Calculate complement
        complement = 0  # Fix this
        
        # TODO: Check if complement exists in hash table
        
        # TODO: Add current number to hash table
        
        pass
    
    return []  # Should never reach here if solution exists

# Test cases
print(two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(two_sum([3, 2, 4], 6))       # Expected: [1, 2]
print(two_sum([3, 3], 6))          # Expected: [0, 1]`,
    testCases: [
      {
        id: 1,
        input: "[2, 7, 11, 15], 9",
        expectedOutput: "[0, 1]",
        isHidden: false
      },
      {
        id: 2,
        input: "[3, 2, 4], 6",
        expectedOutput: "[1, 2]",
        isHidden: false
      },
      {
        id: 3,
        input: "[-1, -2, -3, -4, -5], -8",
        expectedOutput: "[2, 4]",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 40,
        description: "Returns correct pair of indices for all test cases"
      },
      efficiency: {
        points: 30,
        description: "Uses O(n) hash table solution, not O(n²) brute force"
      },
      edgeCases: {
        points: 15,
        description: "Handles negative numbers, zero, and duplicate values"
      },
      codeQuality: {
        points: 15,
        description: "Clean implementation with meaningful variable names"
      }
    }
  },

  // LINKED LIST PROBLEM
  {
    title: "Reverse Linked List",
    language: "python",
    description: "Implement linked list reversal using iterative approach. Master pointer manipulation and understand linked list fundamentals.",
    instructions: `# Reverse a Singly Linked List

## Problem Statement
Given the head of a singly linked list, reverse the list and return the reversed list's head.

## Visual Example
Input:  1 -> 2 -> 3 -> 4 -> 5 -> None
Output: 5 -> 4 -> 3 -> 2 -> 1 -> None

## Linked List Node Structure
\\\`\\\`\\\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
\\\`\\\`\\\`

## Algorithm Approach
Use three pointers to reverse links:
1. prev = None (will become new tail)
2. current = head (node we're currently processing)
3. next_node = current.next (temporarily store next node)

## Step-by-Step Process
For 1 -> 2 -> 3:
Step 1: prev=None, curr=1, next=2
        Reverse: 1 -> None, move pointers
Step 2: prev=1, curr=2, next=3
        Reverse: 2 -> 1, move pointers
Step 3: prev=2, curr=3, next=None
        Reverse: 3 -> 2, move pointers
Result: 3 -> 2 -> 1 -> None

## Requirements
- Modify links in-place (don't create new nodes)
- Return new head (originally the tail)
- Handle empty list (head = None)
- Handle single node list

## Time/Space Complexity
- Time: O(n) - visit each node once
- Space: O(1) - only use three pointers

## Grading Rubric (100 points)
- Correctness (50 pts): Successfully reverses all test lists
- In-Place Modification (20 pts): Doesn't create new nodes, modifies existing
- Edge Cases (15 pts): Handles empty and single-node lists
- Code Quality (15 pts): Clear pointer names, good comments`,
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head):
    """
    Reverse a singly linked list in-place.
    
    Args:
        head: ListNode, head of the linked list
        
    Returns:
        ListNode: head of the reversed list
    """
    # TODO: Initialize three pointers
    prev = None
    current = head
    
    # TODO: Iterate through list
    while current:
        # TODO: Store next node
        next_node = None  # Fix this
        
        # TODO: Reverse the link
        
        # TODO: Move pointers forward
        
        pass
    
    # TODO: Return new head (was the tail)
    return prev

# Helper function to print list
def print_list(head):
    values = []
    current = head
    while current:
        values.append(str(current.val))
        current = current.next
    print(" -> ".join(values) + " -> None")

# Test case
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
print("Original: ", end="")
print_list(head)
reversed_head = reverse_linked_list(head)
print("Reversed: ", end="")
print_list(reversed_head)`,
    testCases: [
      {
        id: 1,
        input: "[1, 2, 3, 4, 5]",
        expectedOutput: "[5, 4, 3, 2, 1]",
        isHidden: false
      },
      {
        id: 2,
        input: "[1, 2]",
        expectedOutput: "[2, 1]",
        isHidden: false
      },
      {
        id: 3,
        input: "[]",
        expectedOutput: "[]",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 50,
        description: "Correctly reverses linked list for all test cases"
      },
      efficiency: {
        points: 20,
        description: "In-place reversal using O(1) space (no new nodes created)"
      },
      edgeCases: {
        points: 15,
        description: "Properly handles empty list and single-node list"
      },
      codeQuality: {
        points: 15,
        description: "Clear pointer manipulation with descriptive variable names"
      }
    }
  },

  // STACK PROBLEM
  {
    title: "Valid Parentheses Checker",
    language: "python",
    description: "Use stack data structure to validate balanced brackets/parentheses. Essential for compiler design and expression parsing.",
    instructions: `# Valid Parentheses - Stack Application

## Problem Description
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

## Validity Rules
A string is valid if:
1. Open brackets must be closed by the same type of brackets
2. Open brackets must be closed in the correct order
3. Every close bracket has a corresponding open bracket of the same type

## Examples
Valid strings:
- "()" → True
- "()[]{}" → True
- "{[]}" → True
- "((()))" → True

Invalid strings:
- "(]" → False (wrong closing bracket)
- "([)]" → False (wrong order)
- "(((" → False (unclosed brackets)
- ")))" → False (no opening brackets)

## Algorithm - Stack Approach
1. Create empty stack
2. Iterate through each character:
   - If opening bracket: push to stack
   - If closing bracket:
     * Check if stack is empty (invalid)
     * Pop from stack and check if it matches
3. After iteration, stack should be empty

## Matching Pairs
- '(' matches ')'
- '[' matches ']'
- '{' matches '}'

## Time/Space Complexity
- Time: O(n) - single pass through string
- Space: O(n) - worst case all opening brackets

## Common Mistakes to Avoid
- Forgetting to check if stack is empty before popping
- Not checking if stack is empty at the end
- Not handling all bracket types

## Grading Rubric (100 points)
- Correctness (40 pts): Returns True/False correctly for all cases
- Stack Usage (30 pts): Properly uses stack data structure
- Edge Cases (15 pts): Handles empty string, unmatched brackets
- Code Quality (15 pts): Clean implementation with clear logic`,
    starterCode: `def is_valid_parentheses(s):
    """
    Check if string has valid balanced parentheses.
    
    Args:
        s: String containing only brackets: ()[]{}
        
    Returns:
        bool: True if valid, False otherwise
    """
    # TODO: Create stack (use Python list)
    stack = []
    
    # TODO: Create matching pairs dictionary
    matching = {
        ')': '(',
        ']': '[',
        '}': '{'
    }
    
    # TODO: Iterate through each character
    for char in s:
        # TODO: If opening bracket, push to stack
        if char in '([{':
            pass  # Fix this
        
        # TODO: If closing bracket
        elif char in ')]}':
            # Check if stack is empty
            
            # Pop and check if matches
            
            pass
    
    # TODO: Return True if stack is empty
    return len(stack) == 0

# Test cases
test_cases = [
    ("()", True),
    ("()[]{}", True),
    ("(]", False),
    ("([)]", False),
    ("{[]}", True),
    ("", True),
    ("((", False)
]

for brackets, expected in test_cases:
    result = is_valid_parentheses(brackets)
    status = "✓" if result == expected else "✗"
    print(f"{status} '{brackets}' → {result} (expected {expected})")`,
    testCases: [
      {
        id: 1,
        input: "()",
        expectedOutput: "True",
        isHidden: false
      },
      {
        id: 2,
        input: "()[]{}", 
        expectedOutput: "True",
        isHidden: false
      },
      {
        id: 3,
        input: "(]",
        expectedOutput: "False",
        isHidden: false
      },
      {
        id: 4,
        input: "([)]",
        expectedOutput: "False",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 40,
        description: "Correctly identifies valid and invalid bracket combinations"
      },
      efficiency: {
        points: 30,
        description: "Proper stack implementation with O(n) time complexity"
      },
      edgeCases: {
        points: 15,
        description: "Handles empty string, all opening, all closing brackets"
      },
      codeQuality: {
        points: 15,
        description: "Clean code with clear stack operations"
      }
    }
  },

  // BINARY SEARCH
  {
    title: "Binary Search Implementation",
    language: "python",
    description: "Implement classic binary search algorithm to efficiently find elements in sorted arrays. Foundation for many advanced algorithms.",
    instructions: `# Binary Search - Divide and Conquer

## Problem Statement
Given a sorted array of integers and a target value, return the index of the target if found. If not found, return -1.

## Algorithm Overview
Binary search works by repeatedly dividing the search interval in half:
1. Start with left = 0, right = len(array) - 1
2. Calculate middle index: mid = (left + right) // 2
3. Compare array[mid] with target:
   - If equal: found! Return mid
   - If array[mid] < target: search right half (left = mid + 1)
   - If array[mid] > target: search left half (right = mid - 1)
4. Repeat until found or left > right

## Visual Example
Array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
Target: 7

Step 1: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
        left=0, right=9, mid=4 (value=9)
        9 > 7, search left half

Step 2: [1, 3, 5, 7, 9]
        left=0, right=3, mid=1 (value=3)
        3 < 7, search right half

Step 3: [5, 7]
        left=2, right=3, mid=2 (value=5)
        5 < 7, search right half

Step 4: [7]
        left=3, right=3, mid=3 (value=7)
        7 == 7, FOUND at index 3!

## Time Complexity Analysis
- Best Case: O(1) - target is middle element
- Average Case: O(log n) - halve search space each iteration
- Worst Case: O(log n) - not found
- Space: O(1) - only use a few variables

## Comparison with Linear Search
Array size 1,000,000:
- Linear Search: Up to 1,000,000 comparisons
- Binary Search: Maximum 20 comparisons (log₂(1,000,000) ≈ 20)

## Important Notes
- Array MUST be sorted for binary search to work
- Works on any comparable data type
- Can be implemented iteratively or recursively

## Grading Rubric (100 points)
- Correctness (45 pts): Finds target when present, returns -1 when absent
- Algorithm (30 pts): Uses proper binary search logic (not linear search)
- Edge Cases (15 pts): Handles empty array, single element, duplicates
- Code Quality (10 pts): Clean implementation, good variable names`,
    starterCode: `def binary_search(arr, target):
    """
    Search for target in sorted array using binary search.
    
    Args:
        arr: Sorted list of integers
        target: Integer to find
        
    Returns:
        int: Index of target if found, -1 if not found
    """
    # TODO: Initialize left and right pointers
    left = 0
    right = len(arr) - 1
    
    # TODO: Loop while search space exists
    while left <= right:
        # TODO: Calculate middle index
        mid = (left + right) // 2
        
        # TODO: Check if we found target
        if arr[mid] == target:
            return mid
        
        # TODO: Decide which half to search
        elif arr[mid] < target:
            # Search right half
            left = mid + 1
        else:
            # Search left half
            right = mid - 1
    
    # TODO: Return -1 if not found
    return -1

# Test cases
test_array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

test_cases = [
    (7, 3),      # Found at index 3
    (1, 0),      # First element
    (19, 9),     # Last element
    (10, -1),    # Not found
    (0, -1),     # Smaller than all
    (20, -1)     # Larger than all
]

print("Array:", test_array)
print()
for target, expected in test_cases:
    result = binary_search(test_array, target)
    status = "✓" if result == expected else "✗"
    print(f"{status} Target {target}: found at index {result} (expected {expected})")`,
    testCases: [
      {
        id: 1,
        input: "[1, 3, 5, 7, 9], 7",
        expectedOutput: "3",
        isHidden: false
      },
      {
        id: 2,
        input: "[1, 3, 5, 7, 9], 1",
        expectedOutput: "0",
        isHidden: false
      },
      {
        id: 3,
        input: "[1, 3, 5, 7, 9], 10",
        expectedOutput: "-1",
        isHidden: false
      },
      {
        id: 4,
        input: "[], 5",
        expectedOutput: "-1",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 45,
        description: "Correctly finds target or returns -1 for all test cases"
      },
      efficiency: {
        points: 30,
        description: "Implements proper O(log n) binary search, not linear search"
      },
      edgeCases: {
        points: 15,
        description: "Handles empty array, single element, target at boundaries"
      },
      codeQuality: {
        points: 10,
        description: "Clear implementation with proper pointer management"
      }
    }
  },

  // SORTING ALGORITHM
  {
    title: "Merge Sort Implementation",
    language: "python",
    description: "Implement the merge sort algorithm using divide-and-conquer strategy. Learn recursive problem solving and understand O(n log n) sorting.",
    instructions: `# Merge Sort - Divide and Conquer Sorting

## Algorithm Overview
Merge sort is an efficient, stable sorting algorithm that uses divide-and-conquer:
1. **Divide**: Split array into two halves
2. **Conquer**: Recursively sort both halves
3. **Combine**: Merge the two sorted halves

## Visual Example
Original: [38, 27, 43, 3, 9, 82, 10]

Divide Phase:
[38, 27, 43, 3, 9, 82, 10]
[38, 27, 43, 3] [9, 82, 10]
[38, 27] [43, 3] [9, 82] [10]
[38] [27] [43] [3] [9] [82] [10]

Merge Phase:
[27, 38] [3, 43] [9, 82] [10]
[3, 27, 38, 43] [9, 10, 82]
[3, 9, 10, 27, 38, 43, 82]

## Merge Process
Merging [3, 27] and [9, 43]:
- Compare 3 and 9 → take 3 → [3]
- Compare 27 and 9 → take 9 → [3, 9]
- Compare 27 and 43 → take 27 → [3, 9, 27]
- Take remaining 43 → [3, 9, 27, 43]

## Complexity Analysis
- Time Complexity:
  * Best Case: O(n log n)
  * Average Case: O(n log n)
  * Worst Case: O(n log n)
- Space Complexity: O(n) - needs auxiliary space for merging
- Stability: Yes - maintains relative order of equal elements

## Comparison with Other Sorts
| Algorithm | Best | Average | Worst | Stable |
|-----------|------|---------|-------|--------|
| Merge Sort| O(n log n) | O(n log n) | O(n log n) | Yes |
| Quick Sort| O(n log n) | O(n log n) | O(n²) | No |
| Bubble Sort| O(n) | O(n²) | O(n²) | Yes |

## Implementation Steps
1. Base case: if array has 1 or 0 elements, it's sorted
2. Find middle point to divide array into two halves
3. Recursively sort first half
4. Recursively sort second half
5. Merge the two sorted halves

## Key Concepts
- Recursion: Function calls itself on smaller problems
- Divide and Conquer: Break problem into smaller subproblems
- Stable Sort: Equal elements maintain original order

## Grading Rubric (100 points)
- Correctness (40 pts): Sorts all test arrays correctly
- Recursion (25 pts): Proper recursive divide-and-conquer structure
- Merge Function (20 pts): Correctly merges two sorted arrays
- Code Quality (15 pts): Clean code with clear base case and recursion`,
    starterCode: `def merge_sort(arr):
    """
    Sort array using merge sort algorithm.
    
    Args:
        arr: List of comparable elements
        
    Returns:
        List: Sorted array
    """
    # TODO: Base case - array with 0 or 1 elements is sorted
    if len(arr) <= 1:
        return arr
    
    # TODO: Find middle point
    mid = len(arr) // 2
    
    # TODO: Divide array into two halves
    left_half = arr[:mid]
    right_half = arr[mid:]
    
    # TODO: Recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)
    
    # TODO: Merge the sorted halves
    return merge(left_sorted, right_sorted)

def merge(left, right):
    """
    Merge two sorted arrays into one sorted array.
    
    Args:
        left: Sorted list
        right: Sorted list
        
    Returns:
        List: Merged sorted list
    """
    result = []
    i = j = 0
    
    # TODO: Compare elements from both arrays and add smaller one
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

# Test cases
test_arrays = [
    [38, 27, 43, 3, 9, 82, 10],
    [5, 2, 8, 1, 9],
    [1],
    [],
    [3, 3, 3, 3],
    [5, 4, 3, 2, 1]
]

for arr in test_arrays:
    original = arr.copy()
    sorted_arr = merge_sort(arr)
    print(f"Original: {original}")
    print(f"Sorted:   {sorted_arr}")
    print()`,
    testCases: [
      {
        id: 1,
        input: "[38, 27, 43, 3, 9, 82, 10]",
        expectedOutput: "[3, 9, 10, 27, 38, 43, 82]",
        isHidden: false
      },
      {
        id: 2,
        input: "[5, 2, 8, 1, 9]",
        expectedOutput: "[1, 2, 5, 8, 9]",
        isHidden: false
      },
      {
        id: 3,
        input: "[5, 4, 3, 2, 1]",
        expectedOutput: "[1, 2, 3, 4, 5]",
        isHidden: true
      }
    ],
    rubric: {
      correctness: {
        points: 40,
        description: "Correctly sorts all test arrays"
      },
      efficiency: {
        points: 25,
        description: "Proper recursive structure with O(n log n) complexity"
      },
      edgeCases: {
        points: 20,
        description: "Correctly merges two sorted arrays, handles empty/single element"
      },
      codeQuality: {
        points: 15,
        description: "Clean recursive implementation with clear base case"
      }
    }
  }
];

export function seedEnhancedAssignments() {
  if (typeof window === 'undefined') return;
  
  try {
    const existingData = localStorage.getItem('autograder_assignments');
    const existingAssignments = existingData ? JSON.parse(existingData) : [];
    
    const now = new Date();
    const newAssignments = enhancedAssignments.map((assignment, index) => ({
      ...assignment,
      id: `enhanced-${index + 1}`,
      createdAt: now,
      updatedAt: now,
      maxScore: 100
    }));
    
    const allAssignments = [...existingAssignments, ...newAssignments];
    localStorage.setItem('autograder_assignments', JSON.stringify(allAssignments));
    
    console.log(`Added ${newAssignments.length} enhanced data structure assignments`);
    return newAssignments.length;
  } catch (error) {
    console.error('Error seeding enhanced assignments:', error);
    return 0;
  }
}
