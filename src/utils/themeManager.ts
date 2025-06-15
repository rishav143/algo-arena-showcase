
export interface ThemeStyles {
  background: string;
  text: string;
  border: string;
  accent: string;
}

export const getThemeStyles = (theme: string): ThemeStyles => {
  const themes: Record<string, ThemeStyles> = {
    light: {
      background: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-300',
      accent: 'bg-gray-50'
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      border: 'border-gray-700',
      accent: 'bg-gray-800'
    },
    monokai: {
      background: 'bg-gray-800',
      text: 'text-green-400',
      border: 'border-gray-600',
      accent: 'bg-gray-700'
    },
    dracula: {
      background: 'bg-purple-900',
      text: 'text-purple-100',
      border: 'border-purple-700',
      accent: 'bg-purple-800'
    },
    github: {
      background: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-300',
      accent: 'bg-gray-50'
    },
    vscode: {
      background: 'bg-gray-800',
      text: 'text-blue-200',
      border: 'border-gray-600',
      accent: 'bg-gray-700'
    }
  };

  return themes[theme] || themes.light;
};

export const getEditorThemeStyles = (theme: string) => {
  switch (theme) {
    case 'dark':
      return 'bg-gray-900 text-gray-100 border-gray-700';
    case 'monokai':
      return 'bg-gray-800 text-green-400 border-gray-600';
    case 'dracula':
      return 'bg-purple-900 text-purple-100 border-purple-700';
    case 'github':
      return 'bg-white text-gray-900 border-gray-300';
    case 'vscode':
      return 'bg-gray-800 text-blue-200 border-gray-600';
    default:
      return 'bg-white text-gray-900 border-gray-300';
  }
};

export const getLineNumberStyles = (theme: string) => {
  switch (theme) {
    case 'dark':
      return 'bg-gray-800 text-gray-500 border-gray-700';
    case 'monokai':
      return 'bg-gray-700 text-gray-400 border-gray-600';
    case 'dracula':
      return 'bg-purple-800 text-purple-400 border-purple-700';
    case 'github':
      return 'bg-gray-50 text-gray-400 border-gray-300';
    case 'vscode':
      return 'bg-gray-700 text-gray-400 border-gray-600';
    default:
      return 'bg-gray-50 text-gray-400 border-gray-300';
  }
};
