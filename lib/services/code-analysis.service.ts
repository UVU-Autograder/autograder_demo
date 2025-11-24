/**
 * Code Analysis Service
 * Performs static analysis on code to check for required patterns, constructs, and style
 */

export interface CodePattern {
  name: string;
  description: string;
  required?: boolean;
  pattern?: RegExp | string;
}

export interface CodeAnalysisRule {
  type: 'construct' | 'style' | 'pattern' | 'count';
  name: string;
  description: string;
  check: (code: string) => boolean | number;
  expected?: any;
  required?: boolean;
}

export interface CodeAnalysisResult {
  passed: boolean;
  checks: {
    rule: string;
    passed: boolean;
    found?: any;
    expected?: any;
    message: string;
  }[];
  score: number;
  totalChecks: number;
}

export class CodeAnalysisService {
  /**
   * Python-specific construct checks
   */
  private pythonConstructs: Record<string, CodeAnalysisRule> = {
    if_statement: {
      type: 'construct',
      name: 'if statement',
      description: 'Check if code contains if statement',
      check: (code: string) => /\bif\s+.+:/m.test(code),
    },
    
    elif_statement: {
      type: 'construct',
      name: 'elif statement',
      description: 'Check if code contains elif statement',
      check: (code: string) => /\belif\s+.+:/m.test(code),
    },
    
    else_statement: {
      type: 'construct',
      name: 'else statement',
      description: 'Check if code contains else statement',
      check: (code: string) => /\belse\s*:/m.test(code),
    },
    
    for_loop: {
      type: 'construct',
      name: 'for loop',
      description: 'Check if code contains for loop',
      check: (code: string) => /\bfor\s+\w+\s+in\s+.+:/m.test(code),
    },
    
    while_loop: {
      type: 'construct',
      name: 'while loop',
      description: 'Check if code contains while loop',
      check: (code: string) => /\bwhile\s+.+:/m.test(code),
    },
    
    function_definition: {
      type: 'construct',
      name: 'function definition',
      description: 'Check if code defines functions',
      check: (code: string) => /\bdef\s+\w+\s*\(/m.test(code),
    },
    
    main_function: {
      type: 'construct',
      name: 'main function',
      description: 'Check if code has main() function',
      check: (code: string) => /\bdef\s+main\s*\(/m.test(code),
    },
    
    class_definition: {
      type: 'construct',
      name: 'class definition',
      description: 'Check if code defines classes',
      check: (code: string) => /\bclass\s+\w+.*:/m.test(code),
    },
    
    try_except: {
      type: 'construct',
      name: 'try-except block',
      description: 'Check if code uses exception handling',
      check: (code: string) => /\btry\s*:\s*[\s\S]*?\bexcept\b/m.test(code),
    },
    
    list_comprehension: {
      type: 'construct',
      name: 'list comprehension',
      description: 'Check if code uses list comprehension',
      check: (code: string) => /\[.+\s+for\s+.+\s+in\s+.+\]/m.test(code),
    },
    
    dictionary_comprehension: {
      type: 'construct',
      name: 'dictionary comprehension',
      description: 'Check if code uses dictionary comprehension',
      check: (code: string) => /\{.+:.+\s+for\s+.+\s+in\s+.+\}/m.test(code),
    },
    
    lambda_function: {
      type: 'construct',
      name: 'lambda function',
      description: 'Check if code uses lambda functions',
      check: (code: string) => /\blambda\s+.+:/m.test(code),
    },
    
    recursion: {
      type: 'construct',
      name: 'recursion',
      description: 'Check if function calls itself (basic check)',
      check: (code: string) => {
        const funcMatch = code.match(/def\s+(\w+)\s*\(/);
        if (!funcMatch) return false;
        const funcName = funcMatch[1];
        const funcBody = code.slice(funcMatch.index!);
        return new RegExp(`\\b${funcName}\\s*\\(`).test(funcBody.slice(funcBody.indexOf(':') + 1));
      },
    },
  };

  /**
   * Output format checks
   */
  private outputPatterns: Record<string, CodeAnalysisRule> = {
    f_string: {
      type: 'pattern',
      name: 'f-string',
      description: 'Check if code uses f-strings for formatting',
      check: (code: string) => /f["'][^"']*\{[^}]+\}[^"']*["']/m.test(code),
    },
    
    format_method: {
      type: 'pattern',
      name: '.format() method',
      description: 'Check if code uses .format() method',
      check: (code: string) => /\.format\s*\(/m.test(code),
    },
    
    print_statement: {
      type: 'pattern',
      name: 'print statement',
      description: 'Check if code uses print()',
      check: (code: string) => /\bprint\s*\(/m.test(code),
    },
    
    input_statement: {
      type: 'pattern',
      name: 'input statement',
      description: 'Check if code uses input()',
      check: (code: string) => /\binput\s*\(/m.test(code),
    },
    
    prompt_with_message: {
      type: 'pattern',
      name: 'input with prompt',
      description: 'Check if input() includes a prompt message',
      check: (code: string) => /\binput\s*\(\s*["'][^"']+["']\s*\)/m.test(code),
    },
  };

  /**
   * Style and naming convention checks
   */
  private styleChecks: Record<string, CodeAnalysisRule> = {
    snake_case_variables: {
      type: 'style',
      name: 'snake_case variables',
      description: 'Check if variables use snake_case naming',
      check: (code: string) => {
        // Find variable assignments
        const varMatches = code.matchAll(/^(\s*)([a-zA-Z_]\w*)\s*=/gm);
        let hasSnakeCase = false;
        let hasCamelCase = false;
        
        for (const match of varMatches) {
          const varName = match[2];
          if (varName.includes('_') && varName === varName.toLowerCase()) {
            hasSnakeCase = true;
          }
          if (/[a-z][A-Z]/.test(varName)) {
            hasCamelCase = true;
          }
        }
        
        return hasSnakeCase && !hasCamelCase;
      },
    },
    
    camel_case_variables: {
      type: 'style',
      name: 'camelCase variables',
      description: 'Check if variables use camelCase naming',
      check: (code: string) => {
        const varMatches = code.matchAll(/^(\s*)([a-zA-Z_]\w*)\s*=/gm);
        let hasCamelCase = false;
        
        for (const match of varMatches) {
          const varName = match[2];
          if (/^[a-z]+[A-Z]/.test(varName)) {
            hasCamelCase = true;
            break;
          }
        }
        
        return hasCamelCase;
      },
    },
    
    PascalCase_classes: {
      type: 'style',
      name: 'PascalCase classes',
      description: 'Check if classes use PascalCase naming',
      check: (code: string) => {
        const classMatches = code.matchAll(/class\s+([A-Z]\w*)/g);
        let count = 0;
        for (const _ of classMatches) count++;
        return count > 0;
      },
    },
    
    docstrings: {
      type: 'style',
      name: 'docstrings',
      description: 'Check if functions have docstrings',
      check: (code: string) => /def\s+\w+\s*\([^)]*\)\s*:\s*"""[\s\S]*?"""/m.test(code) ||
                               /def\s+\w+\s*\([^)]*\)\s*:\s*'''[\s\S]*?'''/m.test(code),
    },
    
    type_hints: {
      type: 'style',
      name: 'type hints',
      description: 'Check if functions use type hints',
      check: (code: string) => /def\s+\w+\s*\([^)]*:\s*\w+[^)]*\)\s*->\s*\w+:/m.test(code),
    },
    
    comments: {
      type: 'style',
      name: 'comments',
      description: 'Check if code includes comments',
      check: (code: string) => /#[^\n]+/m.test(code),
    },
  };

  /**
   * Count-based checks
   */
  private countChecks = {
    function_count: (code: string): number => {
      const matches = code.match(/\bdef\s+\w+\s*\(/g);
      return matches ? matches.length : 0;
    },
    
    class_count: (code: string): number => {
      const matches = code.match(/\bclass\s+\w+/g);
      return matches ? matches.length : 0;
    },
    
    loop_count: (code: string): number => {
      const forLoops = (code.match(/\bfor\s+\w+\s+in\s+/g) || []).length;
      const whileLoops = (code.match(/\bwhile\s+.+:/g) || []).length;
      return forLoops + whileLoops;
    },
    
    conditional_count: (code: string): number => {
      const matches = code.match(/\b(if|elif)\s+.+:/g);
      return matches ? matches.length : 0;
    },
    
    print_count: (code: string): number => {
      const matches = code.match(/\bprint\s*\(/g);
      return matches ? matches.length : 0;
    },
    
    lines_of_code: (code: string): number => {
      const lines = code.split('\n').filter(line => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith('#');
      });
      return lines.length;
    },
  };

  /**
   * Advanced pattern checks
   */
  private advancedPatterns: Record<string, CodeAnalysisRule> = {
    no_global_variables: {
      type: 'pattern',
      name: 'no global variables',
      description: 'Check that code avoids global variables (except constants)',
      check: (code: string) => {
        // Check for assignments outside functions/classes
        const lines = code.split('\n');
        let inFunction = false;
        let inClass = false;
        let hasGlobalVar = false;
        
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('def ')) inFunction = true;
          if (trimmed.startsWith('class ')) inClass = true;
          if (!trimmed || trimmed.startsWith('#')) continue;
          
          // Check for assignments at module level
          if (!inFunction && !inClass && /^[a-z_]\w*\s*=/.test(trimmed)) {
            // Allow CONSTANTS (all caps)
            if (!/^[A-Z_]+\s*=/.test(trimmed)) {
              hasGlobalVar = true;
              break;
            }
          }
        }
        
        return !hasGlobalVar;
      },
    },
    
    no_hardcoded_values: {
      type: 'pattern',
      name: 'no hardcoded values',
      description: 'Check that code avoids magic numbers (except 0, 1)',
      check: (code: string) => {
        // Look for numeric literals in expressions (not in strings or assignments)
        const matches = code.matchAll(/[^"'\w](\d{2,})[^"'\w]/g);
        for (const _ of matches) {
          return false; // Found hardcoded number
        }
        return true;
      },
    },
    
    proper_indentation: {
      type: 'style',
      name: 'proper indentation',
      description: 'Check if code uses consistent 4-space indentation',
      check: (code: string) => {
        const lines = code.split('\n');
        const indentedLines = lines.filter(l => l.match(/^\s+\S/));
        
        for (const line of indentedLines) {
          const spaces = line.match(/^(\s+)/)?.[1].length || 0;
          if (spaces % 4 !== 0) return false;
        }
        return true;
      },
    },
  };

  /**
   * Analyze code against specified rules
   */
  analyzeCode(code: string, rules: string[]): CodeAnalysisResult {
    const result: CodeAnalysisResult = {
      passed: true,
      checks: [],
      score: 0,
      totalChecks: rules.length,
    };

    for (const ruleName of rules) {
      // Check in all rule categories
      const rule = this.pythonConstructs[ruleName] || 
                   this.outputPatterns[ruleName] || 
                   this.styleChecks[ruleName] ||
                   this.advancedPatterns[ruleName];

      if (!rule) {
        result.checks.push({
          rule: ruleName,
          passed: false,
          message: `Unknown rule: ${ruleName}`,
        });
        result.passed = false;
        continue;
      }

      const checkResult = rule.check(code);
      const passed = typeof checkResult === 'boolean' ? checkResult : checkResult > 0;

      result.checks.push({
        rule: ruleName,
        passed,
        found: typeof checkResult === 'number' ? checkResult : passed,
        expected: rule.expected,
        message: passed 
          ? `✓ Found ${rule.name}`
          : `✗ Missing ${rule.name}: ${rule.description}`,
      });

      if (passed) {
        result.score++;
      } else if (rule.required) {
        result.passed = false;
      }
    }

    return result;
  }

  /**
   * Count specific constructs in code
   */
  countConstructs(code: string, constructType: keyof typeof this.countChecks): number {
    const counter = this.countChecks[constructType];
    return counter ? counter(code) : 0;
  }

  /**
   * Get all available rules
   */
  getAvailableRules(): { category: string; rules: string[] }[] {
    return [
      {
        category: 'Python Constructs',
        rules: Object.keys(this.pythonConstructs),
      },
      {
        category: 'Output & Formatting',
        rules: Object.keys(this.outputPatterns),
      },
      {
        category: 'Style & Conventions',
        rules: Object.keys(this.styleChecks),
      },
      {
        category: 'Advanced Patterns',
        rules: Object.keys(this.advancedPatterns),
      },
    ];
  }

  /**
   * Validate code meets minimum requirements
   */
  validateRequirements(code: string, requirements: {
    minFunctions?: number;
    minClasses?: number;
    minLoops?: number;
    minLines?: number;
    maxLines?: number;
    requiredConstructs?: string[];
    forbiddenConstructs?: string[];
    namingConvention?: 'snake_case' | 'camelCase';
  }): CodeAnalysisResult {
    const result: CodeAnalysisResult = {
      passed: true,
      checks: [],
      score: 0,
      totalChecks: 0,
    };

    // Check counts
    if (requirements.minFunctions !== undefined) {
      result.totalChecks++;
      const count = this.countConstructs(code, 'function_count');
      const passed = count >= requirements.minFunctions;
      result.checks.push({
        rule: 'min_functions',
        passed,
        found: count,
        expected: requirements.minFunctions,
        message: passed
          ? `✓ Has ${count} functions (required: ${requirements.minFunctions})`
          : `✗ Only ${count} functions (required: ${requirements.minFunctions})`,
      });
      if (passed) result.score++;
      else result.passed = false;
    }

    if (requirements.minClasses !== undefined) {
      result.totalChecks++;
      const count = this.countConstructs(code, 'class_count');
      const passed = count >= requirements.minClasses;
      result.checks.push({
        rule: 'min_classes',
        passed,
        found: count,
        expected: requirements.minClasses,
        message: passed
          ? `✓ Has ${count} classes (required: ${requirements.minClasses})`
          : `✗ Only ${count} classes (required: ${requirements.minClasses})`,
      });
      if (passed) result.score++;
      else result.passed = false;
    }

    if (requirements.minLoops !== undefined) {
      result.totalChecks++;
      const count = this.countConstructs(code, 'loop_count');
      const passed = count >= requirements.minLoops;
      result.checks.push({
        rule: 'min_loops',
        passed,
        found: count,
        expected: requirements.minLoops,
        message: passed
          ? `✓ Has ${count} loops (required: ${requirements.minLoops})`
          : `✗ Only ${count} loops (required: ${requirements.minLoops})`,
      });
      if (passed) result.score++;
      else result.passed = false;
    }

    // Check required constructs
    if (requirements.requiredConstructs) {
      for (const construct of requirements.requiredConstructs) {
        result.totalChecks++;
        const rule = this.pythonConstructs[construct];
        if (rule) {
          const passed = rule.check(code) as boolean;
          result.checks.push({
            rule: construct,
            passed,
            message: passed
              ? `✓ Uses ${rule.name}`
              : `✗ Must use ${rule.name}`,
          });
          if (passed) result.score++;
          else result.passed = false;
        }
      }
    }

    // Check forbidden constructs
    if (requirements.forbiddenConstructs) {
      for (const construct of requirements.forbiddenConstructs) {
        result.totalChecks++;
        const rule = this.pythonConstructs[construct];
        if (rule) {
          const found = rule.check(code) as boolean;
          const passed = !found;
          result.checks.push({
            rule: `no_${construct}`,
            passed,
            message: passed
              ? `✓ Does not use ${rule.name}`
              : `✗ Must not use ${rule.name}`,
          });
          if (passed) result.score++;
          else result.passed = false;
        }
      }
    }

    // Check naming convention
    if (requirements.namingConvention) {
      result.totalChecks++;
      const rule = this.styleChecks[`${requirements.namingConvention}_variables`];
      if (rule) {
        const passed = rule.check(code) as boolean;
        result.checks.push({
          rule: 'naming_convention',
          passed,
          message: passed
            ? `✓ Uses ${requirements.namingConvention} naming`
            : `✗ Must use ${requirements.namingConvention} naming`,
        });
        if (passed) result.score++;
        else result.passed = false;
      }
    }

    return result;
  }
}

export const codeAnalysisService = new CodeAnalysisService();
