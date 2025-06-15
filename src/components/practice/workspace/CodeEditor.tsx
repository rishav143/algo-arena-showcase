import React, { useRef, useEffect } from 'react';
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

// Extension to language mapping
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

const getLangFromFilename = (filename: string): string | undefined => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return undefined;
  return EXT_TO_LANG[ext];
};

const CodeEditor: React.FC = () => {
  const { state, dispatch } = usePractice();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (content: string) => {
    dispatch({ type: 'UPDATE_FILE_CONTENT', payload: { content } });
  };

  const handleSave = () => {
    if (state.activeFile?.isUnsaved) {
      dispatch({ type: 'SAVE_FILE' });
    }
  };

  const handleRun = async () => {
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

  const handleLanguageChange = (language: string) => {
    if (state.activeFile && state.activeFile.language !== language) {
      // Just change the language, keep content the same
      dispatch({
        type: 'UPDATE_FILE_CONTENT',
        payload: { content: state.activeFile.content }
      });
      // Actually update the language in the file object:
      dispatch({
        type: 'RENAME_FILE',
        payload: {
          projectId: state.activeProject?.id ?? "",
          fileId: state.activeFile.id,
          name: state.activeFile.name
        }
      });
      // Now update the language property (must extend the reducer/action to support this in real project)
      dispatch({
        type: 'SET_ACTIVE_FILE',
        payload: {
          file: { ...state.activeFile, language }
        }
      });
    }
  };

  // Auto-set language when new file is selected based on extension
  useEffect(() => {
    if (state.activeFile) {
      const extLang = getLangFromFilename(state.activeFile.name);
      // Only set language if the autodetected one differs and is supported
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
      }
    }
    // Only run when activeFile changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeFile?.id]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [state.activeFile?.content]);

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
    </div>
  );
};

export default CodeEditor;
