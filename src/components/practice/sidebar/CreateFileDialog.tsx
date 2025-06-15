
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useProject } from '../../../contexts/ProjectContext';
import { SUPPORTED_LANGUAGES } from '../../../types/practice';

interface CreateFileDialogProps {
  open: boolean;
  projectId: string;
  onClose: () => void;
}

const CreateFileDialog: React.FC<CreateFileDialogProps> = ({ open, projectId, onClose }) => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('java');
  const { createFile } = useProject();

  const validateFileName = (fileName: string, lang: string) => {
    const extensions = SUPPORTED_LANGUAGES[lang as keyof typeof SUPPORTED_LANGUAGES];
    return extensions.some(ext => fileName.endsWith(ext));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && validateFileName(name, language)) {
      createFile(projectId, name.trim(), language);
      setName('');
      setLanguage('java');
      onClose();
    }
  };

  const isValid = name.trim() && validateFileName(name, language);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(SUPPORTED_LANGUAGES).map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              placeholder={`File name (e.g., Solution${SUPPORTED_LANGUAGES[language as keyof typeof SUPPORTED_LANGUAGES][0]})`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            {name && !validateFileName(name, language) && (
              <p className="text-sm text-red-600 mt-1">
                File must end with: {SUPPORTED_LANGUAGES[language as keyof typeof SUPPORTED_LANGUAGES].join(', ')}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFileDialog;
