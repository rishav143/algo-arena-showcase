
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MoreVertical, Folder, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePractice, PracticeProject } from '../../../contexts/PracticeContext';
import FileItem from './FileItem';
import CreateFileDialog from './CreateFileDialog';
import RenameDialog from './RenameDialog';

interface ProjectItemProps {
  project: PracticeProject;
  isActive: boolean;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, isActive }) => {
  const { dispatch } = usePractice();
  const [isExpanded, setIsExpanded] = useState(isActive);
  const [isCreateFileOpen, setIsCreateFileOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCreateFile = () => {
    setIsCreateFileOpen(true);
  };

  const handleRenameProject = () => {
    setIsRenameOpen(true);
  };

  const handleDeleteProject = () => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      dispatch({ type: 'DELETE_PROJECT', payload: { projectId: project.id } });
    }
  };

  return (
    <div className="space-y-1">
      {/* Project Header */}
      <div className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-indigo-50 border border-indigo-200' : ''}`}>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0"
          onClick={handleToggleExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
        
        <Folder className="w-4 h-4 text-indigo-600 mr-2" />
        
        <span className="flex-1 text-sm font-medium text-gray-900 truncate">
          {project.name}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleCreateFile}>
              <Plus className="w-4 h-4 mr-2" />
              Create New File
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRenameProject}>
              Rename Project
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDeleteProject}
              className="text-red-600"
            >
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Project Files */}
      {isExpanded && (
        <div className="ml-6 space-y-1">
          {project.files.length === 0 ? (
            <div className="py-2 px-4 text-xs text-gray-500">
              No files yet
            </div>
          ) : (
            project.files.map((file) => (
              <FileItem key={file.id} file={file} />
            ))
          )}
        </div>
      )}

      <CreateFileDialog
        open={isCreateFileOpen}
        onOpenChange={setIsCreateFileOpen}
        projectId={project.id}
      />

      <RenameDialog
        open={isRenameOpen}
        onOpenChange={setIsRenameOpen}
        title="Rename Project"
        currentName={project.name}
        onRename={(newName) => 
          dispatch({ type: 'RENAME_PROJECT', payload: { projectId: project.id, newName } })
        }
        validateName={(name) => {
          if (!name.trim()) return 'Project name cannot be empty';
          if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) return 'Project name contains invalid characters';
          return null;
        }}
      />
    </div>
  );
};

export default ProjectItem;
