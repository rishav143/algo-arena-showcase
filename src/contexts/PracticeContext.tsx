import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';
import { getLanguageTemplate } from '@/services/compilerService';

export interface Project {
  id: string;
  name: string;
  files: CodeFile[];
  createdAt: Date;
}

export interface CodeFile {
  id: string;
  name: string;
  content: string;
  language: string;
  isUnsaved: boolean;
  lastSaved?: Date;
}

interface PracticeState {
  projects: Project[];
  activeProject: Project | null;
  activeFile: CodeFile | null;
  aiAssistantEnabled: boolean;
  activeTab: 'code' | 'output' | 'ai' | 'video';
  rightTab: 'output' | 'ai' | 'video';
  output: string;
  isRunning: boolean;
  searchQuery: string;
  videoUrl: string | null;
  searchResults: Array<{ id: string; title: string; url: string; thumbnail: string; }>;
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>;
  isAiTyping: boolean;
}

type PracticeAction =
  | { type: 'CREATE_PROJECT'; payload: { name: string } }
  | { type: 'DELETE_PROJECT'; payload: { id: string } }
  | { type: 'RENAME_PROJECT'; payload: { id: string; name: string } }
  | { type: 'SET_ACTIVE_PROJECT'; payload: { project: Project | null } }
  | { type: 'UPDATE_PROJECTS'; payload: { projects: Project[] } }
  | { type: 'CREATE_FILE'; payload: { projectId: string; name: string; language: string } }
  | { type: 'DELETE_FILE'; payload: { projectId: string; fileId: string } }
  | { type: 'RENAME_FILE'; payload: { projectId: string; fileId: string; name: string } }
  | { type: 'SET_ACTIVE_FILE'; payload: { file: CodeFile | null } }
  | { type: 'UPDATE_FILE_CONTENT'; payload: { content: string } }
  | { type: 'SAVE_FILE' }
  | { type: 'TOGGLE_AI_ASSISTANT' }
  | { type: 'SET_ACTIVE_TAB'; payload: { tab: 'code' | 'output' | 'ai' | 'video' } }
  | { type: 'SET_RIGHT_TAB'; payload: { tab: 'output' | 'ai' | 'video' } }
  | { type: 'SET_OUTPUT'; payload: { output: string } }
  | { type: 'SET_RUNNING'; payload: { isRunning: boolean } }
  | { type: 'SET_SEARCH_QUERY'; payload: { query: string } }
  | { type: 'SET_VIDEO_URL'; payload: { url: string | null } }
  | { type: 'SET_SEARCH_RESULTS'; payload: { results: Array<{ id: string; title: string; url: string; thumbnail: string; }> } }
  | { type: 'ADD_CHAT_MESSAGE'; payload: { role: 'user' | 'assistant'; content: string } }
  | { type: 'SET_AI_TYPING'; payload: { isTyping: boolean } }
  | { type: 'INITIALIZE_DEFAULT_PROJECT' };

// Create default project with main.java file
const createDefaultProject = (): Project => {
  const defaultFile: CodeFile = {
    id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: 'main.java',
    content: getLanguageTemplate('java'),
    language: 'java',
    isUnsaved: false,
  };

  return {
    id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: 'My First Project',
    files: [defaultFile],
    createdAt: new Date(),
  };
};

const initialState: PracticeState = {
  projects: [],
  activeProject: null,
  activeFile: null,
  aiAssistantEnabled: true,
  activeTab: 'code',
  rightTab: 'output',
  output: '',
  isRunning: false,
  searchQuery: '',
  videoUrl: null,
  searchResults: [],
  chatHistory: [],
  isAiTyping: false,
};

