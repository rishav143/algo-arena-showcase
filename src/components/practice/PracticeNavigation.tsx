
import React, { useState } from 'react';
import { Code, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePractice } from '../../contexts/PracticeContext';

const PracticeNavigation = () => {
  const { state, dispatch } = usePractice();
  const [searchInput, setSearchInput] = useState(state.searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: { query: searchInput } });
    if (searchInput.trim()) {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: { tab: 'video' } });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 h-16">
      <div className="max-w-full mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Code className="w-8 h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200" />
              <div className="absolute -inset-1 bg-indigo-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 tracking-tight">codeRoom</span>
              <span className="text-xs text-gray-600 font-medium">Practice Mode</span>
            </div>
          </Link>

          {/* Global Search */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search coding problems..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default PracticeNavigation;
