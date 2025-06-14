
export const simulateCodeExecution = (
  code: string,
  aiAssistantEnabled: boolean,
  setOutput: (output: string) => void,
  setHasError: (hasError: boolean) => void,
  setAiSuggestion: (suggestion: string) => void,
  setActiveTab: (tab: string) => void,
  setIsRunning: (isRunning: boolean) => void
) => {
  setIsRunning(true);
  setOutput('');
  setAiSuggestion('');
  setHasError(false);
  
  // Simulate more realistic code execution with better feedback
  setTimeout(() => {
    if (code.toLowerCase().includes('error') || code.toLowerCase().includes('undefined') || code.trim() === '') {
      const errorOutput = '❌ Compilation Error\n\nLine 2: ReferenceError: undefined variable\nExecution failed at line 2\n\n💡 Tip: Check your variable declarations and syntax';
      setOutput(errorOutput);
      setHasError(true);
      
      if (aiAssistantEnabled) {
        setAiSuggestion('🤖 AI Assistant detected an issue!\n\n🔍 Problem: It looks like you have an undefined variable or syntax error.\n\n✅ Solution: \n1. Check all variable names are spelled correctly\n2. Ensure variables are declared before use\n3. Verify proper syntax (semicolons, brackets, etc.)\n\nWould you like me to help fix this specific error?');
        setActiveTab('ai-help');
      }
    } else {
      const execTime = (Math.random() * 2 + 0.1).toFixed(2);
      const memUsage = (Math.random() * 3 + 1.2).toFixed(1);
      setOutput(`✅ Program executed successfully!\n\nOutput:\nHello, World!\nHello, Student!\n\n📊 Performance:\n⚡ Execution time: ${execTime}s\n💾 Memory used: ${memUsage}MB\n\n🎉 Great job! Your code ran without errors.`);
    }
    setIsRunning(false);
  }, Math.random() * 1000 + 500);
};
