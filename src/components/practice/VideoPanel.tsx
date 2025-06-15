
import React from 'react';
import { Play, Volume2, Maximize, Settings } from 'lucide-react';
import { usePracticeContext } from '../../contexts/PracticeContext';

const VideoPanel = () => {
  const { selectedVideo } = usePracticeContext();

  if (!selectedVideo) {
    return (
      <div className="h-full flex items-center justify-center text-center p-4">
        <div className="text-gray-400">
          <Play className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No video selected</p>
          <p className="text-xs mt-1">Search for tutorials to start learning</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-slate-700">
        <h3 className="text-sm font-medium text-gray-300 truncate">{selectedVideo.title}</h3>
        <p className="text-xs text-gray-500">{selectedVideo.channel}</p>
      </div>

      <div className="flex-1 bg-black relative">
        {/* Video Player Placeholder */}
        <div className="w-full h-64 bg-black flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Play className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm">Video Player</p>
            <p className="text-xs">Playing: {selectedVideo.title}</p>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/20 rounded">
                <Play className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded">
                <Volume2 className="w-5 h-5" />
              </button>
              <span className="text-sm">0:00 / {selectedVideo.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/20 rounded">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 max-h-32 overflow-auto">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          Learn how to solve coding problems step by step with detailed explanations and multiple approaches.
        </p>
      </div>
    </div>
  );
};

export default VideoPanel;
