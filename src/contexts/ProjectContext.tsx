import React, { createContext, useContext, useState, useCallback } from 'react';
import { Project, ProjectFile, ProjectContextType } from '@/types/project';
import { useToast } from '@/hooks/use-toast';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);

  const createProject = useCallback(async (name: string) => {
    const newProject: Project = {
      id: `project_${Date.now()}`,
      name,
      files: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects(prev => [...prev, newProject]);
    toast({
      title: "Project Created",
      description: `${name} has been created successfully.`,
    });
  }, [toast]);

  const deleteProject = useCallback(async (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
      setSelectedFile(null);
    }

    toast({
      title: "Project Deleted",
      description: "Project has been deleted successfully.",
    });
  }, [selectedProject, toast]);

  const renameProject = useCallback(async (projectId: string, newName: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, name: newName, updatedAt: new Date() }
        : project
    ));

    if (selectedProject?.id === projectId) {
      setSelectedProject(prev => prev ? { ...prev, name: newName } : null);
    }

    toast({
      title: "Project Renamed",
      description: `Project renamed to ${newName}`,
    });
  }, [selectedProject, toast]);

  const createFile = useCallback(async (projectId: string, fileName: string, language: string, content?: string) => {
    const newFile: ProjectFile = {
      id: `file_${Date.now()}`,
      name: fileName,
      content: content || getDefaultContent(language),
      language,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            files: [...project.files, newFile],
            updatedAt: new Date()
          }
        : project
    ));

    // Auto-select the newly created file
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject({ ...project, files: [...project.files, newFile] });
      setSelectedFile(newFile);
    }

    toast({
      title: "File Created",
      description: `${fileName} has been created successfully.`,
    });
  }, [projects, toast]);

  const deleteFile = useCallback(async (projectId: string, fileId: string) => {
    // Check if we're deleting the currently selected file
    const isDeletingSelectedFile = selectedFile?.id === fileId;
    
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            files: project.files.filter(file => file.id !== fileId),
            updatedAt: new Date()
          }
        : project
    ));

    // If we deleted the selected file, clear the selection
    if (isDeletingSelectedFile) {
      setSelectedFile(null);
      // Optionally also clear selected project if no files remain
      const project = projects.find(p => p.id === projectId);
      if (project && project.files.length === 1) { // Will be 0 after deletion
        setSelectedProject(null);
      }
    }

    toast({
      title: "File Deleted",
      description: "File has been deleted successfully.",
    });
  }, [selectedFile, projects, toast]);

  const renameFile = useCallback(async (projectId: string, fileId: string, newName: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            files: project.files.map(file => 
              file.id === fileId 
                ? { ...file, name: newName, updatedAt: new Date() }
                : file
            ),
            updatedAt: new Date()
          }
        : project
    ));

    if (selectedFile?.id === fileId) {
      setSelectedFile(prev => prev ? { ...prev, name: newName } : null);
    }

    toast({
      title: "File Renamed",
      description: `File renamed to ${newName}`,
    });
  }, [selectedFile, toast]);

  const selectFile = useCallback((projectId: string, fileId: string) => {
    const project = projects.find(p => p.id === projectId);
    const file = project?.files.find(f => f.id === fileId);
    
    if (project && file) {
      setSelectedProject(project);
      setSelectedFile(file);
    }
  }, [projects]);

  const updateFileContent = useCallback((projectId: string, fileId: string, content: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            files: project.files.map(file => 
              file.id === fileId 
                ? { ...file, content, updatedAt: new Date() }
                : file
            ),
            updatedAt: new Date()
          }
        : project
    ));

    if (selectedFile?.id === fileId) {
      setSelectedFile(prev => prev ? { ...prev, content } : null);
    }
  }, [selectedFile]);

  const value: ProjectContextType = {
    projects,
    selectedProject,
    selectedFile,
    createProject,
    deleteProject,
    renameProject,
    createFile,
    deleteFile,
    renameFile,
    selectFile,
    updateFileContent,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

const getDefaultContent = (language: string): string => {
  const templates: Record<string, string> = {
    javascript: '// New JavaScript file\nconsole.log("Hello, World!");',
    typescript: '// New TypeScript file\nconsole.log("Hello, World!");',
    python: '# New Python file\nprint("Hello, World!")',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    rust: 'fn main() {\n    println!("Hello, World!");\n}',
  };
  
  return templates[language] || '// New file\n';
};
