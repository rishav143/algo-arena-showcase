
import React, { useState } from 'react';
import { File, MoreVertical, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CodeFile, usePractice } from '@/contexts/PracticeContext';
import RenameDialog from './RenameDialog';

interface FileItemProps {
  file: CodeFile;
  projectId: string;
}

const FileItem: React.FC<FileItemProps> = ({ file, projectId }) => {
  const { state, dispatch } = usePractice();
  const [showRename, setShowRename] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  const isActive = state.activeFile?.id === file.id;

  const handleFileClick = () => {
    dispatch({ type: 'SET_ACTIVE_FILE', payload: { file } });
  };

  const handleDoubleClick = () => {
    setIsRenaming(true);
    safeOpenDialog(setShowRename);
  };

  // Ensures focus is not trapped in dropdown before dialog opens
  const safeOpenDialog = (setOpen: (v: boolean) => void) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setTimeout(() => setOpen(true), 0);
  };

  const handleRename = () => {
    safeOpenDialog(setShowRename);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
      dispatch({ 
        type: 'DELETE_FILE', 
        payload: { projectId, fileId: file.id } 
      });
    }
  };

  const getFileIcon = (language: string) => {
    // Return appropriate file icon based on language
    return <File className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="group">
      <div
        className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-colors ${
          isActive ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700'
        }`}
        onClick={handleFileClick}
        onDoubleClick={handleDoubleClick}
      >
        {getFileIcon(file.language)}
        
        <span className="flex-1 text-sm truncate">
          {file.name}
        </span>
        
        {file.isUnsaved && (
          <Circle className="w-2 h-2 fill-orange-500 text-orange-500" />
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 hover:bg-gray-300"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white border border-gray-200 shadow-lg">
            <DropdownMenuItem
              onClick={handleRename}
              className="hover:bg-gray-50"
            >
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete} 
              className="hover:bg-red-50 text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <RenameDialog
        open={showRename}
        onOpenChange={setShowRename}
        type="file"
        currentName={file.name}
        onRename={(name) => dispatch({ 
          type: 'RENAME_FILE', 
          payload: { projectId, fileId: file.id, name } 
        })}
      />
    </div>
  );
};

export default FileItem;

