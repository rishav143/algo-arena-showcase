
import React, { useState } from 'react';
import { Code, Search, Play, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoSearchResults from './VideoSearchResults';

const PracticeHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Code className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight">codeRoom</span>
            <span className="text-xs text-gray-400 font-medium">Practice Environment</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 max-w-md mx-8 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos, tutorials, or problems..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-slate-700 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-slate-600 transition-all"
          />
        </div>
        
        {showSearchResults && (
          <VideoSearchResults 
            query={searchQuery}
            onClose={() => setShowSearchResults(false)}
          />
        )}
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Run Code</span>
        </button>
        <button className="p-2 hover:bg-slate-700 text-gray-300 hover:text-white rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default PracticeHeader;
