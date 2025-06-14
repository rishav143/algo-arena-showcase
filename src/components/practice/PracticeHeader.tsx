
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Play, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { VideoData } from '@/hooks/useVideoManager';

interface PracticeHeaderProps {
  onVideoSelect: (video: VideoData) => void;
  onVideoSearch: (query: string) => VideoData[];
  searchResults: VideoData[];
}

export const PracticeHeader: React.FC<PracticeHeaderProps> = ({ 
  onVideoSelect, 
  onVideoSearch, 
  searchResults 
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleVideoSelect = (video: VideoData) => {
    onVideoSelect(video);
    setSearchOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onVideoSearch(query);
  };

  return (
    <div className="border-b bg-background p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">CodeRoom Practice</h1>
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Problems & Videos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Search Problems & Video Tutorials</DialogTitle>
              </DialogHeader>
              <Command>
                <CommandInput 
                  placeholder="Search for coding problems..."
                  value={searchQuery}
                  onValueChange={handleSearch}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  
                  {searchResults.filter(video => video.isMyVideo).length > 0 && (
                    <CommandGroup heading="Rishav Engineering Videos">
                      {searchResults
                        .filter(video => video.isMyVideo)
                        .map((video) => (
                          <CommandItem
                            key={video.id}
                            onSelect={() => handleVideoSelect(video)}
                            className="flex items-center gap-3 p-3 cursor-pointer"
                          >
                            <div className="p-2 bg-red-100 rounded">
                              <Video className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{video.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {video.channel} • {video.duration}
                              </div>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Play className="w-4 h-4" />
                            </Button>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  )}
                  
                  {searchResults.filter(video => !video.isMyVideo).length > 0 && (
                    <CommandGroup heading="Other Videos">
                      {searchResults
                        .filter(video => !video.isMyVideo)
                        .map((video) => (
                          <CommandItem
                            key={video.id}
                            onSelect={() => handleVideoSelect(video)}
                            className="flex items-center gap-3 p-3 cursor-pointer"
                          >
                            <div className="p-2 bg-gray-100 rounded">
                              <Video className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{video.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {video.channel} • {video.duration}
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Run Code
          </Button>
          <Button size="sm">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
