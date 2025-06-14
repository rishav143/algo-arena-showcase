
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Play, Save, AlertTriangle } from 'lucide-react';
import { Template } from '@/types/template';
import { ProjectFile } from '@/types/project';
import { EditorState } from '@/types/editor';

interface EditorHeaderProps {
  editorState: EditorState;
  onLanguageSelect: (language: string) => void;
  selectedFile: ProjectFile | null;
  selectedTemplate: Template | null;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  editorState,
  onLanguageSelect,
  selectedFile,
  selectedTemplate,
}) => {
  const getCurrentFileName = () => {
    if (editorState.activeState.mode === 'file' && selectedFile) {
      return selectedFile.name;
    }
    if (editorState.activeState.mode === 'template' && selectedTemplate) {
      return selectedTemplate.name;
    }
    return `${editorState.language} Template`;
  };

  const onRun = () => {
    console.log('Running code...');
  };

  const onSave = () => {
    console.log('Saving code...');
  };

  const onCopy = () => {
    navigator.clipboard.writeText(editorState.content);
  };

  return (
    <div className="border-b bg-muted/50 p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Code className="w-4 h-4" />
        <span className="text-sm font-medium">{getCurrentFileName()}</span>
        {editorState.hasUnsavedChanges && (
          <div className="flex items-center gap-1 text-orange-600">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-xs">Unsaved</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Select value={editorState.language} onValueChange={onLanguageSelect}>
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
        
        <Button variant="ghost" size="sm" onClick={onSave}>
          <Save className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
