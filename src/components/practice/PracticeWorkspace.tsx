
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { PracticeHeader } from './PracticeHeader';

interface PracticeWorkspaceProps {
  theme: string;
  aiAssistantEnabled: boolean;
  onToggleSidebar?: () => void;
  onThemeChange?: (theme: string) => void;
}

export const PracticeWorkspace: React.FC<PracticeWorkspaceProps> = ({ 
  theme,
  aiAssistantEnabled,
  onToggleSidebar,
  onThemeChange
}) => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('output');
  const [executionError, setExecutionError] = useState<string>('');
  const [compilationResult, setCompilationResult] = useState<any>(null);

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

  const handleCompilationResult = (result: any) => {
    setCompilationResult(result);
    if (!result.success && aiAssistantEnabled) {
      setActiveTab('ai');
    } else if (result.success) {
      setActiveTab('output');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PracticeHeader 
        theme={theme}
        onVideoSelect={handleVideoSelect}
        onRunCode={handleRunCode}
        onSubmitCode={handleSubmitCode}
        onToggleSidebar={onToggleSidebar}
        onThemeChange={onThemeChange}
      />
      
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <CodeEditor 
              theme={theme}
              onRunCode={handleRunCode}
              onExecutionError={handleExecutionError}
              onCompilationResult={handleCompilationResult}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Output/AI Assistant Panel */}
          <ResizablePanel defaultSize={40} minSize={25}>
            <OutputPanel 
              theme={theme}
              compilationResult={compilationResult}
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
