
import React from 'react';
import { Code, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">DSA Master</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Master Data Structures and Algorithms with structured content, 
              detailed approaches, and clean code implementations.
            </p>
            <div className="flex space-x-4">
              <Github className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Mail className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Topics</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Arrays & Strings</li>
              <li className="hover:text-white cursor-pointer transition-colors">Linked Lists</li>
              <li className="hover:text-white cursor-pointer transition-colors">Trees & Graphs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Dynamic Programming</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Problem Sets</li>
              <li className="hover:text-white cursor-pointer transition-colors">Code Examples</li>
              <li className="hover:text-white cursor-pointer transition-colors">Study Guide</li>
              <li className="hover:text-white cursor-pointer transition-colors">Interview Prep</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DSA Master. Built with passion for learning.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
