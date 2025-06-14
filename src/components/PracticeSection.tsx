
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Lightbulb, Code2, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const PracticeSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
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
        setOutput('Hello, World!\nProgram executed successfully!');
      }
      setIsRunning(false);
    }, 2000);
  };

  const handleAiAssist = () => {
    setAiSuggestion('🤖 AI Assistant: Here\'s the corrected code:\n\nconsole.log("Hello, World!");\n\nThe issue was a missing semicolon. In JavaScript, while semicolons are often optional, it\'s good practice to include them for clarity.');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Code2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Practice Coding
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Write, compile, and run code in multiple languages. Get instant AI assistance when you encounter errors or need help debugging your solutions.
          </p>
        </div>

        {/* Main Practice Interface */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Code Editor */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Code Editor</CardTitle>
                  <CardDescription>Write your code and run it instantly</CardDescription>
                </div>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40">
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
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] border-0 resize-none font-mono text-sm focus-visible:ring-0 rounded-none"
                placeholder="Write your code here..."
              />
              <div className="p-4 border-t bg-gray-50/30">
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
            </CardContent>
          </Card>

          {/* Output & AI Assistant */}
          <div className="space-y-6">
            {/* Output */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b bg-gray-50/50">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  Output
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[120px] whitespace-pre-wrap">
                  {output || 'Click "Run Code" to see output...'}
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            {aiSuggestion && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader className="border-b bg-purple-100/50">
                  <CardTitle className="text-lg flex items-center text-purple-800">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {aiSuggestion}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Help Button */}
            <Button 
              onClick={handleAiAssist}
              variant="outline"
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Get AI Help
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Language Support</h3>
            <p className="text-gray-600 text-sm">
              Practice with JavaScript, Python, Java, C++, and more programming languages.
            </p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Compilation</h3>
            <p className="text-gray-600 text-sm">
              Compile and run your code instantly with real-time feedback and error detection.
            </p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Help</h3>
            <p className="text-gray-600 text-sm">
              Get intelligent suggestions and error corrections from our AI assistant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;
