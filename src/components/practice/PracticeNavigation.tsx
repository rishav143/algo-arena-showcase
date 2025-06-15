
import React, { useState, useEffect } from 'react';
import { Search, User, Code2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePractice } from '@/contexts/PracticeContext';
import { Link } from 'react-router-dom';

const PracticeNavigation: React.FC = () => {
  const { dispatch } = usePractice();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock search suggestions based on common programming topics
  const mockSuggestions = [
    'arrays and strings',
    'linked lists',
    'binary trees',
    'dynamic programming',
    'sorting algorithms',
    'graph traversal',
    'hash tables',
    'recursion',
    'two pointers',
    'sliding window',
    'depth first search',
    'breadth first search',
    'merge sort',
    'quick sort',
    'binary search',
    'stack and queue',
    'heap data structure',
    'greedy algorithms'
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    // Mock video search results with Rishav Engineering video first
    const mockResults = [
      {
        id: 'rishav-1',
        title: `${query} - Complete Tutorial by Rishav Engineering`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 'video-2',
        title: `${query} Tutorial - Part 1`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 'video-3',
        title: `Advanced ${query} Concepts`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      }
    ];

    dispatch({ type: 'SET_SEARCH_RESULTS', payload: { results: mockResults } });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: { query } });
    
    // Auto-select first video (Rishav Engineering)
    if (mockResults.length > 0) {
      dispatch({ type: 'SET_VIDEO_URL', payload: { url: mockResults[0].url } });
    }

    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Brand/Logo */}
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        <Code2 className="w-8 h-8 text-indigo-600" />
        <span className="text-xl font-bold text-gray-900">codeRoom</span>
      </Link>

      {/* Global Search */}
      <div className="flex-1 max-w-2xl mx-8 relative">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search coding problems, algorithms, data structures..."
              className="pl-10 pr-10 w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center space-x-2"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Profile Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg">
          <DropdownMenuItem className="hover:bg-gray-50">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-50">
            My Progress
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-50">
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PracticeNavigation;
