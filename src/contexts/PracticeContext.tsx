
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

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
  output: string;
  isRunning: boolean;
  searchQuery: string;
  videoUrl: string | null;
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>;
  isAiTyping: boolean;
}

type PracticeAction =
  | { type: 'CREATE_PROJECT'; payload: { name: string } }
  | { type: 'DELETE_PROJECT'; payload: { id: string } }
  | { type: 'RENAME_PROJECT'; payload: { id: string; name: string } }
  | { type: 'SET_ACTIVE_PROJECT'; payload: { project: Project | null } }
  | { type: 'CREATE_FILE'; payload: { projectId: string; name: string; language: string } }
  | { type: 'DELETE_FILE'; payload: { projectId: string; fileId: string } }
  | { type: 'RENAME_FILE'; payload: { projectId: string; fileId: string; name: string } }
  | { type: 'SET_ACTIVE_FILE'; payload: { file: CodeFile | null } }
  | { type: 'UPDATE_FILE_CONTENT'; payload: { content: string } }
  | { type: 'SAVE_FILE' }
  | { type: 'TOGGLE_AI_ASSISTANT' }
  | { type: 'SET_ACTIVE_TAB'; payload: { tab: 'code' | 'output' | 'ai' | 'video' } }
  | { type: 'SET_OUTPUT'; payload: { output: string } }
  | { type: 'SET_RUNNING'; payload: { isRunning: boolean } }
  | { type: 'SET_SEARCH_QUERY'; payload: { query: string } }
  | { type: 'SET_VIDEO_URL'; payload: { url: string | null } }
  | { type: 'ADD_CHAT_MESSAGE'; payload: { role: 'user' | 'assistant'; content: string } }
  | { type: 'SET_AI_TYPING'; payload: { isTyping: boolean } };

const initialState: PracticeState = {
  projects: [],
  activeProject: null,
  activeFile: null,
  aiAssistantEnabled: true,
  activeTab: 'code',
  output: '',
  isRunning: false,
  searchQuery: '',
  videoUrl: null,
  chatHistory: [],
  isAiTyping: false,
};

function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case 'CREATE_PROJECT': {
      const newProject: Project = {
        id: Date.now().toString(),
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
    
    case 'CREATE_FILE': {
      const newFile: CodeFile = {
        id: Date.now().toString(),
        name: action.payload.name,
        content: '',
        language: action.payload.language,
        isUnsaved: false,
      };
      
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId
            ? { ...p, files: [...p.files, newFile] }
            : p
        ),
        activeProject: state.activeProject?.id === action.payload.projectId
          ? { ...state.activeProject, files: [...state.activeProject.files, newFile] }
          : state.activeProject,
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
    
    case 'UPDATE_FILE_CONTENT':
      return {
        ...state,
        activeFile: state.activeFile
          ? { ...state.activeFile, content: action.payload.content, isUnsaved: true }
          : null,
      };
    
    case 'SAVE_FILE': {
      if (!state.activeFile || !state.activeProject) return state;
      
      const savedFile = { ...state.activeFile, isUnsaved: false, lastSaved: new Date() };
      
      return {
        ...state,
        activeFile: savedFile,
        projects: state.projects.map(p =>
          p.id === state.activeProject?.id
            ? {
                ...p,
                files: p.files.map(f => f.id === state.activeFile?.id ? savedFile : f),
              }
            : p
        ),
        activeProject: {
          ...state.activeProject,
          files: state.activeProject.files.map(f => f.id === state.activeFile?.id ? savedFile : f),
        },
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
    
    case 'SET_OUTPUT':
      return {
        ...state,
        output: action.payload.output,
        activeTab: 'output',
      };
    
    case 'SET_RUNNING':
      return {
        ...state,
        isRunning: action.payload.isRunning,
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
        activeTab: action.payload.url ? 'video' : state.activeTab,
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
}

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

  return (
    <PracticeContext.Provider value={{ state, dispatch }}>
      {children}
    </PracticeContext.Provider>
  );
};
