
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PracticeContextType {
  activeRightTab: 'output' | 'ai' | 'video';
  setActiveRightTab: (tab: 'output' | 'ai' | 'video') => void;
  selectedVideo: any;
  setSelectedVideo: (video: any) => void;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error('usePracticeContext must be used within a PracticeProvider');
  }
  return context;
};

interface PracticeProviderProps {
  children: ReactNode;
}

export const PracticeProvider: React.FC<PracticeProviderProps> = ({ children }) => {
  const [activeRightTab, setActiveRightTab] = useState<'output' | 'ai' | 'video'>('output');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  return (
    <PracticeContext.Provider value={{
      activeRightTab,
      setActiveRightTab,
      selectedVideo,
      setSelectedVideo
    }}>
      {children}
    </PracticeContext.Provider>
  );
};
