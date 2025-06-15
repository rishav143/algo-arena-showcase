
import React, { useState } from 'react';
import { FileText, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { usePractice, PracticeFile } from '../../../contexts/PracticeContext';
import RenameDialog from './RenameDialog';

interface FileItemProps {
  file: PracticeFile;
}

const getLanguageFromExtension = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'js': return 'javascript';
    case 'ts': return 'typescript';
    case 'py': return 'python';
    case 'java': return 'java';
    case 'cpp': case 'cc': case 'cxx': return 'cpp';
    case 'c': return 'c';
    case 'cs': return 'csharp';
    case 'rb': return 'ruby';
    case 'go': return 'go';
    case 'rs': return 'rust';
    default: return 'javascript';
  }
};

const validateFileExtension = (filename: string): boolean => {
  const validExtensions = ['js', 'ts', 'py', 'java', 'cpp', 'cc', 'cxx', 'c', 'cs', 'rb', 'go', 'rs'];
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? validExtensions.includes(ext) : false;
};

const FileItem: React.FC<FileItemProps> = ({ file }) => {
  const { state, dispatch } = usePractice();
  const [isRenaming, setIsRenaming] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const isActive = state.activeFile?.id === file.id;

  const handleFileClick = () => {
    dispatch({ type: 'SET_ACTIVE_FILE', payload: { file } });
  };

  const handleDoubleClick = () => {
    setIsRenaming(true);
  };

  const handleRename = () => {
    setIsRenameDialogOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${file.name}"?`)) {
      dispatch({ type: 'DELETE_FILE', payload: { fileId: file.id } });
    }
  };

  const handleRenameSubmit = (newName: string) => {
    dispatch({ type: 'RENAME_FILE', payload: { fileId: file.id, newName } });
  };

  return (
    <>
      <div 
        className={`flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer group ${
          isActive ? 'bg-indigo-100 border border-indigo-300' : ''
        }`}
        onClick={handleFileClick}
        onDoubleClick={handleDoubleClick}
      >
        <FileText className="w-4 h-4 text-gray-600 mr-2" />
        <span className="flex-1 text-sm text-gray-900 truncate">
          {file.name}
          {file.isUnsaved && <span className="text-orange-500 ml-1">•</span>}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleRename}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <RenameDialog
        open={isRenameDialogOpen}
        onOpenChange={setIsRenameDialogOpen}
        title="Rename File"
        currentName={file.name}
        onRename={handleRenameSubmit}
        validateName={(name) => {
          if (!name.trim()) return 'File name cannot be empty';
          if (!validateFileExtension(name)) return 'Invalid file extension';
          return null;
        }}
      />
    </>
  );
};

export default FileItem;
