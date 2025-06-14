
import { useState, useEffect, useRef } from 'react';
import { EditorState } from '@/types/template';
import { Project, File } from '@/types/project';
import { Template } from '@/types/template';

interface UseEditorStateProps {
  selectedFile: File | null;
  selectedTemplate: Template | null;
  selectedProject: Project | null;
  updateFileContent: (projectId: string, fileId: string, content: string) => void;
}

export const useEditorState = ({
  selectedFile,
  selectedTemplate,
  selectedProject,
  updateFileContent,
}: UseEditorStateProps) => {
  const [editorState, setEditorState] = useState<EditorState>({
    hasUnsavedChanges: false,
    currentContent: '',
    selectedFileId: null,
    selectedTemplateId: null,
    language: 'javascript',
  });

  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save effect
  useEffect(() => {
    if (editorState.hasUnsavedChanges && selectedFile && selectedProject) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        updateFileContent(selectedProject.id, selectedFile.id, editorState.currentContent);
        setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
        console.log('Auto-saved file:', selectedFile.name);
      }, 5000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [editorState.hasUnsavedChanges, editorState.currentContent, selectedFile, selectedProject, updateFileContent]);

  // Effect to handle file selection changes
  useEffect(() => {
    if (selectedFile) {
      if (editorState.hasUnsavedChanges && editorState.selectedFileId !== selectedFile.id) {
        setPendingAction(() => () => {
          setEditorState({
            hasUnsavedChanges: false,
            currentContent: selectedFile.content,
            selectedFileId: selectedFile.id,
            selectedTemplateId: null,
            language: selectedFile.language,
          });
        });
        return 'showUnsavedDialog';
      } else {
        setEditorState({
          hasUnsavedChanges: false,
          currentContent: selectedFile.content,
          selectedFileId: selectedFile.id,
          selectedTemplateId: null,
          language: selectedFile.language,
        });
      }
    }
    return null;
  }, [selectedFile, editorState.hasUnsavedChanges, editorState.selectedFileId]);

  // Effect to handle template selection changes
  useEffect(() => {
    if (selectedTemplate && !selectedFile) {
      if (editorState.hasUnsavedChanges && editorState.selectedTemplateId !== selectedTemplate.id) {
        setPendingAction(() => () => {
          setEditorState({
            hasUnsavedChanges: false,
            currentContent: selectedTemplate.content,
            selectedFileId: null,
            selectedTemplateId: selectedTemplate.id,
            language: selectedTemplate.language,
          });
        });
        return 'showUnsavedDialog';
      } else {
        setEditorState({
          hasUnsavedChanges: false,
          currentContent: selectedTemplate.content,
          selectedFileId: null,
          selectedTemplateId: selectedTemplate.id,
          language: selectedTemplate.language,
        });
      }
    }
    return null;
  }, [selectedTemplate, selectedFile, editorState.hasUnsavedChanges, editorState.selectedTemplateId]);

  return {
    editorState,
    setEditorState,
    pendingAction,
    setPendingAction,
  };
};
