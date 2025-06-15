
import React from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePractice } from '@/contexts/PracticeContext';

const VideoPanel: React.FC = () => {
  const { state, dispatch } = usePractice();

  const handleClose = () => {
    dispatch({ type: 'SET_VIDEO_URL', payload: { url: null } });
  };

  if (!state.videoUrl) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No video selected</h3>
          <p className="text-gray-500">Search for coding problems to find related videos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
          <Play className="w-5 h-5" />
          <span className="font-medium">Video Tutorial</span>
        </div>
        
        <Button
          onClick={handleClose}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Video Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            src={state.videoUrl}
            title="Video Tutorial"
            className="w-full h-full rounded-lg"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;
