
import React, { useState } from 'react';
import { File, MoreHorizontal } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { ProjectFile } from '../../../types/practice';
import { useProject } from '../../../contexts/ProjectContext';
import RenameDialog from './RenameDialog';

interface FileItemProps {
  file: ProjectFile;
  projectId: string;
}

const FileItem: React.FC<FileItemProps> = ({ file, projectId }) => {
  const { selectFile, deleteFile, renameFile, activeFile } = useProject();
  const [showRename, setShowRename] = useState(false);

  const isActive = activeFile === file.id;

  const handleSelect = () => {
    selectFile(projectId, file.id);
  };

  const handleRename = (newName: string) => {
    renameFile(projectId, file.id, newName);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
      deleteFile(projectId, file.id);
    }
  };

  return (
    <>
      <div className={`group flex items-center hover:bg-gray-100 rounded-md px-2 py-1 ${
        isActive ? 'bg-blue-50 border-l-2 border-blue-500' : ''
      }`}>
        <File className="h-3 w-3 mr-2 text-gray-400" />
        
        <span 
          className={`flex-1 text-sm cursor-pointer ${
            isActive ? 'text-blue-700 font-medium' : 'text-gray-700'
          } ${!file.saved ? 'italic' : ''}`}
          onClick={handleSelect}
          onDoubleClick={() => setShowRename(true)}
        >
          {file.name}{!file.saved && '*'}
        </span>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowRename(true)}>
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <RenameDialog
        open={showRename}
        title="Rename File"
        currentName={file.name}
        onRename={handleRename}
        onClose={() => setShowRename(false)}
        validateExtension={true}
      />
    </>
  );
};

export default FileItem;
