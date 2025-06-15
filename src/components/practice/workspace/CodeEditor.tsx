
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
      
      // If there's an error and AI is enabled, suggest opening AI assistant
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
      // In a real implementation, you might want to prompt for unsaved changes
      dispatch({
        type: 'UPDATE_FILE_CONTENT',
        payload: { content: state.activeFile.content }
      });
    }
  };

  // Auto-resize textarea
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

      {/* Editor */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={state.activeFile.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full min-h-96 p-4 font-mono text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Start coding..."
            style={{ lineHeight: '1.5' }}
          />
          
          {/* Line numbers (simplified) */}
          <div className="absolute left-0 top-0 p-4 text-gray-400 font-mono text-sm pointer-events-none select-none">
            {state.activeFile.content.split('\n').map((_, index) => (
              <div key={index} style={{ lineHeight: '1.5' }}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
