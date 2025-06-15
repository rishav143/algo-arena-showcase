
import React from 'react';
import Navigation from '../components/Navigation';
import PracticeLayout from '../components/practice/PracticeLayout';

const Practice = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <PracticeLayout />
    </div>
  );
};

export default Practice;
