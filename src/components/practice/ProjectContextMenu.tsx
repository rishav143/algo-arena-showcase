
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FileText, Edit, Trash2 } from 'lucide-react';
import { usePractice } from '../../contexts/PracticeContext';

interface ProjectContextMenuProps {
  type: 'project' | 'file';
  id: string;
  x: number;
  y: number;
  onClose: () => void;
}

const ProjectContextMenu: React.FC<ProjectContextMenuProps> = ({
  type,
  id,
  x,
  y,
  onClose,
}) => {
  const { state, dispatch } = usePractice();
  const menuRef = useRef<HTMLDivElement>(null);
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleCreateFile = () => {
    if (fileName.trim() && type === 'project') {
      const extension = fileName.includes('.') ? fileName.substring(fileName.lastIndexOf('.')) : '.java';
      const fullFileName = fileName.includes('.') ? fileName : `${fileName}.java`;
      
      dispatch({
        type: 'CREATE_FILE',
        payload: {
          projectId: id,
          name: fullFileName,
          extension,
        },
      });
      
      setFileName('');
      setShowCreateFile(false);
      onClose();
    }
  };

  const handleDeleteProject = () => {
    if (confirm('Are you sure you want to delete this project? All files will be lost.')) {
      dispatch({ type: 'DELETE_PROJECT', payload: { projectId: id } });
      onClose();
    }
  };

  const handleDeleteFile = () => {
    const project = state.projects.find(p => p.files.some(f => f.id === id));
    if (project && confirm('Are you sure you want to delete this file?')) {
      dispatch({
        type: 'DELETE_FILE',
        payload: { projectId: project.id, fileId: id },
      });
      onClose();
    }
  };

  return (
    <Card
      ref={menuRef}
      className="absolute z-50 bg-white shadow-lg border min-w-48"
      style={{ left: x, top: y }}
    >
      <div className="p-2">
        {type === 'project' && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => setShowCreateFile(true)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Create New File
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <Edit className="h-4 w-4 mr-2" />
              Rename Project
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700"
              onClick={handleDeleteProject}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Project
            </Button>
          </>
        )}

        {type === 'file' && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <Edit className="h-4 w-4 mr-2" />
              Rename File
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700"
              onClick={handleDeleteFile}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete File
            </Button>
          </>
        )}

        {showCreateFile && (
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <Input
              placeholder="File name (e.g., Main.java)"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFile()}
              className="mb-2"
              autoFocus
            />
            <div className="flex space-x-1">
              <Button size="sm" onClick={handleCreateFile}>
                Create
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowCreateFile(false);
                  setFileName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectContextMenu;
