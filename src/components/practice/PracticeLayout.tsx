
import React, { useEffect, useMemo } from 'react';
import { usePractice } from '@/contexts/PracticeContext';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PracticeNavigation from './PracticeNavigation';
import ProjectsSidebar from './sidebar/ProjectsSidebar';
import MainWorkspace from './workspace/MainWorkspace';
import RightPanel from './workspace/RightPanel';

const PracticeLayout: React.FC = () => {
  const { state, dispatch } = usePractice();

  // Memoize expensive computations
  const memoizedState = useMemo(() => ({
    activeFile: state.activeFile,
    aiAssistantEnabled: state.aiAssistantEnabled,
    rightTab: state.rightTab
  }), [state.activeFile?.id, state.activeFile?.isUnsaved, state.aiAssistantEnabled, state.rightTab]);

  // Auto-save functionality with cleanup
  useEffect(() => {
    if (!memoizedState.activeFile?.isUnsaved) return;

    const autoSaveTimer = setTimeout(() => {
      dispatch({ type: 'SAVE_FILE' });
    }, 5000);

    return () => clearTimeout(autoSaveTimer);
  }, [memoizedState.activeFile?.isUnsaved, dispatch]);

  // Keyboard shortcuts with cleanup
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (memoizedState.activeFile?.isUnsaved) {
          dispatch({ type: 'SAVE_FILE' });
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        if (memoizedState.aiAssistantEnabled) {
          dispatch({ type: 'SET_RIGHT_TAB', payload: { tab: 'ai' } });
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [memoizedState.activeFile?.isUnsaved, memoizedState.aiAssistantEnabled, dispatch]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Navigation - Fixed height */}
      <div className="flex-shrink-0">
        <PracticeNavigation />
      </div>
      
      {/* Main Content - Flexible height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Projects Sidebar - Fixed width */}
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
};

export default PracticeLayout;
