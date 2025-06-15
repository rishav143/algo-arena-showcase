
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MoreVertical, Plus, FolderOpen, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Project, usePractice } from '@/contexts/PracticeContext';
import FileItem from './FileItem';
import CreateFileDialog from './CreateFileDialog';
import RenameDialog from './RenameDialog';

interface ProjectItemProps {
  project: Project;
  isActive: boolean;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, isActive }) => {
  const { dispatch } = usePractice();
  const [isExpanded, setIsExpanded] = useState(isActive);
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [showRename, setShowRename] = useState(false);

  const handleProjectClick = () => {
    dispatch({ type: 'SET_ACTIVE_PROJECT', payload: { project } });
    setIsExpanded(!isExpanded);
  };

  const handleCreateFile = () => {
    setShowCreateFile(true);
  };

  const handleRename = () => {
    setShowRename(true);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`)) {
      dispatch({ type: 'DELETE_PROJECT', payload: { id: project.id } });
    }
  };

  return (
    <div className="select-none">
      {/* Project Header */}
      <div
        className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-colors ${
          isActive ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700'
        }`}
        onClick={handleProjectClick}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </Button>
        
        {isExpanded ? (
          <FolderOpen className="w-4 h-4 text-indigo-600" />
        ) : (
          <Folder className="w-4 h-4 text-gray-500" />
        )}
        
        <span className="flex-1 text-sm font-medium truncate">
          {project.name}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-gray-300"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg">
            <DropdownMenuItem onClick={handleCreateFile} className="hover:bg-gray-50">
              <Plus className="w-4 h-4 mr-2" />
              Create New File
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRename} className="hover:bg-gray-50">
              Rename Project
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete} 
              className="hover:bg-red-50 text-red-600"
            >
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Files */}
      {isExpanded && (
        <div className="ml-6 space-y-1">
          {project.files.length === 0 ? (
            <div className="py-2 px-2">
              <p className="text-xs text-gray-500 mb-2">No files yet</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCreateFile}
                className="text-xs h-6 px-2 text-indigo-600 hover:bg-indigo-50"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add File
              </Button>
            </div>
          ) : (
            project.files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                projectId={project.id}
              />
            ))
          )}
        </div>
      )}

      {/* Dialogs */}
      <CreateFileDialog
        open={showCreateFile}
        onOpenChange={setShowCreateFile}
        projectId={project.id}
      />
      
      <RenameDialog
        open={showRename}
        onOpenChange={setShowRename}
        type="project"
        currentName={project.name}
        onRename={(name) => dispatch({ 
          type: 'RENAME_PROJECT', 
          payload: { id: project.id, name } 
        })}
      />
    </div>
  );
};

export default ProjectItem;
