
import React, { useState } from 'react';
import { FileText, MoreHorizontal, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ProjectFile } from '@/types/project';
import { useTemplateContext } from '@/contexts/TemplateContext';
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
  const { selectedTemplate } = useTemplateContext();
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(file.name);

  // File should only be selected if no template is selected and this file is the selected one
  const actuallySelected = isSelected && !selectedTemplate;

  const handleRename = () => {
    if (renameValue.trim() && renameValue !== file.name) {
      onRename(renameValue.trim());
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
      setRenameValue(file.name);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer group",
        actuallySelected && "bg-accent"
      )}
      onClick={onSelect}
    >
      <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      
      {isRenaming ? (
        <Input
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleRename}
          className="h-6 text-sm"
          autoFocus
        />
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
                  onClick={() => {
                    setIsRenaming(true);
                    setRenameValue(file.name);
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
