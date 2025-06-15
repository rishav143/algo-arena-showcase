
import React, { useState, useEffect, useRef } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import { TEMPLATES } from '../../../types/practice';

const CodeEditor = () => {
  const { activeFile, projects, updateFileContent } = useProject();
  const [content, setContent] = useState('');
  const [lineNumbers, setLineNumbers] = useState(['1']);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  const activeFileObj = activeFile ? 
    projects.flatMap(p => p.files).find(f => f.id === activeFile) : null;

  useEffect(() => {
    if (activeFileObj) {
      setContent(activeFileObj.content);
    } else {
      // Load default Java template
      setContent(TEMPLATES.java);
    }
  }, [activeFileObj]);

  useEffect(() => {
    const lines = content.split('\n');
    setLineNumbers(lines.map((_, index) => (index + 1).toString()));
  }, [content]);

  useEffect(() => {
    // Auto-save after 5 seconds of inactivity
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    if (activeFileObj && content !== activeFileObj.content) {
      autoSaveTimeoutRef.current = setTimeout(() => {
        const project = projects.find(p => p.files.some(f => f.id === activeFile));
        if (project) {
          updateFileContent(project.id, activeFile!, content);
        }
      }, 5000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [content, activeFileObj, activeFile, projects, updateFileContent]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    
    // Update file content immediately for unsaved state
    if (activeFileObj) {
      const project = projects.find(p => p.files.some(f => f.id === activeFile));
      if (project) {
        updateFileContent(project.id, activeFile!, newContent);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      // Handle save
      console.log('Save triggered');
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Line Numbers */}
      <div className="bg-gray-100 border-r border-gray-200 px-3 py-4 text-sm text-gray-500 font-mono select-none min-w-[3rem]">
        {lineNumbers.map((num, index) => (
          <div key={index} className="leading-6 text-right">
            {num}
          </div>
        ))}
      </div>
      
      {/* Code Area */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 text-sm font-mono bg-white border-none outline-none resize-none leading-6"
          placeholder={activeFileObj ? '' : 'Select a file or choose a template to start coding...'}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
