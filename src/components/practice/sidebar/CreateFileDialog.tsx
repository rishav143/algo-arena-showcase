
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePractice } from '@/contexts/PracticeContext';

interface CreateFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', extension: '.js' },
  { value: 'typescript', label: 'TypeScript', extension: '.ts' },
  { value: 'python', label: 'Python', extension: '.py' },
  { value: 'java', label: 'Java', extension: '.java' },
  { value: 'cpp', label: 'C++', extension: '.cpp' },
  { value: 'c', label: 'C', extension: '.c' },
  { value: 'csharp', label: 'C#', extension: '.cs' },
  { value: 'go', label: 'Go', extension: '.go' },
  { value: 'rust', label: 'Rust', extension: '.rs' },
];

const CreateFileDialog: React.FC<CreateFileDialogProps> = ({ open, onOpenChange, projectId }) => {
  const { state, dispatch } = usePractice();
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [error, setError] = useState('');

  const project = state.projects.find(p => p.id === projectId);

  // Effect to reset state when dialog is closed
  useEffect(() => {
    if (!open) {
      setName('');
      setLanguage('javascript');
      setError('');
    }
  }, [open]);

  const validateFileName = (name: string, language: string): string | null => {
    if (!name.trim()) {
      return 'File name is required';
    }

    const selectedLang = SUPPORTED_LANGUAGES.find(l => l.value === language);
    if (!selectedLang) {
      return 'Please select a valid language';
    }

    // Add extension if not present
    const fullName = name.endsWith(selectedLang.extension) ? name : name + selectedLang.extension;

    if (!/^[a-zA-Z0-9_\-\.]+$/.test(fullName)) {
      return 'File name can only contain letters, numbers, hyphens, underscores, and dots';
    }

    if (project?.files.some(f => f.name.toLowerCase() === fullName.toLowerCase())) {
      return 'A file with this name already exists in the project';
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateFileName(name, language);
    if (validationError) {
      setError(validationError);
      return;
    }

    const selectedLang = SUPPORTED_LANGUAGES.find(l => l.value === language)!;
    const fullName = name.endsWith(selectedLang.extension) ? name : name + selectedLang.extension;

    dispatch({
      type: 'CREATE_FILE',
      payload: {
        projectId,
        name: fullName,
        language
      }
    });

    console.log("CREATE_FILE submitted", { projectId, fullName, language });

    // IMPORTANT: Do NOT reset state here before closing. Just close dialog.
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Don't reset fields here, will be handled by effect
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white" style={{ zIndex: 1000 }}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Add a new file to your project. The file extension will be added automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file-name">File Name</Label>
              <Input
                id="file-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="main"
                className={error ? 'border-red-500' : ''}
                autoFocus
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200" style={{ zIndex: 1010 }}>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label} ({lang.extension})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Create File
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFileDialog;

