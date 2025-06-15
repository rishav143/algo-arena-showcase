
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Play, ExternalLink } from 'lucide-react';
import { usePractice } from '../../../contexts/PracticeContext';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  url: string;
  isOwn?: boolean;
}

const VideoPanel = () => {
  const { state } = usePractice();
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock video data - in real implementation, this would come from YouTube API
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Your Channel: Two Sum Problem Explained',
      description: 'Complete walkthrough of the classic Two Sum problem with multiple solutions',
      thumbnail: '/placeholder.svg',
      duration: '15:30',
      url: 'https://youtube.com/watch?v=example1',
      isOwn: true,
    },
    {
      id: '2',
      title: 'Array Algorithms Masterclass',
      description: 'Learn fundamental array algorithms and problem-solving techniques',
      thumbnail: '/placeholder.svg',
      duration: '25:45',
      url: 'https://youtube.com/watch?v=example2',
    },
    {
      id: '3',
      title: 'Dynamic Programming Made Simple',
      description: 'Break down complex DP problems into easy-to-understand concepts',
      thumbnail: '/placeholder.svg',
      duration: '32:15',
      url: 'https://youtube.com/watch?v=example3',
    },
  ];

  useEffect(() => {
    if (state.searchQuery) {
      setSearchQuery(state.searchQuery);
      handleSearch(state.searchQuery);
    }
  }, [state.searchQuery]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredVideos = mockVideos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      );
      
      // Put own videos first
      const sortedVideos = filteredVideos.sort((a, b) => {
        if (a.isOwn && !b.isOwn) return -1;
        if (!a.isOwn && b.isOwn) return 1;
        return 0;
      });
      
      setVideos(sortedVideos);
      setIsLoading(false);
    }, 500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="flex h-full">
      {/* Video Player */}
      <div className="flex-1 flex flex-col">
        {selectedVideo ? (
          <div className="flex-1 bg-black flex items-center justify-center">
            <div className="w-full h-full max-w-4xl max-h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
                <Button
                  onClick={() => window.open(selectedVideo.url, '_blank')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <Play className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg mb-2">No video selected</p>
              <p className="text-sm">Search for videos or select one from the list</p>
            </div>
          </div>
        )}
      </div>

      {/* Video List Sidebar */}
      <div className="w-80 border-l border-gray-200 flex flex-col bg-white">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSearchSubmit} className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coding problems..."
                className="pl-10"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Videos'}
            </Button>
          </form>
        </div>

        {/* Video List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {videos.length === 0 && !isLoading ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">No videos found</p>
                <p className="text-sm">Try searching for a coding problem</p>
              </div>
            ) : (
              <div className="space-y-2">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                      selectedVideo?.id === video.id
                        ? 'bg-indigo-50 border-indigo-200'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex space-x-3">
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {video.title}
                          {video.isOwn && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded">
                              Your Video
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {video.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {video.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default VideoPanel;