const practiceReducer = (state: PracticeState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case 'INITIALIZE_DEFAULT_PROJECT': {
      if (state.projects.length > 0) return state;
      
      const defaultProject = createDefaultProject();
      return {
        ...state,
        projects: [defaultProject],
        activeProject: defaultProject,
        activeFile: defaultProject.files[0],
      };
    }

    case 'CREATE_PROJECT': {
      const newProject: Project = {
        id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: action.payload.name,
        files: [],
        createdAt: new Date(),
      };
      return {
        ...state,
        projects: [...state.projects, newProject],
        activeProject: newProject,
      };
    }
    
    case 'DELETE_PROJECT': {
      const updatedProjects = state.projects.filter(p => p.id !== action.payload.id);
      const wasActive = state.activeProject?.id === action.payload.id;
      return {
        ...state,
        projects: updatedProjects,
        activeProject: wasActive ? null : state.activeProject,
        activeFile: wasActive ? null : state.activeFile,
      };
    }
    
    case 'RENAME_PROJECT': {
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? { ...p, name: action.payload.name } : p
        ),
        activeProject: state.activeProject?.id === action.payload.id
          ? { ...state.activeProject, name: action.payload.name }
          : state.activeProject,
      };
    }
    
    case 'SET_ACTIVE_PROJECT':
      return {
        ...state,
        activeProject: action.payload.project,
        activeFile: null,
      };
    
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        projects: action.payload.projects,
      };
    
    case 'CREATE_FILE': {
      const newFile: CodeFile = {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: action.payload.name,
        content: getLanguageTemplate(action.payload.language),
        language: action.payload.language,
        isUnsaved: false,
      };

      // Only update the files for the matching project
      const updatedProjects = state.projects.map(p => {
        if (p.id === action.payload.projectId) {
          const updatedFiles = [...p.files, newFile];
          return { ...p, files: updatedFiles };
        }
        return p;
      });

      // Set updatedActiveProject to the actual object from the updatedProjects array (maintain referential integrity)
      const updatedActiveProject =
        updatedProjects.find(p => p.id === action.payload.projectId) || state.activeProject;

      return {
        ...state,
        projects: updatedProjects,
        activeProject: updatedActiveProject,
        activeFile: newFile,
      };
    }
    
    case 'DELETE_FILE': {
      const wasActiveFile = state.activeFile?.id === action.payload.fileId;
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId
            ? { ...p, files: p.files.filter(f => f.id !== action.payload.fileId) }
            : p
        ),
        activeProject: state.activeProject?.id === action.payload.projectId
          ? { ...state.activeProject, files: state.activeProject.files.filter(f => f.id !== action.payload.fileId) }
          : state.activeProject,
        activeFile: wasActiveFile ? null : state.activeFile,
      };
    }
    
    case 'RENAME_FILE': {
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId
            ? {
                ...p,
                files: p.files.map(f =>
                  f.id === action.payload.fileId ? { ...f, name: action.payload.name } : f
                ),
              }
            : p
        ),
        activeProject: state.activeProject?.id === action.payload.projectId
          ? {
              ...state.activeProject,
              files: state.activeProject.files.map(f =>
                f.id === action.payload.fileId ? { ...f, name: action.payload.name } : f
              ),
            }
          : state.activeProject,
        activeFile: state.activeFile?.id === action.payload.fileId
          ? { ...state.activeFile, name: action.payload.name }
          : state.activeFile,
      };
    }
    
    case 'SET_ACTIVE_FILE':
      return {
        ...state,
        activeFile: action.payload.file,
        activeTab: action.payload.file ? 'code' : state.activeTab,
      };
    
    case 'UPDATE_FILE_CONTENT': {
      // Only flag isUnsaved=true if the content actually changed! (prevents flashing)
      if (
        !state.activeFile ||
        !state.activeProject ||
        state.activeFile.content === action.payload.content
      )
        return state;

      const updatedFile: CodeFile = {
        ...state.activeFile,
        content: action.payload.content,
        isUnsaved: true,
      };

      // ... keep rest of the logic (updating project/files) the same ...
      const updatedProjectFiles = state.activeProject.files.map(f =>
        f.id === updatedFile.id ? updatedFile : f
      );
      const updatedProjects = state.projects.map(p =>
        p.id === state.activeProject?.id
          ? { ...p, files: updatedProjectFiles }
          : p
      );
      const updatedActiveProject =
        updatedProjects.find(p => p.id === state.activeProject?.id) || state.activeProject;

      return {
        ...state,
        activeFile: updatedFile,
        activeProject: updatedActiveProject,
        projects: updatedProjects,
      };
    }
    
    case 'SAVE_FILE': {
      if (!state.activeFile || !state.activeProject) return state;

      // Only clear isUnsaved if it was actually unsaved before!
      if (!state.activeFile.isUnsaved) return state;

      const savedFile = {
        ...state.activeFile,
        isUnsaved: false,
        lastSaved: new Date(),
      };

      const savedProjectFiles = state.activeProject.files.map(f =>
        f.id === savedFile.id ? savedFile : f
      );
      const savedProjects = state.projects.map(p =>
        p.id === state.activeProject?.id
          ? { ...p, files: savedProjectFiles }
          : p
      );
      const savedActiveProject =
        savedProjects.find(p => p.id === state.activeProject?.id) || state.activeProject;

      // Add a console.log for clarity on manual saves (in addition to autosave logs)
      console.log('[ManualSave] File manually saved:', savedFile.name, 'Length:', savedFile.content.length);

      return {
        ...state,
        activeFile: savedFile,
        activeProject: savedActiveProject,
        projects: savedProjects,
      };
    }
    
    case 'TOGGLE_AI_ASSISTANT':
      return {
        ...state,
        aiAssistantEnabled: !state.aiAssistantEnabled,
        activeTab: !state.aiAssistantEnabled ? state.activeTab : 
          (state.activeTab === 'ai' ? 'code' : state.activeTab),
      };
    
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload.tab,
      };
    
    case 'SET_RIGHT_TAB':
      return {
        ...state,
        rightTab: action.payload.tab,
      };
    
    case 'SET_OUTPUT':
      return {
        ...state,
        output: action.payload.output,
        rightTab: 'output',
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload.query,
      };
    
    case 'SET_VIDEO_URL':
      return {
        ...state,
        videoUrl: action.payload.url,
        rightTab: action.payload.url ? 'video' : state.rightTab,
      };
    
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: [
          ...state.chatHistory,
          {
            role: action.payload.role,
            content: action.payload.content,
            timestamp: new Date(),
          },
        ],
      };
    
    case 'SET_AI_TYPING':
      return {
        ...state,
        isAiTyping: action.payload.isTyping,
      };
    
    default:
      return state;
  }
};

interface PracticeContextType {
  state: PracticeState;
  dispatch: React.Dispatch<PracticeAction>;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
};

interface PracticeProviderProps {
  children: ReactNode;
}

export const PracticeProvider: React.FC<PracticeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(practiceReducer, initialState);
  
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);

  return (
    <PracticeContext.Provider value={contextValue}>
      {children}
    </PracticeContext.Provider>
  );
};
