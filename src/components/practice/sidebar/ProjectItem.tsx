
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, MoreHorizontal, Trash2, Edit3, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Project } from '@/types/project';
import { FileItem } from './FileItem';
import { CreateFileDialog } from './CreateFileDialog';

interface ProjectItemProps {
  project: Project;
  isExpanded: boolean;
  selectedFileId: string | null;
  onToggleExpand: () => void;
  onSelectFile: (fileId: string) => void;
  onRenameProject: (newName: string) => void;
  onDeleteProject: () => void;
  onCreateFile: (fileName: string, language: string) => void;
  onRenameFile: (fileId: string, newName: string) => void;
  onDeleteFile: (fileId: string) => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  isExpanded,
  selectedFileId,
  onToggleExpand,
  onSelectFile,
  onRenameProject,
  onDeleteProject,
  onCreateFile,
  onRenameFile,
  onDeleteFile,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(project.name);
  const [isCreateFileOpen, setIsCreateFileOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleRenameProject = () => {
    if (renameValue.trim() && renameValue !== project.name) {
      onRenameProject(renameValue.trim());
    }
    setIsRenaming(false);
  };

  const handleCreateFile = (fileName: string, language: string) => {
    onCreateFile(fileName, language);
    setIsCreateFileOpen(false);
    setIsPopoverOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameProject();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
      setRenameValue(project.name);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 p-2 rounded-md hover:bg-accent group">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={onToggleExpand}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
        
        <Folder className="w-4 h-4 text-blue-500 flex-shrink-0" />
        
        {isRenaming ? (
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleRenameProject}
            className="h-6 text-sm"
            autoFocus
          />
        ) : (
          <>
            <span className="flex-1 text-sm font-medium truncate">{project.name}</span>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
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
                    onClick={() => setIsCreateFileOpen(true)}
                  >
                    <FilePlus className="w-4 h-4 mr-2" />
                    Add File
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsRenaming(true);
                      setRenameValue(project.name);
                      setIsPopoverOpen(false);
                    }}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Rename
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
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
                          onClick={() => {
                            onDeleteProject();
                            setIsPopoverOpen(false);
                          }}
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
          </>
        )}
      </div>
      
      {isExpanded && project.files.length > 0 && (
        <div className="ml-6 space-y-1">
          {project.files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              projectId={project.id}
              isSelected={selectedFileId === file.id}
              onSelect={() => onSelectFile(file.id)}
              onRename={(newName) => onRenameFile(file.id, newName)}
              onDelete={() => onDeleteFile(file.id)}
            />
          ))}
        </div>
      )}

      <CreateFileDialog
        open={isCreateFileOpen}
        onOpenChange={setIsCreateFileOpen}
        onCreateFile={handleCreateFile}
      />
    </div>
  );
};
