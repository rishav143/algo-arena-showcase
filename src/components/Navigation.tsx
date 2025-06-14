
import React, { useState } from 'react';
import { Code, Menu, X, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Code className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200" />
              <div className="absolute -inset-1 bg-indigo-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">codeRoom</span>
              <span className="text-xs text-gray-600 font-medium hidden sm:block">Learn • Practice • Excel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Topics', href: '#topics' },
              { name: 'Problems', href: '#problems' },
              { name: 'Practice', href: '#practice' },
              { name: 'About', href: '#about' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium text-sm rounded-lg hover:bg-gray-50 transition-all duration-200 relative group"
              >
                {item.name}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></div>
              </a>
            ))}
            
            <div className="ml-4 pl-4 border-l border-gray-200">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu className={`w-5 h-5 text-gray-700 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
              <X className={`w-5 h-5 text-gray-700 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-3 space-y-1 border-t border-gray-100 mt-3">
            {[
              { name: 'Topics', href: '#topics' },
              { name: 'Problems', href: '#problems' },
              { name: 'Practice', href: '#practice' },
              { name: 'About', href: '#about' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2.5 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
            
            <div className="pt-3 px-3">
              <button 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
