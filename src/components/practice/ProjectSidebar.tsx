
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar // import this
} from '@/components/ui/sidebar';
import { FolderOpen, Save, Trash2, Eye, EyeOff, ChevronDown, ChevronUp, X } from 'lucide-react';
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

const SIDEBAR_HEADER_HEIGHT = 64; // px, estimate for header
const SIDEBAR_FOOTER_HEIGHT = 56; // px, estimate or set to your actual footer height

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
  const [savedProjectsVisible, setSavedProjectsVisible] = useState(true);
  const { setOpen } = useSidebar();

  return (
    <Sidebar 
      className="w-64 max-h-[calc(100vh-56px)] h-[calc(100vh-56px)]" // constrain to viewport minus footer
      style={{ maxHeight: 'calc(100vh - 56px)', height: 'calc(100vh - 56px)' }} // 56px is the footer height
    >
      <SidebarHeader className="border-b border-gray-200 p-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <FolderOpen className="w-5 h-5" />
          Projects
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          aria-label="Hide Sidebar"
          onClick={() => setOpen(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-full">
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

        <SidebarGroup className="flex-1 min-h-0">
          <div className="flex items-center justify-between px-2">
            <SidebarGroupLabel>Saved Projects ({savedProjects.length})</SidebarGroupLabel>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSavedProjectsVisible(!savedProjectsVisible)}
              className="h-6 w-6 p-0"
              aria-label={savedProjectsVisible ? "Hide Saved Projects" : "Show Saved Projects"}
            >
              {savedProjectsVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          {savedProjectsVisible && (
            <SidebarGroupContent className="flex-1 min-h-0">
              <ScrollArea className="h-full max-h-[240px] px-2">
                <SidebarMenu>
                  {savedProjects.length > 0 ? (
                    savedProjects.map((project) => (
                      <SidebarMenuItem key={project.id} className="flex items-center justify-between mb-2">
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
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 ml-2"
                          aria-label="Delete Project"
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
              </ScrollArea>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProjectSidebar;
