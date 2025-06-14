
import React, { useState } from 'react';
import { FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useProjectContext } from '@/contexts/ProjectContext';
import { ProjectItem } from './ProjectItem';

export const ProjectsSection: React.FC = () => {
  const {
    projects,
    selectedFile,
    createProject,
    deleteProject,
    renameProject,
    createFile,
    deleteFile,
    renameFile,
    selectFile,
  } = useProjectContext();

  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreateProjectOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateProject();
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Your Projects</h3>
          <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderPlus className="w-4 h-4 mr-1" />
                New
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
                    placeholder="Enter project name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateProjectOpen(false)}
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
        
        <div className="space-y-1">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              isExpanded={expandedProjects.has(project.id)}
              selectedFileId={selectedFile?.id || null}
              onToggleExpand={() => toggleProject(project.id)}
              onSelectFile={(fileId) => selectFile(project.id, fileId)}
              onRenameProject={(newName) => renameProject(project.id, newName)}
              onDeleteProject={() => deleteProject(project.id)}
              onCreateFile={(fileName, language) => {
                createFile(project.id, fileName, language);
                setExpandedProjects(prev => new Set([...prev, project.id]));
              }}
              onRenameFile={(fileId, newName) => renameFile(project.id, fileId, newName)}
              onDeleteFile={(fileId) => deleteFile(project.id, fileId)}
            />
          ))}
          
          {projects.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-2">No projects yet</p>
              <p className="text-xs text-muted-foreground">Create your first project to get started</p>
            </div>
          )}
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
