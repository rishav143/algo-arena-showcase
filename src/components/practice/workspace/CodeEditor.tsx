
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
import CreateProjectDialog from '../sidebar/CreateProjectDialog';

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
  const [tempContent, setTempContent] = useState('// Start coding here...\n');
  const [tempLanguage, setTempLanguage] = useState('javascript');
  const [showCreateProject, setShowCreateProject] = useState(false);

  // Use active file content or temp content
  const currentContent = state.activeFile ? state.activeFile.content : tempContent;
  const currentLanguage = state.activeFile ? state.activeFile.language : tempLanguage;

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
    } else {
      // No active file, show create project dialog
      setShowCreateProject(true);
    }
  };

  const handleRun = async () => {
    dispatch({ type: 'SET_RUNNING', payload: { isRunning: true } });
    
    try {
      const result = await compileCode(currentContent, currentLanguage);
      
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
    if (state.activeFile) {
      // For active files, we would need to handle language change differently
      // For now, just update the temp language
    } else {
      setTempLanguage(language);
    }
  };

  // Handle project creation success - create a file with the temp content
  const handleProjectCreated = () => {
    // When a project is created, create a default file with the temp content
    if (state.activeProject && tempContent.trim() !== '// Start coding here...') {
      // Create a default file name based on language
      const extensions = {
        javascript: 'js',
        typescript: 'ts',
        python: 'py',
        java: 'java',
        cpp: 'cpp',
        c: 'c',
        csharp: 'cs',
        go: 'go',
        rust: 'rs'
      };
      
      const extension = extensions[tempLanguage as keyof typeof extensions] || 'txt';
      const fileName = `main.${extension}`;
      
      dispatch({
        type: 'CREATE_FILE',
        payload: {
          projectId: state.activeProject.id,
          name: fileName,
          language: tempLanguage
        }
      });
      
      // After file creation, update its content
      setTimeout(() => {
        if (state.activeFile) {
          dispatch({
            type: 'UPDATE_FILE_CONTENT',
            payload: { content: tempContent }
          });
        }
      }, 100);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [currentContent]);

  // Watch for active project changes to handle post-creation file setup
  useEffect(() => {
    if (state.activeProject && showCreateProject) {
      setShowCreateProject(false);
      handleProjectCreated();
    }
  }, [state.activeProject]);

  const lineCount = currentContent.split('\n').length;
  const isUnsaved = state.activeFile ? state.activeFile.isUnsaved : tempContent !== '// Start coding here...\n';

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
            {state.activeFile ? (
              <>
                {state.activeFile.name}
                {state.activeFile.isUnsaved && (
                  <span className="text-orange-600 ml-1">• (unsaved)</span>
                )}
              </>
            ) : (
              <>
                Untitled
                {isUnsaved && (
                  <span className="text-orange-600 ml-1">• (unsaved)</span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
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

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={showCreateProject}
        onOpenChange={setShowCreateProject}
      />
    </div>
  );
};

export default CodeEditor;
