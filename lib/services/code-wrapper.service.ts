/**
 * Service to wrap student code with test drivers for LeetCode-style execution
 * This allows students to write only functions without main blocks
 */

interface TestCase {
  input: string;
  expectedOutput: string;
}

class CodeWrapperService {
  /**
   * Extract the main function name from student code
   */
  private extractFunctionName(code: string, language: string): string | null {
    if (language === 'python') {
      // Match: def function_name(
      const match = code.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
      return match ? match[1] : null;
    }

    if (language === 'javascript' || language === 'typescript') {
      // Match: function functionName( or const functionName =
      const match = code.match(/(?:function\s+([a-zA-Z_][a-zA-Z0-9_]*)|const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=)/);
      return match ? (match[1] || match[2]) : null;
    }

    if (language === 'java') {
      // Match: public static returnType functionName(
      const match = code.match(/public\s+(?:static\s+)?[\w<>[\]]+\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
      return match ? match[1] : null;
    }

    return null;
  }

  /**
   * Generate test driver code for Python
   */
  private generatePythonDriver(functionName: string, testCase: TestCase): string {
    return `
# Test driver code
import ast
import json
import sys

try:
    # Read input from stdin
    input_str = input().strip()

    # Parse input - try JSON first, then ast.literal_eval
    try:
        test_input = json.loads(input_str)
    except:
        test_input = ast.literal_eval(input_str)

    # Call the function with the parsed input
    result = ${functionName}(test_input)

    # Print result
    print(result)
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
`;
  }

  /**
   * Generate test driver code for JavaScript/TypeScript
   */
  private generateJavaScriptDriver(functionName: string, testCase: TestCase): string {
    return `
// Test driver code
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  try {
    const testInput = JSON.parse(line.trim());
    const result = Array.isArray(testInput) ? ${functionName}(...testInput) : ${functionName}(testInput);
    console.log(JSON.stringify(result));
  } catch (e) {
    console.error('Error:', e.message);
  }
  rl.close();
});
`;
  }

  /**
   * Wrap student code with test driver for a specific test case
   */
  wrapCode(code: string, language: string, testCase: TestCase): string {
    // Check if code already has a main block - if so, don't wrap
    if (this.hasMainBlock(code, language)) {
      return code;
    }

    const functionName = this.extractFunctionName(code, language);

    if (!functionName) {
      // If we can't detect function name, return original code
      console.warn('Could not detect function name, returning original code');
      return code;
    }

    let driverCode = '';

    if (language === 'python') {
      driverCode = this.generatePythonDriver(functionName, testCase);
    } else if (language === 'javascript' || language === 'typescript') {
      driverCode = this.generateJavaScriptDriver(functionName, testCase);
    }

    // Combine student code with driver
    return `${code}\n\n${driverCode}`;
  }

  /**
   * Check if code already has a main execution block
   */
  private hasMainBlock(code: string, language: string): boolean {
    if (language === 'python') {
      return code.includes('if __name__');
    }

    if (language === 'javascript' || language === 'typescript') {
      // Check if code has direct function calls at top level
      return /^(?!\/\/).*\w+\s*\(.*\)\s*;?\s*$/m.test(code);
    }

    if (language === 'java') {
      return code.includes('public static void main');
    }

    return false;
  }

  /**
   * Parse test input to determine if it's single or multiple arguments
   * For example: "[1,2,3]" -> single list argument
   *              "[[1,2], 5]" -> two arguments (list and number)
   */
  private parseTestInput(input: string): { isSingleArg: boolean; value: any } {
    try {
      const parsed = JSON.parse(input);

      // If top level is array with multiple items, treat as multiple args
      // Otherwise single arg
      if (Array.isArray(parsed) && parsed.length > 1 &&
          !input.trim().startsWith('[[')) {
        return { isSingleArg: false, value: parsed };
      }

      return { isSingleArg: true, value: parsed };
    } catch {
      return { isSingleArg: true, value: input };
    }
  }
}

export const codeWrapperService = new CodeWrapperService();
