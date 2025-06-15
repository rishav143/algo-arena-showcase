
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePractice } from '@/contexts/PracticeContext';
import { Plus, X } from 'lucide-react';

interface CreateMultipleFilesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

interface FileInput {
  id: string;
  name: string;
  language: string;
  content: string;
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

const CreateMultipleFilesDialog: React.FC<CreateMultipleFilesDialogProps> = ({ 
  open, 
  onOpenChange, 
  projectId 
}) => {
  const { state, dispatch } = usePractice();
  const [files, setFiles] = useState<FileInput[]>([
    { id: '1', name: '', language: 'javascript', content: '' }
  ]);
  const [error, setError] = useState('');

  const project = state.projects.find(p => p.id === projectId);

  const addFileInput = () => {
    const newFile: FileInput = {
      id: Date.now().toString(),
      name: '',
      language: 'javascript',
      content: ''
    };
    setFiles([...files, newFile]);
  };

  const removeFileInput = (id: string) => {
    if (files.length > 1) {
      setFiles(files.filter(file => file.id !== id));
    }
  };

  const updateFile = (id: string, field: keyof FileInput, value: string) => {
    setFiles(files.map(file => 
      file.id === id ? { ...file, [field]: value } : file
    ));
    setError('');
  };

  const validateFiles = (): string | null => {
    const existingFileNames = new Set(project?.files.map(f => f.name.toLowerCase()) || []);
    const newFileNames = new Set<string>();

    for (const file of files) {
      if (!file.name.trim()) {
        return 'All files must have a name';
      }

      const selectedLang = SUPPORTED_LANGUAGES.find(l => l.value === file.language);
      if (!selectedLang) {
        return 'Please select a valid language for all files';
      }

      const fullName = file.name.endsWith(selectedLang.extension) 
        ? file.name 
        : file.name + selectedLang.extension;

      if (!/^[a-zA-Z0-9_\-\.]+$/.test(fullName)) {
        return 'File names can only contain letters, numbers, hyphens, underscores, and dots';
      }

      if (existingFileNames.has(fullName.toLowerCase())) {
        return `A file named "${fullName}" already exists in the project`;
      }

      if (newFileNames.has(fullName.toLowerCase())) {
        return `Duplicate file name: "${fullName}"`;
      }

      newFileNames.add(fullName.toLowerCase());
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateFiles();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Set creating files state to show loading
    dispatch({ type: 'SET_CREATING_FILES', payload: { isCreating: true } });

    // Prepare files for creation
    const filesToCreate = files.map(file => {
      const selectedLang = SUPPORTED_LANGUAGES.find(l => l.value === file.language)!;
      const fullName = file.name.endsWith(selectedLang.extension) 
        ? file.name 
        : file.name + selectedLang.extension;

      return {
        name: fullName,
        language: file.language,
        content: file.content
      };
    });

    // Use setTimeout to prevent UI freeze during batch creation
    setTimeout(() => {
      dispatch({ 
        type: 'CREATE_MULTIPLE_FILES', 
        payload: { 
          projectId, 
          files: filesToCreate
        } 
      });
    }, 10);
    
    // Reset form
    setFiles([{ id: '1', name: '', language: 'javascript', content: '' }]);
    setError('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFiles([{ id: '1', name: '', language: 'javascript', content: '' }]);
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Multiple Files</DialogTitle>
            <DialogDescription>
              Add multiple files to your project at once. File extensions will be added automatically.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {files.map((file, index) => (
              <div key={file.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">File {index + 1}</Label>
                  {files.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFileInput(file.id)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`file-name-${file.id}`} className="text-xs">File Name</Label>
                    <Input
                      id={`file-name-${file.id}`}
                      value={file.name}
                      onChange={(e) => updateFile(file.id, 'name', e.target.value)}
                      placeholder="main"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`language-${file.id}`} className="text-xs">Language</Label>
                    <Select 
                      value={file.language} 
                      onValueChange={(value) => updateFile(file.id, 'language', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label} ({lang.extension})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`content-${file.id}`} className="text-xs">Initial Content (Optional)</Label>
                  <Textarea
                    id={`content-${file.id}`}
                    value={file.content}
                    onChange={(e) => updateFile(file.id, 'content', e.target.value)}
                    placeholder="// Initial code content..."
                    className="mt-1 min-h-[80px] font-mono text-sm"
                  />
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addFileInput}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another File
            </Button>
            
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={state.isCreatingFiles}
            >
              {state.isCreatingFiles ? 'Creating Files...' : `Create ${files.length} File${files.length > 1 ? 's' : ''}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMultipleFilesDialog;
