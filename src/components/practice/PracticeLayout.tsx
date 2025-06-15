
import React from 'react';
import PracticeHeader from './PracticeHeader';
import ProjectSidebar from './ProjectSidebar';
import MainWorkspace from './MainWorkspace';

const PracticeLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Fixed Navigation Bar */}
      <PracticeHeader />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Project Sidebar */}
        <ProjectSidebar />
        
        {/* Main Workspace */}
        <MainWorkspace />
      </div>
    </div>
  );
};

export default PracticeLayout;
