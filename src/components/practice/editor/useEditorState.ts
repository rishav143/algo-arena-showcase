
import { useState, useEffect, useRef } from 'react';
import { EditorState } from '@/types/template';
import { Project, ProjectFile } from '@/types/project';
import { Template } from '@/types/template';

interface UseEditorStateProps {
  selectedFile: ProjectFile | null;
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

  // Auto-save effect - only for files, not templates
  useEffect(() => {
    if (editorState.hasUnsavedChanges && selectedFile && selectedProject && editorState.selectedFileId === selectedFile.id) {
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
  }, [editorState.hasUnsavedChanges, editorState.currentContent, selectedFile, selectedProject, updateFileContent, editorState.selectedFileId]);

  // Effect to handle file selection changes
  useEffect(() => {
    if (selectedFile) {
      // If switching to a different file and have unsaved changes
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
      } else if (editorState.selectedFileId !== selectedFile.id) {
        // Switch to file without unsaved changes
        setEditorState({
          hasUnsavedChanges: false,
          currentContent: selectedFile.content,
          selectedFileId: selectedFile.id,
          selectedTemplateId: null,
          language: selectedFile.language,
        });
      }
    }
  }, [selectedFile, editorState.hasUnsavedChanges, editorState.selectedFileId]);

  // Effect to handle template selection changes
  useEffect(() => {
    if (selectedTemplate && !selectedFile) {
      // If switching to a different template and have unsaved changes
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
      } else if (editorState.selectedTemplateId !== selectedTemplate.id) {
        // Switch to template without unsaved changes
        setEditorState({
          hasUnsavedChanges: false,
          currentContent: selectedTemplate.content,
          selectedFileId: null,
          selectedTemplateId: selectedTemplate.id,
          language: selectedTemplate.language,
        });
      }
    }
  }, [selectedTemplate, selectedFile, editorState.hasUnsavedChanges, editorState.selectedTemplateId]);

  return {
    editorState,
    setEditorState,
    pendingAction,
    setPendingAction,
  };
};
