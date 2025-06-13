
import React from 'react';
import { Code, BookOpen, Target, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-8 shadow-2xl">
            <Code className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Master <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Data Structures</span>
            <br />
            & <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Algorithms</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Elevate your coding skills with our comprehensive learning platform featuring 
            interactive content, detailed problem-solving approaches, and clean implementations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <BookOpen className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Structured Learning</h3>
              <p className="text-gray-300">Progressive curriculum designed to build your DSA knowledge step by step.</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Target className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Multiple Approaches</h3>
              <p className="text-gray-300">Learn different solution strategies for each problem with complexity analysis.</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Code className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Clean Code</h3>
              <p className="text-gray-300">Well-documented, optimized implementations for better understanding.</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8 mb-12">
          <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 flex items-center gap-3 border border-cyan-400/20">
            <span className="relative z-10">Start Learning Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button className="px-10 py-5 bg-white/10 backdrop-blur-lg text-white rounded-2xl text-lg font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            Browse Topics
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
