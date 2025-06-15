
import React, { useState } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

const OutputPanel = () => {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(prev => prev + '[0, 1]\n[1, 2]\nExecution completed successfully.');
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">Console Output</h3>
          <div className="flex gap-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="p-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded text-xs flex items-center gap-1"
            >
              {isRunning ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isRunning ? 'Stop' : 'Run'}
            </button>
            <button
              onClick={() => setOutput('')}
              className="p-1.5 hover:bg-slate-700 text-gray-400 hover:text-white rounded"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3 overflow-auto">
        {output ? (
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
            {output}
          </pre>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-sm">No output yet</p>
            <p className="text-xs mt-1">Run your code to see results here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
