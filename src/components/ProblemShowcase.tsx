
import React, { useState } from 'react';
import { Code2, Lightbulb, Clock, TrendingUp, CheckCircle, Copy } from 'lucide-react';

const ProblemShowcase = () => {
  const [activeTab, setActiveTab] = useState('approach');
  const [copied, setCopied] = useState(false);

  const problem = {
    title: "Two Sum Problem",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    approach: `1. **Brute Force Approach (O(n²))**
   • Use nested loops to check every pair
   • Time: O(n²), Space: O(1)
   • Simple but inefficient for large inputs

2. **Hash Map Approach (O(n)) - Optimal**
   • Store numbers and their indices in a hash map
   • For each number, check if (target - number) exists
   • Time: O(n), Space: O(n)
   • Single pass solution

3. **Two Pointer Approach (O(n log n))**
   • Sort the array first (with original indices)
   • Use two pointers from start and end
   • Move pointers based on sum comparison
   • Time: O(n log n), Space: O(n)`,
    code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Hash Map Approach - Optimal Solution
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Hash map to store number and its index
        num_map = {}
        
        for i, num in enumerate(nums):
            # Calculate the complement
            complement = target - num
            
            # Check if complement exists in map
            if complement in num_map:
                return [num_map[complement], i]
            
            # Store current number and index
            num_map[num] = i
        
        return []  # No solution found

# Example usage:
# nums = [2, 7, 11, 15], target = 9
# Output: [0, 1] (nums[0] + nums[1] = 2 + 7 = 9)`,
    complexity: {
      time: "O(n)",
      space: "O(n)",
      optimal: true
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(problem.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 sm:w-72 h-40 sm:h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4 sm:mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            Problem Solving Approach
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
            Learn Through <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Examples</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            See how we break down complex problems into manageable solutions 
            with multiple approaches and optimized implementations.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">{problem.title}</h3>
              <span className="self-start sm:self-auto px-3 sm:px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30">
                {problem.difficulty}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{problem.description}</p>
          </div>

          <div className="border-b border-white/10">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('approach')}
                className={`flex-shrink-0 px-6 sm:px-8 py-4 font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === 'approach'
                    ? 'border-blue-400 text-blue-400 bg-blue-500/10'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Lightbulb className="w-4 h-4 inline mr-2" />
                <span className="hidden sm:inline">Approach</span>
                <span className="sm:hidden">Method</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex-shrink-0 px-6 sm:px-8 py-4 font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === 'code'
                    ? 'border-purple-400 text-purple-400 bg-purple-500/10'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Code2 className="w-4 h-4 inline mr-2" />
                <span className="hidden sm:inline">Implementation</span>
                <span className="sm:hidden">Code</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'approach' && (
              <div className="space-y-6 sm:space-y-8">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed font-sans text-sm sm:text-base lg:text-lg overflow-x-auto">
                    {problem.approach}
                  </pre>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 sm:p-6 rounded-xl">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mb-3" />
                    <div className="text-xs sm:text-sm text-gray-400 mb-1">Time Complexity</div>
                    <div className="font-bold text-blue-400 text-lg sm:text-xl">{problem.complexity.time}</div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 sm:p-6 rounded-xl">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mb-3" />
                    <div className="text-xs sm:text-sm text-gray-400 mb-1">Space Complexity</div>
                    <div className="font-bold text-purple-400 text-lg sm:text-xl">{problem.complexity.space}</div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-xl sm:col-span-2 lg:col-span-1">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mb-3" />
                    <div className="text-xs sm:text-sm text-gray-400 mb-1">Optimal Solution</div>
                    <div className="font-bold text-emerald-400 text-lg sm:text-xl">
                      {problem.complexity.optimal ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                  <span className="text-gray-400 text-sm">Python Implementation</span>
                  <button
                    onClick={copyCode}
                    className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 overflow-x-auto border border-gray-700">
                  <pre className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    <code>{problem.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemShowcase;
