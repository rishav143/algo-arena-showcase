
import React from 'react';
import { getEditorThemeStyles, getLineNumberStyles } from '@/utils/themeManager';

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
  const lines = content.split('\n');
  const lineCount = Math.max(lines.length, 20); // Minimum 20 lines for better UX

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* Line Numbers */}
      <div className={`w-12 py-4 px-2 font-mono text-sm text-right select-none border-r flex-shrink-0 ${getLineNumberStyles(theme)}`}>
        <div className="space-y-0 leading-6">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="h-6 flex items-center justify-end">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      {/* Code Content */}
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-full p-4 font-mono text-sm resize-none outline-none border-0 leading-6 ${getEditorThemeStyles(theme)}`}
          placeholder="Start coding here..."
          spellCheck={false}
          style={{
            lineHeight: '1.5rem',
          }}
        />
      </div>
    </div>
  );
};
