
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProjectSidebar from './ProjectSidebar';
import PracticeWorkspace from './PracticeWorkspace';

const PracticeLayout = () => {
  const { state } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navigation />
      
      <div className="flex flex-1 pt-20">
        <ProjectSidebar />
        
        {/* Main content area that expands to fill remaining space */}
        <div className="flex-1 min-w-0 flex flex-col">
          <PracticeWorkspace />
          
          {/* Footer positioned at bottom of main content */}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeLayout;
