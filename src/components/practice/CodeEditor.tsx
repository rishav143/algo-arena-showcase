
import React from 'react';
import { Loader2 } from 'lucide-react';
import { EditorContent } from './editor/EditorContent';
import { EditorHeader } from './editor/EditorHeader';
import { SaveDialogs } from './editor/SaveDialogs';
import { useEditorStateManager } from './editor/useEditorStateManager';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useTemplateContext } from '@/contexts/TemplateContext';
import { getLanguageTemplate } from '@/utils/editorStateManager';

interface CodeEditorProps {
  aiAssistantEnabled: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ aiAssistantEnabled }) => {
  const { 
    selectedFile, 
    selectedProject, 
    updateFileContent,
    selectFile: originalSelectFile,
    projects
  } = useProjectContext();
  
  const { 
    selectedTemplate, 
    selectTemplate: originalSelectTemplate 
  } = useTemplateContext();

  // Create deselection handlers
  const handleFileDeselect = () => {
    // Find the currently selected file and deselect it by selecting null
    if (selectedFile && selectedProject) {
      // This will effectively deselect the file by not having any file selected
      const project = projects.find(p => p.id === selectedProject.id);
      if (project) {
        // We can't directly deselect, but we can track this in the editor state
        console.log('File deselected from editor state manager');
      }
    }
  };

  const handleTemplateDeselect = () => {
    // Deselect template by selecting null - we'll need to add this functionality
    console.log('Template deselected from editor state manager');
  };

  const editorStateManager = useEditorStateManager({
    selectedFile,
    selectedTemplate,
    updateFileContent,
    selectedProjectId: selectedProject?.id || null,
    onFileDeselect: handleFileDeselect,
    onTemplateDeselect: handleTemplateDeselect
  });

  const { editorState, hasPendingAction } = editorStateManager;

  const handleLanguageSelect = (language: string) => {
    const content = getLanguageTemplate(language);
    editorStateManager.switchToLanguage(language, content);
  };

  if (!editorState) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col">
        <EditorHeader
          editorState={editorState}
          onLanguageSelect={handleLanguageSelect}
          selectedFile={selectedFile}
          selectedTemplate={selectedTemplate}
        />
        <EditorContent
          content={editorState.content}
          language={editorState.language}
          onChange={editorStateManager.updateContent}
          aiAssistantEnabled={aiAssistantEnabled}
        />
      </div>
      
      {hasPendingAction && (
        <SaveDialogs
          onSave={editorStateManager.executePendingAction}
          onDiscard={editorStateManager.cancelPendingAction}
        />
      )}
    </>
  );
};
