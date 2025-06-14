
import React from 'react';
import { Youtube, Play, Clock, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface VideoData {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  thumbnail: string;
}

interface YouTubeSectionProps {
  problemTitle: string;
  videos: VideoData[];
}

const YouTubeSection: React.FC<YouTubeSectionProps> = ({ problemTitle, videos }) => {
  return (
    <div className="mt-12 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
          <Youtube className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">Video Tutorials</h3>
          <p className="text-gray-400 text-sm">by Rishav Engineering</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="group bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
                  <Play className="w-12 h-12 text-red-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                  {video.title}
                </h4>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <a 
          href="https://youtube.com/@rishavengineering" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Youtube className="w-5 h-5" />
          Visit Rishav Engineering Channel
        </a>
      </div>
    </div>
  );
};

export default YouTubeSection;
