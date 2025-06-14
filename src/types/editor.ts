
export type EditorMode = 'file' | 'language';

export interface EditorContent {
  content: string;
  language: string;
  hasUnsavedChanges: boolean;
}

export interface EditorActiveState {
  mode: EditorMode;
  fileId?: string;
  languageTemplate?: string;
}

export interface EditorState extends EditorContent {
  activeState: EditorActiveState;
}

export interface EditorStateManager {
  editorState: EditorState;
  switchToFile: (fileId: string, content: string, language: string) => void;
  switchToLanguage: (language: string, content: string) => void;
  updateContent: (content: string) => void;
  clearUnsavedChanges: () => void;
  hasPendingAction: boolean;
  executePendingAction: () => void;
  cancelPendingAction: () => void;
}
