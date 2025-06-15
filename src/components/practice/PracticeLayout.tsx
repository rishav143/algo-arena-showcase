
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PracticeHeader from './PracticeHeader';
import ProjectSidebar from './ProjectSidebar';
import CodeWorkspace from './CodeWorkspace';
import RightPanel from './RightPanel';
import { PracticeProvider } from '../../contexts/PracticeContext';

const PracticeLayout = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeRightTab, setActiveRightTab] = useState<'output' | 'ai' | 'video'>('output');

  return (
    <PracticeProvider>
      <div className="h-screen flex flex-col bg-slate-900">
        <PracticeHeader />
        
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Project Sidebar */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <ProjectSidebar 
                selectedProject={selectedProject}
                onProjectSelect={setSelectedProject}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Code Editor */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <CodeWorkspace selectedProject={selectedProject} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Panel (Output/AI/Video) */}
            <ResizablePanel defaultSize={30} minSize={25} maxSize={50}>
              <RightPanel 
                activeTab={activeRightTab}
                onTabChange={setActiveRightTab}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </PracticeProvider>
  );
};

export default PracticeLayout;
