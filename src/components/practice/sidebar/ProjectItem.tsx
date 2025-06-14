
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, MoreHorizontal, Trash2, Edit3, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project } from '@/types/project';
import { FileItem } from './FileItem';

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

const LANGUAGE_EXTENSIONS = {
  javascript: ['.js', '.jsx'],
  typescript: ['.ts', '.tsx'],
  python: ['.py'],
  java: ['.java'],
  cpp: ['.cpp', '.cxx', '.cc'],
  c: ['.c'],
  go: ['.go'],
  rust: ['.rs']
};

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
  const [newFileName, setNewFileName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleRenameProject = () => {
    if (renameValue.trim() && renameValue !== project.name) {
      onRenameProject(renameValue.trim());
    }
    setIsRenaming(false);
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const extension = Object.entries(LANGUAGE_EXTENSIONS)
        .find(([lang]) => lang === selectedLanguage)?.[1][0] || '.js';
      
      const fileName = newFileName.includes('.') ? newFileName : `${newFileName}${extension}`;
      onCreateFile(fileName, selectedLanguage);
      setNewFileName('');
      setIsCreateFileOpen(false);
      setIsPopoverOpen(false); // Close the popover after file creation
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isRenaming) {
        handleRenameProject();
      } else {
        handleCreateFile();
      }
    } else if (e.key === 'Escape') {
      if (isRenaming) {
        setIsRenaming(false);
        setRenameValue(project.name);
      }
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
                  <Dialog open={isCreateFileOpen} onOpenChange={setIsCreateFileOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <FilePlus className="w-4 h-4 mr-2" />
                        Add File
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New File</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">File Name</label>
                          <Input
                            placeholder="Enter file name"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Language</label>
                          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                              <SelectItem value="typescript">TypeScript</SelectItem>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="java">Java</SelectItem>
                              <SelectItem value="cpp">C++</SelectItem>
                              <SelectItem value="c">C</SelectItem>
                              <SelectItem value="go">Go</SelectItem>
                              <SelectItem value="rust">Rust</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => setIsCreateFileOpen(false)}
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
    </div>
  );
};
