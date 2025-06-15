
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Card } from '../ui/card';
import { Plus, Folder, FileText, MoreVertical } from 'lucide-react';
import { usePractice } from '../../contexts/PracticeContext';
import ProjectContextMenu from './ProjectContextMenu';

const ProjectSidebar = () => {
  const { state, dispatch } = usePractice();
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    type: 'project' | 'file';
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      dispatch({ type: 'CREATE_PROJECT', payload: { name: newProjectName.trim() } });
      setNewProjectName('');
      setShowNewProject(false);
    }
  };

  const handleRightClick = (e: React.MouseEvent, type: 'project' | 'file', id: string) => {
    e.preventDefault();
    setContextMenu({
      type,
      id,
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* AI Settings Section */}
      <div className="p-4 border-b border-gray-200">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">AI Assistant</span>
            <Switch
              checked={state.aiEnabled}
              onCheckedChange={(enabled) => 
                dispatch({ type: 'TOGGLE_AI', payload: { enabled } })
              }
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {state.aiEnabled ? 'AI assistance enabled' : 'AI assistance disabled'}
          </p>
        </Card>
      </div>

      {/* Projects Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Your Projects</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowNewProject(true)}
              className="h-6 w-6 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* New Project Form */}
          {showNewProject && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <Input
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                className="mb-2"
                autoFocus
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleCreateProject}>
                  Create
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setShowNewProject(false);
                    setNewProjectName('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Projects List */}
          <div className="space-y-2">
            {state.projects.map((project) => (
              <div key={project.id} className="group">
                <div
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${
                    state.selectedProjectId === project.id ? 'bg-blue-50 border border-blue-200' : ''
                  }`}
                  onClick={() => dispatch({ type: 'SELECT_PROJECT', payload: { projectId: project.id } })}
                  onContextMenu={(e) => handleRightClick(e, 'project', project.id)}
                >
                  <Folder className="h-4 w-4 text-blue-500" />
                  <span className="flex-1 text-sm font-medium text-gray-700 truncate">
                    {project.name}
                  </span>
                  <MoreVertical className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                </div>

                {/* Files in Project */}
                {state.selectedProjectId === project.id && (
                  <div className="ml-6 mt-2 space-y-1">
                    {project.files.map((file) => (
                      <div
                        key={file.id}
                        className={`flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer ${
                          state.selectedFileId === file.id ? 'bg-blue-50 border border-blue-200' : ''
                        }`}
                        onClick={() => dispatch({ type: 'SELECT_FILE', payload: { fileId: file.id } })}
                        onContextMenu={(e) => handleRightClick(e, 'file', file.id)}
                      >
                        <FileText className="h-3 w-3 text-gray-500" />
                        <span className="flex-1 text-xs text-gray-600 truncate">
                          {file.name}
                          {file.isDirty && <span className="text-orange-500 ml-1">*</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {state.projects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Folder className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No projects yet</p>
              <p className="text-xs">Create your first project to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ProjectContextMenu
          type={contextMenu.type}
          id={contextMenu.id}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default ProjectSidebar;
