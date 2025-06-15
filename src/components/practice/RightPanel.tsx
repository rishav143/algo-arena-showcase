
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { usePractice } from '../../contexts/PracticeContext';
import OutputPanel from './OutputPanel';
import AIAssistant from './AIAssistant';
import VideoPanel from './VideoPanel';

const RightPanel = () => {
  const { state, dispatch } = usePractice();

  return (
    <div className="h-full bg-white">
      <Tabs 
        value={state.activeTab} 
        onValueChange={(tab) => 
          dispatch({ type: 'SET_ACTIVE_TAB', payload: { tab: tab as 'output' | 'ai' | 'video' } })
        }
        className="h-full flex flex-col"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="output">Output</TabsTrigger>
          <TabsTrigger value="ai" disabled={!state.aiEnabled}>
            AI Assistant
            {!state.aiEnabled && <span className="ml-1 text-xs">(Off)</span>}
          </TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>

        <TabsContent value="output" className="flex-1 overflow-hidden">
          <OutputPanel />
        </TabsContent>

        <TabsContent value="ai" className="flex-1 overflow-hidden">
          <AIAssistant />
        </TabsContent>

        <TabsContent value="video" className="flex-1 overflow-hidden">
          <VideoPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RightPanel;
