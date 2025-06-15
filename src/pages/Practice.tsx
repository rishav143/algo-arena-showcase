
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

  return (
    <ProjectProvider>
      <div className="h-screen flex w-full">
        {sidebarVisible && (
          <PracticeSidebar 
            aiAssistantEnabled={aiAssistantEnabled}
            onAiAssistantToggle={setAiAssistantEnabled}
          />
        )}
        <main className="flex-1 flex flex-col">
          <PracticeWorkspace 
            theme={theme}
            aiAssistantEnabled={aiAssistantEnabled}
            onToggleSidebar={toggleSidebar}
            onThemeChange={setTheme}
          />
        </main>
      </div>
    </ProjectProvider>
  );
};

export default Practice;
