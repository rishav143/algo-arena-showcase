
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { X, Play } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface CodeWorkspaceProps {
  selectedProject: string | null;
}

const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({ selectedProject }) => {
  const [openFiles, setOpenFiles] = useState([
    { id: 'file1', name: 'two-sum.js', language: 'javascript', content: `// Two Sum Problem
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]` }
  ]);
  const [activeFile, setActiveFile] = useState('file1');

  const closeFile = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(file => file.id !== fileId);
    setOpenFiles(newOpenFiles);
    
    if (activeFile === fileId && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[0].id);
    }
  };

  if (openFiles.length === 0) {
    return (
      <div className="h-full bg-slate-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-lg mb-2">No files open</p>
          <p className="text-sm">Select a file from the explorer to start coding</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-900 flex flex-col">
      <Tabs value={activeFile} onValueChange={setActiveFile} className="h-full flex flex-col">
        <div className="border-b border-slate-700 bg-slate-800">
          <TabsList className="bg-transparent h-auto p-0 w-full justify-start">
            {openFiles.map((file) => (
              <TabsTrigger
                key={file.id}
                value={file.id}
                className="data-[state=active]:bg-slate-900 data-[state=active]:text-white text-gray-400 border-r border-slate-700 rounded-none px-4 py-2 h-auto relative group"
              >
                <span className="mr-2">{file.name}</span>
                <button
                  onClick={(e) => closeFile(file.id, e)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-slate-600 rounded p-0.5 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {openFiles.map((file) => (
          <TabsContent key={file.id} value={file.id} className="flex-1 m-0">
            <CodeEditor
              language={file.language}
              value={file.content}
              onChange={(value) => {
                setOpenFiles(prev => 
                  prev.map(f => f.id === file.id ? { ...f, content: value } : f)
                );
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeWorkspace;
