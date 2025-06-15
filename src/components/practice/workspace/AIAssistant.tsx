
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePractice } from '@/contexts/PracticeContext';

const AIAssistant: React.FC = () => {
  const { state, dispatch } = usePractice();
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: { role: 'user', content: userMessage }
    });

    // Show typing indicator
    dispatch({ type: 'SET_AI_TYPING', payload: { isTyping: true } });

    // Simulate AI response (in real implementation, this would call an AI API)
    setTimeout(() => {
      let response = "I'm here to help you with your code! ";
      
      if (userMessage.toLowerCase().includes('error') || userMessage.toLowerCase().includes('debug')) {
        response += "I can help you debug your code. Can you share the specific error message you're seeing?";
      } else if (userMessage.toLowerCase().includes('algorithm')) {
        response += "I can explain algorithms and help you implement them efficiently. What algorithm are you working on?";
      } else if (userMessage.toLowerCase().includes('optimize')) {
        response += "I can suggest ways to optimize your code for better performance. Would you like me to review your current implementation?";
      } else {
        response += "Feel free to ask me about coding concepts, debugging, algorithms, or any programming questions you have!";
      }

      dispatch({
        type: 'ADD_CHAT_MESSAGE',
        payload: { role: 'assistant', content: response }
      });
      
      dispatch({ type: 'SET_AI_TYPING', payload: { isTyping: false } });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [state.chatHistory, state.isAiTyping]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
        </div>
        <div className="flex-1"></div>
        <div className="text-xs text-gray-500">
          Press Ctrl+I to focus
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {state.chatHistory.length === 0 ? (
            <div className="text-center py-8">
              <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                AI Assistant Ready
              </h4>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                I can help you debug code, explain algorithms, suggest optimizations, 
                and answer programming questions. What would you like to work on?
              </p>
            </div>
          ) : (
            state.chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-500 hover:text-green-600"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-500 hover:text-red-600"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Typing Indicator */}
          {state.isAiTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your code..."
            className="flex-1 min-h-[60px] max-h-32 resize-none"
            disabled={state.isAiTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || state.isAiTyping}
            className="self-end bg-indigo-600 hover:bg-indigo-700"
          >
            {state.isAiTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
