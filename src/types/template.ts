
export interface Template {
  id: string;
  name: string;
  content: string;
  language: string;
  type: 'default';
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateContextType {
  templates: Template[];
  selectedTemplate: Template | null;
  selectTemplate: (templateId: string) => void;
}

export interface EditorState {
  hasUnsavedChanges: boolean;
  currentContent: string;
  selectedFileId: string | null;
  selectedTemplateId: string | null;
  language: string;
}
