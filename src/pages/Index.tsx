
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import TopicsSection from '../components/TopicsSection';
import ProblemShowcase from '../components/ProblemShowcase';
import PracticeSection from '../components/PracticeSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="topics">
        <TopicsSection />
      </div>
      <div id="problems">
        <ProblemShowcase />
      </div>
      <div id="practice">
        <PracticeSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
