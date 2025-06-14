
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

  return (
    <div className="flex-1 flex flex-col">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 p-4 font-mono text-sm resize-none outline-none border-0 ${getThemeStyles(theme)}`}
        placeholder="Start coding here..."
        spellCheck={false}
      />
    </div>
  );
};
