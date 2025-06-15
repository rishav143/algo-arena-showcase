
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFileExtension } from '@/utils/editorStateManager';

interface CreateFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFile: (fileName: string, language: string) => void;
}

export const CreateFileDialog: React.FC<CreateFileDialogProps> = ({
  open,
  onOpenChange,
  onCreateFile
}) => {
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [error, setError] = useState('');

  const validateFileName = (name: string): string | null => {
    if (!name.trim()) {
      return 'File name is required';
    }
    if (name.trim().length < 1) {
      return 'File name cannot be empty';
    }
    return null;
  };

  const handleCreate = () => {
    const validationError = validateFileName(fileName);
    if (validationError) {
      setError(validationError);
      return;
    }

    const extension = getFileExtension(language);
    const finalFileName = fileName.includes('.') ? fileName : `${fileName}.${extension}`;
    
    onCreateFile(finalFileName, language);
    setFileName('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">File Name</label>
            <Input
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Create File
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
