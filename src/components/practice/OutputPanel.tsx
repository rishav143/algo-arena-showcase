
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal, Bot, Zap, MessageSquare, Video, Play, Settings } from 'lucide-react';
import { useAIAssistant, AIMessage } from '@/hooks/useAIAssistant';
import { useVideoManager, VideoData } from '@/hooks/useVideoManager';

interface OutputPanelProps {
  code: string;
  aiAssistant: ReturnType<typeof useAIAssistant>;
  videoManager: ReturnType<typeof useVideoManager>;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ 
  code, 
  aiAssistant,
  videoManager 
}) => {
  const [output, setOutput] = useState('// Output will appear here when you run your code');
  const [aiInput, setAiInput] = useState('');

  const handleAISubmit = () => {
    if (aiInput.trim() && aiAssistant.isEnabled) {
      aiAssistant.sendMessage(aiInput.trim());
      setAiInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="output" className="flex flex-col h-full">
        <div className="border-b bg-muted/50 p-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="output" className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Output
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Assistant
              {!aiAssistant.isEnabled && (
                <span className="ml-1 text-xs bg-gray-500 text-white px-1 rounded">OFF</span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="output" className="flex-1 m-0">
          <div className="flex flex-col h-full">
            <div className="p-2 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Console Output</span>
                <Button variant="ghost" size="sm">
                  Clear
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="video" className="flex-1 m-0">
          <div className="flex flex-col h-full">
            <div className="p-2 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Video Tutorial</span>
                {videoManager.selectedVideo && (
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex-1 p-4">
              {videoManager.selectedVideo ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-lg font-medium">{videoManager.selectedVideo.title}</p>
                      <p className="text-sm opacity-75">{videoManager.selectedVideo.channel}</p>
                      {videoManager.selectedVideo.isMyVideo && (
                        <span className="inline-block mt-2 px-2 py-1 bg-red-600 text-white text-xs rounded">
                          Rishav Engineering
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Duration: {videoManager.selectedVideo.duration}
                    </div>
                    {videoManager.selectedVideo.description && (
                      <p className="text-sm">{videoManager.selectedVideo.description}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Search for a problem to see related video tutorials</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="flex-1 m-0">
          <div className="flex flex-col h-full">
            <div className="p-2 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Assistant</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => aiAssistant.setIsEnabled(!aiAssistant.isEnabled)}
                  >
                    <Settings className="w-4 h-4" />
                    {aiAssistant.isEnabled ? 'ON' : 'OFF'}
                  </Button>
                  {aiAssistant.isEnabled && (
                    <Button variant="ghost" size="sm" onClick={aiAssistant.clearMessages}>
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              {!aiAssistant.isEnabled ? (
                <div className="text-center text-muted-foreground py-8">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">AI Assistant is disabled</p>
                  <p className="text-xs">Enable it using the settings button above</p>
                </div>
              ) : aiAssistant.messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Ask me anything about your code!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {aiAssistant.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-8'
                          : 'bg-muted mr-8'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  ))}
                  {aiAssistant.isProcessing && (
                    <div className="bg-muted mr-8 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">AI is thinking...</p>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
            
            {aiAssistant.isEnabled && (
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask AI about your code..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAISubmit();
                      }
                    }}
                    disabled={aiAssistant.isProcessing}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleAISubmit}
                    disabled={aiAssistant.isProcessing || !aiInput.trim()}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
