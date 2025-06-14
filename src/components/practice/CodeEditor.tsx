
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Download, Play, Save, AlertTriangle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useTemplateContext } from '@/contexts/TemplateContext';
import { EditorState } from '@/types/template';

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
  
  const [editorState, setEditorState] = useState<EditorState>({
    hasUnsavedChanges: false,
    currentContent: '',
    selectedFileId: null,
    selectedTemplateId: null,
    language: 'javascript',
  });
  
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveFileName, setSaveFileName] = useState('');
  const [saveProjectId, setSaveProjectId] = useState('');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        setShowUnsavedDialog(true);
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
        setShowUnsavedDialog(true);
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
  }, [selectedTemplate, selectedFile, editorState.hasUnsavedChanges, editorState.selectedTemplateId]);

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

  const getLanguageTemplate = (language: string): string => {
    const templates: Record<string, string> = {
      javascript: '// JavaScript\nconsole.log("Hello, World!");',
      typescript: '// TypeScript\nconst message: string = "Hello, World!";\nconsole.log(message);',
      python: '# Python\nprint("Hello, World!")',
      java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
      rust: 'fn main() {\n    println!("Hello, World!");\n}',
    };
    return templates[language] || '// Start coding here...';
  };

  const handleSave = () => {
    if (selectedFile && selectedProject) {
      // Auto-save for existing file
      updateFileContent(selectedProject.id, selectedFile.id, editorState.currentContent);
      setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
      toast({
        title: "File Saved",
        description: `${selectedFile.name} has been saved.`,
      });
    } else if (selectedTemplate && selectedTemplate.type === 'custom') {
      // Update custom template
      updateTemplate(selectedTemplate.id, editorState.currentContent);
      setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
      toast({
        title: "Template Updated",
        description: `${selectedTemplate.name} template has been updated.`,
      });
    } else {
      // Show save dialog for new file
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

  const getDefaultTemplateOptions = () => {
    return templates.filter(t => t.type === 'default');
  };

  const lines = editorState.currentContent.split('\n');
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  const currentFileName = selectedFile ? selectedFile.name : 
    selectedTemplate ? `${selectedTemplate.name} Template` : 'Untitled';

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Editor Header */}
        <div className="border-b bg-muted/50 p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">{currentFileName}</span>
            {editorState.hasUnsavedChanges && (
              <div className="flex items-center gap-1 text-orange-600">
                <AlertTriangle className="w-3 h-3" />
                <span className="text-xs">Unsaved</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={editorState.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTemplate?.id || ''} onValueChange={(value) => {
              const template = templates.find(t => t.id === value && t.type === 'default');
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
            }}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Template" />
              </SelectTrigger>
              <SelectContent>
                {getDefaultTemplateOptions().map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="ghost" size="sm" onClick={handleRun}>
              <Play className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Editor Content with Line Numbers */}
        <div className="flex-1 relative flex">
          {/* Line Numbers */}
          <div className="bg-muted/30 border-r border-border px-2 py-4 text-right min-w-[50px]">
            {lineNumbers.map((lineNum) => (
              <div
                key={lineNum}
                className="text-xs text-muted-foreground leading-6 h-6 flex items-center justify-end"
                style={{ fontFamily: 'monospace' }}
              >
                {lineNum}
              </div>
            ))}
          </div>
          
          {/* Code Area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={editorState.currentContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm bg-background border-0 outline-none resize-none leading-6"
              placeholder="Start coding here or select a file/template..."
              spellCheck={false}
              style={{ 
                fontFamily: 'monospace',
                lineHeight: '1.5'
              }}
            />
          </div>
        </div>
      </div>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. What would you like to do?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleUnsavedDialogAction('discard')}>
              Discard Changes
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleUnsavedDialogAction('save')}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Project</label>
              <Select value={saveProjectId} onValueChange={setSaveProjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">File Name</label>
              <Input
                value={saveFileName}
                onChange={(e) => setSaveFileName(e.target.value)}
                placeholder="Enter file name"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAsNewFile}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
