
import React from 'react';
import { usePractice } from '../../contexts/PracticeContext';
import { AlertCircle, CheckCircle } from 'lucide-react';

const OutputPanel = () => {
  const { state } = usePractice();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-900 text-green-400 font-mono text-sm">
        {state.compilerOutput ? (
          <div>
            <div className="flex items-center mb-2">
              {state.compilerOutput.success ? (
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
              )}
              <span className={state.compilerOutput.success ? 'text-green-400' : 'text-red-400'}>
                {state.compilerOutput.success ? 'Compilation Successful' : 'Compilation Error'}
              </span>
            </div>
            
            <pre className="whitespace-pre-wrap">
              {state.compilerOutput.output}
            </pre>
            
            {state.compilerOutput.error && (
              <pre className="whitespace-pre-wrap text-red-400 mt-4">
                {state.compilerOutput.error}
              </pre>
            )}
          </div>
        ) : (
          <div className="text-gray-500">
            <p>No output yet. Run your code to see results here.</p>
            <p className="mt-2 text-sm">
              Press the "Run" button or use Ctrl+R to execute your code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
