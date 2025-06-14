
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
import { useToast } from '@/hooks/use-toast';

interface ProjectTreeProps {
  projects: Project[];
  selectedFile?: string | null;
  onFileSelect?: (fileId: string) => void;
}

export const ProjectTree: React.FC<ProjectTreeProps> = ({ 
  projects, 
  selectedFile, 
  onFileSelect 
}) => {
  const { createFile, deleteProject, renameFile } = useProjectManager();
  const { toast } = useToast();
  
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [isCreateFileDialogOpen, setIsCreateFileDialogOpen] = useState(false);
  const [selectedProjectForFile, setSelectedProjectForFile] = useState<string>('');
  const [newFileName, setNewFileName] = useState('');
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const languageExtensions = {
    javascript: ['.js', '.jsx'],
    typescript: ['.ts', '.tsx'],
    python: ['.py'],
    java: ['.java'],
    cpp: ['.cpp', '.cxx', '.cc'],
    c: ['.c'],
    go: ['.go'],
    rust: ['.rs']
  };

  const getAllowedExtensions = () => {
    return Object.values(languageExtensions).flat();
  };

  const validateFileName = (fileName: string) => {
    if (!fileName.trim()) {
      return 'File name cannot be empty';
    }
    
    const allowedExtensions = getAllowedExtensions();
    const hasValidExtension = allowedExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
    
    if (!hasValidExtension) {
      return `File must have one of these extensions: ${allowedExtensions.join(', ')}`;
    }
    
    return null;
  };

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
    if (onFileSelect) {
      onFileSelect(fileId);
    }
  };

  const handleCreateFile = async () => {
    const validation = validateFileName(newFileName);
    if (validation) {
      toast({
        title: "Invalid File Name",
        description: validation,
        variant: "destructive",
      });
      return;
    }

    if (newFileName.trim() && selectedProjectForFile) {
      try {
        await createFile(selectedProjectForFile, newFileName.trim());
        
        // Automatically expand the project to show the new file
        setExpandedProjects(prev => new Set([...prev, selectedProjectForFile]));
        
        // Close dialog and reset form
        setNewFileName('');
        setIsCreateFileDialogOpen(false);
        setSelectedProjectForFile('');
        
        toast({
          title: "File Created",
          description: `${newFileName.trim()} has been created successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create file. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const openCreateFileDialog = (projectId: string) => {
    setSelectedProjectForFile(projectId);
    setIsCreateFileDialogOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      
      // Remove from expanded projects if it was expanded
      setExpandedProjects(prev => {
        const newExpanded = new Set(prev);
        newExpanded.delete(projectId);
        return newExpanded;
      });
      
      toast({
        title: "Project Deleted",
        description: "Project has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileDoubleClick = (file: File) => {
    setRenamingFile(file.id);
    setRenameValue(file.name);
  };

  const handleRenameSubmit = async (fileId: string) => {
    const validation = validateFileName(renameValue);
    if (validation) {
      toast({
        title: "Invalid File Name",
        description: validation,
        variant: "destructive",
      });
      return;
    }

    try {
      if (renameFile) {
        await renameFile(fileId, renameValue);
      }
      
      toast({
        title: "File Renamed",
        description: `File renamed to ${renameValue}`,
      });
      
      setRenamingFile(null);
      setRenameValue('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rename file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRenameCancel = () => {
    setRenamingFile(null);
    setRenameValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (renamingFile) {
        handleRenameCancel();
      }
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
                            Are you sure you want to delete "{project.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProject(project.id)}
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
                    {renamingFile === file.id ? (
                      <Input
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, () => handleRenameSubmit(file.id))}
                        onBlur={() => handleRenameCancel()}
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
                placeholder="Enter file name (e.g., main.js, app.py)"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleCreateFile)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supported extensions: {getAllowedExtensions().join(', ')}
              </p>
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
