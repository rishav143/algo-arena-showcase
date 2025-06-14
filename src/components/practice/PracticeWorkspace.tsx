
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PracticeHeader from './PracticeHeader';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import { usePracticeState } from '@/hooks/usePracticeState';
import { simulateCodeExecution } from '@/utils/codeExecution';

const PracticeWorkspace = () => {
  const {
    selectedLanguage,
    code,
    setCode,
    output,
    setOutput,
    isRunning,
    setIsRunning,
    aiSuggestion,
    setAiSuggestion,
    activeTab,
    setActiveTab,
    projectName,
    setProjectName,
    savedProjects,
    aiAssistantEnabled,
    setAiAssistantEnabled,
    hasError,
    setHasError,
    languages,
    handleLanguageChange,
    handleSaveProject,
    handleLoadProject,
    handleDeleteProject,
    handleCopyCode,
  } = usePracticeState();

  const handleRunCode = () => {
    simulateCodeExecution(
      code,
      aiAssistantEnabled,
      setOutput,
      setHasError,
      setAiSuggestion,
      setActiveTab,
      setIsRunning
    );
  };

  return (
    <div className="h-full flex flex-col">
      <PracticeHeader
        selectedLanguage={selectedLanguage}
        languages={languages}
        isRunning={isRunning}
        onLanguageChange={handleLanguageChange}
        onRunCode={handleRunCode}
        onCopyCode={handleCopyCode}
      />

      <div className="flex-1 p-4 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg border">
          <ResizablePanel defaultSize={50} minSize={25}>
            <CodeEditor
              code={code}
              setCode={setCode}
              selectedLanguage={selectedLanguage}
              languages={languages}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={25}>
            <OutputPanel
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              output={output}
              hasError={hasError}
              aiAssistantEnabled={aiAssistantEnabled}
              setAiAssistantEnabled={setAiAssistantEnabled}
              aiSuggestion={aiSuggestion}
              setAiSuggestion={setAiSuggestion}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default PracticeWorkspace;
