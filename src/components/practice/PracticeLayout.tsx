import React, { useEffect } from 'react';
import { usePractice } from '@/contexts/PracticeContext';
import { useDebounce } from '@/hooks/useDebounce';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PracticeNavigation from './PracticeNavigation';
import ProjectsSidebar from './sidebar/ProjectsSidebar';
import MainWorkspace from './workspace/MainWorkspace';
import RightPanel from './workspace/RightPanel';
import { useToast } from '@/components/ui/use-toast'; // import shadcn/ui toast
import { CreateFileDialogProvider } from './sidebar/CreateFileDialogContext';

const PracticeLayout: React.FC = () => {
  const { state, dispatch } = usePractice();
  const { toast } = useToast();

  // Debounce tied strictly to active file id + content to prevent unwanted saves
  const debouncedContent = useDebounce(
    state.activeFile ? state.activeFile.content : '',
    1600 // slightly faster debounce for responsive feel, adjust as needed
  );
  const debouncedFileId = useDebounce(
    state.activeFile ? state.activeFile.id : '',
    1600
  );

  // Auto-save ONLY if the debounced content matches the same file id
  useEffect(() => {
    if (!state.activeFile?.isUnsaved) return;
    if (!state.activeFile || !state.activeFile.id) return;
    if (state.activeFile.id !== debouncedFileId) return;
    if (debouncedContent.trim() === '') return;

    dispatch({ type: 'SAVE_FILE' });
  }, [debouncedContent, debouncedFileId, state.activeFile, dispatch]);

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
