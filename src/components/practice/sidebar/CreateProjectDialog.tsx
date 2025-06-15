
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePractice } from '../../../contexts/PracticeContext';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({ open, onOpenChange }) => {
  const { state, dispatch } = usePractice();
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');

  const validateProjectName = (name: string): string | null => {
    if (!name.trim()) return 'Project name cannot be empty';
    if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) return 'Project name contains invalid characters';
    if (state.projects.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      return 'Project name already exists';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateProjectName(projectName);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch({ type: 'CREATE_PROJECT', payload: { name: projectName.trim() } });
    setProjectName('');
    setError('');
    onOpenChange(false);
  };

  const handleClose = () => {
    setProjectName('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              type="text"
              placeholder="Enter project name..."
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setError('');
              }}
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!projectName.trim()}>
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
