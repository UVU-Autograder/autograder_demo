import type { Assignment } from '@/lib/types';
import { assignmentStorage } from '@/lib/services/assignment-storage.service';

/**
 * All sample assignments - automatically loaded on app initialization
 */
export const allSampleAssignments: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // BASICS - Hello World
  {
    title: "Hello World Personalized",
    language: "python",
    description: "Master the fundamentals of input/output operations by creating an interactive greeting program that responds to user input with personalized messages.",
    instructions: `# Assignment: Personalized Hello World

## Learning Objectives
- Master basic input() and print() functions in Python
- Practice string concatenation and variable assignment  
- Learn f-strings (formatted string literals) for elegant output
- Understand the flow of interactive console programs

## Requirements
1. Prompt the user for their first name
2. Prompt the user for their favorite color
3. Display a personalized greeting incorporating both pieces of information

## Example
Input: Alice, blue
Output: Hello, Alice! I love the color blue too!

## Grading (100 points)
- Correctness (40 pts): Program runs without errors
- Input Handling (20 pts): Both prompts work correctly
- Output Format (20 pts): Matches specified format
- Code Quality (20 pts): Clean, well-commented code`,
    starterCode: `# Personalized Hello World
# Your Name: [Student Name]

def main():
    # TODO: Get user's first name
    name = input("What is your first name? ")
    
    # TODO: Get user's favorite color
    color = input("What is your favorite color? ")
    
    # TODO: Print personalized greeting
    print(f"Hello, {name}! I love the color {color} too!")

if __name__ == "__main__":
    main()`,
    testCases: [
      { id: 1, input: "Alice\\nblue", expectedOutput: "Hello, Alice! I love the color blue too!", isHidden: false },
      { id: 2, input: "Bob\\nred", expectedOutput: "Hello, Bob! I love the color red too!", isHidden: false },
      { id: 3, input: "Charlie\\ngreen", expectedOutput: "Hello, Charlie! I love the color green too!", isHidden: true }
    ],
    rubric: {
      correctness: { points: 40, description: "Program executes without errors and produces correct output" },
      codeQuality: { points: 20, description: "Code is clean, well-commented, and follows Python conventions" },
      efficiency: { points: 20, description: "Uses appropriate string formatting techniques" },
      edgeCases: { points: 20, description: "Handles different inputs correctly" }
    },
    isSample: true,
    tags: ["basics", "input-output", "strings"]
  },

  // DATA STRUCTURES - Two Sum
  {
    title: "Two Sum Problem",
    language: "python",
    description: "Classic algorithmic problem: Find two numbers in an array that add up to a target sum using hash table optimization.",
    instructions: `# Two Sum - Hash Table Technique

## Problem
Given an array of integers and a target sum, return indices of two numbers that add up to the target.

## Examples
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]

Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

## Algorithm Strategy
Use hash table for O(n) time complexity:
1. Iterate through array
2. Calculate complement = target - current_number
3. Check if complement exists in hash table
4. If yes, return indices; if no, add current number

## Grading (100 points)
- Correctness (40 pts): Returns correct indices
- Efficiency (30 pts): Uses O(n) hash table approach
- Edge Cases (15 pts): Handles negative numbers, duplicates
- Code Quality (15 pts): Clean implementation`,
    starterCode: `def two_sum(nums, target):
    """
    Find two numbers that add up to target.
    
    Args:
        nums: List of integers
        target: Target sum
        
    Returns:
        List of two indices [i, j]
    """
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen:
            return [seen[complement], i]
        
        seen[num] = i
    
    return []

# Test
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
    testCases: [
      { id: 1, input: "[2, 7, 11, 15], 9", expectedOutput: "[0, 1]", isHidden: false },
      { id: 2, input: "[3, 2, 4], 6", expectedOutput: "[1, 2]", isHidden: false },
      { id: 3, input: "[-1, -2, -3, -4, -5], -8", expectedOutput: "[2, 4]", isHidden: true }
    ],
    rubric: {
      correctness: { points: 40, description: "Returns correct pair of indices" },
      efficiency: { points: 30, description: "Uses O(n) hash table solution" },
      edgeCases: { points: 15, description: "Handles negative numbers and duplicates" },
      codeQuality: { points: 15, description: "Clean implementation" }
    },
    isSample: true,
    tags: ["algorithms", "hash-table", "arrays"]
  },

  // LINKED LIST
  {
    title: "Reverse Linked List",
    language: "python",
    description: "Implement linked list reversal using iterative approach with pointer manipulation.",
    instructions: `# Reverse Singly Linked List

## Problem
Given head of singly linked list, reverse the list and return the reversed head.

## Visual Example
Input:  1 -> 2 -> 3 -> 4 -> 5 -> None
Output: 5 -> 4 -> 3 -> 2 -> 1 -> None

## Algorithm
Use three pointers:
1. prev = None
2. current = head  
3. next_node = current.next

Iterate and reverse links in-place.

## Grading (100 points)
- Correctness (50 pts): Successfully reverses list
- In-Place (20 pts): Modifies existing nodes
- Edge Cases (15 pts): Handles empty/single node
- Code Quality (15 pts): Clear pointer logic`,
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head):
    """Reverse a linked list in-place."""
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev

# Helper to print list
def print_list(head):
    values = []
    while head:
        values.append(str(head.val))
        head = head.next
    print(" -> ".join(values))`,
    testCases: [
      { id: 1, input: "[1, 2, 3, 4, 5]", expectedOutput: "[5, 4, 3, 2, 1]", isHidden: false },
      { id: 2, input: "[1, 2]", expectedOutput: "[2, 1]", isHidden: false },
      { id: 3, input: "[]", expectedOutput: "[]", isHidden: true }
    ],
    rubric: {
      correctness: { points: 50, description: "Correctly reverses linked list" },
      efficiency: { points: 20, description: "In-place O(1) space reversal" },
      edgeCases: { points: 15, description: "Handles empty and single-node lists" },
      codeQuality: { points: 15, description: "Clear pointer manipulation" }
    },
    isSample: true,
    tags: ["data-structures", "linked-list", "pointers"]
  },

  // STACK
  {
    title: "Valid Parentheses Checker",
    language: "python",
    description: "Use stack data structure to validate balanced brackets. Essential for expression parsing.",
    instructions: `# Valid Parentheses - Stack Application

## Problem
Given string with brackets '()', '[]', '{}', determine if valid.

## Valid Examples
- "()" → True
- "()[]{}" → True
- "{[]}" → True

## Invalid Examples
- "(]" → False
- "([)]" → False

## Algorithm
1. Create empty stack
2. For each character:
   - Opening bracket: push to stack
   - Closing bracket: pop and check match
3. Stack should be empty at end

## Grading (100 points)
- Correctness (40 pts): Correct True/False results
- Stack Usage (30 pts): Proper stack operations
- Edge Cases (15 pts): Empty string, unmatched brackets
- Code Quality (15 pts): Clean logic`,
    starterCode: `def is_valid_parentheses(s):
    """Check if brackets are balanced."""
    stack = []
    matching = {')': '(', ']': '[', '}': '{'}
    
    for char in s:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack.pop() != matching[char]:
                return False
    
    return len(stack) == 0

# Test
print(is_valid_parentheses("()"))      # True
print(is_valid_parentheses("()[]{}"))  # True
print(is_valid_parentheses("(]"))      # False`,
    testCases: [
      { id: 1, input: "()", expectedOutput: "True", isHidden: false },
      { id: 2, input: "()[]{}", expectedOutput: "True", isHidden: false },
      { id: 3, input: "(]", expectedOutput: "False", isHidden: false },
      { id: 4, input: "([)]", expectedOutput: "False", isHidden: true }
    ],
    rubric: {
      correctness: { points: 40, description: "Correctly identifies valid/invalid brackets" },
      efficiency: { points: 30, description: "Proper stack implementation O(n)" },
      edgeCases: { points: 15, description: "Handles edge cases" },
      codeQuality: { points: 15, description: "Clean stack operations" }
    },
    isSample: true,
    tags: ["data-structures", "stack", "strings"]
  },

  // BINARY SEARCH
  {
    title: "Binary Search Implementation",
    language: "python",
    description: "Implement classic binary search algorithm for efficient searching in sorted arrays.",
    instructions: `# Binary Search - Divide and Conquer

## Problem
Given sorted array and target, return index of target or -1 if not found.

## Algorithm
1. Start: left = 0, right = len(array) - 1
2. Calculate: mid = (left + right) // 2
3. Compare array[mid] with target:
   - Equal: return mid
   - Less: search right half
   - Greater: search left half

## Time Complexity
- O(log n) - halves search space each iteration
- Much better than O(n) linear search

## Grading (100 points)
- Correctness (45 pts): Finds target correctly
- Algorithm (30 pts): Uses proper binary search
- Edge Cases (15 pts): Handles edge cases
- Code Quality (10 pts): Clean implementation`,
    starterCode: `def binary_search(arr, target):
    """Search for target using binary search."""
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 10))  # -1`,
    testCases: [
      { id: 1, input: "[1, 3, 5, 7, 9], 7", expectedOutput: "3", isHidden: false },
      { id: 2, input: "[1, 3, 5, 7, 9], 1", expectedOutput: "0", isHidden: false },
      { id: 3, input: "[1, 3, 5, 7, 9], 10", expectedOutput: "-1", isHidden: false },
      { id: 4, input: "[], 5", expectedOutput: "-1", isHidden: true }
    ],
    rubric: {
      correctness: { points: 45, description: "Correctly finds or reports missing" },
      efficiency: { points: 30, description: "Implements O(log n) binary search" },
      edgeCases: { points: 15, description: "Handles empty array, boundaries" },
      codeQuality: { points: 10, description: "Clear pointer management" }
    },
    isSample: true,
    tags: ["algorithms", "searching", "divide-conquer"]
  },

  // SORTING
  {
    title: "Merge Sort Implementation",
    language: "python",
    description: "Implement merge sort using divide-and-conquer with O(n log n) guaranteed performance.",
    instructions: `# Merge Sort Algorithm

## Overview
Efficient divide-and-conquer sorting:
1. Divide: Split array in half
2. Conquer: Recursively sort halves
3. Combine: Merge sorted halves

## Example
[38, 27, 43, 3] →
[38, 27] [43, 3] →
[27, 38] [3, 43] →
[3, 27, 38, 43]

## Complexity
- Time: O(n log n) all cases
- Space: O(n) for merging
- Stable: Yes

## Grading (100 points)
- Correctness (40 pts): Sorts correctly
- Recursion (25 pts): Proper recursive structure
- Merge Function (20 pts): Correctly merges
- Code Quality (15 pts): Clean implementation`,
    starterCode: `def merge_sort(arr):
    """Sort array using merge sort."""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    """Merge two sorted arrays."""
    result = []
    i = j = 0
    
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

# Test
print(merge_sort([38, 27, 43, 3, 9, 82, 10]))`,
    testCases: [
      { id: 1, input: "[38, 27, 43, 3, 9, 82, 10]", expectedOutput: "[3, 9, 10, 27, 38, 43, 82]", isHidden: false },
      { id: 2, input: "[5, 2, 8, 1, 9]", expectedOutput: "[1, 2, 5, 8, 9]", isHidden: false },
      { id: 3, input: "[5, 4, 3, 2, 1]", expectedOutput: "[1, 2, 3, 4, 5]", isHidden: true }
    ],
    rubric: {
      correctness: { points: 40, description: "Correctly sorts all arrays" },
      efficiency: { points: 25, description: "Proper O(n log n) recursive structure" },
      edgeCases: { points: 20, description: "Correctly merges sorted arrays" },
      codeQuality: { points: 15, description: "Clean recursive implementation" }
    },
    isSample: true,
    tags: ["algorithms", "sorting", "recursion"]
  }
];

/**
 * Initialize storage with sample assignments on app load
 */
export function initializeSampleAssignments() {
  assignmentStorage.initializeWithSamples(allSampleAssignments);
}
