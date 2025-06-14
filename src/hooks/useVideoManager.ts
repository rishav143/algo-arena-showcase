
import { useState, useCallback } from 'react';

export interface VideoData {
  id: string;
  title: string;
  channel: string;
  duration: string;
  isMyVideo: boolean;
  description?: string;
  url?: string;
}

export const useVideoManager = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [searchResults, setSearchResults] = useState<VideoData[]>([]);

  const mockVideos: VideoData[] = [
    {
      id: '1',
      title: 'Two Sum Problem - Complete Solution',
      channel: 'Rishav Engineering',
      duration: '15:30',
      isMyVideo: true,
      description: 'Learn how to solve the classic Two Sum problem with multiple approaches.',
      url: 'https://example.com/video1'
    },
    {
      id: '2', 
      title: 'Array Problems Explained',
      channel: 'CodeWithMosh',
      duration: '22:15',
      isMyVideo: false,
      description: 'Comprehensive guide to common array problems.',
      url: 'https://example.com/video2'
    },
    {
      id: '3',
      title: 'Binary Search Implementation',
      channel: 'Rishav Engineering', 
      duration: '18:45',
      isMyVideo: true,
      description: 'Master binary search algorithm with practical examples.',
      url: 'https://example.com/video3'
    }
  ];

  const searchVideos = useCallback((query: string) => {
    const filtered = mockVideos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.channel.toLowerCase().includes(query.toLowerCase())
    );
    
    // Sort to prioritize my videos
    const sorted = filtered.sort((a, b) => {
      if (a.isMyVideo && !b.isMyVideo) return -1;
      if (!a.isMyVideo && b.isMyVideo) return 1;
      return 0;
    });
    
    setSearchResults(sorted);
    return sorted;
  }, []);

  const selectVideo = useCallback((video: VideoData) => {
    setSelectedVideo(video);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return {
    selectedVideo,
    searchResults,
    searchVideos,
    selectVideo,
    clearSelection,
    mockVideos
  };
};
