
import React from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import ProjectItem from './ProjectItem';

const ProjectList = () => {
  const { projects } = useProject();

  return (
    <div className="p-2">
      <h3 className="text-sm font-medium text-gray-700 mb-2 px-2">Your Projects</h3>
      <div className="space-y-1">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
