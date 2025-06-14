
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Play, Save, AlertTriangle } from 'lucide-react';

interface EditorHeaderProps {
  currentFileName: string;
  hasUnsavedChanges: boolean;
  language: string;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  onSave: () => void;
  onCopy: () => void;
  canSave: boolean;
  isFileMode: boolean;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  currentFileName,
  hasUnsavedChanges,
  language,
  onLanguageChange,
  onRun,
  onSave,
  onCopy,
  canSave,
  isFileMode,
}) => {
  return (
    <div className="border-b bg-muted/50 p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Code className="w-4 h-4" />
        <span className="text-sm font-medium">{currentFileName}</span>
        {hasUnsavedChanges && (
          <div className="flex items-center gap-1 text-orange-600">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-xs">Unsaved</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Select 
          value={language} 
          onValueChange={onLanguageChange}
          disabled={isFileMode}
        >
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="c">C</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="ghost" size="sm" onClick={onRun}>
          <Play className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSave}
          disabled={!canSave}
        >
          <Save className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
