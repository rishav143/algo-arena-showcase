
import React from 'react';
import { PracticeProvider } from '../contexts/PracticeContext';
import PracticeLayout from '../components/practice/PracticeLayout';

const Practice = () => {
  return (
    <PracticeProvider>
      <PracticeLayout />
    </PracticeProvider>
  );
};

export default Practice;
