
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MoreHorizontal, File, Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Project } from '../../../types/practice';
import { useProject } from '../../../contexts/ProjectContext';
import FileItem from './FileItem';
import CreateFileDialog from './CreateFileDialog';
import RenameDialog from './RenameDialog';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const { deleteProject, renameProject } = useProject();
  const [expanded, setExpanded] = useState(project.expanded);
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [showRename, setShowRename] = useState(false);

  const handleRename = (newName: string) => {
    renameProject(project.id, newName);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
      deleteProject(project.id);
    }
  };

  return (
    <>
      <div className="group">
        <div className="flex items-center hover:bg-gray-100 rounded-md px-2 py-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-6 w-6 p-0 mr-1"
          >
            {expanded ? 
              <ChevronDown className="h-3 w-3" /> : 
              <ChevronRight className="h-3 w-3" />
            }
          </Button>
          
          <span 
            className="flex-1 text-sm font-medium cursor-pointer"
            onDoubleClick={() => setShowRename(true)}
          >
            {project.name}
          </span>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCreateFile(true)}
              className="h-6 w-6 p-0 mr-1"
            >
              <Plus className="h-3 w-3" />
            </Button>
            
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

        {expanded && (
          <div className="ml-6 space-y-1">
            {project.files.map((file) => (
              <FileItem key={file.id} file={file} projectId={project.id} />
            ))}
          </div>
        )}
      </div>

      <CreateFileDialog
        open={showCreateFile}
        projectId={project.id}
        onClose={() => setShowCreateFile(false)}
      />

      <RenameDialog
        open={showRename}
        title="Rename Project"
        currentName={project.name}
        onRename={handleRename}
        onClose={() => setShowRename(false)}
      />
    </>
  );
};

export default ProjectItem;
