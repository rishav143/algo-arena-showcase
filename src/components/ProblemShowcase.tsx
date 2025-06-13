
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
    <section className="py-24 bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            Problem Solving Approach
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Learn Through <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Examples</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how we break down complex problems into manageable solutions 
            with multiple approaches and optimized implementations.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white">{problem.title}</h3>
              <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30">
                {problem.difficulty}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">{problem.description}</p>
          </div>

          <div className="border-b border-white/10">
            <div className="flex">
              <button
                onClick={() => setActiveTab('approach')}
                className={`px-8 py-4 font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === 'approach'
                    ? 'border-blue-400 text-blue-400 bg-blue-500/10'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Lightbulb className="w-4 h-4 inline mr-2" />
                Approach
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-8 py-4 font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === 'code'
                    ? 'border-purple-400 text-purple-400 bg-purple-500/10'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Code2 className="w-4 h-4 inline mr-2" />
                Implementation
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'approach' && (
              <div className="space-y-8">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed font-sans text-lg">
                    {problem.approach}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-400 mb-3" />
                    <div className="text-sm text-gray-400 mb-1">Time Complexity</div>
                    <div className="font-bold text-blue-400 text-xl">{problem.complexity.time}</div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-400 mb-3" />
                    <div className="text-sm text-gray-400 mb-1">Space Complexity</div>
                    <div className="font-bold text-purple-400 text-xl">{problem.complexity.space}</div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mb-3" />
                    <div className="text-sm text-gray-400 mb-1">Optimal Solution</div>
                    <div className="font-bold text-emerald-400 text-xl">
                      {problem.complexity.optimal ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Python Implementation</span>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto border border-gray-700">
                  <pre className="text-gray-300 text-sm leading-relaxed">
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
