
export type EditorMode = 'file' | 'template' | 'language';

export interface EditorContent {
  content: string;
  language: string;
  hasUnsavedChanges: boolean;
}

export interface EditorActiveState {
  mode: EditorMode;
  fileId?: string;
  templateId?: string;
  languageTemplate?: string;
}

export interface EditorState extends EditorContent {
  activeState: EditorActiveState;
}

export interface EditorStateManager {
  editorState: EditorState;
  switchToFile: (fileId: string, content: string, language: string) => void;
  switchToTemplate: (templateId: string, content: string, language: string) => void;
  switchToLanguage: (language: string, content: string) => void;
  updateContent: (content: string) => void;
  clearUnsavedChanges: () => void;
  hasPendingAction: boolean;
  executePendingAction: () => void;
  cancelPendingAction: () => void;
}
