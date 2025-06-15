import React, { useRef, useEffect } from 'react';
import { Card } from '../ui/card';

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  isUserVideo: boolean;
}

interface VideoSearchResultsProps {
  results: Video[];
  onClose: () => void;
  onSelectVideo: (video: Video) => void;
}

const VideoSearchResults: React.FC<VideoSearchResultsProps> = ({
  results,
  onClose,
  onSelectVideo,
}) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const userVideos = results.filter(video => video.isUserVideo);
  const otherVideos = results.filter(video => !video.isUserVideo);

  return (
    <Card 
      ref={resultsRef}
      className="absolute top-full left-0 right-0 mt-1 max-h-96 overflow-y-auto z-50 bg-white shadow-lg border"
    >
      <div className="p-4 space-y-4">
        {/* Your Videos Section */}
        {userVideos.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Your YouTube Videos</h3>
            <div className="space-y-2">
              {userVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => onSelectVideo(video)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {video.title}
                    </p>
                    <p className="text-xs text-blue-600">My Video</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Videos Section */}
        {otherVideos.length > 0 && (
          <div>
            {userVideos.length > 0 && <hr className="my-4" />}
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Additional Videos</h3>
            <div className="space-y-2">
              {otherVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => onSelectVideo(video)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No videos found</p>
        )}
      </div>
    </Card>
  );
};

export default VideoSearchResults;
