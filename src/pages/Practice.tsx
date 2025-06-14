
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarProvider, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Play, Lightbulb, Code2, Save, Download, Upload, FolderOpen, Trash2, Copy, Settings, Zap, CheckCircle, AlertCircle, Clock, Users, Star, BookOpen, Plus, X, EyeOff, Eye } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
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

  const ProjectSidebar = () => (
    <Sidebar className="w-64">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Projects
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Current Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3 space-y-3">
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project name"
                className="text-sm"
              />
              <Button 
                onClick={handleSaveProject}
                size="sm"
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Assistant</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAiAssistantEnabled(!aiAssistantEnabled)}
                  className="h-8 w-8 p-0"
                >
                  {aiAssistantEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Saved Projects ({savedProjects.length})</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {savedProjects.length > 0 ? (
                savedProjects.map((project) => (
                  <SidebarMenuItem key={project.id} className="flex items-center justify-between">
                    <SidebarMenuButton
                      onClick={() => handleLoadProject(project)}
                      className="flex-1 justify-start text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{project.name}</div>
                        <div className="text-xs text-gray-500">{project.language}</div>
                        <div className="text-xs text-gray-400">{project.lastModified.toLocaleDateString()}</div>
                      </div>
                    </SidebarMenuButton>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDeleteProject(project.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No saved projects yet
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-20">
        <SidebarProvider>
          <div className="flex h-[calc(100vh-5rem)]">
            <ProjectSidebar />
            
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Code Playground
                      </h1>
                      <p className="text-gray-600 text-sm">Write, run, and debug your code with AI assistance</p>
                    </div>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            <div className="flex items-center gap-2">
                              <Code2 className="w-4 h-4" />
                              {lang.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      onClick={handleRunCode} 
                      disabled={isRunning}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isRunning ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Run Code
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCopyCode}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </div>

              {/* Main Content - Resizable Panels */}
              <div className="flex-1 p-4">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  {/* Code Editor Panel */}
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <Card className="h-full flex flex-col">
                      <CardHeader className="bg-gray-800 text-gray-300 p-3 rounded-t-lg flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Code Editor - {languages.find(l => l.value === selectedLanguage)?.label}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Lines: {code.split('\n').length}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 flex-1">
                        <Textarea
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="h-full w-full border-0 resize-none font-mono text-sm focus-visible:ring-0 rounded-none bg-gray-900 text-green-400 leading-relaxed"
                          placeholder="Write your code here..."
                          spellCheck={false}
                        />
                      </CardContent>
                    </Card>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Output Panel */}
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <Card className="h-full flex flex-col">
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-50 m-0 rounded-none rounded-t-lg flex-shrink-0">
                          <TabsTrigger value="output" className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Output
                            {hasError && <AlertCircle className="w-3 h-3 text-red-500" />}
                          </TabsTrigger>
                          <TabsTrigger value="ai-help" className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            AI Assistant
                            {aiSuggestion && <div className="w-2 h-2 bg-purple-500 rounded-full" />}
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="output" className="flex-1 p-4 m-0">
                          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-full whitespace-pre-wrap overflow-auto border-l-4 border-green-500">
                            {output || '🚀 Ready to run your code!\n\nClick "Run Code" to see the magic happen...\n\n💡 Tips:\n• Write your code in the editor\n• Use console.log() for debugging\n• Check syntax before running'}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="ai-help" className="flex-1 p-4 m-0">
                          <div className="h-full flex flex-col">
                            {!aiAssistantEnabled ? (
                              <div className="flex-1 flex flex-col items-center justify-center text-center">
                                <EyeOff className="w-8 h-8 text-gray-400 mb-4" />
                                <h4 className="text-lg font-semibold text-gray-600 mb-2">AI Assistant Disabled</h4>
                                <p className="text-gray-500 mb-4">Enable AI assistance from the sidebar to get help with your code.</p>
                                <Button 
                                  onClick={() => setAiAssistantEnabled(true)}
                                  variant="outline"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Enable AI Assistant
                                </Button>
                              </div>
                            ) : aiSuggestion ? (
                              <div className="flex-1 flex flex-col">
                                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 flex-1 overflow-auto">
                                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {aiSuggestion}
                                  </div>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="mt-4 flex-shrink-0"
                                  onClick={() => setAiSuggestion('')}
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Clear Suggestion
                                </Button>
                              </div>
                            ) : (
                              <div className="flex-1 flex flex-col items-center justify-center text-center">
                                <div className="p-4 bg-purple-100 rounded-full mb-4">
                                  <Lightbulb className="w-8 h-8 text-purple-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant Ready</h4>
                                <p className="text-gray-600 mb-4 text-sm">
                                  I'll automatically help when your code has errors, or click below for assistance.
                                </p>
                                <Button 
                                  onClick={() => setAiSuggestion('🤖 AI Code Assistant\n\n🔍 Code Analysis:\nYour code structure looks good! Here are some suggestions:\n\n✨ Improvements:\n1. Add error handling for better robustness\n2. Consider using more descriptive variable names\n3. Add comments to explain complex logic\n\n💡 Best Practices:\n• Use consistent indentation\n• Follow naming conventions\n• Break down complex functions\n\n🚀 Would you like me to optimize your code or explain any specific part?')}
                                  className="bg-purple-600 hover:bg-purple-700"
                                  size="sm"
                                >
                                  <Lightbulb className="w-4 h-4 mr-2" />
                                  Get AI Help
                                </Button>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </Card>
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
