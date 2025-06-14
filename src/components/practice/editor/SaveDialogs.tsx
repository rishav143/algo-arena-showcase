
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface SaveDialogsProps {
  showUnsavedDialog: boolean;
  onUnsavedDialogChange: (open: boolean) => void;
  onUnsavedDialogAction: (action: 'discard') => void;
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
            You have unsaved changes. Do you want to discard them?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onUnsavedDialogChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onUnsavedDialogAction('discard')}>
            Discard Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
