
import React, { useState } from 'react';
import { Template, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTemplateContext } from '@/contexts/TemplateContext';
import { TemplateItem } from './TemplateItem';

export const TemplatesSection: React.FC = () => {
  const { templates, createTemplate } = useTemplateContext();
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [newTemplateLanguage, setNewTemplateLanguage] = useState('javascript');

  const customTemplates = templates.filter(t => t.type === 'custom');

  const handleCreateTemplate = () => {
    if (newTemplateName.trim() && newTemplateContent.trim()) {
      createTemplate(newTemplateName.trim(), newTemplateContent.trim(), newTemplateLanguage);
      setNewTemplateName('');
      setNewTemplateContent('');
      setNewTemplateLanguage('javascript');
      setIsCreateTemplateOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCreateTemplate();
    }
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">Custom Templates</h3>
        <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Custom Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Template Name</label>
                <Input
                  placeholder="Enter template name"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Language</label>
                <Select value={newTemplateLanguage} onValueChange={setNewTemplateLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Template Code</label>
                <Textarea
                  placeholder="Enter your template code here..."
                  value={newTemplateContent}
                  onChange={(e) => setNewTemplateContent(e.target.value)}
                  className="font-mono min-h-[200px]"
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateTemplateOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-1">
        {customTemplates.map((template) => (
          <TemplateItem
            key={template.id}
            template={template}
          />
        ))}
        
        {customTemplates.length === 0 && (
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground">No custom templates yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
