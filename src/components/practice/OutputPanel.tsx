
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal, Bot, Zap, MessageSquare } from 'lucide-react';

interface OutputPanelProps {
  code: string;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ code }) => {
  const [output, setOutput] = useState('// Output will appear here when you run your code');
  const [aiMessages, setAiMessages] = useState<Array<{ type: 'user' | 'ai', content: string }>>([]);

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="output" className="flex flex-col h-full">
        <div className="border-b bg-muted/50 p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="output" className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Output
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Assistant
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
        
        <TabsContent value="ai" className="flex-1 m-0">
          <div className="flex flex-col h-full">
            <div className="p-2 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Assistant</span>
                <Button variant="ghost" size="sm">
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
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
                          : 'bg-muted mr-8'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            <div className="border-t p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask AI about your code..."
                  className="flex-1 px-3 py-2 text-sm border rounded-md"
                />
                <Button size="sm">
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
