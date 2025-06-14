
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PracticeSidebar } from '@/components/practice/PracticeSidebar';
import { PracticeWorkspace } from '@/components/practice/PracticeWorkspace';

const Practice = () => {
  return (
    <div className="h-screen flex flex-col w-full">
      {/* Main Content with Sidebar */}
      <div className="flex-1 flex w-full">
        <SidebarProvider defaultOpen={true}>
          <div className="flex w-full h-full">
            <PracticeSidebar />
            <main className="flex-1 flex flex-col">
              <PracticeWorkspace />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Practice;
