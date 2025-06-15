
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { usePractice } from '../../contexts/PracticeContext';

const AIAssistant = () => {
  const { state, dispatch } = usePractice();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [state.aiChatHistory]);

  useEffect(() => {
    // Auto-activate AI assistant on compilation errors
    if (state.compilerOutput?.error) {
      const errorMessage = `I encountered a compilation error: ${state.compilerOutput.error}\n\nCan you help me fix this issue?`;
      dispatch({
        type: 'ADD_AI_MESSAGE',
        payload: { role: 'user', message: errorMessage },
      });
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = `I can help you fix this compilation error. Based on the error message, here are some common solutions:\n\n1. Check for syntax errors like missing semicolons or brackets\n2. Verify variable declarations and type mismatches\n3. Ensure all imports are correct\n\nCould you share the specific code that's causing the error so I can provide more targeted assistance?`;
        
        dispatch({
          type: 'ADD_AI_MESSAGE',
          payload: { role: 'ai', message: aiResponse },
        });
      }, 1000);
    }
  }, [state.compilerOutput, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    dispatch({
      type: 'ADD_AI_MESSAGE',
      payload: { role: 'user', message },
    });

    const userMessage = message;
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage, state.editorContent, state.selectedLanguage);
      dispatch({
        type: 'ADD_AI_MESSAGE',
        payload: { role: 'ai', message: aiResponse },
      });
    }, 1000);
  };

  const generateAIResponse = (userMessage: string, code: string, language: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('error') || lowerMessage.includes('fix')) {
      return `I understand you're encountering an error. Let me help you debug this ${language} code. Here are some general debugging steps:\n\n1. Check for syntax errors\n2. Verify variable declarations\n3. Look for type mismatches\n4. Ensure proper imports\n\nIf you share the specific error message, I can provide more targeted assistance.`;
    }
    
    if (lowerMessage.includes('optimize') || lowerMessage.includes('improve')) {
      return `Great question about code optimization! Here are some general best practices for ${language}:\n\n1. Use appropriate data structures\n2. Minimize nested loops when possible\n3. Consider algorithm complexity\n4. Follow language-specific conventions\n\nWould you like me to review a specific part of your code?`;
    }
    
    if (lowerMessage.includes('explain') || lowerMessage.includes('how')) {
      return `I'd be happy to explain ${language} concepts! Based on your question, here are some key points:\n\n1. Understanding the syntax and structure\n2. Best practices and conventions\n3. Common patterns and solutions\n\nFeel free to ask about specific topics or share code you'd like me to explain.`;
    }
    
    return `I'm here to help with your ${language} coding! I can assist with:\n\n• Debugging errors and issues\n• Code optimization and improvements\n• Explaining concepts and syntax\n• Suggesting best practices\n• Code reviews and refactoring\n\nWhat specific aspect would you like help with?`;
  };

  if (!state.aiEnabled) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">AI Assistant is disabled</p>
          <p className="text-sm mt-2">Enable it in the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {state.aiChatHistory.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            <p className="text-lg font-medium">AI Assistant Ready</p>
            <p className="text-sm mt-2">Ask me anything about your code, debugging, or programming concepts!</p>
          </div>
        ) : (
          state.aiChatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  chat.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(chat.timestamp).toLocaleTimeString()}
                </p>
                
                {/* AI message feedback buttons */}
                {chat.role === 'ai' && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask the AI assistant..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
