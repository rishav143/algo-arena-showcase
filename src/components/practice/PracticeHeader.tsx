
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Save, Settings, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PracticeHeader = () => {
  const { toast } = useToast();

  const handleRun = () => {
    // TODO: Implement code execution
    toast({
      title: "Running Code",
      description: "Code execution will be implemented in the next step.",
    });
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    toast({
      title: "Saved",
      description: "Project saved successfully.",
    });
  };

  return (
    <div className="border-b bg-background p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Practice Workspace</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleRun}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
