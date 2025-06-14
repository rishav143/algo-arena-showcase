
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Download, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language }) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Code copied to clipboard.",
    });
  };

  const handleRun = () => {
    toast({
      title: "Running Code",
      description: "Executing your code...",
    });
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
        <div className="bg-muted/30 border-r border-border px-2 py-4 text-right min-w-[50px]">
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
