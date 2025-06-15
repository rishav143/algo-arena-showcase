
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
      
      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Projects Sidebar */}
        <ProjectsSidebar />
        
        {/* Resizable Code Editor and Right Panel */}
        <div className="flex-1 min-w-0">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Code Editor (Main Workspace) */}
            <ResizablePanel defaultSize={60} minSize={30} className="min-w-0">
              <MainWorkspace />
            </ResizablePanel>
            
            {/* Resizable Handle */}
            <ResizableHandle withHandle />
            
            {/* Right Panel for Output/AI/Video */}
            <ResizablePanel defaultSize={40} minSize={25} className="min-w-0">
              <RightPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default PracticeLayout;
