
import React, { memo } from 'react';
import { usePractice } from '@/contexts/PracticeContext';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PracticeNavigation from './PracticeNavigation';
import ProjectsSidebar from './sidebar/ProjectsSidebar';
import MainWorkspace from './workspace/MainWorkspace';
import RightPanel from './workspace/RightPanel';

const PracticeLayout: React.FC = memo(() => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Navigation */}
      <div className="flex-shrink-0">
        <PracticeNavigation />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Projects Sidebar */}
        <div className="flex-shrink-0 w-80">
          <ProjectsSidebar />
        </div>
        
        {/* Resizable Content Area */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            <ResizablePanel defaultSize={60} minSize={30}>
              <MainWorkspace />
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={40} minSize={25}>
              <RightPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
});

PracticeLayout.displayName = 'PracticeLayout';

export default PracticeLayout;
