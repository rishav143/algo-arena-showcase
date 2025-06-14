
import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProjectSidebar from './ProjectSidebar';
import PracticeWorkspace from './PracticeWorkspace';

const PracticeLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navigation />
      
      <div className="flex flex-1 pt-20">
        <ProjectSidebar />
        
        <main className="flex-1 min-w-0 flex flex-col">
          <PracticeWorkspace />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default PracticeLayout;
