
// Simulated compiler service - in a real implementation, 
// this would integrate with Judge0, JDoodle, or similar API

interface CompileResult {
  output?: string;
  error?: string;
  status: 'success' | 'error' | 'timeout';
  executionTime?: number;
  memoryUsed?: number;
}

const LANGUAGE_TEMPLATES: Record<string, string> = {
  javascript: `// JavaScript code
console.log("Hello, World!");`,
  
  python: `# Python code
print("Hello, World!")`,
  
  java: `// Java code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  
  cpp: `// C++ code
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  
  c: `// C code
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
};

export const compileCode = async (
  code: string, 
  language: string
): Promise<CompileResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Basic syntax checking for demonstration
  if (!code.trim()) {
    return {
      error: 'Error: Empty code provided',
      status: 'error'
    };
  }
  
  // Simulate some common errors
  if (code.includes('syntaxerror') || code.includes('SyntaxError')) {
    return {
      error: 'SyntaxError: Invalid syntax on line 1',
      status: 'error'
    };
  }
  
  if (code.includes('undefined') && language === 'javascript') {
    return {
      error: 'ReferenceError: undefined is not defined',
      status: 'error'
    };
  }
  
  // Simulate successful execution
  let output = '';
  
  if (code.includes('console.log') || code.includes('print') || code.includes('System.out')) {
    // Extract and simulate output from print statements
    const printRegex = /(console\.log|print|System\.out\.println)\s*\(\s*["']([^"']+)["']\s*\)/g;
    const matches = [...code.matchAll(printRegex)];
    
    if (matches.length > 0) {
      output = matches.map(match => match[2]).join('\n');
    } else {
      output = 'Hello, World!';
    }
  } else {
    output = 'Program executed successfully (no output)';
  }
  
  return {
    output,
    status: 'success',
    executionTime: Math.random() * 500 + 100, // Random execution time
    memoryUsed: Math.random() * 1024 + 512 // Random memory usage
  };
};

export const getLanguageTemplate = (language: string): string => {
  return LANGUAGE_TEMPLATES[language] || '// Start coding here...';
};

export const validateCode = (code: string, language: string): string[] => {
  const errors: string[] = [];
  
  // Basic validation rules
  if (!code.trim()) {
    errors.push('Code cannot be empty');
  }
  
  if (language === 'javascript' && code.includes('var ')) {
    errors.push('Warning: Consider using "let" or "const" instead of "var"');
  }
  
  if (language === 'python' && /\t/.test(code)) {
    errors.push('Warning: Python code should use spaces, not tabs for indentation');
  }
  
  return errors;
};
