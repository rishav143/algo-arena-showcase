
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Lightbulb, Code2, Save, Download, Upload, FolderOpen, Trash2, Copy, Settings, Zap, CheckCircle, AlertCircle, Clock, Users, Star, BookOpen } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface SavedProject {
  id: string;
  name: string;
  language: string;
  code: string;
  lastModified: Date;
}

const Practice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [activeTab, setActiveTab] = useState('output');
  const [projectName, setProjectName] = useState('My Project');
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [showSavedProjects, setShowSavedProjects] = useState(false);

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
    
    // Simulate more realistic code execution with better feedback
    setTimeout(() => {
      if (code.toLowerCase().includes('error') || code.toLowerCase().includes('undefined')) {
        setOutput('❌ Compilation Error\n\nLine 2: ReferenceError: undefined variable\nExecution failed at line 2\n\n💡 Tip: Check your variable declarations and syntax');
        setAiSuggestion('🤖 AI Assistant detected an issue!\n\n🔍 Problem: It looks like you have an undefined variable or syntax error.\n\n✅ Solution: \n1. Check all variable names are spelled correctly\n2. Ensure variables are declared before use\n3. Verify proper syntax (semicolons, brackets, etc.)\n\nWould you like me to help fix this specific error?');
      } else {
        const execTime = (Math.random() * 2 + 0.1).toFixed(2);
        const memUsage = (Math.random() * 3 + 1.2).toFixed(1);
        setOutput(`✅ Program executed successfully!\n\nOutput:\nHello, World!\nHello, Student!\n\n📊 Performance:\n⚡ Execution time: ${execTime}s\n💾 Memory used: ${memUsage}MB\n\n🎉 Great job! Your code ran without errors.`);
      }
      setIsRunning(false);
    }, Math.random() * 1000 + 500);
  }, [code]);

  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    const selectedLang = languages.find(lang => lang.value === language);
    if (selectedLang) {
      setCode(selectedLang.template);
    }
    setOutput('');
    setAiSuggestion('');
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
    
    // Simulate saving animation
    const button = document.querySelector('[data-save-btn]');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 1000);
    }
  }, [projectName, selectedLanguage, code]);

  const handleLoadProject = useCallback((project: SavedProject) => {
    setProjectName(project.name);
    setSelectedLanguage(project.language);
    setCode(project.code);
    setShowSavedProjects(false);
    setOutput('');
    setAiSuggestion('');
  }, []);

  const handleDeleteProject = useCallback((projectId: string) => {
    setSavedProjects(prev => prev.filter(p => p.id !== projectId));
  }, []);

  const handleAiAssist = useCallback(() => {
    setAiSuggestion('🤖 AI Code Assistant\n\n🔍 Code Analysis:\nYour code structure looks good! Here are some suggestions:\n\n✨ Improvements:\n1. Add error handling for better robustness\n2. Consider using more descriptive variable names\n3. Add comments to explain complex logic\n\n💡 Best Practices:\n• Use consistent indentation\n• Follow naming conventions\n• Break down complex functions\n\n🚀 Would you like me to optimize your code or explain any specific part?');
  }, []);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg">
                <Code2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Interactive Code Playground
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Write, compile, and debug code with intelligent AI assistance. Save your projects and track your progress.
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">7+</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">AI</div>
                <div className="text-sm text-gray-600">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">∞</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
            </div>
          </div>

          {/* Main Interface */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Enhanced Toolbar */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-48 font-medium"
                    placeholder="Project name"
                  />
                  
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-48 bg-white shadow-sm">
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
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
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
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSaveProject}
                    data-save-btn
                    className="hover:bg-blue-50 hover:border-blue-200"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSavedProjects(!showSavedProjects)}
                    className="hover:bg-purple-50 hover:border-purple-200"
                  >
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Projects ({savedProjects.length})
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCopyCode}
                    className="hover:bg-gray-50"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>

              {/* Saved Projects Panel */}
              {showSavedProjects && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Saved Projects
                  </h3>
                  {savedProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {savedProjects.map((project) => (
                        <div key={project.id} className="p-3 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">{project.name}</h4>
                              <p className="text-sm text-gray-600">{project.language}</p>
                              <p className="text-xs text-gray-500">{project.lastModified.toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-1 ml-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleLoadProject(project)}
                                className="h-8 w-8 p-0 hover:bg-blue-100"
                              >
                                <FolderOpen className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleDeleteProject(project.id)}
                                className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No saved projects yet. Start coding and save your first project!</p>
                  )}
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Enhanced Code Editor */}
              <div className="border-r border-gray-200">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 p-3 text-sm font-medium border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Code Editor - {languages.find(l => l.value === selectedLanguage)?.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    Lines: {code.split('\n').length}
                  </div>
                </div>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[550px] border-0 resize-none font-mono text-sm focus-visible:ring-0 rounded-none bg-gray-900 text-green-400 leading-relaxed"
                  placeholder="Write your code here..."
                  spellCheck={false}
                />
              </div>

              {/* Enhanced Right Panel */}
              <div className="flex flex-col">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 m-0 rounded-none">
                    <TabsTrigger value="output" className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Output & Results
                    </TabsTrigger>
                    <TabsTrigger value="ai-help" className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      AI Assistant
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="output" className="flex-1 m-0 border-0">
                    <div className="h-full flex flex-col">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border-b">
                        <h3 className="font-medium text-gray-900 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          Program Output
                        </h3>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-full whitespace-pre-wrap overflow-auto border-l-4 border-green-500">
                          {output || '🚀 Ready to run your code!\n\nClick "Run Code" to see the magic happen...\n\n💡 Tips:\n• Write your code in the editor\n• Use console.log() for debugging\n• Check syntax before running'}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ai-help" className="flex-1 m-0 border-0">
                    <div className="h-full flex flex-col">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 border-b">
                        <h3 className="font-medium text-purple-900 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-purple-600" />
                          AI Code Assistant
                        </h3>
                      </div>
                      <div className="flex-1 p-4">
                        {aiSuggestion ? (
                          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 h-full overflow-auto">
                            <div className="text-sm text-gray-700 whitespace-pre-wrap">
                              {aiSuggestion}
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="mt-4 border-purple-200 hover:bg-purple-50"
                              onClick={() => setAiSuggestion('')}
                            >
                              Clear Suggestion
                            </Button>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
                              <Lightbulb className="w-12 h-12 text-purple-600" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Need coding help?</h4>
                            <p className="text-gray-600 mb-6 max-w-sm">
                              Get instant AI assistance with debugging, optimization, and coding best practices.
                            </p>
                            <Button 
                              onClick={handleAiAssist}
                              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              <Lightbulb className="w-4 h-4 mr-2" />
                              Get AI Help
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Enhanced Features Section */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="p-3 bg-blue-500 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">7+ Languages</h3>
                <p className="text-sm text-gray-600">JavaScript, Python, Java, C++, C, Go, Rust with syntax highlighting</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="p-3 bg-green-500 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Execution</h3>
                <p className="text-sm text-gray-600">Real-time compilation with performance metrics and detailed feedback</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="p-3 bg-purple-500 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart AI Help</h3>
                <p className="text-sm text-gray-600">Intelligent debugging, code optimization, and learning suggestions</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="p-3 bg-orange-500 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Save className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Project Management</h3>
                <p className="text-sm text-gray-600">Save, organize, and manage your coding projects with ease</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Practice;
