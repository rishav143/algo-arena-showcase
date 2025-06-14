
import React from 'react';
import { AISettings } from './sidebar/AISettings';
import { ProjectsSection } from './sidebar/ProjectsSection';

interface PracticeSidebarProps {
  aiAssistantEnabled: boolean;
  onAiAssistantToggle: (enabled: boolean) => void;
  theme: string;
}

export const PracticeSidebar: React.FC<PracticeSidebarProps> = ({
  aiAssistantEnabled,
  onAiAssistantToggle,
  theme,
}) => {
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 border-gray-700 text-gray-100';
      case 'monokai':
        return 'bg-gray-700 border-gray-600 text-green-400';
      case 'dracula':
        return 'bg-purple-800 border-purple-700 text-purple-100';
      case 'github':
        return 'bg-gray-50 border-gray-300 text-gray-900';
      case 'vscode':
        return 'bg-gray-700 border-gray-600 text-blue-200';
      default:
        return 'bg-background border-border text-foreground';
    }
  };

  return (
    <div className={`w-64 h-full border-r flex flex-col ${getThemeClasses(theme)}`}>
      <AISettings
        aiAssistantEnabled={aiAssistantEnabled}
        onAiAssistantToggle={onAiAssistantToggle}
      />
      <ProjectsSection />
    </div>
  );
};
