
import React from 'react';
import ProjectsSidebar from './sidebar/ProjectsSidebar';
import MainWorkspace from './workspace/MainWorkspace';

const PracticeLayout = () => {
  return (
    <div className="flex flex-1 pt-16 overflow-hidden">
      <ProjectsSidebar />
      <MainWorkspace />
    </div>
  );
};

export default PracticeLayout;
