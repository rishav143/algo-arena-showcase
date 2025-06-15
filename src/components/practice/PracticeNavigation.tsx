
import React, { useState } from 'react';
import { Search, User, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePractice } from '@/contexts/PracticeContext';

const PracticeNavigation: React.FC = () => {
  const { dispatch } = usePractice();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Mock video search results with Rishav Engineering video first
    const mockResults = [
      {
        id: 'rishav-1',
        title: `${searchQuery} - Complete Tutorial by Rishav Engineering`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 'video-2',
        title: `${searchQuery} Tutorial - Part 1`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 'video-3',
        title: `Advanced ${searchQuery} Concepts`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      }
    ];

    dispatch({ type: 'SET_SEARCH_RESULTS', payload: { results: mockResults } });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: { query: searchQuery } });
    
    // Auto-select first video (Rishav Engineering)
    if (mockResults.length > 0) {
      dispatch({ type: 'SET_VIDEO_URL', payload: { url: mockResults[0].url } });
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Brand/Logo */}
      <div className="flex items-center space-x-2">
        <Code2 className="w-8 h-8 text-indigo-600" />
        <span className="text-xl font-bold text-gray-900">CodePractice</span>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-2xl mx-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coding problems, algorithms, data structures..."
              className="pl-10 pr-4 w-full"
            />
          </div>
        </form>
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
