
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import EditorTabs from './EditorTabs';
import CodeEditor from './CodeEditor';
import OutputTabs from './OutputTabs';

interface MainWorkspaceProps {
  sidebarOpen: boolean;
}

const MainWorkspace: React.FC<MainWorkspaceProps> = ({ sidebarOpen }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Search Bar */}
      <div className="border-b border-gray-200 p-4">
        <SearchBar onResults={setSearchResults} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorTabs />
          <div className="flex-1 overflow-hidden">
            <CodeEditor />
          </div>
        </div>

        {/* Right Panel - Output/AI */}
        <div className="w-1/3 border-l border-gray-200 flex flex-col overflow-hidden">
          <OutputTabs />
        </div>
      </div>
    </div>
  );
};

export default MainWorkspace;
