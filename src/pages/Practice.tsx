
import React, { useState } from 'react';
import { PracticeSidebar } from '@/components/practice/PracticeSidebar';
import { PracticeWorkspace } from '@/components/practice/PracticeWorkspace';
import { ProjectProvider } from '@/contexts/ProjectContext';

const Practice = () => {
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [theme, setTheme] = useState('light');

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      case 'monokai':
        return 'bg-gray-800 text-green-400';
      case 'dracula':
        return 'bg-purple-900 text-purple-100';
      case 'github':
        return 'bg-white text-gray-900';
      case 'vscode':
        return 'bg-gray-800 text-blue-200';
      default:
        return 'bg-white text-gray-900';
    }
  };

  return (
    <ProjectProvider>
      <div className={`h-screen flex w-full ${getThemeClasses(theme)}`}>
        {sidebarVisible && (
          <PracticeSidebar 
            aiAssistantEnabled={aiAssistantEnabled}
            onAiAssistantToggle={setAiAssistantEnabled}
            theme={theme}
          />
        )}
        <main className="flex-1 flex flex-col">
          <PracticeWorkspace 
            onToggleSidebar={toggleSidebar}
            theme={theme}
            onThemeChange={setTheme}
          />
        </main>
      </div>
    </ProjectProvider>
  );
};

export default Practice;
