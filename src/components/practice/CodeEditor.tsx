
import React, { useRef, useEffect } from 'react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real implementation, you would integrate Monaco Editor here
    // For now, we'll use a textarea as a placeholder
  }, []);

  return (
    <div className="h-full bg-slate-900 relative">
      <div className="flex h-full">
        {/* Line Numbers */}
        <div className="bg-slate-800 text-gray-500 text-sm font-mono px-3 py-4 border-r border-slate-700 select-none min-w-[60px]">
          {value.split('\n').map((_, index) => (
            <div key={index} className="leading-6 text-right">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1">
          <textarea
            ref={editorRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full bg-slate-900 text-white font-mono text-sm p-4 resize-none outline-none leading-6 border-none"
            style={{ 
              fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
              tabSize: 2 
            }}
            spellCheck={false}
            placeholder="Start typing your code..."
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
