
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Project, File } from '@/types/practice';

interface ProjectTreeProps {
  projects: Project[];
}

export const ProjectTree: React.FC<ProjectTreeProps> = ({ projects }) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFile(fileId);
    // TODO: Load file content in editor
  };

  return (
    <div className="space-y-1">
      {projects.map((project) => (
        <div key={project.id} className="space-y-1">
          <div
            className="flex items-center gap-1 p-2 rounded-md hover:bg-accent cursor-pointer group"
            onClick={() => toggleProject(project.id)}
          >
            {expandedProjects.has(project.id) ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <Folder className="w-4 h-4 text-blue-500" />
            <span className="flex-1 text-sm font-medium">{project.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
          
          {expandedProjects.has(project.id) && (
            <div className="ml-4 space-y-1">
              {project.files.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer",
                    selectedFile === file.id && "bg-accent"
                  )}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
