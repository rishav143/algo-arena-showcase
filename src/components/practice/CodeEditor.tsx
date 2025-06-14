
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Code2 } from 'lucide-react';

interface Language {
  value: string;
  label: string;
  template: string;
}

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  selectedLanguage: string;
  languages: Language[];
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  selectedLanguage,
  languages
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="bg-gray-800 text-gray-300 p-2 sm:p-3 rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">
              Code Editor - {languages.find(l => l.value === selectedLanguage)?.label}
            </span>
          </div>
          <div className="text-xs text-gray-400 hidden sm:block">
            Lines: {code.split('\n').length}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 min-h-0">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-full w-full border-0 resize-none font-mono text-xs sm:text-sm focus-visible:ring-0 rounded-none bg-gray-900 text-green-400 leading-relaxed"
          placeholder="Write your code here..."
          spellCheck={false}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
