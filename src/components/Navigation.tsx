
import React, { useState } from 'react';
import { Code, Menu, X, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DSA Master</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#topics" className="text-gray-700 hover:text-blue-600 font-medium">
              Topics
            </a>
            <a href="#problems" className="text-gray-700 hover:text-blue-600 font-medium">
              Problems
            </a>
            <a href="#practice" className="text-gray-700 hover:text-blue-600 font-medium">
              Practice
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              <a 
                href="#topics"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Topics
              </a>
              <a 
                href="#problems" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Problems
              </a>
              <a 
                href="#practice" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Practice
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                About
              </a>
              <div className="px-4 py-2">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
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
