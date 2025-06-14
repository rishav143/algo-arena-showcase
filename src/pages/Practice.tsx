
import React, { useState, useCallback, useMemo } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ProjectSidebar from '../components/practice/ProjectSidebar';
import PracticeHeader from '../components/practice/PracticeHeader';
import CodeEditor from '../components/practice/CodeEditor';
import OutputPanel from '../components/practice/OutputPanel';
import { useToast } from '@/hooks/use-toast';

interface SavedProject {
  id: string;
  name: string;
  language: string;
  code: string;
  lastModified: Date;
}

const Practice = () => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [activeTab, setActiveTab] = useState('output');
  const [projectName, setProjectName] = useState('My Project');
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [hasError, setHasError] = useState(false);

  const languages = useMemo(() => [
    { value: 'javascript', label: 'JavaScript', template: '// JavaScript - Dynamic and versatile\nconsole.log("Hello, World!");\n\n// Try some examples:\n// Variables and functions\nconst greet = (name) => {\n  return `Hello, ${name}!`;\n};\n\nconsole.log(greet("Student"));' },
    { value: 'python', label: 'Python', template: '# Python - Clean and readable\nprint("Hello, World!")\n\n# Try some examples:\n# Variables and functions\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Student"))' },
    { value: 'java', label: 'Java', template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        \n        // Try some examples:\n        String name = "Student";\n        System.out.println("Hello, " + name + "!");\n    }\n}' },
    { value: 'cpp', label: 'C++', template: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    \n    // Try some examples:\n    string name = "Student";\n    cout << "Hello, " + name + "!" << endl;\n    \n    return 0;\n}' },
    { value: 'c', label: 'C', template: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    \n    // Try some examples:\n    char name[] = "Student";\n    printf("Hello, %s!\\n", name);\n    \n    return 0;\n}' },
    { value: 'go', label: 'Go', template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    \n    // Try some examples:\n    name := "Student"\n    fmt.Printf("Hello, %s!\\n", name)\n}' },
    { value: 'rust', label: 'Rust', template: 'fn main() {\n    println!("Hello, World!");\n    \n    // Try some examples:\n    let name = "Student";\n    println!("Hello, {}!", name);\n}' },
  ], []);

  const handleRunCode = useCallback(async () => {
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
  }, [code, aiAssistantEnabled]);

  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    const selectedLang = languages.find(lang => lang.value === language);
    if (selectedLang) {
      setCode(selectedLang.template);
    }
    setOutput('');
    setAiSuggestion('');
    setHasError(false);
  }, [languages]);

  const handleSaveProject = useCallback(() => {
    const newProject: SavedProject = {
      id: Date.now().toString(),
      name: projectName || 'Untitled Project',
      language: selectedLanguage,
      code: code,
      lastModified: new Date()
    };
    
    setSavedProjects(prev => [newProject, ...prev.slice(0, 9)]); // Keep only 10 most recent
    
    toast({
      title: "Project Saved",
      description: `${projectName} has been saved successfully.`,
    });
  }, [projectName, selectedLanguage, code, toast]);

  const handleLoadProject = useCallback((project: SavedProject) => {
    setProjectName(project.name);
    setSelectedLanguage(project.language);
    setCode(project.code);
    setOutput('');
    setAiSuggestion('');
    setHasError(false);
    
    toast({
      title: "Project Loaded",
      description: `${project.name} has been loaded.`,
    });
  }, [toast]);

  const handleDeleteProject = useCallback((projectId: string) => {
    setSavedProjects(prev => prev.filter(p => p.id !== projectId));
    toast({
      title: "Project Deleted",
      description: "Project has been removed from your saved projects.",
    });
  }, [toast]);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied", 
      description: "Code has been copied to clipboard.",
    });
  }, [code, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-20">
        <SidebarProvider>
          <div className="flex h-[calc(100vh-5rem)]">
            <ProjectSidebar
              projectName={projectName}
              setProjectName={setProjectName}
              aiAssistantEnabled={aiAssistantEnabled}
              setAiAssistantEnabled={setAiAssistantEnabled}
              savedProjects={savedProjects}
              onSaveProject={handleSaveProject}
              onLoadProject={handleLoadProject}
              onDeleteProject={handleDeleteProject}
            />
            
            <div className="flex-1 flex flex-col">
              <PracticeHeader
                selectedLanguage={selectedLanguage}
                languages={languages}
                isRunning={isRunning}
                onLanguageChange={handleLanguageChange}
                onRunCode={handleRunCode}
                onCopyCode={handleCopyCode}
              />

              {/* Main Content - Resizable Panels */}
              <div className="flex-1 p-4">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  {/* Code Editor Panel */}
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <CodeEditor
                      code={code}
                      setCode={setCode}
                      selectedLanguage={selectedLanguage}
                      languages={languages}
                    />
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Output Panel */}
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <OutputPanel
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      output={output}
                      hasError={hasError}
                      aiAssistantEnabled={aiAssistantEnabled}
                      setAiAssistantEnabled={setAiAssistantEnabled}
                      aiSuggestion={aiSuggestion}
                      setAiSuggestion={setAiSuggestion}
                    />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
      
      <Footer />
    </div>
  );
};

export default Practice;
