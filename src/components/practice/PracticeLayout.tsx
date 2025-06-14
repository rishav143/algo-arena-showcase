
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
        
        <div className="flex-1 min-w-0">
          <PracticeWorkspace />
        </div>
      </div>
      
      <div 
        className={`transition-all duration-200 ease-linear ${
          state === 'expanded' ? 'ml-64' : 'ml-0'
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default PracticeLayout;
