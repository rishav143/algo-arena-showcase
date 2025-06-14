
import React, { useState } from 'react';
import { Code, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative p-3 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl group-hover:scale-105 transition-all duration-300">
              <Code className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                DSA Master
              </span>
              <span className="text-xs sm:text-sm text-gray-500 hidden sm:block font-medium">Learn • Practice • Excel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <a 
              href="#topics"
              className="group relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              <BookOpen className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Topics</span>
            </a>
            
            <a 
              href="#problems" 
              className="group relative text-gray-700 hover:text-purple-600 font-semibold transition-all duration-300 px-5 py-3 rounded-xl hover:bg-purple-50"
            >
              Problems
            </a>
            
            <a 
              href="#practice" 
              className="group relative text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-300 px-5 py-3 rounded-xl hover:bg-indigo-50"
            >
              Practice
            </a>
            
            <a 
              href="#about" 
              className="group relative text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-300 px-5 py-3 rounded-xl hover:bg-emerald-50"
            >
              About
            </a>
            
            <button className="group relative ml-4 px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 flex items-center gap-2 font-bold">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden sm:flex md:hidden items-center space-x-4">
            <a 
              href="#topics"
              className="group flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Topics</span>
            </a>
            <button className="group px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-semibold">Start</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="sm:hidden relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-full left-4 right-4 mt-3 bg-white/98 backdrop-blur-xl border border-gray-200 rounded-3xl animate-fade-in">
            <div className="py-6 space-y-1">
              <a 
                href="#topics"
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center space-x-4 px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all duration-300 mx-4"
              >
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="font-bold text-lg">DSA Topics</span>
                  <p className="text-sm text-gray-500">Explore data structures</p>
                </div>
              </a>
              
              <a 
                href="#problems" 
                className="group flex items-center space-x-4 px-6 py-4 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-2xl transition-all duration-300 mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Code className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="font-bold text-lg">Problems</span>
                  <p className="text-sm text-gray-500">Practice coding challenges</p>
                </div>
              </a>
              
              <a 
                href="#practice" 
                className="group flex items-center space-x-4 px-6 py-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all duration-300 mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <span className="font-bold text-lg">Practice</span>
                  <p className="text-sm text-gray-500">Hands-on exercises</p>
                </div>
              </a>
              
              <a 
                href="#about" 
                className="group flex items-center space-x-4 px-6 py-4 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl transition-all duration-300 mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="font-bold text-lg">About</span>
                  <p className="text-sm text-gray-500">Learn more about us</p>
                </div>
              </a>
              
              <div className="px-4 pt-6 pb-2">
                <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 font-bold text-lg">
                  <Sparkles className="w-5 h-5" />
                  <span>Get Started Now</span>
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
