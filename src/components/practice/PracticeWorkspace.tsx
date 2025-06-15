
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { PracticeHeader } from './PracticeHeader';

interface PracticeWorkspaceProps {
  onToggleSidebar?: () => void;
}

export const PracticeWorkspace: React.FC<PracticeWorkspaceProps> = ({ onToggleSidebar }) => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('output');
  const [executionError, setExecutionError] = useState<string>('');

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
    setActiveTab('video');
  };

  const handleRunCode = () => {
    console.log('Running code...');
    setExecutionError(''); // Clear previous errors
  };

  const handleSubmitCode = () => {
    console.log('Submitting code...');
  };

  const handleExecutionError = (error: string) => {
    setExecutionError(error);
    if (aiAssistantEnabled) {
      setActiveTab('ai');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PracticeHeader 
        onVideoSelect={handleVideoSelect}
        onRunCode={handleRunCode}
        onSubmitCode={handleSubmitCode}
        onToggleSidebar={onToggleSidebar}
      />
      
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <CodeEditor 
              onRunCode={handleRunCode}
              onExecutionError={handleExecutionError}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Output/AI Assistant Panel */}
          <ResizablePanel defaultSize={40} minSize={25}>
            <OutputPanel 
              code=""
              selectedVideo={selectedVideo}
              aiAssistantEnabled={aiAssistantEnabled}
              activeTab={activeTab}
              onActiveTabChange={setActiveTab}
              executionError={executionError}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
