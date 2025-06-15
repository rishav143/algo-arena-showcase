
import React from 'react';
import { PracticeProvider } from '@/contexts/PracticeContext';
import PracticeLayout from '@/components/practice/PracticeLayout';

const Practice: React.FC = () => {
  return (
    <PracticeProvider>
      <div className="h-screen w-screen overflow-hidden">
        <PracticeLayout />
      </div>
    </PracticeProvider>
  );
};

export default Practice;
