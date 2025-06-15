
import React, { createContext, useContext, useState, ReactNode } from "react";
import CreateFileDialog from "./CreateFileDialog";

interface CreateFileDialogContextValue {
  openDialog: (projectId: string) => void;
}

const CreateFileDialogContext =
  createContext<CreateFileDialogContextValue | undefined>(undefined);

export function useCreateFileDialog() {
  const ctx = useContext(CreateFileDialogContext);
  if (!ctx) {
    throw new Error("useCreateFileDialog must be wrapped in CreateFileDialogProvider");
  }
  return ctx;
}

export const CreateFileDialogProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  const openDialog = (pid: string) => {
    setProjectId(pid);
    setOpen(true);
  };

  // Only reset projectId after dialog fully closed, to avoid orphan overlays.
  const handleClose = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      // NOTE: Wait for animation to finish, then reset project id & dialog
      setTimeout(() => setProjectId(null), 200);
    }
  };

  return (
    <CreateFileDialogContext.Provider value={{ openDialog }}>
      {children}
      {/* Unconditionally rendered at top – never inside a part of the layout that can disappear */}
      <CreateFileDialog
        open={open}
        onOpenChange={handleClose}
        projectId={projectId || ""}
      />
    </CreateFileDialogContext.Provider>
  );
};
