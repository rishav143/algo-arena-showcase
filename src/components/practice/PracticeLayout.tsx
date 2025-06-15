
import React, { useEffect } from 'react';
import { usePractice } from '@/contexts/PracticeContext';
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
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Fixed Navigation */}
      <PracticeNavigation />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Projects Sidebar */}
        <ProjectsSidebar />
        
        {/* Code Editor (Main Workspace) */}
        <div className="flex-1 flex overflow-hidden">
          <MainWorkspace />
          
          {/* Right Panel for Output/AI/Video */}
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default PracticeLayout;
