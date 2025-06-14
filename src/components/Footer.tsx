
import React from 'react';
import { Code, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 sm:w-40 h-32 sm:h-40 bg-blue-500 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 sm:w-40 h-32 sm:h-40 bg-purple-500 rounded-full filter blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">DSA Master</span>
            </div>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-md leading-relaxed text-sm sm:text-base">
              Master Data Structures and Algorithms with our comprehensive platform 
              featuring structured content, detailed approaches, and clean implementations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Learning Topics</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Arrays & Strings</li>
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Linked Lists</li>
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Trees & Graphs</li>
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Dynamic Programming</li>
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Sorting & Searching</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Resources</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Problem Sets</li>
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Code Examples</li>
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Study Guide</li>
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Interview Prep</li>
              <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-300">Practice Tests</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 sm:mt-16 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 flex items-center gap-2 text-sm sm:text-base">
              &copy; 2024 DSA Master. Built with 
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              for learning.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
