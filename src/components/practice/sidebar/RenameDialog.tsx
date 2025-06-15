
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { SUPPORTED_LANGUAGES } from '../../../types/practice';

interface RenameDialogProps {
  open: boolean;
  title: string;
  currentName: string;
  onRename: (newName: string) => void;
  onClose: () => void;
  validateExtension?: boolean;
}

const RenameDialog: React.FC<RenameDialogProps> = ({ 
  open, 
  title, 
  currentName, 
  onRename, 
  onClose,
  validateExtension = false 
}) => {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setName(currentName);
  }, [currentName, open]);

  const validateFileName = (fileName: string) => {
    if (!validateExtension) return true;
    
    return Object.values(SUPPORTED_LANGUAGES).some(extensions =>
      extensions.some(ext => fileName.endsWith(ext))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && name !== currentName) {
      if (!validateExtension || validateFileName(name)) {
        onRename(name.trim());
        onClose();
      }
    }
  };

  const isValid = name.trim() && (!validateExtension || validateFileName(name));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              onFocus={(e) => e.target.select()}
            />
            {validateExtension && name && !validateFileName(name) && (
              <p className="text-sm text-red-600 mt-1">
                File must have a valid extension: {Object.values(SUPPORTED_LANGUAGES).flat().join(', ')}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || name === currentName}>
              Rename
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
