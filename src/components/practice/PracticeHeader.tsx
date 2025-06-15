
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { usePractice } from '../../contexts/PracticeContext';
import VideoSearchResults from './VideoSearchResults';

const PracticeHeader = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePractice();
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchInput = async (value: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: { query: value } });
    
    if (value.trim()) {
      // Simulate search results - in real app, this would be an API call
      const mockResults = [
        {
          id: '1',
          title: `Your Video: ${value} Tutorial`,
          url: 'https://www.youtube.com/watch?v=example1',
          thumbnailUrl: '/placeholder.svg',
          isUserVideo: true,
        },
        {
          id: '2',
          title: `${value} Programming Guide`,
          url: 'https://www.youtube.com/watch?v=example2',
          thumbnailUrl: '/placeholder.svg',
          isUserVideo: false,
        },
        {
          id: '3',
          title: `Advanced ${value} Concepts`,
          url: 'https://www.youtube.com/watch?v=example3',
          thumbnailUrl: '/placeholder.svg',
          isUserVideo: false,
        },
      ];
      
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: { results: mockResults } });
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between relative">
      {/* Left Section - codeRoom Logo */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-xl font-bold text-blue-600 hover:text-blue-700"
        >
          codeRoom
        </Button>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-md mx-8 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search videos..."
            value={state.searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            onFocus={() => state.searchQuery && setShowSearchResults(true)}
            className="pl-10 pr-4"
          />
        </div>
        
        {/* Search Results Dropdown */}
        {showSearchResults && (
          <VideoSearchResults 
            results={state.searchResults}
            onClose={() => setShowSearchResults(false)}
            onSelectVideo={(video) => {
              dispatch({ type: 'SELECT_VIDEO', payload: { video } });
              setShowSearchResults(false);
            }}
          />
        )}
      </div>

      {/* Right Section - Navigation Links */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button variant="ghost">
          Dashboard
        </Button>
        <Button variant="ghost">
          Settings
        </Button>
        <Button variant="ghost">
          Profile
        </Button>
      </div>
    </div>
  );
};

export default PracticeHeader;
