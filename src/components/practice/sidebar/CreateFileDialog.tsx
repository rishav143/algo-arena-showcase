
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { validateFileExtension, getLanguageFromExtension, SUPPORTED_LANGUAGES } from '@/utils/fileValidation';

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
  const [language, setLanguage] = useState('java');
  const [error, setError] = useState('');

  const handleFileNameChange = (name: string) => {
    setFileName(name);
    setError('');
    
    // Auto-detect language from extension
    if (name.includes('.')) {
      const detectedLanguage = getLanguageFromExtension(name);
      setLanguage(detectedLanguage);
    }
  };

  const handleCreate = () => {
    if (!fileName.trim()) {
      setError('File name is required');
      return;
    }

    const validationError = validateFileExtension(fileName);
    if (validationError) {
      setError(validationError);
      return;
    }

    onCreateFile(fileName, language);
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
              placeholder="Enter file name (e.g., Main.java)"
              value={fileName}
              onChange={(e) => handleFileNameChange(e.target.value)}
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
                {Object.entries(SUPPORTED_LANGUAGES).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.name} (.{config.extensions.join(', .')})
                  </SelectItem>
                ))}
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
