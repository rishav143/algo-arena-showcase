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

interface VideoSuggestion {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  isMyVideo?: boolean;
}

const PracticeNavigation: React.FC = () => {
  const { dispatch } = usePractice();
  const [searchQuery, setSearchQuery] = useState('');
  const [videoSuggestions, setVideoSuggestions] = useState<VideoSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Generate video suggestions based on search query
  const generateVideoSuggestions = (query: string): VideoSuggestion[] => {
    if (!query.trim()) return [];

    // Suggestion titles are generic, do not use the user's input
    const myVideos: VideoSuggestion[] = [
      {
        id: 'my-1',
        title: `How To Master Coding - Complete Tutorial by Rishav Engineering`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg',
        isMyVideo: true
      },
      {
        id: 'my-2',
        title: `Advanced Programming Principles - Rishav Engineering`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg',
        isMyVideo: true
      }
    ];

    // Generic popular programming/video titles (no direct use of query)
    const otherVideos: VideoSuggestion[] = [
      {
        id: 'yt-1',
        title: `Popular Coding Tips & Tricks`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 'yt-2',
        title: `Best Practices for Programmers`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 'yt-3',
        title: `How to Solve Coding Challenges`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/placeholder.svg'
      }
    ];

    return [...myVideos, ...otherVideos];
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const suggestions = generateVideoSuggestions(searchQuery);
      setVideoSuggestions(suggestions);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setVideoSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  }, [searchQuery]);

  const handleVideoSelect = (video: VideoSuggestion) => {
    // Set search results with selected video first
    const allResults = videoSuggestions.map(v => ({
      id: v.id,
      title: v.title,
      url: v.url,
      thumbnail: v.thumbnail
    }));

    dispatch({ type: 'SET_SEARCH_RESULTS', payload: { results: allResults } });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: { query: searchQuery } });
    dispatch({ type: 'SET_VIDEO_URL', payload: { url: video.url } });
    
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && videoSuggestions[selectedIndex]) {
      handleVideoSelect(videoSuggestions[selectedIndex]);
    } else if (videoSuggestions.length > 0) {
      handleVideoSelect(videoSuggestions[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || videoSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < videoSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : videoSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleVideoSelect(videoSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
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
              onKeyDown={handleKeyDown}
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

        {/* Video Suggestions Dropdown */}
        {showSuggestions && videoSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
            {videoSuggestions.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center space-x-3 border-b border-gray-100 last:border-b-0 ${
                  index === selectedIndex ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <img 
                  src={video.thumbnail} 
                  alt="" 
                  className="w-16 h-12 object-cover rounded bg-gray-200"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 line-clamp-2">
                    {video.title}
                  </div>
                  {video.isMyVideo && (
                    <div className="text-xs text-indigo-600 font-medium mt-1">
                      Rishav Engineering
                    </div>
                  )}
                </div>
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
