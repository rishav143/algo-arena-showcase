
import React from 'react';
import { Code, BookOpen, Target } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <Code className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master <span className="text-blue-600">Data Structures</span>
            <br />
            & <span className="text-indigo-600">Algorithms</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Structured learning path with detailed approaches, clean code implementations, 
            and step-by-step problem-solving techniques.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Structured Content</h3>
            <p className="text-gray-600">Learn DSA concepts in a logical progression from basics to advanced topics.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Target className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Approaches</h3>
            <p className="text-gray-600">Detailed explanations of different approaches to solve complex problems.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Code className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clean Code</h3>
            <p className="text-gray-600">Well-commented, optimized code implementations for better understanding.</p>
          </div>
        </div>
        
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
          Start Learning Journey
        </button>
      </div>
    </section>
  );
};

export default Hero;
