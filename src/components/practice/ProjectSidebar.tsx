
import React, { useState } from 'react';
import { Folder, File, Plus, MoreHorizontal, FolderOpen } from 'lucide-react';
import ProjectContextMenu from './ProjectContextMenu';

interface ProjectSidebarProps {
  selectedProject: string | null;
  onProjectSelect: (projectId: string) => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ selectedProject, onProjectSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['project1']));
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; item: any } | null>(null);

  const projects = [
    {
      id: 'project1',
      name: 'Array Problems',
      type: 'folder',
      children: [
        { id: 'file1', name: 'two-sum.js', type: 'file' },
        { id: 'file2', name: 'best-time-to-buy.py', type: 'file' },
        { id: 'file3', name: 'container-water.cpp', type: 'file' }
      ]
    },
    {
      id: 'project2',
      name: 'String Algorithms',
      type: 'folder',
      children: [
        { id: 'file4', name: 'valid-palindrome.js', type: 'file' },
        { id: 'file5', name: 'longest-substring.py', type: 'file' }
      ]
    }
  ];

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleContextMenu = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  return (
    <div className="h-full bg-slate-800 border-r border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-300">Explorer</h2>
          <button className="p-1 hover:bg-slate-700 rounded text-gray-400 hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-2 space-y-1">
        {projects.map((project) => (
          <div key={project.id}>
            <div
              className="flex items-center gap-2 px-2 py-1 hover:bg-slate-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors"
              onClick={() => toggleFolder(project.id)}
              onContextMenu={(e) => handleContextMenu(e, project)}
            >
              {expandedFolders.has(project.id) ? (
                <FolderOpen className="w-4 h-4 text-blue-400" />
              ) : (
                <Folder className="w-4 h-4 text-blue-400" />
              )}
              <span className="text-sm flex-1">{project.name}</span>
            </div>

            {expandedFolders.has(project.id) && (
              <div className="ml-6 space-y-1">
                {project.children.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-slate-700 rounded cursor-pointer text-gray-400 hover:text-white transition-colors"
                    onClick={() => onProjectSelect(file.id)}
                    onContextMenu={(e) => handleContextMenu(e, file)}
                  >
                    <File className="w-4 h-4" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {contextMenu && (
        <ProjectContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          item={contextMenu.item}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default ProjectSidebar;
