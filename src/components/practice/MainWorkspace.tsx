
import React from 'react';
import CodeEditor from './CodeEditor';
import RightPanel from './RightPanel';

const MainWorkspace = () => {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Code Editor - Top Section */}
      <div className="flex-1 border-b border-gray-200">
        <CodeEditor />
      </div>
      
      {/* Right Panel - Bottom Section */}
      <div className="h-80 border-t border-gray-200">
        <RightPanel />
      </div>
    </div>
  );
};

export default MainWorkspace;
