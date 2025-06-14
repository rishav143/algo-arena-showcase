
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { PracticeHeader } from './PracticeHeader';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { useVideoManager } from '@/hooks/useVideoManager';
import { useProjectManager } from '@/hooks/useProjectManager';

export const PracticeWorkspace = () => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [code, setCode] = useState('// Welcome to CodeRoom Practice\n// Start coding here...');
  
  const aiAssistant = useAIAssistant();
  const videoManager = useVideoManager();
  const projectManager = useProjectManager();

  const handleCodeError = (error: string | null) => {
    if (error && aiAssistant.isEnabled) {
      aiAssistant.handleCodeError(error);
    }
  };

  const handleFileSelect = (fileId: string) => {
    setActiveFile(fileId);
    const file = projectManager.getFileById(fileId);
    if (file) {
      setCode(file.content);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (activeFile) {
      projectManager.updateFileContent(activeFile, newCode);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PracticeHeader 
        onVideoSelect={videoManager.selectVideo}
        onVideoSearch={videoManager.searchVideos}
        searchResults={videoManager.searchResults}
      />
      
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <CodeEditor 
              code={code}
              onChange={handleCodeChange}
              language="javascript"
              onError={handleCodeError}
              activeFile={activeFile}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Output/AI Assistant Panel */}
          <ResizablePanel defaultSize={40} minSize={25}>
            <OutputPanel 
              code={code} 
              aiAssistant={aiAssistant}
              videoManager={videoManager}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
