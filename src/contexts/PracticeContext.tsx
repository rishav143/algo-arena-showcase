
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PracticeFile {
  id: string;
  name: string;
  content: string;
  language: string;
  projectId: string;
  isUnsaved: boolean;
}

export interface PracticeProject {
  id: string;
  name: string;
  files: PracticeFile[];
  createdAt: string;
}

export interface PracticeState {
  projects: PracticeProject[];
  activeFile: PracticeFile | null;
  activeProject: string | null;
  isAIAssistantEnabled: boolean;
  activeTab: 'editor' | 'output' | 'ai' | 'video';
  editorLanguage: string;
  searchQuery: string;
  output: string;
  isCompiling: boolean;
  unsavedChanges: boolean;
}

type PracticeAction =
  | { type: 'CREATE_PROJECT'; payload: { name: string } }
  | { type: 'DELETE_PROJECT'; payload: { projectId: string } }
  | { type: 'RENAME_PROJECT'; payload: { projectId: string; newName: string } }
  | { type: 'CREATE_FILE'; payload: { projectId: string; name: string; language: string } }
  | { type: 'DELETE_FILE'; payload: { fileId: string } }
  | { type: 'RENAME_FILE'; payload: { fileId: string; newName: string } }
  | { type: 'SET_ACTIVE_FILE'; payload: { file: PracticeFile } }
  | { type: 'UPDATE_FILE_CONTENT'; payload: { fileId: string; content: string } }
  | { type: 'TOGGLE_AI_ASSISTANT' }
  | { type: 'SET_ACTIVE_TAB'; payload: { tab: 'editor' | 'output' | 'ai' | 'video' } }
  | { type: 'SET_LANGUAGE'; payload: { language: string } }
  | { type: 'SET_SEARCH_QUERY'; payload: { query: string } }
  | { type: 'SET_OUTPUT'; payload: { output: string } }
  | { type: 'SET_COMPILING'; payload: { isCompiling: boolean } }
  | { type: 'MARK_FILE_SAVED'; payload: { fileId: string } }
  | { type: 'SET_UNSAVED_CHANGES'; payload: { hasChanges: boolean } };

const initialState: PracticeState = {
  projects: [],
  activeFile: null,
  activeProject: null,
  isAIAssistantEnabled: true,
  activeTab: 'editor',
  editorLanguage: 'javascript',
  searchQuery: '',
  output: '',
  isCompiling: false,
  unsavedChanges: false,
};

function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case 'CREATE_PROJECT': {
      const newProject: PracticeProject = {
        id: Date.now().toString(),
        name: action.payload.name,
        files: [],
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        projects: [...state.projects, newProject],
        activeProject: newProject.id,
      };
    }
    case 'DELETE_PROJECT': {
      const updatedProjects = state.projects.filter(p => p.id !== action.payload.projectId);
      const wasActiveProject = state.activeProject === action.payload.projectId;
      return {
        ...state,
        projects: updatedProjects,
        activeProject: wasActiveProject ? null : state.activeProject,
        activeFile: wasActiveProject ? null : state.activeFile,
      };
    }
    case 'RENAME_PROJECT': {
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId
            ? { ...p, name: action.payload.newName }
            : p
        ),
      };
    }
    case 'CREATE_FILE': {
      const newFile: PracticeFile = {
        id: Date.now().toString(),
        name: action.payload.name,
        content: '',
        language: action.payload.language,
        projectId: action.payload.projectId,
        isUnsaved: false,
      };
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId
            ? { ...p, files: [...p.files, newFile] }
            : p
        ),
        activeFile: newFile,
        activeTab: 'editor',
      };
    }
    case 'DELETE_FILE': {
      const wasActiveFile = state.activeFile?.id === action.payload.fileId;
      return {
        ...state,
        projects: state.projects.map(p => ({
          ...p,
          files: p.files.filter(f => f.id !== action.payload.fileId),
        })),
        activeFile: wasActiveFile ? null : state.activeFile,
      };
    }
    case 'RENAME_FILE': {
      return {
        ...state,
        projects: state.projects.map(p => ({
          ...p,
          files: p.files.map(f =>
            f.id === action.payload.fileId
              ? { ...f, name: action.payload.newName }
              : f
          ),
        })),
        activeFile: state.activeFile?.id === action.payload.fileId
          ? { ...state.activeFile, name: action.payload.newName }
          : state.activeFile,
      };
    }
    case 'SET_ACTIVE_FILE': {
      return {
        ...state,
        activeFile: action.payload.file,
        activeProject: action.payload.file.projectId,
        activeTab: 'editor',
        editorLanguage: action.payload.file.language,
      };
    }
    case 'UPDATE_FILE_CONTENT': {
      return {
        ...state,
        projects: state.projects.map(p => ({
          ...p,
          files: p.files.map(f =>
            f.id === action.payload.fileId
              ? { ...f, content: action.payload.content, isUnsaved: true }
              : f
          ),
        })),
        activeFile: state.activeFile?.id === action.payload.fileId
          ? { ...state.activeFile, content: action.payload.content, isUnsaved: true }
          : state.activeFile,
        unsavedChanges: true,
      };
    }
    case 'TOGGLE_AI_ASSISTANT': {
      const newEnabled = !state.isAIAssistantEnabled;
      return {
        ...state,
        isAIAssistantEnabled: newEnabled,
        activeTab: newEnabled && state.activeTab === 'ai' ? 'ai' : 
                   !newEnabled && state.activeTab === 'ai' ? 'editor' : state.activeTab,
      };
    }
    case 'SET_ACTIVE_TAB': {
      if (action.payload.tab === 'ai' && !state.isAIAssistantEnabled) {
        return state;
      }
      return {
        ...state,
        activeTab: action.payload.tab,
      };
    }
    case 'SET_LANGUAGE': {
      return {
        ...state,
        editorLanguage: action.payload.language,
      };
    }
    case 'SET_SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: action.payload.query,
      };
    }
    case 'SET_OUTPUT': {
      return {
        ...state,
        output: action.payload.output,
      };
    }
    case 'SET_COMPILING': {
      return {
        ...state,
        isCompiling: action.payload.isCompiling,
      };
    }
    case 'MARK_FILE_SAVED': {
      return {
        ...state,
        projects: state.projects.map(p => ({
          ...p,
          files: p.files.map(f =>
            f.id === action.payload.fileId
              ? { ...f, isUnsaved: false }
              : f
          ),
        })),
        activeFile: state.activeFile?.id === action.payload.fileId
          ? { ...state.activeFile, isUnsaved: false }
          : state.activeFile,
        unsavedChanges: false,
      };
    }
    case 'SET_UNSAVED_CHANGES': {
      return {
        ...state,
        unsavedChanges: action.payload.hasChanges,
      };
    }
    default:
      return state;
  }
}

const PracticeContext = createContext<{
  state: PracticeState;
  dispatch: React.Dispatch<PracticeAction>;
} | null>(null);

export const PracticeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(practiceReducer, initialState);

  // Auto-save functionality
  useEffect(() => {
    if (state.activeFile && state.unsavedChanges) {
      const timer = setTimeout(() => {
        if (state.activeFile) {
          dispatch({ type: 'MARK_FILE_SAVED', payload: { fileId: state.activeFile.id } });
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.activeFile, state.unsavedChanges]);

  return (
    <PracticeContext.Provider value={{ state, dispatch }}>
      {children}
    </PracticeContext.Provider>
  );
};

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
};
