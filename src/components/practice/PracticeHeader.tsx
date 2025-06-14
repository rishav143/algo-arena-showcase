
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Play, Code2, Copy } from 'lucide-react';

interface Language {
  value: string;
  label: string;
  template: string;
}

interface PracticeHeaderProps {
  selectedLanguage: string;
  languages: Language[];
  isRunning: boolean;
  onLanguageChange: (language: string) => void;
  onRunCode: () => void;
  onCopyCode: () => void;
}

const PracticeHeader: React.FC<PracticeHeaderProps> = ({
  selectedLanguage,
  languages,
  isRunning,
  onLanguageChange,
  onRunCode,
  onCopyCode
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-2 sm:p-4 flex-shrink-0">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Code Playground
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">Write, run, and debug your code with AI assistance</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32 sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    {lang.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={onRunCode} 
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            {isRunning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                <span className="hidden sm:inline">Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Run Code</span>
              </>
            )}
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCopyCode}
        >
          <Copy className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Copy Code</span>
        </Button>
      </div>
    </div>
  );
};

export default PracticeHeader;
