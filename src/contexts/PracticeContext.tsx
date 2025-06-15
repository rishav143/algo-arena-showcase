
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface File {
  id: string;
  name: string;
  content: string;
  language: string;
  extension: string;
  isDirty: boolean;
}

interface Folder {
  id: string;
  name: string;
  parentId?: string;
  isExpanded: boolean;
}

interface Project {
  id: string;
  name: string;
  files: File[];
  folders: Folder[];
  createdAt: string;
}

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  isUserVideo: boolean;
}

interface PracticeState {
  projects: Project[];
  selectedProjectId?: string;
  selectedFileId?: string;
  selectedLanguage: string;
  editorContent: string;
  isEditorDirty: boolean;
  aiEnabled: boolean;
  outputContent: string;
  aiChatHistory: Array<{ role: 'user' | 'ai'; message: string; timestamp: string }>;
  activeTab: 'output' | 'ai' | 'video';
  searchQuery: string;
  searchResults: Video[];
  activeVideo?: Video;
  compilerOutput: {
    success: boolean;
    output: string;
    error?: string;
  } | null;
}

type PracticeAction = 
  | { type: 'CREATE_PROJECT'; payload: { name: string } }
  | { type: 'DELETE_PROJECT'; payload: { projectId: string } }
  | { type: 'RENAME_PROJECT'; payload: { projectId: string; newName: string } }
  | { type: 'SELECT_PROJECT'; payload: { projectId: string } }
  | { type: 'CREATE_FILE'; payload: { projectId: string; folderId?: string; name: string; extension: string } }
  | { type: 'DELETE_FILE'; payload: { projectId: string; fileId: string } }
  | { type: 'RENAME_FILE'; payload: { projectId: string; fileId: string; newName: string } }
  | { type: 'SELECT_FILE'; payload: { fileId: string } }
  | { type: 'SET_EDITOR_CONTENT'; payload: { content: string } }
  | { type: 'SET_LANGUAGE'; payload: { language: string } }
  | { type: 'SAVE_FILE' }
  | { type: 'TOGGLE_AI'; payload: { enabled: boolean } }
  | { type: 'SET_ACTIVE_TAB'; payload: { tab: 'output' | 'ai' | 'video' } }
  | { type: 'ADD_AI_MESSAGE'; payload: { role: 'user' | 'ai'; message: string } }
  | { type: 'SET_SEARCH_QUERY'; payload: { query: string } }
  | { type: 'SET_SEARCH_RESULTS'; payload: { results: Video[] } }
  | { type: 'SELECT_VIDEO'; payload: { video: Video } }
  | { type: 'SET_COMPILER_OUTPUT'; payload: { success: boolean; output: string; error?: string } }
  | { type: 'CREATE_FOLDER'; payload: { projectId: string; parentId?: string; name: string } }
  | { type: 'TOGGLE_FOLDER'; payload: { projectId: string; folderId: string } };

const initialState: PracticeState = {
  projects: [],
  selectedLanguage: 'java',
  editorContent: '',
  isEditorDirty: false,
  aiEnabled: true,
  outputContent: '',
  aiChatHistory: [],
  activeTab: 'output',
  searchQuery: '',
  searchResults: [],
  compilerOutput: null,
};

