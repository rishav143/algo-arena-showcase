
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { PracticeHeader } from './PracticeHeader';

export const PracticeWorkspace = () => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [code, setCode] = useState('// Welcome to CodeRoom Practice\n// Start coding here...');

  return (
    <div className="flex flex-col h-full">
      <PracticeHeader />
      
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={70} minSize={40}>
            <CodeEditor 
              code={code}
              onChange={setCode}
              language="javascript"
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Output/AI Assistant Panel */}
          <ResizablePanel defaultSize={30} minSize={20}>
            <OutputPanel code={code} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
