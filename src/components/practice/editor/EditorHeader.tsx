
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Play, Save, AlertTriangle } from 'lucide-react';
import { Template } from '@/types/template';

interface EditorHeaderProps {
  currentFileName: string;
  hasUnsavedChanges: boolean;
  language: string;
  selectedTemplate: Template | null;
  templates: Template[];
  onLanguageChange: (language: string) => void;
  onTemplateChange: (templateId: string) => void;
  onRun: () => void;
  onSave: () => void;
  onCopy: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  currentFileName,
  hasUnsavedChanges,
  language,
  selectedTemplate,
  templates,
  onLanguageChange,
  onTemplateChange,
  onRun,
  onSave,
  onCopy,
}) => {
  const getDefaultTemplateOptions = () => {
    return templates.filter(t => t.type === 'default');
  };

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
        <Select value={language} onValueChange={onLanguageChange}>
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

        <Select 
          value={selectedTemplate?.id || ''} 
          onValueChange={onTemplateChange}
        >
          <SelectTrigger className="w-32 h-8">
            <SelectValue placeholder="Template" />
          </SelectTrigger>
          <SelectContent>
            {getDefaultTemplateOptions().map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
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
