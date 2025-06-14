
export interface ProjectFile {
  id: string;
  name: string;
  content: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  files: ProjectFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  selectedFile: ProjectFile | null;
  createProject: (name: string) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  renameProject: (projectId: string, newName: string) => Promise<void>;
  createFile: (projectId: string, fileName: string, language: string) => Promise<void>;
  deleteFile: (projectId: string, fileId: string) => Promise<void>;
  renameFile: (projectId: string, fileId: string, newName: string) => Promise<void>;
  selectFile: (projectId: string, fileId: string) => void;
  updateFileContent: (projectId: string, fileId: string, content: string) => void;
}
