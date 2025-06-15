
import React, { useRef } from 'react';
import { Code } from 'lucide-react';
import { usePractice } from '@/contexts/PracticeContext';
import { compileCode } from '@/services/compilerService';
import { useLanguageSwitcher } from "./useLanguageSwitcher";
import EditorToolbar from "./EditorToolbar";
import { useAutoResize } from "./useAutoResize";

const CodeEditor: React.FC = () => {
  const { state, dispatch } = usePractice();
  const { changeFileLanguage } = useLanguageSwitcher();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea height
  useAutoResize(textareaRef, state.activeFile?.content ?? "");

  const handleContentChange = (content: string) => {
    if (state.activeFile == null) return;
    dispatch({
      type: "UPDATE_FILE_CONTENT",
      payload: { content }
    });
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
    if (!state.activeFile) return;
    changeFileLanguage(state.activeFile.id, language);
  };

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
      <EditorToolbar
        language={state.activeFile.language}
        onLanguageChange={handleLanguageChange}
        fileName={state.activeFile.name}
        isUnsaved={!!state.activeFile.isUnsaved}
        onSave={handleSave}
        onRun={handleRun}
        isRunning={state.isRunning}
      />
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
