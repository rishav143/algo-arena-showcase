
import React, { useRef } from 'react';

interface EditorContentProps {
  content: string;
  language: string;
  onChange: (content: string) => void;
  aiAssistantEnabled: boolean;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  content,
  language,
  onChange,
  aiAssistantEnabled,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = content.split('\n');
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  return (
    <div className="flex-1 relative flex">
      {/* Line Numbers */}
      <div className="bg-muted/30 border-r border-border px-2 py-4 text-right min-w-[50px]">
        {lineNumbers.map((lineNum) => (
          <div
            key={lineNum}
            className="text-xs text-muted-foreground leading-6 h-6 flex items-center justify-end"
            style={{ fontFamily: 'monospace' }}
          >
            {lineNum}
          </div>
        ))}
      </div>
      
      {/* Code Area */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-4 font-mono text-sm bg-background border-0 outline-none resize-none leading-6"
          placeholder="Start coding here or select a file/template..."
          spellCheck={false}
          style={{ 
            fontFamily: 'monospace',
            lineHeight: '1.5'
          }}
        />
      </div>
    </div>
  );
};
