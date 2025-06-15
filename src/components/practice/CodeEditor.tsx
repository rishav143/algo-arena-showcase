
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useProjectContext } from '@/contexts/ProjectContext';
import { EditorHeader } from './editor/EditorHeader';
import { EditorContent } from './editor/EditorContent';
import { SaveDialogs } from './editor/SaveDialogs';
import { SaveManager } from './editor/SaveManager';
import { useEditorStateManager } from './editor/useEditorStateManager';
import { getLanguageTemplate } from '@/utils/editorStateManager';
import { CompilerService } from '@/services/compilerService';

interface CodeEditorProps {
  theme: string;
  onRunCode?: () => void;
  onExecutionError?: (error: string) => void;
  onCompilationResult?: (result: any) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  theme,
  onRunCode,
  onExecutionError,
  onCompilationResult
}) => {
  const { toast } = useToast();
  const { selectedFile, updateFileContent, selectedProject, setSelectedFile } = useProjectContext();
  
  const editorStateManager = useEditorStateManager({
    selectedFile,
    updateFileContent,
    selectedProjectId: selectedProject?.id || null,
  });

  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const saveManagerRef = useRef<HTMLDivElement>(null);

  // Improved keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        handleRun();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editorStateManager.editorState]);

  // Handle showing unsaved dialog when needed
  useEffect(() => {
    if (editorStateManager.hasPendingAction) {
      setShowUnsavedDialog(true);
    }
  }, [editorStateManager.hasPendingAction]);

  const handleLanguageChange = (newLanguage: string) => {
    const template = getLanguageTemplate(newLanguage);
    
    // Clear file selection when switching to language template
    if (selectedFile) {
      setSelectedFile(null);
    }
    
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
      // Trigger save manager for new files
      const saveButton = saveManagerRef.current?.querySelector('.save-trigger') as HTMLButtonElement;
      if (saveButton) {
        saveButton.click();
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorStateManager.editorState.content);
    toast({
      title: "Copied",
      description: "Code copied to clipboard.",
    });
  };

  const handleRun = async () => {
    setIsCompiling(true);
    
    try {
      const result = await CompilerService.executeCode(
        editorStateManager.editorState.content,
        editorStateManager.editorState.language
      );

      if (onCompilationResult) {
        onCompilationResult(result);
      }

      if (!result.success && result.error) {
        if (onExecutionError) {
          onExecutionError(result.error);
        }
        toast({
          title: "Compilation Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        if (onRunCode) {
          onRunCode();
        }
        toast({
          title: "Code Executed",
          description: `Execution completed in ${result.executionTime}ms`,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      if (onExecutionError) {
        onExecutionError(errorMessage);
      }
      toast({
        title: "Execution Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCompiling(false);
    }
  };

  const handleUnsavedDialogAction = (action: 'discard') => {
    if (action === 'discard') {
      editorStateManager.executePendingAction();
    }
    setShowUnsavedDialog(false);
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

  const canSave = (): boolean => {
    const { editorState } = editorStateManager;
    
    if (editorState.activeState.mode === 'file') {
      return editorState.hasUnsavedChanges;
    }
    
    return editorState.content.trim().length > 0;
  };

  return (
    <div className="flex flex-col h-full">
      <EditorHeader
        currentFileName={getCurrentFileName()}
        hasUnsavedChanges={editorStateManager.editorState.hasUnsavedChanges}
        language={editorStateManager.editorState.language}
        theme={theme}
        onLanguageChange={handleLanguageChange}
        onThemeChange={() => {}} // Theme is controlled at higher level
        onRun={handleRun}
        onSave={handleSave}
        onCopy={handleCopy}
        canSave={canSave()}
        isCompiling={isCompiling}
      />
      
      <EditorContent
        content={editorStateManager.editorState.content}
        onChange={editorStateManager.updateContent}
        theme={theme}
      />

      <SaveDialogs
        showUnsavedDialog={showUnsavedDialog}
        onUnsavedDialogChange={setShowUnsavedDialog}
        onUnsavedDialogAction={handleUnsavedDialogAction}
      />

      <div ref={saveManagerRef}>
        <SaveManager
          content={editorStateManager.editorState.content}
          language={editorStateManager.editorState.language}
          onSaveSuccess={editorStateManager.clearUnsavedChanges}
        />
      </div>
    </div>
  );
};
