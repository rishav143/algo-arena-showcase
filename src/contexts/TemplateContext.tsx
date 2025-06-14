
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Template, TemplateContextType } from '@/types/template';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([
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

  const createTemplate = useCallback(async (name: string, content: string, language: string) => {
    const newTemplate: Template = {
      id: `template_${Date.now()}`,
      name,
      content,
      language,
      type: 'custom',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTemplates(prev => [...prev, newTemplate]);
    toast({
      title: "Template Created",
      description: `${name} template has been created successfully.`,
    });
  }, [toast]);

  const deleteTemplate = useCallback(async (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }

    toast({
      title: "Template Deleted",
      description: "Template has been deleted successfully.",
    });
  }, [selectedTemplate, toast]);

  const renameTemplate = useCallback(async (templateId: string, newName: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, name: newName, updatedAt: new Date() }
        : template
    ));

    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(prev => prev ? { ...prev, name: newName } : null);
    }

    toast({
      title: "Template Renamed",
      description: `Template renamed to ${newName}`,
    });
  }, [selectedTemplate, toast]);

  const updateTemplate = useCallback(async (templateId: string, content: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, content, updatedAt: new Date() }
        : template
    ));

    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(prev => prev ? { ...prev, content } : null);
    }
  }, [selectedTemplate]);

  const selectTemplate = useCallback((templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
    }
  }, [templates]);

  const value: TemplateContextType = {
    templates,
    selectedTemplate,
    createTemplate,
    deleteTemplate,
    renameTemplate,
    updateTemplate,
    selectTemplate,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
