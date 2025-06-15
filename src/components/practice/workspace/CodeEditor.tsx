import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Save, Loader2, Code } from 'lucide-react';
import { usePractice } from '@/contexts/PracticeContext';
import { compileCode } from '@/services/compilerService';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

const EXT_TO_LANG: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
  java: 'java',
  cpp: 'cpp',
  cc: 'cpp',
  cxx: 'cpp',
  c: 'c',
  h: 'c',
  cs: 'csharp',
  go: 'go',
  rs: 'rust',
};

const SUPPORTED_EXTENSIONS = Object.keys(EXT_TO_LANG);

const getLangFromFilename = (filename: string): string | undefined => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return undefined;
  return EXT_TO_LANG[ext];
};

const CodeEditor: React.FC = () => {
  const { state, dispatch } = usePractice();
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Dialog state for create project/file
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleContentChange = (content: string) => {
    dispatch({ type: 'UPDATE_FILE_CONTENT', payload: { content } });
  };

  // Handle running code, prompt for project/file if in untitled state
  const handleRun = async () => {
    if (!state.activeFile || state.activeFile.name.startsWith("untitled")) {
      setShowCreateDialog(true);
      return;
    }

    if (!state.activeFile) {
      dispatch({ 
        type: 'SET_OUTPUT', 
        payload: { output: 'Error: No file selected' } 
      });
      return;
    }

    dispatch({ type: 'SET_RUNNING', payload: { isRunning: true } });

    try {
      const result = await compileCode(
        state.activeFile.content,
        state.activeFile.language
      );
      
      dispatch({ 
        type: 'SET_OUTPUT', 
        payload: { output: result.output || result.error || 'No output' } 
      });
      
      if (result.error && state.aiAssistantEnabled) {
        dispatch({
          type: 'ADD_CHAT_MESSAGE',
          payload: {
            role: 'assistant',
            content: `I noticed there's a compilation error: ${result.error}. Would you like help fixing it?`
          }
        });
        dispatch({ type: 'SET_ACTIVE_TAB', payload: { tab: 'ai' } });
      }

    } catch (error) {
      dispatch({ 
        type: 'SET_OUTPUT', 
        payload: { output: 'Error: Failed to compile code' } 
      });
    } finally {
      dispatch({ type: 'SET_RUNNING', payload: { isRunning: false } });
    }
  };

  // Save also prompts to create project/file if untitled
  const handleSave = () => {
    if (!state.activeFile || state.activeFile.name.startsWith("untitled")) {
      setShowCreateDialog(true);
      return;
    }

    if (state.activeFile?.isUnsaved) {
      dispatch({ type: 'SAVE_FILE' });
    }
  };

  // Handle language dropdown change: goes to untitled state
  const handleLanguageChange = (language: string) => {
    dispatch({ type: 'SET_FILE_LANGUAGE', payload: { language } });
    toast({
      title: "New language selected",
      description: "Editor is now in untitled mode for this language. Please save as a file.",
    });
  };

  // Ensure dropdown language selection matches the file extension and give a warning if conflicting
  useEffect(() => {
    if (state.activeFile) {
      // Warn if selected language does not match extension
      const extLang = getLangFromFilename(state.activeFile.name);
      if (extLang && language !== extLang) {
        toast({
          variant: "destructive",
          title: "Warning",
          description: `File extension ".${state.activeFile.name.split('.').pop()}" usually maps to "${extLang}". You selected "${language}". We recommend matching extension and language!`,
        });
      }
      dispatch({
        type: 'SET_ACTIVE_FILE',
        payload: {
          file: { ...state.activeFile, language },
        }
      });
    }
  }, [state.activeFile, dispatch, toast]);

  // Auto-set language when new file is selected/renamed (always in sync with extension)
  useEffect(() => {
    if (state.activeFile) {
      const extLang = getLangFromFilename(state.activeFile.name);
      if (
        extLang &&
        extLang !== state.activeFile.language &&
        SUPPORTED_LANGUAGES.some(l => l.value === extLang)
      ) {
        dispatch({
          type: 'SET_ACTIVE_FILE',
          payload: {
            file: { ...state.activeFile, language: extLang },
          },
        });
        toast({
          title: "Language auto-detected",
          description: `Based on extension, language set to "${extLang}".`
        });
      }
      // If extension not recognized, notify user
      if (!extLang) {
        toast({
          title: "Unknown extension",
          description: `Extension ".${state.activeFile.name.split('.').pop()}" is not supported for language detection.`,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeFile?.id, state.activeFile?.name]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [state.activeFile?.content]);

  // Handle the create dialog (simple version -- just shows info)
  const CreateDialog = () => (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>No file or project</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            You must create a Project and File to save or run your code.
          </p>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => {
            setShowCreateDialog(false);
            // Open actual project creation in sidebar (not handled from here)
            // You may trigger a custom event or global state if desired
          }}>
            Create Project & File
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (!state.activeFile) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No file selected</h3>
          <p className="text-gray-500">Create a new project and file to start coding</p>
        </div>
      </div>
    );
  }

  const lineCount = state.activeFile.content.split('\n').length;

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Language:</span>
            <Select
              value={state.activeFile.language}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-gray-500">
            {state.activeFile.name}
            {state.activeFile.isUnsaved && (
              <span className="text-orange-600 ml-1">• (unsaved)</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleSave}
            disabled={!state.activeFile.isUnsaved}
            variant="outline"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button
            onClick={handleRun}
            disabled={state.isRunning}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            {state.isRunning ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            Run
          </Button>
        </div>
      </div>

      {/* Editor with Line Numbers */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Line Numbers */}
          <div className="bg-gray-50 border-r border-gray-200 p-4 text-gray-400 font-mono text-sm select-none min-w-[60px] overflow-hidden">
            {Array.from({ length: lineCount }, (_, index) => (
              <div key={index} className="leading-6 text-right pr-2">
                {index + 1}
              </div>
            ))}
          </div>
          
          {/* Code Content */}
          <div className="flex-1 p-4 overflow-auto">
            <textarea
              ref={textareaRef}
              value={state.activeFile.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-full font-mono text-sm border-none resize-none focus:outline-none bg-transparent leading-6"
              placeholder="Start coding..."
              style={{ minHeight: '100%' }}
            />
          </div>
        </div>
      </div>
      <CreateDialog />
    </div>
  );
};

export default CodeEditor;
