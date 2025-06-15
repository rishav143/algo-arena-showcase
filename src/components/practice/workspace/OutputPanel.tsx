
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { usePractice } from '../../../contexts/PracticeContext';

const OutputPanel = () => {
  const { state } = usePractice();

  return (
    <div className="flex flex-col h-full bg-gray-900 text-green-400">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <h3 className="text-lg font-semibold">Output</h3>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {state.isCompiling ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Compiling and running your code...</p>
            </div>
          </div>
        ) : state.output ? (
          <ScrollArea className="h-full">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {state.output}
            </pre>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">No output yet</p>
              <p className="text-sm">Run your code to see the results here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
