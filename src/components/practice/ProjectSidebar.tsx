
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { FolderOpen, Save, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavedProject {
  id: string;
  name: string;
  language: string;
  code: string;
  lastModified: Date;
}

interface ProjectSidebarProps {
  projectName: string;
  setProjectName: (name: string) => void;
  aiAssistantEnabled: boolean;
  setAiAssistantEnabled: (enabled: boolean) => void;
  savedProjects: SavedProject[];
  onSaveProject: () => void;
  onLoadProject: (project: SavedProject) => void;
  onDeleteProject: (projectId: string) => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  projectName,
  setProjectName,
  aiAssistantEnabled,
  setAiAssistantEnabled,
  savedProjects,
  onSaveProject,
  onLoadProject,
  onDeleteProject
}) => {
  return (
    <Sidebar className="w-64">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Projects
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Current Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3 space-y-3">
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project name"
                className="text-sm"
              />
              <Button 
                onClick={onSaveProject}
                size="sm"
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Assistant</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAiAssistantEnabled(!aiAssistantEnabled)}
                  className="h-8 w-8 p-0"
                >
                  {aiAssistantEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Saved Projects ({savedProjects.length})</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {savedProjects.length > 0 ? (
                savedProjects.map((project) => (
                  <SidebarMenuItem key={project.id} className="flex items-center justify-between">
                    <SidebarMenuButton
                      onClick={() => onLoadProject(project)}
                      className="flex-1 justify-start text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{project.name}</div>
                        <div className="text-xs text-gray-500">{project.language}</div>
                        <div className="text-xs text-gray-400">{project.lastModified.toLocaleDateString()}</div>
                      </div>
                    </SidebarMenuButton>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => onDeleteProject(project.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No saved projects yet
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProjectSidebar;
