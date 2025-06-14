
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Lightbulb, AlertCircle, EyeOff, Eye, X } from 'lucide-react';

interface OutputPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  output: string;
  hasError: boolean;
  aiAssistantEnabled: boolean;
  setAiAssistantEnabled: (enabled: boolean) => void;
  aiSuggestion: string;
  setAiSuggestion: (suggestion: string) => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  activeTab,
  setActiveTab,
  output,
  hasError,
  aiAssistantEnabled,
  setAiAssistantEnabled,
  aiSuggestion,
  setAiSuggestion
}) => {
  return (
    <Card className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-gray-50 m-0 rounded-none rounded-t-lg flex-shrink-0">
          <TabsTrigger value="output" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Output
            {hasError && <AlertCircle className="w-3 h-3 text-red-500" />}
          </TabsTrigger>
          <TabsTrigger value="ai-help" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            AI Assistant
            {aiSuggestion && <div className="w-2 h-2 bg-purple-500 rounded-full" />}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="output" className="flex-1 p-4 m-0">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-full whitespace-pre-wrap overflow-auto border-l-4 border-green-500">
            {output || '🚀 Ready to run your code!\n\nClick "Run Code" to see the magic happen...\n\n💡 Tips:\n• Write your code in the editor\n• Use console.log() for debugging\n• Check syntax before running'}
          </div>
        </TabsContent>
        
        <TabsContent value="ai-help" className="flex-1 p-4 m-0">
          <div className="h-full flex flex-col">
            {!aiAssistantEnabled ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <EyeOff className="w-8 h-8 text-gray-400 mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">AI Assistant Disabled</h4>
                <p className="text-gray-500 mb-4">Enable AI assistance from the sidebar to get help with your code.</p>
                <Button 
                  onClick={() => setAiAssistantEnabled(true)}
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Enable AI Assistant
                </Button>
              </div>
            ) : aiSuggestion ? (
              <div className="flex-1 flex flex-col">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 flex-1 overflow-auto">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {aiSuggestion}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-4 flex-shrink-0"
                  onClick={() => setAiSuggestion('')}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Suggestion
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-purple-100 rounded-full mb-4">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant Ready</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  I'll automatically help when your code has errors, or click below for assistance.
                </p>
                <Button 
                  onClick={() => setAiSuggestion('🤖 AI Code Assistant\n\n🔍 Code Analysis:\nYour code structure looks good! Here are some suggestions:\n\n✨ Improvements:\n1. Add error handling for better robustness\n2. Consider using more descriptive variable names\n3. Add comments to explain complex logic\n\n💡 Best Practices:\n• Use consistent indentation\n• Follow naming conventions\n• Break down complex functions\n\n🚀 Would you like me to optimize your code or explain any specific part?')}
                  className="bg-purple-600 hover:bg-purple-700"
                  size="sm"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Get AI Help
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default OutputPanel;
