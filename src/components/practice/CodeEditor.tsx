
import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Play, Save } from 'lucide-react';
import { usePractice } from '../../contexts/PracticeContext';

const CodeEditor = () => {
  const { state, dispatch } = usePractice();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const languages = [
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'typescript', label: 'TypeScript' },
  ];

  useEffect(() => {
    updateLineNumbers();
  }, [state.editorContent]);

  const updateLineNumbers = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      const lines = state.editorContent.split('\n').length;
      const lineNumbers = Array.from({ length: Math.max(lines, 20) }, (_, i) => i + 1);
      lineNumbersRef.current.innerHTML = lineNumbers
        .map(num => `<div class="text-right pr-2 text-gray-400 select-none">${num}</div>`)
        .join('');
    }
  };

  const handleContentChange = (content: string) => {
    dispatch({ type: 'SET_EDITOR_CONTENT', payload: { content } });
  };

  const handleLanguageChange = (language: string) => {
    if (state.isEditorDirty) {
      const shouldSave = confirm('You have unsaved changes. Would you like to save them?');
      if (shouldSave) {
        handleSave();
      }
    }
    dispatch({ type: 'SET_LANGUAGE', payload: { language } });
  };

  const handleSave = () => {
    if (state.selectedFileId) {
      dispatch({ type: 'SAVE_FILE' });
    } else {
      // Show create project dialog
      const projectName = prompt('Enter project name:');
      if (projectName) {
        dispatch({ type: 'CREATE_PROJECT', payload: { name: projectName } });
        // The file will be created and saved automatically
      }
    }
  };

  const handleRun = async () => {
    // Simulate code compilation
    const output = `Compiling ${state.selectedLanguage} code...\n\nCode executed successfully!\nOutput: Hello, World!`;
    
    dispatch({
      type: 'SET_COMPILER_OUTPUT',
      payload: {
        success: true,
        output,
      },
    });
  };

  const currentFile = state.selectedFileId 
    ? state.projects
        .find(p => p.id === state.selectedProjectId)
        ?.files.find(f => f.id === state.selectedFileId)
    : null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <Select value={state.selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {currentFile && (
            <span className="text-sm text-gray-600">
              {currentFile.name}
              {state.isEditorDirty && <span className="text-orange-500 ml-1">*</span>}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleSave}
            disabled={!state.isEditorDirty}
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm" onClick={handleRun}>
            <Play className="h-4 w-4 mr-1" />
            Run
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 flex bg-white overflow-hidden">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="w-12 bg-gray-50 border-r border-gray-200 py-3 text-sm font-mono leading-6 overflow-hidden"
        />
        
        {/* Code Content */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={state.editorContent}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={`// Start writing ${state.selectedLanguage} code here...`}
            className="w-full h-full p-3 font-mono text-sm leading-6 resize-none border-0 outline-none bg-white"
            style={{
              tabSize: 2,
              whiteSpace: 'pre',
              wordWrap: 'break-word',
            }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
