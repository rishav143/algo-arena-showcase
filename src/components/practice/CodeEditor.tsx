
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Download, Play, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  onError?: (error: string | null) => void;
}

const templates = {
  normal: '// Welcome to CodeRoom!\nconsole.log("Hello, World!");',
  codeforces: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int t;\n    cin >> t;\n    while(t--) {\n        // Your solution here\n    }\n    return 0;\n}`,
  leetcode: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your solution here\n    }\n};`,
  hackerrank: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Read input\n    // Process\n    // Write output\n    return 0;\n}`
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language, onError }) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedTemplate, setSelectedTemplate] = useState('normal');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Code copied to clipboard.",
    });
  };

  const handleRun = () => {
    try {
      // Basic syntax check for JavaScript
      if (selectedLanguage === 'javascript') {
        new Function(code);
      }
      onError?.(null);
      toast({
        title: "Running Code",
        description: "Executing your code...",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Syntax error in code';
      onError?.(errorMessage);
      toast({
        title: "Code Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    onChange(templates[template as keyof typeof templates]);
  };

  const lines = code.split('\n');
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="border-b bg-muted/50 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          <span className="text-sm font-medium">Code Editor</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="codeforces">Codeforces</SelectItem>
              <SelectItem value="leetcode">LeetCode</SelectItem>
              <SelectItem value="hackerrank">HackerRank</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm" onClick={handleRun}>
            <Play className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Editor Content with Line Numbers */}
      <div className="flex-1 relative flex">
        {/* Line Numbers */}
        <div className="bg-muted/30 border-r border-border px-3 py-4 text-right min-w-[60px]">
          {lineNumbers.map((lineNum) => (
            <div
              key={lineNum}
              className="text-xs text-muted-foreground leading-6 h-6 flex items-center justify-end"
              style={{ fontFamily: 'monospace' }}
            >
              {lineNum}
            </div>
          ))}
        </div>
        
        {/* Code Area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm bg-background border-0 outline-none resize-none leading-6"
            placeholder="Start coding here..."
            spellCheck={false}
            style={{ 
              fontFamily: 'monospace',
              lineHeight: '1.5'
            }}
          />
        </div>
      </div>
    </div>
  );
};
