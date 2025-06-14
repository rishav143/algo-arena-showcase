
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Play, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const PracticeHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockVideos = [
    {
      id: '1',
      title: 'Two Sum Problem - Complete Solution',
      channel: 'Rishav Engineering',
      duration: '15:30',
      isMyVideo: true
    },
    {
      id: '2', 
      title: 'Array Problems Explained',
      channel: 'CodeWithMosh',
      duration: '22:15',
      isMyVideo: false
    },
    {
      id: '3',
      title: 'Binary Search Implementation',
      channel: 'Rishav Engineering', 
      duration: '18:45',
      isMyVideo: true
    }
  ];

  const handleVideoSelect = (video: any) => {
    console.log('Selected video:', video);
    setSearchOpen(false);
  };

  return (
    <div className="border-b bg-background p-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">CodeRoom Practice</h1>
          </div>
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
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Recommended Videos">
                    {mockVideos
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
                  <CommandGroup heading="Other Videos">
                    {mockVideos
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
