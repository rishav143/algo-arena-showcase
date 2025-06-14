
import { useState, useEffect, useRef, useCallback } from 'react';
import { EditorState, EditorStateManager } from '@/types/editor';
import { ProjectFile } from '@/types/project';
import { 
  createInitialEditorState, 
  createFileState, 
  createLanguageState,
  isActiveFile,
  isActiveLanguage,
  getLanguageTemplate
} from '@/utils/editorStateManager';

interface UseEditorStateManagerProps {
  selectedFile: ProjectFile | null;
  updateFileContent: (projectId: string, fileId: string, content: string) => void;
  selectedProjectId: string | null;
}

export const useEditorStateManager = ({
  selectedFile,
  updateFileContent,
  selectedProjectId
}: UseEditorStateManagerProps): EditorStateManager => {
  const [editorState, setEditorState] = useState<EditorState>(createInitialEditorState);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save for files only
  useEffect(() => {
    if (
      editorState.hasUnsavedChanges && 
      editorState.activeState.mode === 'file' && 
      selectedFile && 
      selectedProjectId &&
      isActiveFile(editorState, selectedFile.id)
    ) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        updateFileContent(selectedProjectId, selectedFile.id, editorState.content);
        setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
        console.log('Auto-saved file:', selectedFile.name);
      }, 5000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [editorState.hasUnsavedChanges, editorState.content, selectedFile, selectedProjectId, updateFileContent, editorState.activeState]);

  // Handle file selection changes
  useEffect(() => {
    if (selectedFile && !isActiveFile(editorState, selectedFile.id)) {
      if (editorState.hasUnsavedChanges) {
        setPendingAction(() => () => switchToFile(selectedFile.id, selectedFile.content, selectedFile.language));
      } else {
        switchToFile(selectedFile.id, selectedFile.content, selectedFile.language);
      }
    }
  }, [selectedFile]);

  const switchToFile = useCallback((fileId: string, content: string, language: string) => {
    setEditorState({
      content,
      language,
      hasUnsavedChanges: false,
      activeState: createFileState(fileId, content, language)
    });
  }, []);

  const switchToLanguage = useCallback((language: string, content: string) => {
    setEditorState({
      content,
      language,
      hasUnsavedChanges: false,
      activeState: createLanguageState(language)
    });
  }, []);

  const updateContent = useCallback((content: string) => {
    setEditorState(prev => ({
      ...prev,
      content,
      hasUnsavedChanges: true
    }));
  }, []);

  const clearUnsavedChanges = useCallback(() => {
    setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
  }, []);

  const executePendingAction = useCallback(() => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const cancelPendingAction = useCallback(() => {
    setPendingAction(null);
  }, []);

  return {
    editorState,
    switchToFile,
    switchToLanguage,
    updateContent,
    clearUnsavedChanges,
    hasPendingAction: !!pendingAction,
    executePendingAction,
    cancelPendingAction
  };
};
