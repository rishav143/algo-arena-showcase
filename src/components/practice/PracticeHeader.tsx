
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Play, 
  Send, 
  Video, 
  PanelLeftOpen,
  Palette
} from 'lucide-react';

interface PracticeHeaderProps {
  onVideoSelect?: (video: any) => void;
  onRunCode?: () => void;
  onSubmitCode?: () => void;
  onToggleSidebar?: () => void;
  theme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'github', label: 'GitHub' },
  { value: 'vscode', label: 'VS Code' },
];

export const PracticeHeader: React.FC<PracticeHeaderProps> = ({
  onVideoSelect,
  onRunCode,
  onSubmitCode,
  onToggleSidebar,
  theme,
  onThemeChange,
}) => {
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 border-gray-700 text-gray-100';
      case 'monokai':
        return 'bg-gray-800 border-gray-600 text-green-400';
      case 'dracula':
        return 'bg-purple-900 border-purple-700 text-purple-100';
      case 'github':
        return 'bg-white border-gray-300 text-gray-900';
      case 'vscode':
        return 'bg-gray-800 border-gray-600 text-blue-200';
      default:
        return 'bg-white border-gray-300 text-gray-900';
    }
  };

  return (
    <div className={`border-b p-4 flex items-center justify-between ${getThemeStyles(theme)}`}>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="flex items-center gap-2"
        >
          <PanelLeftOpen className="w-4 h-4" />
          Sidebar
        </Button>
        
        <h1 className="text-xl font-bold">CodeRoom Practice</h1>
      </div>
      
      <div className="flex items-center gap-2">
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

        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onVideoSelect?.({ title: 'Sample Video', url: 'https://example.com' })}
          className="flex items-center gap-2"
        >
          <Video className="w-4 h-4" />
          Watch Tutorial
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRunCode}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Run Code
        </Button>
        
        <Button 
          size="sm"
          onClick={onSubmitCode}
          className="flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit
        </Button>
      </div>
    </div>
  );
};
