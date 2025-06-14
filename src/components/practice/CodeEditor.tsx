
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useProjectContext } from '@/contexts/ProjectContext';
import { EditorHeader } from './editor/EditorHeader';
import { EditorContent } from './editor/EditorContent';
import { SaveDialogs } from './editor/SaveDialogs';
import { useEditorStateManager } from './editor/useEditorStateManager';
import { getLanguageTemplate } from '@/utils/editorStateManager';

interface CodeEditorProps {
  onRunCode?: () => void;
  onExecutionError?: (error: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  onRunCode,
  onExecutionError
}) => {
  const { toast } = useToast();
  const { selectedFile, updateFileContent, createFile, selectedProject, projects } = useProjectContext();
  
  const editorStateManager = useEditorStateManager({
    selectedFile,
    updateFileContent,
    selectedProjectId: selectedProject?.id || null,
  });

  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveFileName, setSaveFileName] = useState('');
  const [saveProjectId, setSaveProjectId] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle showing unsaved dialog when needed
  useEffect(() => {
    if (editorStateManager.hasPendingAction) {
      setShowUnsavedDialog(true);
    }
  }, [editorStateManager.hasPendingAction]);

  const handleLanguageChange = (newLanguage: string) => {
    const template = getLanguageTemplate(newLanguage);
    if (editorStateManager.editorState.hasUnsavedChanges) {
      setTimeout(() => {
        editorStateManager.switchToLanguage(newLanguage, template);
      }, 0);
    } else {
      editorStateManager.switchToLanguage(newLanguage, template);
    }
  };

  const handleSave = () => {
    const { editorState } = editorStateManager;
    
    if (editorState.activeState.mode === 'file' && selectedFile && selectedProject) {
      // Save to existing file
      updateFileContent(selectedProject.id, selectedFile.id, editorState.content);
      editorStateManager.clearUnsavedChanges();
      toast({
        title: "File Saved",
        description: `${selectedFile.name} has been saved.`,
      });
    } else {
      // Save as new file
      if (projects.length > 0) {
        setSaveProjectId(projects[0].id);
        setSaveFileName(`untitled.${getFileExtension(editorState.language)}`);
        setShowSaveDialog(true);
      } else {
        toast({
          title: "No Project",
          description: "Please create a project first.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveAsNewFile = () => {
    if (saveProjectId && saveFileName.trim()) {
      createFile(saveProjectId, saveFileName.trim(), editorStateManager.editorState.language);
      editorStateManager.clearUnsavedChanges();
      setShowSaveDialog(false);
      setSaveFileName('');
      toast({
        title: "File Created",
        description: `${saveFileName} has been created and saved.`,
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorStateManager.editorState.content);
    toast({
      title: "Copied",
      description: "Code copied to clipboard.",
    });
  };

  const handleRun = () => {
    try {
      if (editorStateManager.editorState.content.includes('error') || editorStateManager.editorState.content.includes('Error')) {
        const error = 'Syntax Error: Unexpected token on line 5';
        if (onExecutionError) {
          onExecutionError(error);
        }
        return;
      }
      
      if (onRunCode) {
        onRunCode();
      }
      
      toast({
        title: "Running Code",
        description: "Executing your code...",
      });
    } catch (error) {
      if (onExecutionError) {
        onExecutionError(error instanceof Error ? error.message : 'Unknown error occurred');
      }
    }
  };

  const handleUnsavedDialogAction = (action: 'save' | 'discard') => {
    if (action === 'save') {
      handleSave();
    }
    editorStateManager.executePendingAction();
    setShowUnsavedDialog(false);
  };

  const getFileExtension = (language: string): string => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      go: 'go',
      rust: 'rs',
    };
    return extensions[language] || 'txt';
  };

  const getCurrentFileName = (): string => {
    const { editorState } = editorStateManager;
    
    switch (editorState.activeState.mode) {
      case 'file':
        return selectedFile?.name || 'Unknown File';
      case 'language':
        return `${editorState.language} Template`;
      default:
        return 'Untitled';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <EditorHeader
        currentFileName={getCurrentFileName()}
        hasUnsavedChanges={editorStateManager.editorState.hasUnsavedChanges}
        language={editorStateManager.editorState.language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRun}
        onSave={handleSave}
        onCopy={handleCopy}
      />
      
      <EditorContent
        content={editorStateManager.editorState.content}
        onChange={editorStateManager.updateContent}
      />

      <SaveDialogs
        showUnsavedDialog={showUnsavedDialog}
        showSaveDialog={showSaveDialog}
        saveFileName={saveFileName}
        saveProjectId={saveProjectId}
        projects={projects}
        onUnsavedDialogChange={setShowUnsavedDialog}
        onSaveDialogChange={setShowSaveDialog}
        onSaveFileNameChange={setSaveFileName}
        onSaveProjectIdChange={setSaveProjectId}
        onUnsavedDialogAction={handleUnsavedDialogAction}
        onSaveAsNewFile={handleSaveAsNewFile}
      />
    </div>
  );
};
