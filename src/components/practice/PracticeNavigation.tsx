
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
// Use the YouTube Search API npm module
import YoutubeSearchApi from 'youtube-search-api';

interface VideoSuggestion {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

const PracticeNavigation: React.FC = () => {
  const { dispatch } = usePractice();
  const [searchQuery, setSearchQuery] = useState('');
  const [videoSuggestions, setVideoSuggestions] = useState<VideoSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Fetch YouTube video suggestions based on user input
  useEffect(() => {
    const fetchYouTubeResults = async (query: string) => {
      if (!query.trim() || query.trim().length < 2) {
        setVideoSuggestions([]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        return;
      }
      try {
        const results = await YoutubeSearchApi.GetListByKeyword(query, false, 5);
        const suggestions = (results.items || [])
          .filter(item => item.type === 'video')
          .map(item => ({
            id: item.id,
            title: item.title,
            url: `https://www.youtube.com/embed/${item.id}`,
            thumbnail: item.thumbnail?.thumbnails?.[0]?.url || ''
          }));
        setVideoSuggestions(suggestions);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } catch (error) {
        setVideoSuggestions([]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    if (searchQuery.trim()) {
      fetchYouTubeResults(searchQuery.trim());
    } else {
      setVideoSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  }, [searchQuery]);

  const handleVideoSelect = (video: VideoSuggestion) => {
    // Set only YouTube search results (filtered)
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
                  {/* No more My Video or custom labels */}
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

