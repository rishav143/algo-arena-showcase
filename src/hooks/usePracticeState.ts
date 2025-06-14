
import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SavedProject {
  id: string;
  name: string;
  language: string;
  code: string;
  lastModified: Date;
}

interface Language {
  value: string;
  label: string;
  template: string;
}

export const usePracticeState = () => {
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

  return {
    selectedLanguage,
    code,
    setCode,
    output,
    setOutput,
    isRunning,
    setIsRunning,
    aiSuggestion,
    setAiSuggestion,
    activeTab,
    setActiveTab,
    projectName,
    setProjectName,
    savedProjects,
    aiAssistantEnabled,
    setAiAssistantEnabled,
    hasError,
    setHasError,
    languages,
    handleLanguageChange,
    handleSaveProject,
    handleLoadProject,
    handleDeleteProject,
    handleCopyCode,
  };
};
