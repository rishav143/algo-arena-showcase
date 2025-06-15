
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  currentName: string;
  onRename: (newName: string) => void;
  validateName: (name: string) => string | null;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
  open,
  onOpenChange,
  title,
  currentName,
  onRename,
  validateName,
}) => {
  const [newName, setNewName] = useState(currentName);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (open) {
      setNewName(currentName);
      setError('');
    }
  }, [open, currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateName(newName);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    onRename(newName.trim());
    onOpenChange(false);
  };

  const handleClose = () => {
    setNewName(currentName);
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-name">New Name</Label>
            <Input
              id="new-name"
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setError('');
              }}
              className={error ? 'border-red-500' : ''}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!newName.trim() || newName === currentName}>
              Rename
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
