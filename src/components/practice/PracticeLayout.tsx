
import React, { useState } from 'react';
import ProjectSidebar from './sidebar/ProjectSidebar';
import MainWorkspace from './workspace/MainWorkspace';
import { ProjectProvider } from '../../contexts/ProjectContext';

const PracticeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ProjectProvider>
      <div className="flex-1 flex overflow-hidden">
        <ProjectSidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
        <MainWorkspace sidebarOpen={sidebarOpen} />
      </div>
    </ProjectProvider>
  );
};

export default PracticeLayout;
