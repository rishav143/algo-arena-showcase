
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePractice } from '../../../contexts/PracticeContext';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import AIAssistant from './AIAssistant';
import VideoPanel from './VideoPanel';

const MainWorkspace = () => {
  const { state, dispatch } = usePractice();

  const handleTabChange = (value: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: { tab: value as any } });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Tabs value={state.activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 h-12 bg-gray-100 border-b">
          <TabsTrigger value="editor" className="text-sm font-medium">
            Code Editor
          </TabsTrigger>
          <TabsTrigger value="output" className="text-sm font-medium">
            Output
          </TabsTrigger>
          {state.isAIAssistantEnabled && (
            <TabsTrigger value="ai" className="text-sm font-medium">
              AI Assistant
            </TabsTrigger>
          )}
          <TabsTrigger value="video" className="text-sm font-medium">
            Video
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="flex-1 m-0 p-0">
          <CodeEditor />
        </TabsContent>
        
        <TabsContent value="output" className="flex-1 m-0 p-0">
          <OutputPanel />
        </TabsContent>
        
        {state.isAIAssistantEnabled && (
          <TabsContent value="ai" className="flex-1 m-0 p-0">
            <AIAssistant />
          </TabsContent>
        )}
        
        <TabsContent value="video" className="flex-1 m-0 p-0">
          <VideoPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainWorkspace;
