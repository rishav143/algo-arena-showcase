
import React from 'react';
import CodeEditor from './CodeEditor';

const MainWorkspace: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      <CodeEditor />
    </div>
  );
};

export default MainWorkspace;
