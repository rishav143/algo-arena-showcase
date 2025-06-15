
import React from 'react';
import { Code, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePractice } from '@/contexts/PracticeContext';

const PracticeNavigation: React.FC = () => {
  const { state, dispatch } = usePractice();

  const handleSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: { query } });
    
    // Simulate video search - in real implementation, this would call a video search API
    if (query.toLowerCase().includes('algorithm') || query.toLowerCase().includes('coding')) {
      dispatch({ 
        type: 'SET_VIDEO_URL', 
        payload: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' } 
      });
    }
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 relative z-50">
      {/* Brand/Logo */}
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="relative">
          <Code className="w-8 h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200" />
          <div className="absolute -inset-1 bg-indigo-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-900 tracking-tight">codeRoom</span>
          <span className="text-xs text-gray-600 font-medium">Practice</span>
        </div>
      </Link>

      {/* Global Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search coding problems..."
            value={state.searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* User Profile Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-indigo-100 text-indigo-600 font-semibold">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end">
          <DropdownMenuItem className="hover:bg-gray-50">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-50">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-50">
            Preferences
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:bg-gray-50">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default PracticeNavigation;
