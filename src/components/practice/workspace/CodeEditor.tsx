
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Save, Loader2, Code, Plus } from 'lucide-react';
import { usePractice } from '@/contexts/PracticeContext';
import { compileCode } from '@/services/compilerService';
import { useCreateFileDialog } from '../sidebar/CreateFileDialogContext';

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
  const { openDialog } = useCreateFileDialog();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Temporary content for when no file is active
  const [tempContent, setTempContent] = useState('// Start coding here...\n');
  const [tempLanguage, setTempLanguage] = useState('javascript');

  const currentContent = state.activeFile?.content ?? tempContent;
  const currentLanguage = state.activeFile?.language ?? tempLanguage;
  const isUnsaved = state.activeFile?.isUnsaved ?? (tempContent !== '// Start coding here...\n');

  const handleContentChange = (content: string) => {
    if (state.activeFile) {
      dispatch({ type: 'UPDATE_FILE_CONTENT', payload: { content } });
    } else {
      setTempContent(content);
    }
  };

  const handleSave = () => {
    if (state.activeFile?.isUnsaved) {
      dispatch({ type: 'SAVE_FILE' });
    } else if (!state.activeFile && tempContent.trim() !== '' && tempContent !== '// Start coding here...\n') {
      // Prompt user to create project and file to save their work
      if (state.projects.length === 0) {
        alert('Please create a project first to save your code. Click on "New Project" in the sidebar.');
      } else {
        // If there are projects, open create file dialog for the first project
        openDialog(state.projects[0].id);
      }
    }
  };

  const handleRun = async () => {
    const codeToRun = currentContent;
    const languageToUse = currentLanguage;

    if (!codeToRun.trim()) {
      dispatch({ 
        type: 'SET_OUTPUT', 
        payload: { output: 'Error: No code to run' } 
      });
      return;
    }

    dispatch({ type: 'SET_RUNNING', payload: { isRunning: true } });
    
    try {
      const result = await compileCode(codeToRun, languageToUse);
      
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
        dispatch({ type: 'SET_RIGHT_TAB', payload: { tab: 'ai' } });
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
    if (state.activeFile) {
      // For active files, we don't change language directly - this would need file recreation
      // For now, just update temp language
    } else {
      setTempLanguage(language);
    }
  };

  const handleCreateProject = () => {
    // This would trigger project creation dialog - for now just show alert
    alert('Click on "New Project" in the sidebar to create a project and save your code.');
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [currentContent]);

  const lineCount = currentContent.split('\n').length;
  const fileName = state.activeFile?.name || 'Untitled';

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Language:</span>
            <Select
              value={currentLanguage}
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
            {fileName}
            {isUnsaved && (
              <span className="text-orange-600 ml-1">• (unsaved)</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!state.activeFile && tempContent.trim() !== '' && tempContent !== '// Start coding here...\n' && (
            <Button
              onClick={handleCreateProject}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Save to Project
            </Button>
          )}
          
          <Button
            onClick={handleSave}
            disabled={!isUnsaved}
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
              value={currentContent}
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
