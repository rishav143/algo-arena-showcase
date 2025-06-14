
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Play, Video, Home, ChevronRight, PanelLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Link } from 'react-router-dom';

interface PracticeHeaderProps {
  onVideoSelect: (video: any) => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
  onToggleSidebar?: () => void;
  theme: string;
}

export const PracticeHeader: React.FC<PracticeHeaderProps> = ({ 
  onVideoSelect, 
  onRunCode, 
  onSubmitCode,
  onToggleSidebar,
  theme
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockVideos = [
    {
      id: '1',
      title: 'Two Sum Problem - Complete Solution',
      channel: 'Rishav Engineering',
      duration: '15:30',
      isMyVideo: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: '2', 
      title: 'Array Problems Explained',
      channel: 'CodeWithMosh',
      duration: '22:15',
      isMyVideo: false,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Binary Search Implementation',
      channel: 'Rishav Engineering', 
      duration: '18:45',
      isMyVideo: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const handleVideoSelect = (video: any) => {
    console.log('Selected video:', video);
    onVideoSelect(video);
    setSearchOpen(false);
  };

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 border-gray-700 text-gray-100';
      case 'monokai':
        return 'bg-gray-700 border-gray-600 text-green-400';
      case 'dracula':
        return 'bg-purple-800 border-purple-700 text-purple-100';
      case 'github':
        return 'bg-gray-50 border-gray-300 text-gray-900';
      case 'vscode':
        return 'bg-gray-700 border-gray-600 text-blue-200';
      default:
        return 'bg-background border-border text-foreground';
    }
  };

  return (
    <div className={`border-b p-3 ${getThemeClasses(theme)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {onToggleSidebar && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onToggleSidebar}>
                <PanelLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">CodeRoom Practice</h1>
              <nav className="flex items-center space-x-1 text-xs opacity-70">
                <Link to="/" className="flex items-center hover:opacity-100">
                  <Home className="w-3 h-3 mr-1" />
                  Home
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="font-medium">Practice</span>
              </nav>
            </div>
          </div>
          
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
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
          <Button variant="outline" size="sm" onClick={onRunCode}>
            Run Code
          </Button>
          <Button size="sm" onClick={onSubmitCode}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
