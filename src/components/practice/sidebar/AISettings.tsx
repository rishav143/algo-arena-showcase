
import React from 'react';
import { Bot } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface AISettingsProps {
  aiAssistantEnabled: boolean;
  onAiAssistantToggle: (enabled: boolean) => void;
}

export const AISettings: React.FC<AISettingsProps> = ({
  aiAssistantEnabled,
  onAiAssistantToggle,
}) => {
  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Settings</h3>
      <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4" />
          <span className="text-sm">AI Assistant</span>
        </div>
        <Switch
          checked={aiAssistantEnabled}
          onCheckedChange={onAiAssistantToggle}
        />
      </div>
    </div>
  );
};
