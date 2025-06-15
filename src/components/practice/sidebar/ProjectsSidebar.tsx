
import React, { useState } from 'react';
import { Plus, Settings, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePractice } from '../../../contexts/PracticeContext';
import ProjectItem from './ProjectItem';
import CreateProjectDialog from './CreateProjectDialog';

const ProjectsSidebar = () => {
  const { state, dispatch } = usePractice();
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const handleCreateProject = () => {
    setIsCreateProjectOpen(true);
  };

  const handleToggleAI = () => {
    dispatch({ type: 'TOGGLE_AI_ASSISTANT' });
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* AI Assistant Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Label htmlFor="ai-assistant" className="text-sm font-medium">
            AI Assistant
          </Label>
          <Switch
            id="ai-assistant"
            checked={state.isAIAssistantEnabled}
            onCheckedChange={handleToggleAI}
          />
        </div>
      </div>

      {/* Projects Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Your Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCreateProject}
            className="h-8 w-8"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {state.projects.length === 0 ? (
            <div className="text-center py-8">
              <FolderPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm mb-4">No projects yet</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCreateProject}
                className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {state.projects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  isActive={state.activeProject === project.id}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <CreateProjectDialog
        open={isCreateProjectOpen}
        onOpenChange={setIsCreateProjectOpen}
      />
    </div>
  );
};

export default ProjectsSidebar;
