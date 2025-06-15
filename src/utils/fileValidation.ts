
export const SUPPORTED_LANGUAGES = {
  javascript: { name: 'JavaScript', extensions: ['js', 'jsx'] },
  typescript: { name: 'TypeScript', extensions: ['ts', 'tsx'] },
  python: { name: 'Python', extensions: ['py'] },
  java: { name: 'Java', extensions: ['java'] },
  cpp: { name: 'C++', extensions: ['cpp', 'cc', 'cxx'] },
  c: { name: 'C', extensions: ['c'] },
  go: { name: 'Go', extensions: ['go'] },
  rust: { name: 'Rust', extensions: ['rs'] },
};

export const validateFileExtension = (fileName: string): string | null => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (!extension) {
    return 'File must have an extension';
  }

  const isValidExtension = Object.values(SUPPORTED_LANGUAGES).some(lang =>
    lang.extensions.includes(extension)
  );

  if (!isValidExtension) {
    const allExtensions = Object.values(SUPPORTED_LANGUAGES)
      .flatMap(lang => lang.extensions)
      .join(', ');
    return `Unsupported file extension. Supported extensions: ${allExtensions}`;
  }

  return null;
};

export const getLanguageFromExtension = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (!extension) return 'javascript';

  for (const [language, config] of Object.entries(SUPPORTED_LANGUAGES)) {
    if (config.extensions.includes(extension)) {
      return language;
    }
  }

  return 'javascript';
};

export const getDefaultExtension = (language: string): string => {
  return SUPPORTED_LANGUAGES[language as keyof typeof SUPPORTED_LANGUAGES]?.extensions[0] || 'txt';
};
