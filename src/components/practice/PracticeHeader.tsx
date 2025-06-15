
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Play, Send, Menu, Sun, Moon } from 'lucide-react';
import { getThemeStyles } from '@/utils/themeManager';

interface PracticeHeaderProps {
  theme: string;
  onVideoSelect: (video: any) => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
  onToggleSidebar?: () => void;
  onThemeChange?: (theme: string) => void;
}

export const PracticeHeader: React.FC<PracticeHeaderProps> = ({
  theme,
  onVideoSelect,
  onRunCode,
  onSubmitCode,
  onToggleSidebar,
  onThemeChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const themeStyles = getThemeStyles(theme);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Mock video data - in real app this would come from API
      const mockVideo = {
        title: `Tutorial: ${searchQuery}`,
        channel: 'CodeTutorials',
        duration: '10:30',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      };
      onVideoSelect(mockVideo);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    onThemeChange?.(newTheme);
  };

  return (
    <div className={`border-b p-4 ${themeStyles.border} ${themeStyles.background}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
              <Menu className="w-4 h-4" />
            </Button>
          )}
          
          <Select value={selectedProblem} onValueChange={setSelectedProblem}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select a problem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="two-sum">Two Sum</SelectItem>
              <SelectItem value="reverse-string">Reverse String</SelectItem>
              <SelectItem value="fibonacci">Fibonacci</SelectItem>
              <SelectItem value="binary-search">Binary Search</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="flex gap-2 flex-1">
            <Input
              placeholder="Search for tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button variant="outline" size="sm" onClick={handleSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          
          <Button variant="outline" size="sm" onClick={onRunCode}>
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
          
          <Button variant="default" size="sm" onClick={onSubmitCode}>
            <Send className="w-4 h-4 mr-1" />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
