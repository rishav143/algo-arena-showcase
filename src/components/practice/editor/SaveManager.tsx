
import React, { useState } from 'react';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { CreateProjectDialog } from './CreateProjectDialog';
import { SaveFileDialog } from './SaveFileDialog';
import { getFileExtension } from '@/utils/editorStateManager';

interface SaveManagerProps {
  content: string;
  language: string;
  onSaveSuccess: () => void;
}

export const SaveManager: React.FC<SaveManagerProps> = ({
  content,
  language,
  onSaveSuccess
}) => {
  const { projects, createProject, createFile } = useProjectContext();
  const { toast } = useToast();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showSaveFile, setShowSaveFile] = useState(false);

  const handleSave = () => {
    if (projects.length === 0) {
      setShowCreateProject(true);
    } else {
      setShowSaveFile(true);
    }
  };

  const handleProjectCreated = async (projectName: string) => {
    await createProject(projectName);
    setShowCreateProject(false);
    setShowSaveFile(true);
  };

  const handleFileSaved = async (projectId: string, fileName: string) => {
    const extension = getFileExtension(language);
    const finalFileName = fileName.includes('.') ? fileName : `${fileName}.${extension}`;
    
    await createFile(projectId, finalFileName, language, content);
    onSaveSuccess();
    setShowSaveFile(false);
    
    toast({
      title: "File Saved",
      description: `${finalFileName} has been saved successfully.`,
    });
  };

  return (
    <>
      <button onClick={handleSave} className="save-trigger" style={{ display: 'none' }} />
      
      <CreateProjectDialog
        open={showCreateProject}
        onOpenChange={setShowCreateProject}
        onProjectCreated={handleProjectCreated}
      />
      
      <SaveFileDialog
        open={showSaveFile}
        onOpenChange={setShowSaveFile}
        onFileSaved={handleFileSaved}
        language={language}
      />
    </>
  );
};
