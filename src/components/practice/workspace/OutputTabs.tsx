
import React, { useState } from 'react';
import { Play, MessageCircle, Youtube } from 'lucide-react';
import { Button } from '../../ui/button';
import { useProject } from '../../../contexts/ProjectContext';

const OutputTabs = () => {
  const [activeTab, setActiveTab] = useState<'output' | 'ai' | 'video'>('output');
  const { aiEnabled } = useProject();

  const tabs = [
    { id: 'output', label: 'Output', icon: Play },
    ...(aiEnabled ? [{ id: 'ai', label: 'AI Assistant', icon: MessageCircle }] : []),
    { id: 'video', label: 'Video', icon: Youtube },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 flex">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(id as any)}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500"
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'output' && (
          <div className="h-full">
            <div className="text-sm text-gray-500 mb-4">Output will appear here when you run your code</div>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm min-h-32">
              <div>$ javac Solution.java</div>
              <div>$ java Solution</div>
              <div className="mt-2 text-white">Ready to run...</div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && aiEnabled && (
          <div className="h-full flex flex-col">
            <div className="text-sm text-gray-500 mb-4">AI Assistant is here to help!</div>
            <div className="flex-1 bg-gray-50 rounded p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <p className="text-sm">👋 Hi! I'm your AI assistant. I can help you with:</p>
                  <ul className="text-sm mt-2 list-disc list-inside">
                    <li>Debugging errors</li>
                    <li>Code optimization</li>
                    <li>Algorithm explanations</li>
                    <li>Best practices</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4 flex">
              <input 
                type="text" 
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="rounded-l-none">Send</Button>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="h-full">
            <div className="text-sm text-gray-500 mb-4">Search for a problem to see related videos</div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Youtube className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No video selected</p>
              <p className="text-sm text-gray-500 mt-2">Use the search bar to find tutorial videos</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputTabs;
