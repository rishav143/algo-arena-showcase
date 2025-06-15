
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePractice } from '@/contexts/PracticeContext';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({ open, onOpenChange }) => {
  const { state, dispatch } = usePractice();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validateName = (name: string): string | null => {
    if (!name.trim()) {
      return 'Project name is required';
    }
    
    if (name.length < 2) {
      return 'Project name must be at least 2 characters';
    }
    
    if (!/^[a-zA-Z0-9_\-\s]+$/.test(name)) {
      return 'Project name can only contain letters, numbers, spaces, hyphens, and underscores';
    }
    
    if (state.projects.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      return 'A project with this name already exists';
    }
    
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    dispatch({ type: 'CREATE_PROJECT', payload: { name: name.trim() } });
    setName('');
    setError('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter a name for your new coding project. You can add files to it later.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="My Awesome Project"
                className={error ? 'border-red-500' : ''}
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
