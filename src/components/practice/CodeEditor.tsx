
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useTemplateContext } from '@/contexts/TemplateContext';
import { EditorHeader } from './editor/EditorHeader';
import { EditorContent } from './editor/EditorContent';
import { SaveDialogs } from './editor/SaveDialogs';
import { useEditorState } from './editor/useEditorState';

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
  const { selectedTemplate, templates, updateTemplate } = useTemplateContext();
  
  const { editorState, setEditorState, pendingAction, setPendingAction } = useEditorState({
    selectedFile,
    selectedTemplate,
    selectedProject,
    updateFileContent,
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
    if (pendingAction) {
      setShowUnsavedDialog(true);
    }
  }, [pendingAction]);

  const handleContentChange = (newContent: string) => {
    setEditorState(prev => ({
      ...prev,
      currentContent: newContent,
      hasUnsavedChanges: true,
    }));
  };

  const handleLanguageChange = (newLanguage: string) => {
    if (editorState.hasUnsavedChanges) {
      setPendingAction(() => () => {
        const template = getLanguageTemplate(newLanguage);
        setEditorState({
          hasUnsavedChanges: false,
          currentContent: template,
          selectedFileId: null,
          selectedTemplateId: null,
          language: newLanguage,
        });
      });
      setShowUnsavedDialog(true);
    } else {
      const template = getLanguageTemplate(newLanguage);
      setEditorState(prev => ({
        ...prev,
        currentContent: template,
        language: newLanguage,
        selectedFileId: null,
        selectedTemplateId: null,
      }));
    }
  };

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId && t.type === 'default');
    if (template) {
      if (editorState.hasUnsavedChanges) {
        setPendingAction(() => () => {
          setEditorState({
            hasUnsavedChanges: false,
            currentContent: template.content,
            selectedFileId: null,
            selectedTemplateId: template.id,
            language: template.language,
          });
        });
        setShowUnsavedDialog(true);
      } else {
        setEditorState({
          hasUnsavedChanges: false,
          currentContent: template.content,
          selectedFileId: null,
          selectedTemplateId: template.id,
          language: template.language,
        });
      }
    }
  };

  const getLanguageTemplate = (language: string): string => {
    const languageTemplates: Record<string, string> = {
      javascript: '// JavaScript\nconsole.log("Hello, World!");',
      typescript: '// TypeScript\nconst message: string = "Hello, World!";\nconsole.log(message);',
      python: '# Python\nprint("Hello, World!")',
      java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
      rust: 'fn main() {\n    println!("Hello, World!");\n}',
    };
    return languageTemplates[language] || '// Start coding here...';
  };

  const handleSave = () => {
    if (selectedFile && selectedProject && editorState.selectedFileId === selectedFile.id) {
      // Save to existing file
      updateFileContent(selectedProject.id, selectedFile.id, editorState.currentContent);
      setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
      toast({
        title: "File Saved",
        description: `${selectedFile.name} has been saved.`,
      });
    } else if (selectedTemplate && selectedTemplate.type === 'custom' && editorState.selectedTemplateId === selectedTemplate.id) {
      // Save to existing custom template
      updateTemplate(selectedTemplate.id, editorState.currentContent);
      setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
      toast({
        title: "Template Updated",
        description: `${selectedTemplate.name} template has been updated.`,
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
      createFile(saveProjectId, saveFileName.trim(), editorState.language);
      setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
      setShowSaveDialog(false);
      setSaveFileName('');
      toast({
        title: "File Created",
        description: `${saveFileName} has been created and saved.`,
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorState.currentContent);
    toast({
      title: "Copied",
      description: "Code copied to clipboard.",
    });
  };

  const handleRun = () => {
    try {
      if (editorState.currentContent.includes('error') || editorState.currentContent.includes('Error')) {
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
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
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

  const currentFileName = selectedFile && editorState.selectedFileId === selectedFile.id ? selectedFile.name : 
    selectedTemplate && editorState.selectedTemplateId === selectedTemplate.id ? `${selectedTemplate.name} Template` : 
    'Untitled';

  return (
    <div className="flex flex-col h-full">
      <EditorHeader
        currentFileName={currentFileName}
        hasUnsavedChanges={editorState.hasUnsavedChanges}
        language={editorState.language}
        selectedTemplate={selectedTemplate}
        templates={templates}
        onLanguageChange={handleLanguageChange}
        onTemplateChange={handleTemplateChange}
        onRun={handleRun}
        onSave={handleSave}
        onCopy={handleCopy}
      />
      
      <EditorContent
        content={editorState.currentContent}
        onChange={handleContentChange}
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
