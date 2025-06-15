
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePractice } from '../../../contexts/PracticeContext';

interface CreateFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

const languageExtensions = {
  javascript: 'js',
  typescript: 'ts',
  python: 'py',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  csharp: 'cs',
  ruby: 'rb',
  go: 'go',
  rust: 'rs',
};

const CreateFileDialog: React.FC<CreateFileDialogProps> = ({ open, onOpenChange, projectId }) => {
  const { state, dispatch } = usePractice();
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [error, setError] = useState('');

  const project = state.projects.find(p => p.id === projectId);

  const validateFileName = (name: string): string | null => {
    if (!name.trim()) return 'File name cannot be empty';
    
    const validExtensions = Object.values(languageExtensions);
    const ext = name.split('.').pop()?.toLowerCase();
    
    if (!ext || !validExtensions.includes(ext)) {
      return 'Invalid file extension';
    }
    
    if (project?.files.some(f => f.name.toLowerCase() === name.toLowerCase())) {
      return 'File name already exists in this project';
    }
    
    return null;
  };

  const generateFileName = (lang: string): string => {
    const ext = languageExtensions[lang as keyof typeof languageExtensions];
    const baseName = `main.${ext}`;
    
    if (!project?.files.some(f => f.name === baseName)) {
      return baseName;
    }
    
    let counter = 1;
    let newName = `main${counter}.${ext}`;
    while (project?.files.some(f => f.name === newName)) {
      counter++;
      newName = `main${counter}.${ext}`;
    }
    return newName;
  };

  React.useEffect(() => {
    if (open) {
      const suggestedName = generateFileName(language);
      setFileName(suggestedName);
    }
  }, [open, language, project]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    const ext = languageExtensions[newLanguage as keyof typeof languageExtensions];
    const nameWithoutExt = fileName.split('.').slice(0, -1).join('.');
    if (nameWithoutExt) {
      setFileName(`${nameWithoutExt}.${ext}`);
    } else {
      setFileName(generateFileName(newLanguage));
    }
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateFileName(fileName);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch({ 
      type: 'CREATE_FILE', 
      payload: { 
        projectId, 
        name: fileName.trim(), 
        language 
      } 
    });
    
    setFileName('');
    setLanguage('javascript');
    setError('');
    onOpenChange(false);
  };

  const handleClose = () => {
    setFileName('');
    setLanguage('javascript');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-name">File Name</Label>
            <Input
              id="file-name"
              type="text"
              placeholder="Enter file name..."
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
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
            <Button type="submit" disabled={!fileName.trim()}>
              Create File
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFileDialog;
