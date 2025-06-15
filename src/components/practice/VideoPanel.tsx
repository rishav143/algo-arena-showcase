
import React from 'react';
import { usePractice } from '../../contexts/PracticeContext';
import { Play } from 'lucide-react';

const VideoPanel = () => {
  const { state } = usePractice();

  if (!state.activeVideo) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <Play className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No video selected</p>
          <p className="text-sm mt-2">Search for videos to start watching</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Video Player */}
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="w-full h-full">
          {/* Simulated video player - in real app, would use YouTube iframe or video element */}
          <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
            <img
              src={state.activeVideo.thumbnailUrl}
              alt={state.activeVideo.title}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Video Player</p>
                <p className="text-sm opacity-75">
                  {state.activeVideo.isUserVideo ? 'Your Video: ' : ''}
                  {state.activeVideo.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-start space-x-3">
          <img
            src={state.activeVideo.thumbnailUrl}
            alt={state.activeVideo.title}
            className="w-16 h-12 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {state.activeVideo.title}
            </h3>
            {state.activeVideo.isUserVideo && (
              <p className="text-xs text-blue-600 mt-1">My Video</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Click to open in YouTube
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;
