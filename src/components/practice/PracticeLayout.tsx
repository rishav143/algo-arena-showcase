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

  // Only debounce on content AND file id; this ensures that if you switch files, timers reset.
  // To further stabilize, don't debounce on every char, but only when file/content truly changes.
  // Also, use a slightly longer delay for less "chattery" auto-save.
  const debouncedContent = useDebounce(
    state.activeFile ? state.activeFile.content : '',
    2000 // 2 seconds feels natural for "auto-save after typing stops"
  );
  const debouncedFileId = useDebounce(
    state.activeFile ? state.activeFile.id : '',
    2000
  );

  // This effect triggers ONLY when user stops editing a file for 2 sec, and they haven't switched files.
  useEffect(() => {
    if (!state.activeFile?.isUnsaved) return; // Only auto-save if truly unsaved
    if (!state.activeFile || !state.activeFile.id) return;

    // Match file ids to ensure no cross-file glitches.
    if (state.activeFile.id !== debouncedFileId) return;

    // To avoid accidental auto-saves on empty new files, only save if not empty or whitespace
    if (debouncedContent.trim() === '') return;

    // Actually trigger save
    dispatch({ type: 'SAVE_FILE' });

    // Optionally: Add a console log to monitor when auto-save triggers
    console.log('[AutoSave] File auto-saved:', state.activeFile?.name, 'Length:', debouncedContent.length);

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
