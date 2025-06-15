
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Terminal, Bot, Play } from 'lucide-react';
import OutputPanel from './OutputPanel';
import AIAssistant from './AIAssistant';
import VideoPanel from './VideoPanel';
import { usePracticeContext } from '../../contexts/PracticeContext';

interface RightPanelProps {
  activeTab: 'output' | 'ai' | 'video';
  onTabChange: (tab: 'output' | 'ai' | 'video') => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ activeTab, onTabChange }) => {
  const { activeRightTab } = usePracticeContext();

  // Use context value if available, otherwise use prop
  const currentTab = activeRightTab || activeTab;

  return (
    <div className="h-full bg-slate-800 border-l border-slate-700">
      <Tabs value={currentTab} onValueChange={(value) => onTabChange(value as any)} className="h-full flex flex-col">
        <div className="border-b border-slate-700 px-2 py-2">
          <TabsList className="bg-slate-700 w-full">
            <TabsTrigger value="output" className="flex-1 data-[state=active]:bg-slate-600 text-xs">
              <Terminal className="w-4 h-4 mr-1" />
              Output
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex-1 data-[state=active]:bg-slate-600 text-xs">
              <Bot className="w-4 h-4 mr-1" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="video" className="flex-1 data-[state=active]:bg-slate-600 text-xs">
              <Play className="w-4 h-4 mr-1" />
              Video
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="output" className="flex-1 m-0">
          <OutputPanel />
        </TabsContent>

        <TabsContent value="ai" className="flex-1 m-0">
          <AIAssistant />
        </TabsContent>

        <TabsContent value="video" className="flex-1 m-0">
          <VideoPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RightPanel;
