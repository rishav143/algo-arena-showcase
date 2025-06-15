
export interface ProjectFile {
  id: string;
  name: string;
  language: string;
  content: string;
  saved: boolean;
}

export interface Project {
  id: string;
  name: string;
  files: ProjectFile[];
  expanded: boolean;
}

export interface EditorState {
  activeMode: 'file' | 'template' | null;
  activeTemplate: string | null;
  hasUnsavedChanges: boolean;
}

export interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  isOwn: boolean;
  url: string;
}

export const SUPPORTED_LANGUAGES = {
  'java': ['.java'],
  'javascript': ['.js', '.jsx'],
  'typescript': ['.ts', '.tsx'],
  'python': ['.py'],
  'cpp': ['.cpp', '.cxx', '.cc'],
  'c': ['.c'],
  'html': ['.html', '.htm'],
  'css': ['.css'],
} as const;

export const TEMPLATES = {
  'java': `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  'codeforces': `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Your solution here
    }
}`,
  'python': `def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`,
} as const;
