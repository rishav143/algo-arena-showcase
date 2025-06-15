
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Save, Copy, Loader2 } from 'lucide-react';
import { getThemeStyles } from '@/utils/themeManager';

interface EditorHeaderProps {
  currentFileName: string;
  hasUnsavedChanges: boolean;
  language: string;
  theme: string;
  onLanguageChange: (language: string) => void;
  onThemeChange: () => void;
  onRun: () => void;
  onSave: () => void;
  onCopy: () => void;
  canSave: boolean;
  isCompiling?: boolean;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  currentFileName,
  hasUnsavedChanges,
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  onRun,
  onSave,
  onCopy,
  canSave,
  isCompiling = false
}) => {
  const themeStyles = getThemeStyles(theme);

  return (
    <div className={`border-b p-3 ${themeStyles.border} ${themeStyles.accent}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {currentFileName}
              {hasUnsavedChanges && <span className="text-orange-500">*</span>}
            </span>
          </div>
          
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSave}
            disabled={!canSave}
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={onRun}
            disabled={isCompiling}
          >
            {isCompiling ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-1" />
            )}
            Run
          </Button>
        </div>
      </div>
    </div>
  );
};
