
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, Bot, Play } from 'lucide-react';
import { usePractice } from '@/contexts/PracticeContext';
import OutputPanel from './OutputPanel';
import AIAssistant from './AIAssistant';
import VideoPanel from './VideoPanel';

const RightPanel: React.FC = () => {
  const { state, dispatch } = usePractice();

  const handleTabChange = (value: string) => {
    dispatch({ 
      type: 'SET_RIGHT_TAB', 
      payload: { tab: value as 'output' | 'ai' | 'video' } 
    });
  };

  const visibleTabs = [
    { value: 'output', label: 'Output', icon: Terminal },
    ...(state.aiAssistantEnabled ? [{ value: 'ai', label: 'AI Assistant', icon: Bot }] : []),
    ...(state.videoUrl ? [{ value: 'video', label: 'Video', icon: Play }] : []),
  ];

  return (
    <div className="border-l border-gray-200 bg-white h-full flex flex-col">
      <Tabs 
        value={state.rightTab || 'output'} 
        onValueChange={handleTabChange}
        className="h-full flex flex-col"
      >
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <TabsList className="h-12 bg-transparent justify-start rounded-none border-none p-0 w-full">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="h-12 rounded-none border-none px-4 flex-1 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="output" className="h-full m-0 border-none p-0">
            <OutputPanel />
          </TabsContent>
          
          {state.aiAssistantEnabled && (
            <TabsContent value="ai" className="h-full m-0 border-none p-0">
              <AIAssistant />
            </TabsContent>
          )}
          
          {state.videoUrl && (
            <TabsContent value="video" className="h-full m-0 border-none p-0">
              <VideoPanel />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default RightPanel;
