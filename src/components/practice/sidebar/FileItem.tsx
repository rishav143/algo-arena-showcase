
import React, { useState } from 'react';
import { FileText, MoreHorizontal, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ProjectFile } from '@/types/project';
import { validateFileExtension } from '@/utils/fileValidation';
import { cn } from '@/lib/utils';

interface FileItemProps {
  file: ProjectFile;
  projectId: string;
  isSelected: boolean;
  onSelect: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({
  file,
  projectId,
  isSelected,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(file.name);
  const [error, setError] = useState('');

  const handleRename = () => {
    if (!renameValue.trim()) {
      setError('File name cannot be empty');
      return;
    }

    if (renameValue === file.name) {
      setIsRenaming(false);
      return;
    }

    const validationError = validateFileExtension(renameValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    onRename(renameValue.trim());
    setIsRenaming(false);
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
      setRenameValue(file.name);
      setError('');
    }
  };

  const handleStartRename = () => {
    setIsRenaming(true);
    setRenameValue(file.name);
    setError('');
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer group",
        isSelected && "bg-accent"
      )}
      onClick={onSelect}
    >
      <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      
      {isRenaming ? (
        <div className="flex-1">
          <Input
            value={renameValue}
            onChange={(e) => {
              setRenameValue(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
            onBlur={handleRename}
            className={cn("h-6 text-sm", error && "border-red-500")}
            autoFocus
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      ) : (
        <>
          <span className="text-sm flex-1 truncate">{file.name}</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40" align="end">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={handleStartRename}
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
                      <AlertDialogTitle>Delete File</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{file.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={onDelete}
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
  );
};
