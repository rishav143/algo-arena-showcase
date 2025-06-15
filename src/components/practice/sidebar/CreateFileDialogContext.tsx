
import React, { createContext, useContext, useState, ReactNode } from "react";
import CreateFileDialog from "./CreateFileDialog";

interface CreateFileDialogContextValue {
  openDialog: (projectId: string) => void;
}

const CreateFileDialogContext = createContext<CreateFileDialogContextValue | undefined>(undefined);

export function useCreateFileDialog() {
  const ctx = useContext(CreateFileDialogContext);
  if (!ctx) {
    throw new Error("useCreateFileDialog must be wrapped in CreateFileDialogProvider");
  }
  return ctx;
}

export const CreateFileDialogProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  const openDialog = (pid: string) => {
    setProjectId(pid);
    setOpen(true);
  };

  const handleClose = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setTimeout(() => setProjectId(null), 200); // Wait for dialog to close
  };

  return (
    <CreateFileDialogContext.Provider value={{ openDialog }}>
      {children}
      <CreateFileDialog
        open={open}
        onOpenChange={handleClose}
        projectId={projectId || ""}
      />
    </CreateFileDialogContext.Provider>
  );
};
