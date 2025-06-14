
import { EditorState, EditorMode, EditorActiveState } from '@/types/editor';

export const createInitialEditorState = (): EditorState => ({
  content: '',
  language: 'javascript',
  hasUnsavedChanges: false,
  activeState: {
    mode: 'unknown'
  }
});

export const createFileState = (fileId: string, content: string, language: string): EditorActiveState => ({
  mode: 'file',
  fileId
});

export const createLanguageState = (language: string): EditorActiveState => ({
  mode: 'language',
  languageTemplate: language
});

export const isActiveFile = (state: EditorState, fileId: string): boolean => {
  return state.activeState.mode === 'file' && state.activeState.fileId === fileId;
};

export const isActiveLanguage = (state: EditorState, language: string): boolean => {
  return state.activeState.mode === 'language' && state.activeState.languageTemplate === language;
};

export const getLanguageTemplate = (language: string): string => {
  const languageTemplates: Record<string, string> = {
    javascript: '// JavaScript\nconsole.log("Hello, World!");',
    typescript: '// TypeScript\nconst message: string = "Hello, World!";\nconsole.log(message);',
    python: '# Python\nprint("Hello, World!")',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    rust: 'fn main() {\n    println!("Hello, World!");\n}',
  };
  return languageTemplates[language] || '// Start coding here...';
};

export const getFileExtension = (language: string): string => {
  const extensions: Record<string, string> = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    go: 'go',
    rust: 'rs',
  };
  return extensions[language] || 'txt';
};
