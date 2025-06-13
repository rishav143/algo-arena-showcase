
import React, { useState } from 'react';
import { Code, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DSA Master</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#topics" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Topics
            </a>
            <a href="#problems" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Problems
            </a>
            <a href="#practice" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Practice
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="py-4 space-y-4">
              <a href="#topics" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                Topics
              </a>
              <a href="#problems" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                Problems
              </a>
              <a href="#practice" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                Practice
              </a>
              <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                About
              </a>
              <div className="px-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors">
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
