
export interface Template {
  id: string;
  name: string;
  content: string;
  language: string;
  type: 'default' | 'custom';
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateContextType {
  templates: Template[];
  selectedTemplate: Template | null;
  createTemplate: (name: string, content: string, language: string) => Promise<void>;
  deleteTemplate: (templateId: string) => Promise<void>;
  renameTemplate: (templateId: string, newName: string) => Promise<void>;
  updateTemplate: (templateId: string, content: string) => Promise<void>;
  selectTemplate: (templateId: string) => void;
}

export interface EditorState {
  hasUnsavedChanges: boolean;
  currentContent: string;
  selectedFileId: string | null;
  selectedTemplateId: string | null;
  language: string;
}
