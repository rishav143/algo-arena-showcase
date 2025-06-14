
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Lightbulb, Code2, Zap, CheckCircle, AlertCircle, Settings, Save, Download, Upload } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Practice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [activeTab, setActiveTab] = useState('editor');

  const languages = [
    { value: 'javascript', label: 'JavaScript', template: '// Write your JavaScript code here\nconsole.log("Hello, World!");' },
    { value: 'python', label: 'Python', template: '# Write your Python code here\nprint("Hello, World!")' },
    { value: 'java', label: 'Java', template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
    { value: 'cpp', label: 'C++', template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
    { value: 'c', label: 'C', template: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
    { value: 'go', label: 'Go', template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}' },
    { value: 'rust', label: 'Rust', template: 'fn main() {\n    println!("Hello, World!");\n}' },
  ];

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    setAiSuggestion('');
    
    // Simulate code execution
    setTimeout(() => {
      if (code.includes('error') || code.includes('Error')) {
        setOutput('Error: Compilation failed\nLine 2: Syntax error');
        setAiSuggestion('🤖 AI Assistant: It looks like there\'s a syntax error in your code. Try checking your parentheses and semicolons. Would you like me to help fix it?');
      } else {
        setOutput('Hello, World!\nProgram executed successfully!\nExecution time: 0.25s\nMemory used: 2.1MB');
      }
      setIsRunning(false);
    }, 1500);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    const selectedLang = languages.find(lang => lang.value === language);
    if (selectedLang) {
      setCode(selectedLang.template);
    }
    setOutput('');
    setAiSuggestion('');
  };

  const handleAiAssist = () => {
    setAiSuggestion('🤖 AI Assistant: Here\'s the corrected code:\n\nconsole.log("Hello, World!");\n\nThe issue was a missing semicolon. In JavaScript, while semicolons are often optional, it\'s good practice to include them for clarity.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Code Practice Environment</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Write, compile, and debug code with AI assistance in multiple programming languages.
            </p>
          </div>

          {/* Main Interface */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={handleRunCode} 
                    disabled={isRunning}
                    className="bg-green-600 hover:bg-green-700 text-white"
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
                  <Button variant="outline" size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Code Editor */}
              <div className="border-r border-gray-200">
                <div className="bg-gray-800 text-gray-300 p-3 text-sm font-medium border-b">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Code Editor
                  </div>
                </div>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[550px] border-0 resize-none font-mono text-sm focus-visible:ring-0 rounded-none bg-gray-900 text-green-400"
                  placeholder="Write your code here..."
                />
              </div>

              {/* Right Panel with Tabs */}
              <div className="flex flex-col">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 m-0 rounded-none">
                    <TabsTrigger value="output" className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Output
                    </TabsTrigger>
                    <TabsTrigger value="ai-help" className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      AI Assistant
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="output" className="flex-1 m-0 border-0">
                    <div className="h-full flex flex-col">
                      <div className="bg-gray-50 p-3 border-b">
                        <h3 className="font-medium text-gray-900">Program Output</h3>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-full whitespace-pre-wrap overflow-auto">
                          {output || 'Click "Run Code" to see output...'}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ai-help" className="flex-1 m-0 border-0">
                    <div className="h-full flex flex-col">
                      <div className="bg-purple-50 p-3 border-b">
                        <h3 className="font-medium text-purple-900">AI Code Assistant</h3>
                      </div>
                      <div className="flex-1 p-4">
                        {aiSuggestion ? (
                          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 h-full overflow-auto">
                            <div className="text-sm text-gray-700 whitespace-pre-wrap">
                              {aiSuggestion}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center">
                            <Lightbulb className="w-12 h-12 text-purple-400 mb-4" />
                            <p className="text-gray-600 mb-4">Need help with your code?</p>
                            <Button 
                              onClick={handleAiAssist}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
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

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <Card className="text-center border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <Code2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">7+ Languages</h3>
                <p className="text-sm text-gray-600">JavaScript, Python, Java, C++, C, Go, Rust</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-green-200 bg-green-50/50">
              <CardContent className="p-6">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Execution</h3>
                <p className="text-sm text-gray-600">Instant compilation and execution</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-purple-200 bg-purple-50/50">
              <CardContent className="p-6">
                <Lightbulb className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">AI Debugging</h3>
                <p className="text-sm text-gray-600">Smart error detection and fixes</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-orange-200 bg-orange-50/50">
              <CardContent className="p-6">
                <Settings className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Advanced Tools</h3>
                <p className="text-sm text-gray-600">Save, import, and export code</p>
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
