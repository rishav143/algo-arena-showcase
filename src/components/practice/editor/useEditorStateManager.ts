
import { useState, useEffect, useRef, useCallback } from 'react';
import { EditorState, EditorStateManager } from '@/types/editor';
import { ProjectFile } from '@/types/project';
import { 
  createInitialEditorState, 
  createFileState, 
  createLanguageState,
  isActiveFile,
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
  const isNewFileRef = useRef(false);

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

  // Handle file selection changes and deletions
  useEffect(() => {
    if (selectedFile && !isActiveFile(editorState, selectedFile.id)) {
      // Check if this is a newly created file (content matches template)
      const template = getLanguageTemplate(selectedFile.language);
      isNewFileRef.current = selectedFile.content === template || selectedFile.content.trim() === '';
      
      if (editorState.hasUnsavedChanges && !isNewFileRef.current) {
        setPendingAction(() => () => switchToFile(selectedFile.id, selectedFile.content, selectedFile.language));
      } else {
        switchToFile(selectedFile.id, selectedFile.content, selectedFile.language);
      }
    } else if (!selectedFile && editorState.activeState.mode === 'file') {
      // File was deleted or deselected, switch to language template
      const template = getLanguageTemplate(editorState.language);
      setEditorState({
        content: template,
        language: editorState.language,
        hasUnsavedChanges: false,
        activeState: createLanguageState(editorState.language)
      });
    }
  }, [selectedFile, editorState]);

  // Listen for deletion events to switch to language template
  useEffect(() => {
    const handleFileDeleted = () => {
      const template = getLanguageTemplate(editorState.language);
      setEditorState({
        content: template,
        language: editorState.language,
        hasUnsavedChanges: false,
        activeState: createLanguageState(editorState.language)
      });
    };

    const handleProjectDeleted = () => {
      const template = getLanguageTemplate(editorState.language);
      setEditorState({
        content: template,
        language: editorState.language,
        hasUnsavedChanges: false,
        activeState: createLanguageState(editorState.language)
      });
    };

    window.addEventListener('fileDeleted', handleFileDeleted);
    window.addEventListener('projectDeleted', handleProjectDeleted);

    return () => {
      window.removeEventListener('fileDeleted', handleFileDeleted);
      window.removeEventListener('projectDeleted', handleProjectDeleted);
    };
  }, [editorState.language]);

  const switchToFile = useCallback((fileId: string, content: string, language: string) => {
    setEditorState({
      content,
      language,
      hasUnsavedChanges: false,
      activeState: createFileState(fileId, content, language)
    });
    isNewFileRef.current = false;
  }, []);

  const switchToLanguage = useCallback((language: string, content: string) => {
    setEditorState({
      content,
      language,
      hasUnsavedChanges: false,
      activeState: createLanguageState(language)
    });
    isNewFileRef.current = false;
  }, []);

  const updateContent = useCallback((content: string) => {
    setEditorState(prev => ({
      ...prev,
      content,
      hasUnsavedChanges: !isNewFileRef.current
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
    hasPendingAction: !!pendingAction && !isNewFileRef.current,
    executePendingAction,
    cancelPendingAction
  };
};
