
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjectContext } from '@/contexts/ProjectContext';
import { getFileExtension } from '@/utils/editorStateManager';

interface SaveFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileSaved: (projectId: string, fileName: string) => void;
  language: string;
}

export const SaveFileDialog: React.FC<SaveFileDialogProps> = ({
  open,
  onOpenChange,
  onFileSaved,
  language
}) => {
  const { projects } = useProjectContext();
  const [fileName, setFileName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (projects.length > 0 && !projectId) {
      setProjectId(projects[0].id);
    }
  }, [projects, projectId]);

  useEffect(() => {
    if (open) {
      const extension = getFileExtension(language);
      setFileName(`untitled.${extension}`);
    }
  }, [open, language]);

  const validateFileName = (name: string): string | null => {
    if (!name.trim()) {
      return 'File name is required';
    }
    if (name.trim().length < 1) {
      return 'File name cannot be empty';
    }
    return null;
  };

  const handleSave = () => {
    const validationError = validateFileName(fileName);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    if (!projectId) {
      setError('Please select a project');
      return;
    }
    
    onFileSaved(projectId, fileName.trim());
    setFileName('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save File</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Project</label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">File Name</label>
            <Input
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter file name"
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
