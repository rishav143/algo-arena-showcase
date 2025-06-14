
import React from 'react';

interface EditorContentProps {
  content: string;
  onChange: (content: string) => void;
  theme?: string;
  showLineNumbers?: boolean;
}

export const EditorContent: React.FC<EditorContentProps> = ({ 
  content, 
  onChange,
  theme = 'light',
  showLineNumbers = false
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
  const lineCount = lines.length;

  return (
    <div className="flex-1 flex">
      {showLineNumbers && (
        <div className={`flex flex-col text-right px-2 py-4 text-sm font-mono border-r min-w-[50px] ${getLineNumberStyles(theme)}`}>
          {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
            <div key={i + 1} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 p-4 font-mono text-sm resize-none outline-none border-0 leading-6 ${getThemeStyles(theme)}`}
          placeholder="Start coding here..."
          spellCheck={false}
          style={{ lineHeight: '1.5' }}
        />
      </div>
    </div>
  );
};
