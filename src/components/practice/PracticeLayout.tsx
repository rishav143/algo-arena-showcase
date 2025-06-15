import React, { useEffect, useRef } from 'react';
import { usePractice } from '@/contexts/PracticeContext';
import PracticeNavigation from './PracticeNavigation';
import ProjectsSidebar from './sidebar/ProjectsSidebar';
import MainWorkspace from './workspace/MainWorkspace';
import RightPanel from './workspace/RightPanel';
import { useToast } from '@/components/ui/use-toast'; // import shadcn/ui toast
import { CreateFileDialogProvider } from './sidebar/CreateFileDialogContext';

const AUTO_SAVE_INTERVAL_MS = 5000; // 5 seconds

const PracticeLayout: React.FC = () => {
  const { state, dispatch } = usePractice();
  const { toast } = useToast();

  // === INTERVAL-BASED AUTO-SAVE ===
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any previous interval just in case
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (state.activeFile && state.activeFile.isUnsaved) {
        // Avoid saving empty files
        if (state.activeFile.content.trim() !== "") {
          dispatch({ type: 'SAVE_FILE' });
          console.log('[AutoSave] File auto-saved:', state.activeFile?.name, 'Length:', state.activeFile.content.length);
        }
      }
    }, AUTO_SAVE_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // We only want to set up the interval once when the component mounts and clean up when it unmounts.
    // We do NOT want to rerun this effect on every state change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeFile && state.activeFile.id]);

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
          dispatch({ type: 'SET_RIGHT_TAB', payload: { tab: 'ai' } });
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [state.activeFile?.isUnsaved, state.aiAssistantEnabled, dispatch]);

  return (
    <CreateFileDialogProvider>
      <div className="h-full flex flex-col bg-background">
        {/* Fixed Navigation */}
        <PracticeNavigation />

        {/* Main Content Area */}
        <div className="flex-1 flex min-h-0">
          {/* Projects Sidebar - Fixed width */}
          <div className="flex-shrink-0">
            <ProjectsSidebar />
          </div>

          {/* Resizable Content Area */}
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
    </CreateFileDialogProvider>
  );
};

export default PracticeLayout;
