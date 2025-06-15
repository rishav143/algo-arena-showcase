
import React from 'react';
import { Play, Youtube, Clock, Eye } from 'lucide-react';
import { usePracticeContext } from '../../contexts/PracticeContext';

interface VideoSearchResultsProps {
  query: string;
  onClose: () => void;
}

const VideoSearchResults: React.FC<VideoSearchResultsProps> = ({ query, onClose }) => {
  const { setActiveRightTab, setSelectedVideo } = usePracticeContext();

  // Mock video data - in real implementation, this would come from YouTube API
  const mockVideos = [
    {
      id: '1',
      title: `${query} Tutorial - Complete Guide`,
      channel: 'Your Channel',
      thumbnail: '/placeholder.svg',
      duration: '15:30',
      views: '1.2M',
      isYourVideo: true
    },
    {
      id: '2',
      title: `Learn ${query} with Examples`,
      channel: 'Code Academy',
      thumbnail: '/placeholder.svg',
      duration: '22:45',
      views: '854K',
      isYourVideo: false
    },
    {
      id: '3',
      title: `${query} Best Practices`,
      channel: 'Programming Hub',
      thumbnail: '/placeholder.svg',
      duration: '18:12',
      views: '632K',
      isYourVideo: false
    }
  ];

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
    setActiveRightTab('video');
    onClose();
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
      <div className="p-3 border-b border-slate-600">
        <h3 className="text-sm font-medium text-gray-300">Video Suggestions</h3>
      </div>
      
      <div className="divide-y divide-slate-600">
        {mockVideos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => handleVideoSelect(video)}
            className="w-full p-3 hover:bg-slate-700 transition-colors text-left flex items-center gap-3"
          >
            <div className="relative flex-shrink-0">
              <div className="w-16 h-12 bg-slate-600 rounded flex items-center justify-center">
                <Play className="w-6 h-6 text-gray-400" />
              </div>
              {index === 0 && video.isYourVideo && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded">
                  <Youtube className="w-3 h-3" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">{video.title}</h4>
              <p className="text-xs text-gray-400">{video.channel}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {video.views}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoSearchResults;
