
import { useState, useCallback } from 'react';
import { Project, File } from '@/types/practice';
import { useToast } from '@/hooks/use-toast';

export const useProjectManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'My First Project',
      files: [
        {
          id: '1-1',
          name: 'main.js',
          content: '// Welcome to CodeRoom!\nconsole.log("Hello, World!");',
          language: 'javascript'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const createProject = useCallback((name?: string) => {
    const projectName = name || `Project ${projects.length + 1}`;
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
      files: [
        {
          id: `${Date.now()}-1`,
          name: 'main.js',
          content: '// New project file\n',
          language: 'javascript'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setProjects(prev => [...prev, newProject]);
    
    toast({
      title: "Project Created",
      description: `${newProject.name} has been created successfully.`,
    });
  }, [projects.length, toast]);

  const createFile = useCallback((projectId: string, fileName: string) => {
    const newFile: File = {
      id: `${Date.now()}-${Math.random()}`,
      name: fileName,
      content: '// New file\n',
      language: 'javascript'
    };

    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, files: [...project.files, newFile], updatedAt: new Date() }
        : project
    ));

    toast({
      title: "File Created",
      description: `${fileName} has been added to the project.`,
    });
  }, [toast]);

  const deleteProject = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    
    toast({
      title: "Project Deleted",
      description: "Project and all its files have been removed successfully.",
    });
  }, [toast]);

  const renameFile = useCallback((fileId: string, newName: string) => {
    setProjects(prev => prev.map(project => ({
      ...project,
      files: project.files.map(file => 
        file.id === fileId 
          ? { ...file, name: newName }
          : file
      ),
      updatedAt: new Date()
    })));

    toast({
      title: "File Renamed",
      description: `File has been renamed to ${newName}.`,
    });
  }, [toast]);

  const updateFileContent = useCallback((fileId: string, content: string) => {
    setProjects(prev => prev.map(project => ({
      ...project,
      files: project.files.map(file => 
        file.id === fileId 
          ? { ...file, content }
          : file
      ),
      updatedAt: new Date()
    })));
  }, []);

  const getFileById = useCallback((fileId: string): File | null => {
    for (const project of projects) {
      const file = project.files.find(f => f.id === fileId);
      if (file) return file;
    }
    return null;
  }, [projects]);

  return {
    projects,
    createProject,
    createFile,
    deleteProject,
    renameFile,
    updateFileContent,
    getFileById,
  };
};
