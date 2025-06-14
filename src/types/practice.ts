
export interface File {
  id: string;
  name: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  name: string;
  files: File[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EditorSettings {
  theme: 'light' | 'dark';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
}

export interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
