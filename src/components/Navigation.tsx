
import React, { useState } from 'react';
import { Code, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/30 z-50 shadow-xl shadow-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative p-2 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                DSA Master
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">Learn • Practice • Excel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a 
              href="#topics"
              className="group relative flex items-center space-x-2 text-gray-700 hover:text-white font-medium transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:scale-105"
            >
              <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Topics</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            
            <a href="#problems" className="group relative text-gray-700 hover:text-white font-medium transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg hover:scale-105">
              Problems
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            
            <a href="#practice" className="group relative text-gray-700 hover:text-white font-medium transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 hover:shadow-lg hover:scale-105">
              Practice
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            
            <a href="#about" className="group relative text-gray-700 hover:text-white font-medium transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-600 hover:shadow-lg hover:scale-105">
              About
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            
            <button className="group relative ml-4 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-full hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center gap-2 font-semibold">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Get Started</span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden sm:flex md:hidden items-center space-x-3">
            <a 
              href="#topics"
              className="group flex items-center space-x-2 text-gray-700 hover:text-white font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Topics</span>
            </a>
            <button className="group px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium">Start</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="sm:hidden relative p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300 hover:scale-105"
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
          <div className="sm:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl animate-fade-in">
            <div className="py-4 space-y-2">
              <a 
                href="#topics"
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 rounded-xl transition-all duration-300 mx-3"
              >
                <div className="p-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg group-hover:from-cyan-200 group-hover:to-blue-200 transition-colors">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <span className="font-semibold">DSA Topics</span>
                  <p className="text-xs text-gray-500">Explore data structures</p>
                </div>
              </a>
              
              <a 
                href="#problems" 
                className="group flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 mx-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                  <Code className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold">Problems</span>
                  <p className="text-xs text-gray-500">Practice coding challenges</p>
                </div>
              </a>
              
              <a 
                href="#practice" 
                className="group flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 rounded-xl transition-all duration-300 mx-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <span className="font-semibold">Practice</span>
                  <p className="text-xs text-gray-500">Hands-on exercises</p>
                </div>
              </a>
              
              <a 
                href="#about" 
                className="group flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-600 rounded-xl transition-all duration-300 mx-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2 bg-gradient-to-r from-pink-100 to-red-100 rounded-lg group-hover:from-pink-200 group-hover:to-red-200 transition-colors">
                  <BookOpen className="w-4 h-4 text-pink-600" />
                </div>
                <div>
                  <span className="font-semibold">About</span>
                  <p className="text-xs text-gray-500">Learn more about us</p>
                </div>
              </a>
              
              <div className="px-3 pt-4 pb-2">
                <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">
                  <Sparkles className="w-4 h-4" />
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
