
import React, { useState } from 'react';
import { Code2, Lightbulb, Clock, TrendingUp } from 'lucide-react';

const ProblemShowcase = () => {
  const [activeTab, setActiveTab] = useState('approach');

  const problem = {
    title: "Two Sum Problem",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    approach: `
1. **Brute Force Approach (O(n²))**
   - Use nested loops to check every pair
   - Time: O(n²), Space: O(1)

2. **Hash Map Approach (O(n))**
   - Store numbers and their indices in a hash map
   - For each number, check if (target - number) exists
   - Time: O(n), Space: O(n)

3. **Two Pointer Approach (O(n log n))**
   - Sort the array first
   - Use two pointers from start and end
   - Move pointers based on sum comparison
    `,
    code: `
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
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

# Time Complexity: O(n)
# Space Complexity: O(n)
    `,
    complexity: {
      time: "O(n)",
      space: "O(n)",
      optimal: true
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Problem Solving Approach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we break down complex problems into manageable solutions 
            with multiple approaches and optimized implementations.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{problem.title}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                {problem.difficulty}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{problem.description}</p>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('approach')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'approach'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Lightbulb className="w-4 h-4 inline mr-2" />
                Approach
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'code'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Code2 className="w-4 h-4 inline mr-2" />
                Implementation
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'approach' && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                    {problem.approach}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 mb-2" />
                    <div className="text-sm text-gray-600">Time Complexity</div>
                    <div className="font-semibold text-blue-600">{problem.complexity.time}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600 mb-2" />
                    <div className="text-sm text-gray-600">Space Complexity</div>
                    <div className="font-semibold text-purple-600">{problem.complexity.space}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <span className="text-green-600 text-xl mb-2 block">✓</span>
                    <div className="text-sm text-gray-600">Optimal Solution</div>
                    <div className="font-semibold text-green-600">
                      {problem.complexity.optimal ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm leading-relaxed">
                  <code>{problem.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemShowcase;
