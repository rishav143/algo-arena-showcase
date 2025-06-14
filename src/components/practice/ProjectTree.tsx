
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, MoreHorizontal, Trash, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Project, File } from '@/types/practice';
import { useProjectManager } from '@/hooks/useProjectManager';

interface ProjectTreeProps {
  projects: Project[];
  onFileSelect?: (fileId: string) => void;
}

export const ProjectTree: React.FC<ProjectTreeProps> = ({ projects, onFileSelect }) => {
  const { createFile, deleteProject, renameFile } = useProjectManager();
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isCreateFileDialogOpen, setIsCreateFileDialogOpen] = useState(false);
  const [selectedProjectForFile, setSelectedProjectForFile] = useState<string>('');
  const [newFileName, setNewFileName] = useState('');
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState('');

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFile(fileId);
    onFileSelect?.(fileId);
  };

  const handleCreateFile = () => {
    if (newFileName.trim() && selectedProjectForFile) {
      createFile(selectedProjectForFile, newFileName.trim());
      setNewFileName('');
      setIsCreateFileDialogOpen(false);
      setSelectedProjectForFile('');
    }
  };

  const openCreateFileDialog = (projectId: string) => {
    setSelectedProjectForFile(projectId);
    setIsCreateFileDialogOpen(true);
  };

  const handleFileDoubleClick = (file: File) => {
    setEditingFile(file.id);
    setEditingFileName(file.name);
  };

  const handleFileRename = (fileId: string) => {
    if (editingFileName.trim()) {
      renameFile(fileId, editingFileName.trim());
    }
    setEditingFile(null);
    setEditingFileName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
    if (e.key === 'Escape') {
      setEditingFile(null);
      setEditingFileName('');
    }
  };

  return (
    <>
      <div className="space-y-1">
        {projects.map((project) => (
          <div key={project.id} className="space-y-1">
            <div className="flex items-center gap-1 p-2 rounded-md hover:bg-accent group">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => toggleProject(project.id)}
              >
                {expandedProjects.has(project.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
              
              <Folder className="w-4 h-4 text-blue-500" />
              <span className="flex-1 text-sm font-medium">{project.name}</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48" align="end">
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => openCreateFileDialog(project.id)}
                    >
                      <FilePlus className="w-4 h-4 mr-2" />
                      Add File
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-destructive hover:text-destructive"
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete Project
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{project.name}" and all its files? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteProject(project.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {expandedProjects.has(project.id) && (
              <div className="ml-6 space-y-1">
                {project.files.map((file) => (
                  <div
                    key={file.id}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer",
                      selectedFile === file.id && "bg-accent"
                    )}
                    onClick={() => handleFileSelect(file.id)}
                    onDoubleClick={() => handleFileDoubleClick(file)}
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    {editingFile === file.id ? (
                      <Input
                        value={editingFileName}
                        onChange={(e) => setEditingFileName(e.target.value)}
                        onBlur={() => handleFileRename(file.id)}
                        onKeyDown={(e) => handleKeyDown(e, () => handleFileRename(file.id))}
                        className="h-6 text-sm"
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm">{file.name}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create File Dialog */}
      <Dialog open={isCreateFileDialogOpen} onOpenChange={setIsCreateFileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">File Name</label>
              <Input
                placeholder="Enter file name (e.g., main.js)"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateFile();
                  }
                }}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateFileDialogOpen(false);
                  setNewFileName('');
                  setSelectedProjectForFile('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateFile}>
                Create File
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
