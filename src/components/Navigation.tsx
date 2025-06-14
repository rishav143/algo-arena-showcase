
import React, { useState } from 'react';
import { Code, Menu, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              DSA Master
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#problems" className="text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 hover:scale-105">
              Problems
            </a>
            <a href="#practice" className="text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 hover:scale-105">
              Practice
            </a>
            <a href="#about" className="text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 hover:scale-105">
              About
            </a>
            <button className="group relative px-4 xl:px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden xl:inline">Get Started</span>
              <span className="xl:hidden">Start</span>
            </button>
          </div>

          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-xl shadow-lg">
            <div className="py-4 space-y-1">
              <a href="#problems" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Problems
              </a>
              <a href="#practice" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Practice
              </a>
              <a href="#about" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                About
              </a>
              <div className="px-4 pt-2">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
