
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Template, TemplateContextType } from '@/types/template';

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplateContext must be used within a TemplateProvider');
  }
  return context;
};

interface TemplateProviderProps {
  children: React.ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ children }) => {
  const [templates] = useState<Template[]>([
    {
      id: 'template_codeforces',
      name: 'Codeforces',
      content: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    \n    // Your code here\n    \n    return 0;\n}',
      language: 'cpp',
      type: 'default',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'template_normal',
      name: 'Normal',
      content: '// Start coding here...',
      language: 'javascript',
      type: 'default',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const selectTemplate = useCallback((templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
    }
  }, [templates]);

  const value: TemplateContextType = {
    templates,
    selectedTemplate,
    selectTemplate,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
