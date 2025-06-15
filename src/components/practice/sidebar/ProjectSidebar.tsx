
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Settings } from 'lucide-react';
import { Button } from '../../ui/button';
import { useProject } from '../../../contexts/ProjectContext';
import ProjectList from './ProjectList';
import CreateProjectDialog from './CreateProjectDialog';

interface ProjectSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ isOpen, onToggle }) => {
  const { projects, aiEnabled, toggleAI } = useProject();
  const [showCreateProject, setShowCreateProject] = useState(false);

  return (
    <>
      <div className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 flex flex-col ${
        isOpen ? 'w-80' : 'w-0'
      }`}>
        {isOpen && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateProject(true)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* AI Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Assistant</span>
                <Button
                  variant={aiEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={toggleAI}
                  className="h-8"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  {aiEnabled ? 'On' : 'Off'}
                </Button>
              </div>
            </div>

            {/* Projects List */}
            <div className="flex-1 overflow-y-auto">
              {projects.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p className="text-sm">No projects yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCreateProject(true)}
                    className="mt-2"
                  >
                    Create your first project
                  </Button>
                </div>
              ) : (
                <ProjectList />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute top-20 left-2 z-10 h-8 w-8 p-0 bg-white border shadow-sm"
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      <CreateProjectDialog 
        open={showCreateProject}
        onClose={() => setShowCreateProject(false)}
      />
    </>
  );
};

export default ProjectSidebar;
