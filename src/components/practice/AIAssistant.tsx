
import React, { useState } from 'react';
import { Send, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI coding assistant. I can help you with code review, debugging, optimization, and explaining algorithms. What would you like to work on?'
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I can see you\'re working on the Two Sum problem. This is a classic array problem that can be solved efficiently using a hash map. Would you like me to explain the algorithm or help optimize your current solution?'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-slate-700">
        <h3 className="text-sm font-medium text-gray-300">AI Assistant</h3>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-slate-700 text-gray-300'
            }`}>
              <p className="text-sm">{message.content}</p>
              {message.type === 'ai' && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-600">
                  <button className="p-1 hover:bg-slate-600 rounded">
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button className="p-1 hover:bg-slate-600 rounded">
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                  <button className="p-1 hover:bg-slate-600 rounded">
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your code..."
            className="flex-1 bg-slate-700 text-white placeholder-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
