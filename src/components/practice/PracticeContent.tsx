
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useSidebar } from '@/components/ui/sidebar';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProjectSidebar from './ProjectSidebar';
import PracticeHeader from './PracticeHeader';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import { usePracticeState } from '@/hooks/usePracticeState';
import { simulateCodeExecution } from '@/utils/codeExecution';

const PracticeContent = () => {
  const { state } = useSidebar();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex pt-20 overflow-hidden">
        <ProjectSidebar
          projectName={projectName}
          setProjectName={setProjectName}
          aiAssistantEnabled={aiAssistantEnabled}
          setAiAssistantEnabled={setAiAssistantEnabled}
          savedProjects={savedProjects}
          onSaveProject={handleSaveProject}
          onLoadProject={handleLoadProject}
          onDeleteProject={handleDeleteProject}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <PracticeHeader
            selectedLanguage={selectedLanguage}
            languages={languages}
            isRunning={isRunning}
            onLanguageChange={handleLanguageChange}
            onRunCode={handleRunCode}
            onCopyCode={handleCopyCode}
          />

          <div className="flex-1 p-4 overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={50} minSize={30}>
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  selectedLanguage={selectedLanguage}
                  languages={languages}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={50} minSize={30}>
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
      </div>
      
      <div 
        className={`transition-all duration-200 ease-linear ${
          state === 'expanded' ? 'ml-64' : 'ml-0'
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default PracticeContent;
