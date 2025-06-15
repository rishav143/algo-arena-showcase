
export interface CompilerResult {
  success: boolean;
  output?: string;
  error?: string;
  executionTime?: number;
}

export class CompilerService {
  static async executeCode(code: string, language: string): Promise<CompilerResult> {
    const startTime = Date.now();
    
    try {
      // Simulate compilation/execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic error detection for demo purposes
      if (this.hasCompilationErrors(code, language)) {
        const error = this.getCompilationError(code, language);
        return {
          success: false,
          error,
          executionTime: Date.now() - startTime
        };
      }

      const output = this.generateOutput(code, language);
      return {
        success: true,
        output,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown compilation error',
        executionTime: Date.now() - startTime
      };
    }
  }

  private static hasCompilationErrors(code: string, language: string): boolean {
    // Basic error detection patterns
    const errorPatterns = {
      javascript: [/console\.log\(\)/, /function\s+\(\)/, /\w+\s*\(/],
      typescript: [/console\.log\(\)/, /function\s+\(\)/, /\w+\s*\(/],
      python: [/print\(\)/, /def\s+\(\)/, /import\s+$/],
      java: [/System\.out\.println\(\)/, /public\s+static\s+void\s+main\(\)/],
      cpp: [/cout\s*<<\s*endl/, /int\s+main\(\)\s*{\s*}/],
      c: [/printf\(\)/, /int\s+main\(\)\s*{\s*}/],
      go: [/fmt\.Println\(\)/, /func\s+main\(\)\s*{\s*}/],
      rust: [/println!\(\)/, /fn\s+main\(\)\s*{\s*}/]
    };

    const patterns = errorPatterns[language as keyof typeof errorPatterns] || [];
    return patterns.some(pattern => pattern.test(code));
  }

  private static getCompilationError(code: string, language: string): string {
    if (code.includes('console.log()')) {
      return 'SyntaxError: Unexpected token ) in console.log()';
    }
    if (code.includes('print()')) {
      return 'SyntaxError: print() missing required argument';
    }
    if (code.includes('System.out.println()')) {
      return 'Error: Method println() requires an argument';
    }
    
    return `${language} compilation failed: Syntax error detected`;
  }

  private static generateOutput(code: string, language: string): string {
    // Generate appropriate output based on language
    const outputs = {
      javascript: 'Hello, World!\n[Process completed successfully]',
      typescript: 'Hello, World!\n[TypeScript compiled and executed successfully]',
      python: 'Hello, World!\n[Python script executed successfully]',
      java: 'Hello, World!\n[Java application executed successfully]',
      cpp: 'Hello, World!\n[C++ program executed successfully]',
      c: 'Hello, World!\n[C program executed successfully]',
      go: 'Hello, World!\n[Go program executed successfully]',
      rust: 'Hello, World!\n[Rust program executed successfully]'
    };

    return outputs[language as keyof typeof outputs] || 'Program executed successfully';
  }
}
