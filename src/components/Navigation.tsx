
import React, { useState } from 'react';
import { Code, Menu, X, Sparkles, BookOpen, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleTopicsClick = () => {
    if (location.pathname === '/') {
      // If on homepage, scroll to topics section
      const topicsElement = document.getElementById('topics');
      if (topicsElement) {
        topicsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200/50 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-1 sm:p-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              DSA Master
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {location.pathname === '/topics' ? (
              <Link 
                to="/#topics"
                onClick={handleTopicsClick}
                className="flex items-center space-x-1 text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-lg hover:bg-cyan-50"
              >
                <Home className="w-4 h-4" />
                <span>Home Topics</span>
              </Link>
            ) : (
              <Link 
                to="/topics" 
                className="flex items-center space-x-1 text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-lg hover:bg-cyan-50"
              >
                <BookOpen className="w-4 h-4" />
                <span>Topics</span>
              </Link>
            )}
            <a href="#problems" className="text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-lg hover:bg-gray-50">
              Problems
            </a>
            <a href="#practice" className="text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-lg hover:bg-gray-50">
              Practice
            </a>
            <a href="#about" className="text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-lg hover:bg-gray-50">
              About
            </a>
            <button className="group relative px-3 lg:px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-sm lg:text-base font-medium">Start</span>
            </button>
          </div>

          {/* Mobile menu for medium screens */}
          <div className="hidden sm:flex md:hidden items-center space-x-2">
            {location.pathname === '/topics' ? (
              <Link 
                to="/#topics"
                onClick={handleTopicsClick}
                className="flex items-center space-x-1 text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 px-2 py-1 rounded-lg hover:bg-cyan-50"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </Link>
            ) : (
              <Link 
                to="/topics" 
                className="flex items-center space-x-1 text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 px-2 py-1 rounded-lg hover:bg-cyan-50"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Topics</span>
              </Link>
            )}
            <button className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span className="text-sm font-medium">Start</span>
            </button>
          </div>

          <button 
            className="sm:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-lg shadow-lg mx-2 mb-2">
            <div className="py-2 space-y-1">
              {location.pathname === '/topics' ? (
                <Link 
                  to="/#topics"
                  onClick={() => {
                    handleTopicsClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2.5 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors mx-2"
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">Home Topics</span>
                </Link>
              ) : (
                <Link 
                  to="/topics" 
                  className="flex items-center space-x-2 px-3 py-2.5 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">DSA Topics</span>
                </Link>
              )}
              <a 
                href="#problems" 
                className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Problems
              </a>
              <a 
                href="#practice" 
                className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Practice
              </a>
              <a 
                href="#about" 
                className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <div className="px-2 pt-2 pb-1">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Get Started</span>
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
