
import React from 'react';
import { AISettings } from './sidebar/AISettings';
import { TemplatesSection } from './sidebar/TemplatesSection';
import { ProjectsSection } from './sidebar/ProjectsSection';

interface PracticeSidebarProps {
  aiAssistantEnabled: boolean;
  onAiAssistantToggle: (enabled: boolean) => void;
}

export const PracticeSidebar: React.FC<PracticeSidebarProps> = ({
  aiAssistantEnabled,
  onAiAssistantToggle,
}) => {
  return (
    <div className="w-64 h-full border-r bg-background flex flex-col">
      <AISettings
        aiAssistantEnabled={aiAssistantEnabled}
        onAiAssistantToggle={onAiAssistantToggle}
      />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
};
