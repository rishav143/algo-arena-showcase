
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import PracticeContent from '../components/practice/PracticeContent';

const Practice = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <PracticeContent />
    </SidebarProvider>
  );
};

export default Practice;
