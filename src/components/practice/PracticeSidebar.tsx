
import React, { useState } from 'react';
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { ProjectTree } from './ProjectTree';
import { Button } from '@/components/ui/button';
import { Plus, FolderPlus, FileText } from 'lucide-react';
import { useProjectManager } from '@/hooks/useProjectManager';

export const PracticeSidebar = () => {
  const { projects, createProject, createFile } = useProjectManager();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Projects</h2>
          <SidebarTrigger />
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => createProject()}
            className="flex-1"
          >
            <FolderPlus className="w-4 h-4 mr-1" />
            New Project
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <ProjectTree projects={projects} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
