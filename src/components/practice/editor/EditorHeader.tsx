
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Play, Save, AlertTriangle, Palette } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface EditorHeaderProps {
  currentFileName: string;
  hasUnsavedChanges: boolean;
  language: string;
  theme: string;
  onLanguageChange: (language: string) => void;
  onThemeChange: (theme: string) => void;
  onRun: () => void;
  onSave: () => void;
  onCopy: () => void;
  canSave: boolean;
}

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'github', label: 'GitHub' },
  { value: 'vscode', label: 'VS Code' },
];

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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <Palette className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40" align="end">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Theme</h4>
              <div className="grid gap-1">
                {themes.map((themeOption) => (
                  <Button
                    key={themeOption.value}
                    variant={theme === themeOption.value ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onThemeChange(themeOption.value)}
                  >
                    {themeOption.label}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
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
