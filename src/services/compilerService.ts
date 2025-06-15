
export const compileAndRunCode = async (code: string, language: string): Promise<string> => {
  // Simulate compilation time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Mock compiler responses based on language and code content
  if (!code.trim()) {
    throw new Error('Code cannot be empty');
  }
  
  // Simple syntax error detection
  if (language === 'javascript' || language === 'typescript') {
    if (code.includes('console.log') && !code.includes('(')) {
      throw new Error('SyntaxError: Missing opening parenthesis in console.log');
    }
  }
  
  if (language === 'python') {
    if (code.includes('print') && !code.includes('(')) {
      throw new Error('SyntaxError: Missing parentheses in call to print');
    }
  }
  
  if (language === 'java') {
    if (!code.includes('public static void main')) {
      throw new Error('CompileError: No main method found');
    }
  }
  
  // Simulate successful execution
  const sampleOutputs = [
    'Hello, World!',
    'Program executed successfully!\nOutput: 42',
    'Test passed!\nResult: [1, 2, 3, 4, 5]',
    'Calculation complete.\nAnswer: 3.14159',
    'Processing complete.\nItems processed: 100\nTime taken: 0.5s',
  ];
  
  const randomOutput = sampleOutputs[Math.floor(Math.random() * sampleOutputs.length)];
  return `Compilation successful!\n\n${randomOutput}`;
};
