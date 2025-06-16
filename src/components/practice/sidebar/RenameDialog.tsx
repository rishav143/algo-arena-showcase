import React, { useState, useEffect } from 'react';
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
import { EXT_TO_LANG } from '../workspace/languageMaps';

// Mapping between languages and extensions
const LANGUAGE_EXTENSIONS: Record<string, string[]> = {
  javascript: ['js', 'jsx'],
  typescript: ['ts', 'tsx'],
  python: ['py'],
  java: ['java'],
  cpp: ['cpp', 'cc', 'cxx'],
  c: ['c', 'h'],
  csharp: ['cs'],
  go: ['go'],
  rust: ['rs'],
};

interface RenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'project' | 'file';
  currentName: string;
  onRename: (name: string) => void;
  currentLanguage?: string;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
  open,
  onOpenChange,
  type,
  currentName,
  onRename,
  currentLanguage,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName(currentName);
      setError('');
    }
  }, [open, currentName]);

  const getExt = (fileName: string) => {
    const segs = fileName.split('.');
    if (segs.length <= 1) return '';
    return segs.pop()?.toLowerCase() || '';
  };

  const validateName = (name: string): string | null => {
    if (!name.trim()) {
      return `${type === 'project' ? 'Project' : 'File'} name is required`;
    }

    if (name.length < 2) {
      return `${type === 'project' ? 'Project' : 'File'} name must be at least 2 characters`;
    }

    if (type === 'project') {
      if (!/^[a-zA-Z0-9_\-\s]+$/.test(name)) {
        return 'Project name can only contain letters, numbers, spaces, hyphens, and underscores';
      }
    } else {
      if (!/^[a-zA-Z0-9_\-\.]+$/.test(name)) {
        return 'File name can only contain letters, numbers, hyphens, underscores, and dots';
      }
      
      // Validate extension matches current language
      if (currentLanguage) {
        const ext = getExt(name);
        if (!ext) {
          return 'File must have an extension';
        }
        
        // Check if extension is valid for any language
        const detectedLanguage = EXT_TO_LANG[ext];
        if (!detectedLanguage) {
          return `Invalid file extension: .${ext}`;
        }
        
        // Check if extension matches current language
        const validExts = LANGUAGE_EXTENSIONS[currentLanguage];
        if (!validExts || !validExts.includes(ext)) {
          return `File extension must match the current language (${currentLanguage}: ${validExts ? validExts.join(', ') : 'unknown'})`;
        }
      }
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

    onRename(name.trim());
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName(currentName);
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename {type === 'project' ? 'Project' : 'File'}</DialogTitle>
            <DialogDescription>
              Enter a new name for your {type}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className={error ? 'border-red-500' : ''}
                autoFocus
                onFocus={(e) => e.target.select()}
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
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
