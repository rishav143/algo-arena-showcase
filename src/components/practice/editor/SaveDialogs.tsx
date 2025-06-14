
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project } from '@/types/project';

interface SaveDialogsProps {
  showUnsavedDialog: boolean;
  showSaveDialog: boolean;
  saveFileName: string;
  saveProjectId: string;
  projects: Project[];
  onUnsavedDialogChange: (open: boolean) => void;
  onSaveDialogChange: (open: boolean) => void;
  onSaveFileNameChange: (name: string) => void;
  onSaveProjectIdChange: (id: string) => void;
  onUnsavedDialogAction: (action: 'save' | 'discard') => void;
  onSaveAsNewFile: () => void;
}

export const SaveDialogs: React.FC<SaveDialogsProps> = ({
  showUnsavedDialog,
  showSaveDialog,
  saveFileName,
  saveProjectId,
  projects,
  onUnsavedDialogChange,
  onSaveDialogChange,
  onSaveFileNameChange,
  onSaveProjectIdChange,
  onUnsavedDialogAction,
  onSaveAsNewFile,
}) => {
  return (
    <>
      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={onUnsavedDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. What would you like to do?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onUnsavedDialogAction('discard')}>
              Discard Changes
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => onUnsavedDialogAction('save')}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={onSaveDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Project</label>
              <Select value={saveProjectId} onValueChange={onSaveProjectIdChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">File Name</label>
              <Input
                value={saveFileName}
                onChange={(e) => onSaveFileNameChange(e.target.value)}
                placeholder="Enter file name"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => onSaveDialogChange(false)}>
                Cancel
              </Button>
              <Button onClick={onSaveAsNewFile}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
