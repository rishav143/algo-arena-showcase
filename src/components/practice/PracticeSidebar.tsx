import React, { useState } from 'react';
import { ProjectTree } from './ProjectTree';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { FolderPlus, Bot } from 'lucide-react';
import { useProjectManager } from '@/hooks/useProjectManager';

interface PracticeSidebarProps {
  aiAssistantEnabled: boolean;
  onAiAssistantToggle: (enabled: boolean) => void;
}

export const PracticeSidebar: React.FC<PracticeSidebarProps> = ({ 
  aiAssistantEnabled, 
  onAiAssistantToggle 
}) => {
  const { projects, createProject } = useProjectManager();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFile(fileId);
    // Here you can add logic to load the file content in the editor
    console.log('Selected file:', fileId);
  };

  return (
    <div className="w-64 h-full border-r bg-background">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Projects</h2>
        </div>
        <div className="flex gap-2 mt-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <FolderPlus className="w-4 h-4 mr-1" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Project Name</label>
                  <Input
                    placeholder="Enter project name..."
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateProject();
                      }
                    }}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProject}>
                    Create Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="overflow-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Projects</h3>
          <ProjectTree 
            projects={projects} 
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />
        </div>
        
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Settings</h3>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span className="text-sm">AI Assistant</span>
            </div>
            <Switch
              checked={aiAssistantEnabled}
              onCheckedChange={onAiAssistantToggle}
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t mt-auto">
        <div className="text-xs text-muted-foreground">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};
