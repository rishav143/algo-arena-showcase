
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface SaveDialogsProps {
  showUnsavedDialog: boolean;
  onUnsavedDialogChange: (open: boolean) => void;
  onUnsavedDialogAction: (action: 'save' | 'discard') => void;
}

export const SaveDialogs: React.FC<SaveDialogsProps> = ({
  showUnsavedDialog,
  onUnsavedDialogChange,
  onUnsavedDialogAction,
}) => {
  return (
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
  );
};
