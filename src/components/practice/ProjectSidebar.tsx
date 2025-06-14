
import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, FolderOpen, Trash2, Settings, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePracticeState } from '@/hooks/usePracticeState';

const ProjectSidebar: React.FC = () => {
  const {
    projectName,
    setProjectName,
    aiAssistantEnabled,
    setAiAssistantEnabled,
    savedProjects,
    handleSaveProject,
    handleLoadProject,
    handleDeleteProject,
  } = usePracticeState();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-800">Project Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="project-name" className="text-sm font-medium text-gray-700">
              Project Name
            </Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="mt-1"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600" />
              <Label htmlFor="ai-assistant" className="text-sm font-medium text-gray-700">
                AI Assistant
              </Label>
            </div>
            <Switch
              id="ai-assistant"
              checked={aiAssistantEnabled}
              onCheckedChange={setAiAssistantEnabled}
            />
          </div>
          
          <Button onClick={handleSaveProject} className="w-full" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Project
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FolderOpen className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-800">Saved Projects</h3>
            <Badge variant="secondary" className="ml-auto">
              {savedProjects.length}
            </Badge>
          </div>
          
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {savedProjects.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No saved projects yet
                </p>
              ) : (
                savedProjects.map((project) => (
                  <Card key={project.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-800 truncate">
                            {project.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {project.language}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(project.lastModified).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleLoadProject(project)}
                            className="h-6 w-6 p-0"
                          >
                            <FolderOpen className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteProject(project.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500 text-center">
          Code Playground v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ProjectSidebar;
