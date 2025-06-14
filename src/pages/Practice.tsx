
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import PracticeLayout from '../components/practice/PracticeLayout';

const Practice = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <PracticeLayout />
    </SidebarProvider>
  );
};

export default Practice;
