
import React from 'react';
import PracticeNavigation from '../components/practice/PracticeNavigation';
import PracticeLayout from '../components/practice/PracticeLayout';
import { PracticeProvider } from '../contexts/PracticeContext';

const Practice = () => {
  return (
    <PracticeProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <PracticeNavigation />
        <PracticeLayout />
      </div>
    </PracticeProvider>
  );
};

export default Practice;
