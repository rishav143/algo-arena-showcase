
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Play, Save, Loader2 } from 'lucide-react';
import { usePractice } from '../../../contexts/PracticeContext';
import { compileAndRunCode } from '../../../services/compilerService';

const CodeEditor = () => {
  const { state, dispatch } = usePractice();
  const [code, setCode] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (state.activeFile) {
      setCode(state.activeFile.content);
      setHasUnsavedChanges(false);
    } else {
      setCode('');
      setHasUnsavedChanges(false);
    }
  }, [state.activeFile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, state.activeFile]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setHasUnsavedChanges(true);
    
    if (state.activeFile) {
      dispatch({
        type: 'UPDATE_FILE_CONTENT',
        payload: { fileId: state.activeFile.id, content: newCode }
      });
    }
  };

  const handleLanguageChange = (language: string) => {
    if (hasUnsavedChanges && state.activeFile) {
      if (window.confirm('You have unsaved changes. Do you want to save before switching language?')) {
        handleSave();
      }
    }
    dispatch({ type: 'SET_LANGUAGE', payload: { language } });
  };

  const handleSave = () => {
    if (state.activeFile) {
      dispatch({ type: 'MARK_FILE_SAVED', payload: { fileId: state.activeFile.id } });
      setHasUnsavedChanges(false);
    }
  };

  const handleRun = async () => {
    if (!code.trim()) return;

    dispatch({ type: 'SET_COMPILING', payload: { isCompiling: true } });
    dispatch({ type: 'SET_ACTIVE_TAB', payload: { tab: 'output' } });

    try {
      const result = await compileAndRunCode(code, state.editorLanguage);
      dispatch({ type: 'SET_OUTPUT', payload: { output: result } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Compilation failed';
      dispatch({ type: 'SET_OUTPUT', payload: { output: `Error: ${errorMessage}` } });
      
      if (state.isAIAssistantEnabled) {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: { tab: 'ai' } });
      }
    } finally {
      dispatch({ type: 'SET_COMPILING', payload: { isCompiling: false } });
    }
  };

  const getPlaceholderText = () => {
    if (!state.activeFile) {
      return 'Select a file from the sidebar or create a new one to start coding...';
    }
    return `// Start coding in ${state.activeFile.name}...`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <Select value={state.editorLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
              <SelectItem value="ruby">Ruby</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={!hasUnsavedChanges || !state.activeFile}
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button
            size="sm"
            onClick={handleRun}
            disabled={!code.trim() || state.isCompiling}
            className="bg-green-600 hover:bg-green-700"
          >
            {state.isCompiling ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            Run
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4">
        {state.activeFile ? (
          <div className="h-full">
            <div className="mb-2 text-sm text-gray-600">
              {state.activeFile.name}
              {hasUnsavedChanges && <span className="text-orange-500 ml-2">• Unsaved changes</span>}
            </div>
            <Textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder={getPlaceholderText()}
              className="h-full font-mono text-sm resize-none"
              style={{ minHeight: 'calc(100% - 2rem)' }}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">No file selected</p>
              <p className="text-sm">Create a new file or select an existing one from the sidebar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