const practiceReducer = (state: PracticeState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      const newProject: Project = {
        id: Date.now().toString(),
        name: action.payload.name,
        files: [],
        folders: [],
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        projects: [...state.projects, newProject],
        selectedProjectId: newProject.id,
      };

    case 'DELETE_PROJECT':
      const updatedProjects = state.projects.filter(p => p.id !== action.payload.projectId);
      return {
        ...state,
        projects: updatedProjects,
        selectedProjectId: state.selectedProjectId === action.payload.projectId ? undefined : state.selectedProjectId,
        selectedFileId: undefined,
        editorContent: '',
        isEditorDirty: false,
      };

    case 'SELECT_FILE':
      const selectedProject = state.projects.find(p => p.id === state.selectedProjectId);
      const selectedFile = selectedProject?.files.find(f => f.id === action.payload.fileId);
      
      if (selectedFile) {
        return {
          ...state,
          selectedFileId: action.payload.fileId,
          editorContent: selectedFile.content,
          selectedLanguage: selectedFile.language,
          isEditorDirty: false,
        };
      }
      return state;

    case 'CREATE_FILE':
      const projectIndex = state.projects.findIndex(p => p.id === action.payload.projectId);
      if (projectIndex === -1) return state;

      const newFile: File = {
        id: Date.now().toString(),
        name: action.payload.name,
        content: '',
        language: getLanguageFromExtension(action.payload.extension),
        extension: action.payload.extension,
        isDirty: false,
      };

      const updatedProjectsWithFile = [...state.projects];
      updatedProjectsWithFile[projectIndex] = {
        ...updatedProjectsWithFile[projectIndex],
        files: [...updatedProjectsWithFile[projectIndex].files, newFile],
      };

      return {
        ...state,
        projects: updatedProjectsWithFile,
        selectedFileId: newFile.id,
        editorContent: '',
        selectedLanguage: newFile.language,
        isEditorDirty: false,
      };

    case 'SET_EDITOR_CONTENT':
      return {
        ...state,
        editorContent: action.payload.content,
        isEditorDirty: true,
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        selectedLanguage: action.payload.language,
        selectedFileId: undefined,
        editorContent: '',
        isEditorDirty: false,
      };

    case 'SAVE_FILE':
      if (!state.selectedFileId || !state.selectedProjectId) return state;

      const projectToUpdate = state.projects.findIndex(p => p.id === state.selectedProjectId);
      if (projectToUpdate === -1) return state;

      const fileToUpdate = state.projects[projectToUpdate].files.findIndex(f => f.id === state.selectedFileId);
      if (fileToUpdate === -1) return state;

      const updatedProjectsWithSave = [...state.projects];
      updatedProjectsWithSave[projectToUpdate] = {
        ...updatedProjectsWithSave[projectToUpdate],
        files: updatedProjectsWithSave[projectToUpdate].files.map(f => 
          f.id === state.selectedFileId 
            ? { ...f, content: state.editorContent, isDirty: false }
            : f
        ),
      };

      return {
        ...state,
        projects: updatedProjectsWithSave,
        isEditorDirty: false,
      };

    case 'TOGGLE_AI':
      return {
        ...state,
        aiEnabled: action.payload.enabled,
        activeTab: action.payload.enabled ? state.activeTab : 'output',
      };

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload.tab,
      };

    case 'ADD_AI_MESSAGE':
      return {
        ...state,
        aiChatHistory: [
          ...state.aiChatHistory,
          {
            role: action.payload.role,
            message: action.payload.message,
            timestamp: new Date().toISOString(),
          },
        ],
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload.query,
      };

    case 'SELECT_VIDEO':
      return {
        ...state,
        activeVideo: action.payload.video,
        activeTab: 'video',
      };

    case 'SET_COMPILER_OUTPUT':
      return {
        ...state,
        compilerOutput: action.payload,
        activeTab: action.payload.error ? 'ai' : 'output',
      };

    default:
      return state;
  }
};

const getLanguageFromExtension = (extension: string): string => {
  const langMap: Record<string, string> = {
    '.java': 'java',
    '.js': 'javascript',
    '.py': 'python',
    '.cpp': 'cpp',
    '.c': 'c',
    '.ts': 'typescript',
    '.jsx': 'javascript',
    '.tsx': 'typescript',
  };
  return langMap[extension] || 'plaintext';
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

export const PracticeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(practiceReducer, initialState);

  return (
    <PracticeContext.Provider value={{ state, dispatch }}>
      {children}
    </PracticeContext.Provider>
  );
};
