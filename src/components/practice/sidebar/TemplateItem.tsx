
import React, { useState } from 'react';
import { Template, MoreHorizontal, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Template as TemplateType } from '@/types/template';
import { useTemplateContext } from '@/contexts/TemplateContext';
import { cn } from '@/lib/utils';

interface TemplateItemProps {
  template: TemplateType;
}

export const TemplateItem: React.FC<TemplateItemProps> = ({ template }) => {
  const { selectedTemplate, deleteTemplate, renameTemplate, selectTemplate } = useTemplateContext();
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(template.name);

  const isSelected = selectedTemplate?.id === template.id;

  const handleRename = () => {
    if (renameValue.trim() && renameValue !== template.name) {
      renameTemplate(template.id, renameValue.trim());
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
      setRenameValue(template.name);
    }
  };

  const handleSelect = () => {
    selectTemplate(template.id);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer group",
        isSelected && "bg-accent"
      )}
      onClick={handleSelect}
    >
      <Template className="w-4 h-4 text-purple-500 flex-shrink-0" />
      
      {isRenaming ? (
        <Input
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleRename}
          className="h-6 text-sm"
          autoFocus
        />
      ) : (
        <>
          <span className="text-sm flex-1 truncate">{template.name}</span>
          <span className="text-xs text-muted-foreground">{template.language}</span>
          {template.type === 'custom' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40" align="end">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsRenaming(true);
                      setRenameValue(template.name);
                    }}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Rename
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Template</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{template.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteTemplate(template.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
    </div>
  );
};
