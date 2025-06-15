
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { TEMPLATES } from '../../../types/practice';
import { useProject } from '../../../contexts/ProjectContext';

const EditorTabs = () => {
  const { activeFile, projects } = useProject();
  const [activeTemplate, setActiveTemplate] = useState<string | null>('java');

  const activeFileObj = activeFile ? 
    projects.flatMap(p => p.files).find(f => f.id === activeFile) : null;

  const handleTemplateChange = (template: string) => {
    // Here you would handle unsaved changes prompt
    setActiveTemplate(template);
  };

  return (
    <div className="border-b border-gray-200 p-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {activeFileObj ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{activeFileObj.name}</span>
            {!activeFileObj.saved && <span className="text-orange-500 text-xs">●</span>}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Template:</span>
            <Select value={activeTemplate || ''} onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TEMPLATES).map((template) => (
                  <SelectItem key={template} value={template}>
                    {template.charAt(0).toUpperCase() + template.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Save (Ctrl+S)
        </Button>
        <Button size="sm">
          Run
        </Button>
      </div>
    </div>
  );
};

export default EditorTabs;
