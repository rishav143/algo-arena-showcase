
import React, { useState } from 'react';
import { PracticeSidebar } from '@/components/practice/PracticeSidebar';
import { PracticeWorkspace } from '@/components/practice/PracticeWorkspace';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { TemplateProvider } from '@/contexts/TemplateContext';

const Practice = () => {
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);

  return (
    <ProjectProvider>
      <TemplateProvider>
        <div className="h-screen flex w-full">
          <PracticeSidebar 
            aiAssistantEnabled={aiAssistantEnabled}
            onAiAssistantToggle={setAiAssistantEnabled}
          />
          <main className="flex-1 flex flex-col">
            <PracticeWorkspace />
          </main>
        </div>
      </TemplateProvider>
    </ProjectProvider>
  );
};

export default Practice;
