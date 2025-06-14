
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PracticeSidebar } from '@/components/practice/PracticeSidebar';
import { PracticeWorkspace } from '@/components/practice/PracticeWorkspace';

const Practice = () => {
  return (
    <div className="h-screen flex w-full">
      <SidebarProvider defaultOpen={true}>
        <PracticeSidebar />
        <main className="flex-1 flex flex-col">
          <PracticeWorkspace />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Practice;
