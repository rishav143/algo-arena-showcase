
import React, { useEffect } from 'react';
import { usePractice } from '@/contexts/PracticeContext';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PracticeNavigation from './PracticeNavigation';
import ProjectsSidebar from './sidebar/ProjectsSidebar';
import MainWorkspace from './workspace/MainWorkspace';
import RightPanel from './workspace/RightPanel';

const PracticeLayout: React.FC = () => {
  const { state, dispatch } = usePractice();

  // Auto-save functionality
  useEffect(() => {
    if (!state.activeFile?.isUnsaved) return;

    const autoSaveTimer = setTimeout(() => {
      dispatch({ type: 'SAVE_FILE' });
    }, 5000);

    return () => clearTimeout(autoSaveTimer);
  }, [state.activeFile?.content, state.activeFile?.isUnsaved, dispatch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (state.activeFile?.isUnsaved) {
          dispatch({ type: 'SAVE_FILE' });
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        if (state.aiAssistantEnabled) {
          dispatch({ type: 'SET_ACTIVE_TAB', payload: { tab: 'ai' } });
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [state.activeFile?.isUnsaved, state.aiAssistantEnabled, dispatch]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Fixed Navigation */}
      <PracticeNavigation />
      
      {/* Main Content Area with Resizable Panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Projects Sidebar */}
        <ProjectsSidebar />
        
        {/* Resizable Main Content Area */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Code Editor (Main Workspace) */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full overflow-hidden">
              <MainWorkspace />
            </div>
          </ResizablePanel>
          
          {/* Resizable Handle */}
          <ResizableHandle withHandle />
          
          {/* Right Panel for Output/AI/Video */}
          <ResizablePanel defaultSize={40} minSize={25}>
            <div className="h-full overflow-hidden">
              <RightPanel />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default PracticeLayout;
