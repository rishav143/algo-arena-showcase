
import React, { useState } from 'react';
import { Plus, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePractice } from '@/contexts/PracticeContext';
import ProjectItem from './ProjectItem';
import CreateProjectDialog from './CreateProjectDialog';

const ProjectsSidebar: React.FC = () => {
  const { state, dispatch } = usePractice();
  const [showCreateProject, setShowCreateProject] = useState(false);

  const handleCreateProject = () => {
    setShowCreateProject(true);
  };

  const handleToggleAI = (enabled: boolean) => {
    dispatch({ type: 'TOGGLE_AI_ASSISTANT' });
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* AI Assistant Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Bot className="w-5 h-5 text-indigo-600" />
          <Label htmlFor="ai-toggle" className="text-sm font-medium text-gray-700 flex-1">
            AI Assistant
          </Label>
          <Switch
            id="ai-toggle"
            checked={state.aiAssistantEnabled}
            onCheckedChange={handleToggleAI}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Enable intelligent code assistance and error resolution
        </p>
      </div>

      {/* Projects Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Your Projects</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCreateProject}
            className="h-8 w-8 p-0 hover:bg-gray-200"
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
              <p className="text-gray-500 text-sm mb-4">No projects yet</p>
              <Button
                size="sm"
                onClick={handleCreateProject}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {state.projects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  isActive={state.activeProject?.id === project.id}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={showCreateProject}
        onOpenChange={setShowCreateProject}
      />
    </div>
  );
};

export default ProjectsSidebar;
