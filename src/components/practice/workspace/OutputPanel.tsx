
import React from 'react';
import { Terminal, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePractice } from '@/contexts/PracticeContext';

const OutputPanel: React.FC = () => {
  const { state, dispatch } = usePractice();

  const handleCopy = () => {
    navigator.clipboard.writeText(state.output);
  };

  const handleClear = () => {
    dispatch({ type: 'SET_OUTPUT', payload: { output: '' } });
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-green-400">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5" />
          <span className="font-medium">Output</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {state.output ? (
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {state.output}
            </pre>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Terminal className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No output yet</p>
              <p className="text-sm mt-1">Run your code to see output here</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default OutputPanel;
