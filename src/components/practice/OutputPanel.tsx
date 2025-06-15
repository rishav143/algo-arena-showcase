
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal, Bot, Zap, MessageSquare, Video, Play, AlertTriangle } from 'lucide-react';
import { getThemeStyles } from '@/utils/themeManager';

interface OutputPanelProps {
  theme: string;
  compilationResult?: any;
  selectedVideo?: any;
  aiAssistantEnabled: boolean;
  activeTab?: string;
  onActiveTabChange?: (tab: string) => void;
  executionError?: string;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ 
  theme,
  compilationResult,
  selectedVideo, 
  aiAssistantEnabled,
  activeTab = 'output',
  onActiveTabChange,
  executionError
}) => {
  const [output, setOutput] = useState('// Output will appear here when you run your code');
  const [aiMessages, setAiMessages] = useState<Array<{ type: 'user' | 'ai', content: string }>>([]);
  const [aiInput, setAiInput] = useState('');
  const themeStyles = getThemeStyles(theme);

  // Update output when compilation result changes
  useEffect(() => {
    if (compilationResult) {
      if (compilationResult.success) {
        setOutput(compilationResult.output || 'Program executed successfully');
      } else {
        setOutput(`Error: ${compilationResult.error}`);
      }
    }
  }, [compilationResult]);

  // Auto-switch to AI tab when there's an execution error
  useEffect(() => {
    if (executionError && aiAssistantEnabled && onActiveTabChange) {
      onActiveTabChange('ai');
      // Add error message to AI chat
      setAiMessages(prev => [...prev, {
        type: 'ai',
        content: `I detected an error in your code: ${executionError}. Let me help you fix it!`
      }]);
    }
  }, [executionError, aiAssistantEnabled, onActiveTabChange]);

  // Auto-switch to video tab when video is selected
  useEffect(() => {
    if (selectedVideo && onActiveTabChange) {
      onActiveTabChange('video');
    }
  }, [selectedVideo, onActiveTabChange]);

  const handleAiSubmit = () => {
    if (aiInput.trim()) {
      setAiMessages(prev => [
        ...prev,
        { type: 'user', content: aiInput },
        { type: 'ai', content: 'I understand your question. Let me analyze your code and provide assistance...' }
      ]);
      setAiInput('');
    }
  };

  return (
    <div className={`flex flex-col h-full ${themeStyles.background} ${themeStyles.text}`}>
      <Tabs value={activeTab} onValueChange={onActiveTabChange} className="flex flex-col h-full">
        <div className={`border-b p-2 ${themeStyles.border} ${themeStyles.accent}`}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="output" className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Output
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video
              {selectedVideo && <div className="w-2 h-2 bg-red-500 rounded-full" />}
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2" disabled={!aiAssistantEnabled}>
              <Bot className="w-4 h-4" />
              AI Assistant
              {executionError && <AlertTriangle className="w-3 h-3 text-red-500" />}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="output" className="flex-1 m-0 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className={`p-2 border-b ${themeStyles.border} ${themeStyles.accent}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Console Output</span>
                <Button variant="ghost" size="sm" onClick={() => setOutput('// Output cleared')}>
                  Clear
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-4">
                <pre className={`text-sm font-mono whitespace-pre-wrap ${themeStyles.text}`}>
                  {output}
                </pre>
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="video" className="flex-1 m-0 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className={`p-2 border-b ${themeStyles.border} ${themeStyles.accent}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Video Tutorial</span>
                {selectedVideo && (
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-4">
                {selectedVideo ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                      <iframe
                        src={selectedVideo.videoUrl}
                        title={selectedVideo.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">{selectedVideo.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedVideo.channel} • {selectedVideo.duration}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Search for a problem to see related video tutorials</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="flex-1 m-0 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className={`p-2 border-b ${themeStyles.border} ${themeStyles.accent}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Assistant</span>
                <Button variant="ghost" size="sm">
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-4">
                {aiMessages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Ask me anything about your code!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {aiMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-8'
                            : `${themeStyles.accent} mr-8`
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className={`border-t p-3 ${themeStyles.border}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask AI about your code..."
                  className={`flex-1 px-3 py-2 text-sm border rounded-md ${themeStyles.background} ${themeStyles.text} ${themeStyles.border}`}
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAiSubmit();
                    }
                  }}
                />
                <Button size="sm" onClick={handleAiSubmit}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
