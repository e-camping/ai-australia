import { TestCase, TestResult, CodeExecutionResult } from './types';

// Deep equality comparison for test results
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;

  if (typeof a !== 'object' || a === null || b === null) {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, index) => deepEqual(val, b[index]));
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => deepEqual(a[key], b[key]));
}

// Format value for display
function formatValue(value: any): string {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`;
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}

/**
 * Execute JavaScript code with test cases
 * @param code User's code as a string
 * @param testCases Array of test cases to run
 * @returns Execution results with pass/fail status for each test
 */
export async function executeJavaScriptCode(
  code: string,
  testCases: TestCase[]
): Promise<CodeExecutionResult> {
  const results: TestResult[] = [];

  try {
    // Extract function name from code (looking for function declaration)
    const functionMatch = code.match(/function\s+(\w+)/);
    const arrowFunctionMatch = code.match(/const\s+(\w+)\s*=/);
    const functionName = functionMatch?.[1] || arrowFunctionMatch?.[1];

    if (!functionName) {
      return {
        success: false,
        results: [],
        error: 'Could not find a function declaration. Make sure your code defines a function.'
      };
    }

    // Create a safe execution context
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const userFunction = new AsyncFunction(
      'testInput',
      `
        ${code}
        return ${functionName}(...testInput);
      `
    );

    // Run each test case
    for (const testCase of testCases) {
      try {
        const startTime = performance.now();
        const output = await userFunction(testCase.input);
        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        const passed = deepEqual(output, testCase.expectedOutput);

        results.push({
          description: testCase.description,
          passed,
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: output,
          error: !passed ? `Expected ${formatValue(testCase.expectedOutput)} but got ${formatValue(output)}` : undefined
        });

        // Timeout protection (abort if taking too long)
        if (executionTime > 5000) {
          results.push({
            description: 'Timeout',
            passed: false,
            error: 'Execution took too long (>5 seconds). Check for infinite loops.'
          });
          break;
        }
      } catch (error) {
        results.push({
          description: testCase.description,
          passed: false,
          input: testCase.input,
          expected: testCase.expectedOutput,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    const allPassed = results.every(r => r.passed);

    return {
      success: allPassed,
      results
    };
  } catch (error) {
    return {
      success: false,
      results: [],
      error: error instanceof Error ? `Syntax error: ${error.message}` : 'Unknown error occurred'
    };
  }
}

/**
 * Validate JavaScript code syntax without executing
 * @param code Code to validate
 * @returns true if valid, error message if invalid
 */
export function validateSyntax(code: string): { valid: boolean; error?: string } {
  try {
    new Function(code);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Syntax error'
    };
  }
}
