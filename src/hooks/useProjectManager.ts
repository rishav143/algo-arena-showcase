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
    return new Promise<void>((resolve, reject) => {
      try {
        const newFile: File = {
          id: `${Date.now()}-${Math.random()}`,
          name: fileName,
          content: '// New file\n',
          language: 'javascript'
        };

        setProjects(prev => {
          const updated = prev.map(project => 
            project.id === projectId 
              ? { ...project, files: [...project.files, newFile], updatedAt: new Date() }
              : project
          );
          return updated;
        });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setProjects(prev => prev.filter(project => project.id !== projectId));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const renameFile = useCallback((fileId: string, newName: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setProjects(prev => prev.map(project => ({
          ...project,
          files: project.files.map(file => 
            file.id === fileId 
              ? { ...file, name: newName }
              : file
          ),
          updatedAt: new Date()
        })));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  return {
    projects,
    createProject,
    createFile,
    deleteProject,
    renameFile,
  };
};
