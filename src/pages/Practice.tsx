
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PracticeSidebar } from '@/components/practice/PracticeSidebar';
import { PracticeWorkspace } from '@/components/practice/PracticeWorkspace';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Practice = () => {
  return (
    <div className="h-screen flex flex-col w-full overflow-hidden">
      {/* Navigation Breadcrumb - Always visible at top */}
      <div className="border-b bg-background px-4 py-2 flex-shrink-0 z-50">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Practice</span>
          </div>
          <div className="flex items-center space-x-2">
            <SidebarTrigger />
            <span className="text-lg font-semibold">codeRoom Practice</span>
          </div>
        </nav>
      </div>

      {/* Main Content - Takes remaining height */}
      <div className="flex-1 flex w-full min-h-0">
        <SidebarProvider defaultOpen={true}>
          <PracticeSidebar />
          <main className="flex-1 flex flex-col min-w-0">
            <PracticeWorkspace />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Practice;
