
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const useAIAssistant = () => {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(true);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addMessage = useCallback((content: string, type: 'user' | 'ai') => {
    const newMessage: AIMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!isEnabled) return;

    addMessage(message, 'user');
    setIsProcessing(true);

    try {
      // Simulate AI response
      setTimeout(() => {
        addMessage(
          "I'm here to help with your code! This is a simulated response. In a real implementation, this would connect to an AI service.",
          'ai'
        );
        setIsProcessing(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "AI Assistant Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  }, [isEnabled, addMessage, toast]);

  const handleCodeError = useCallback((error: string) => {
    if (!isEnabled) return;

    addMessage(
      `Code Error Detected: ${error}\n\nWould you like me to help you fix this error?`,
      'ai'
    );
  }, [isEnabled, addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isEnabled,
    setIsEnabled,
    messages,
    isProcessing,
    sendMessage,
    handleCodeError,
    clearMessages
  };
};
