
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Project, ProjectFile } from '../types/practice';

interface ProjectState {
  projects: Project[];
  activeProject: string | null;
  activeFile: string | null;
  aiEnabled: boolean;
}

interface ProjectContextType extends ProjectState {
  createProject: (name: string) => void;
  deleteProject: (id: string) => void;
  renameProject: (id: string, name: string) => void;
  createFile: (projectId: string, name: string, language: string) => void;
  deleteFile: (projectId: string, fileId: string) => void;
  renameFile: (projectId: string, fileId: string, name: string) => void;
  selectFile: (projectId: string, fileId: string) => void;
  updateFileContent: (projectId: string, fileId: string, content: string) => void;
  setActiveProject: (id: string | null) => void;
  toggleAI: () => void;
}

type ProjectAction = 
  | { type: 'CREATE_PROJECT'; payload: { name: string } }
  | { type: 'DELETE_PROJECT'; payload: { id: string } }
  | { type: 'RENAME_PROJECT'; payload: { id: string; name: string } }
  | { type: 'CREATE_FILE'; payload: { projectId: string; name: string; language: string } }
  | { type: 'DELETE_FILE'; payload: { projectId: string; fileId: string } }
  | { type: 'RENAME_FILE'; payload: { projectId: string; fileId: string; name: string } }
  | { type: 'SELECT_FILE'; payload: { projectId: string; fileId: string } }
  | { type: 'UPDATE_FILE_CONTENT'; payload: { projectId: string; fileId: string; content: string } }
  | { type: 'SET_ACTIVE_PROJECT'; payload: { id: string | null } }
  | { type: 'TOGGLE_AI' };

const initialState: ProjectState = {
  projects: [],
  activeProject: null,
  activeFile: null,
  aiEnabled: true,
};

const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      const newProject: Project = {
        id: Date.now().toString(),
        name: action.payload.name,
        files: [],
        expanded: true,
      };
      return {
        ...state,
        projects: [...state.projects, newProject],
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload.id),
        activeProject: state.activeProject === action.payload.id ? null : state.activeProject,
        activeFile: state.activeProject === action.payload.id ? null : state.activeFile,
      };

    case 'RENAME_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? { ...p, name: action.payload.name } : p
        ),
      };

    case 'CREATE_FILE':
      const newFile: ProjectFile = {
        id: Date.now().toString(),
        name: action.payload.name,
        language: action.payload.language,
        content: '',
        saved: false,
      };
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.projectId 
            ? { ...p, files: [...p.files, newFile] }
            : p
        ),
      };

    case 'DELETE_FILE':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.projectId 
            ? { ...p, files: p.files.filter(f => f.id !== action.payload.fileId) }
            : p
        ),
        activeFile: state.activeFile === action.payload.fileId ? null : state.activeFile,
      };

    case 'SELECT_FILE':
      return {
        ...state,
        activeProject: action.payload.projectId,
        activeFile: action.payload.fileId,
      };

    case 'UPDATE_FILE_CONTENT':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.projectId 
            ? { 
                ...p, 
                files: p.files.map(f => 
                  f.id === action.payload.fileId 
                    ? { ...f, content: action.payload.content, saved: false }
                    : f
                ) 
              }
            : p
        ),
      };

    case 'TOGGLE_AI':
      return {
        ...state,
        aiEnabled: !state.aiEnabled,
      };

    default:
      return state;
  }
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const createProject = (name: string) => {
    dispatch({ type: 'CREATE_PROJECT', payload: { name } });
  };

  const deleteProject = (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: { id } });
  };

  const renameProject = (id: string, name: string) => {
    dispatch({ type: 'RENAME_PROJECT', payload: { id, name } });
  };

  const createFile = (projectId: string, name: string, language: string) => {
    dispatch({ type: 'CREATE_FILE', payload: { projectId, name, language } });
  };

  const deleteFile = (projectId: string, fileId: string) => {
    dispatch({ type: 'DELETE_FILE', payload: { projectId, fileId } });
  };

  const renameFile = (projectId: string, fileId: string, name: string) => {
    dispatch({ type: 'RENAME_FILE', payload: { projectId, fileId, name } });
  };

  const selectFile = (projectId: string, fileId: string) => {
    dispatch({ type: 'SELECT_FILE', payload: { projectId, fileId } });
  };

  const updateFileContent = (projectId: string, fileId: string, content: string) => {
    dispatch({ type: 'UPDATE_FILE_CONTENT', payload: { projectId, fileId, content } });
  };

  const setActiveProject = (id: string | null) => {
    dispatch({ type: 'SET_ACTIVE_PROJECT', payload: { id } });
  };

  const toggleAI = () => {
    dispatch({ type: 'TOGGLE_AI' });
  };

  const value: ProjectContextType = {
    ...state,
    createProject,
    deleteProject,
    renameProject,
    createFile,
    deleteFile,
    renameFile,
    selectFile,
    updateFileContent,
    setActiveProject,
    toggleAI,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
