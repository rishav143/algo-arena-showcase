
import React from 'react';

interface EditorContentProps {
  content: string;
  onChange: (content: string) => void;
  theme?: string;
}

export const EditorContent: React.FC<EditorContentProps> = ({ 
  content, 
  onChange,
  theme = 'light'
}) => {
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100 border-gray-700';
      case 'monokai':
        return 'bg-gray-800 text-green-400 border-gray-600';
      case 'dracula':
        return 'bg-purple-900 text-purple-100 border-purple-700';
      case 'github':
        return 'bg-white text-gray-900 border-gray-300';
      case 'vscode':
        return 'bg-gray-800 text-blue-200 border-gray-600';
      default:
        return 'bg-white text-gray-900 border-gray-300';
    }
  };

  const getLineNumberStyles = (theme: string) => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 text-gray-400 border-gray-700';
      case 'monokai':
        return 'bg-gray-700 text-gray-500 border-gray-600';
      case 'dracula':
        return 'bg-purple-800 text-purple-300 border-purple-700';
      case 'github':
        return 'bg-gray-50 text-gray-500 border-gray-300';
      case 'vscode':
        return 'bg-gray-700 text-gray-400 border-gray-600';
      default:
        return 'bg-gray-50 text-gray-500 border-gray-300';
    }
  };

  const lines = content.split('\n');
  const lineCount = Math.max(lines.length, 20);

  return (
    <div className="flex-1 flex">
      {/* Line Numbers */}
      <div className={`w-12 p-2 text-right text-sm font-mono border-r select-none ${getLineNumberStyles(theme)}`}>
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1} className="leading-5">
            {i + 1}
          </div>
        ))}
      </div>
      
      {/* Code Editor */}
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-full p-4 pl-2 font-mono text-sm resize-none outline-none border-0 leading-5 ${getThemeStyles(theme)}`}
          placeholder="Start coding here..."
          spellCheck={false}
          style={{
            lineHeight: '1.25rem',
            minHeight: '100%'
          }}
        />
      </div>
    </div>
  );
};
