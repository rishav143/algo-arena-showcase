
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { VideoResult } from '../../../types/practice';

interface SearchBarProps {
  onResults: (results: VideoResult[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onResults([]);
      return;
    }

    // Mock search results with your video at the top
    const mockResults: VideoResult[] = [
      {
        id: 'your-video-1',
        title: `${searchQuery} - Complete Tutorial by Rishav Engineering`,
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        channel: 'Rishav Engineering',
        isOwn: true,
        url: 'https://youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'other-video-1',
        title: `${searchQuery} Explained`,
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        channel: 'Other Channel',
        isOwn: false,
        url: 'https://youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'other-video-2',
        title: `Learn ${searchQuery} Fast`,
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        channel: 'Another Channel',
        isOwn: false,
        url: 'https://youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ];

    onResults(mockResults);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search for problems, algorithms, data structures..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10"
      />
    </form>
  );
};

export default SearchBar;
