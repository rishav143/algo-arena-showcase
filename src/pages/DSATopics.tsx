
import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Star, Code, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '../components/Navigation';

const DSATopics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const problems = [
    // Arrays & Strings
    { id: 1, title: "Two Sum", category: "Arrays & Strings", difficulty: "Easy", time: "15 min", solved: 1250 },
    { id: 2, title: "Reverse String", category: "Arrays & Strings", difficulty: "Easy", time: "10 min", solved: 980 },
    { id: 3, title: "Container With Most Water", category: "Arrays & Strings", difficulty: "Medium", time: "25 min", solved: 750 },
    { id: 4, title: "Longest Substring Without Repeating", category: "Arrays & Strings", difficulty: "Medium", time: "30 min", solved: 650 },
    { id: 5, title: "Median of Two Sorted Arrays", category: "Arrays & Strings", difficulty: "Hard", time: "45 min", solved: 320 },
    
    // Linked Lists
    { id: 6, title: "Reverse Linked List", category: "Linked Lists", difficulty: "Easy", time: "20 min", solved: 890 },
    { id: 7, title: "Merge Two Sorted Lists", category: "Linked Lists", difficulty: "Easy", time: "25 min", solved: 720 },
    { id: 8, title: "Add Two Numbers", category: "Linked Lists", difficulty: "Medium", time: "30 min", solved: 580 },
    { id: 9, title: "Copy List with Random Pointer", category: "Linked Lists", difficulty: "Medium", time: "35 min", solved: 410 },
    { id: 10, title: "Merge k Sorted Lists", category: "Linked Lists", difficulty: "Hard", time: "50 min", solved: 280 },
    
    // Trees & Graphs
    { id: 11, title: "Maximum Depth of Binary Tree", category: "Trees & Graphs", difficulty: "Easy", time: "15 min", solved: 1100 },
    { id: 12, title: "Valid Binary Search Tree", category: "Trees & Graphs", difficulty: "Medium", time: "30 min", solved: 540 },
    { id: 13, title: "Binary Tree Level Order Traversal", category: "Trees & Graphs", difficulty: "Medium", time: "25 min", solved: 620 },
    { id: 14, title: "Course Schedule", category: "Trees & Graphs", difficulty: "Medium", time: "40 min", solved: 380 },
    { id: 15, title: "Serialize and Deserialize Binary Tree", category: "Trees & Graphs", difficulty: "Hard", time: "55 min", solved: 200 },
    
    // Dynamic Programming
    { id: 16, title: "Climbing Stairs", category: "Dynamic Programming", difficulty: "Easy", time: "20 min", solved: 950 },
    { id: 17, title: "House Robber", category: "Dynamic Programming", difficulty: "Medium", time: "30 min", solved: 480 },
    { id: 18, title: "Longest Increasing Subsequence", category: "Dynamic Programming", difficulty: "Medium", time: "35 min", solved: 420 },
    { id: 19, title: "Coin Change", category: "Dynamic Programming", difficulty: "Medium", time: "40 min", solved: 380 },
    { id: 20, title: "Edit Distance", category: "Dynamic Programming", difficulty: "Hard", time: "60 min", solved: 180 },
    
    // Stacks & Queues
    { id: 21, title: "Valid Parentheses", category: "Stacks & Queues", difficulty: "Easy", time: "15 min", solved: 1050 },
    { id: 22, title: "Min Stack", category: "Stacks & Queues", difficulty: "Medium", time: "25 min", solved: 650 },
    { id: 23, title: "Evaluate Reverse Polish Notation", category: "Stacks & Queues", difficulty: "Medium", time: "30 min", solved: 520 },
    { id: 24, title: "Sliding Window Maximum", category: "Stacks & Queues", difficulty: "Hard", time: "45 min", solved: 250 },
    
    // Sorting & Searching
    { id: 25, title: "Binary Search", category: "Sorting & Searching", difficulty: "Easy", time: "20 min", solved: 890 },
    { id: 26, title: "Search in Rotated Sorted Array", category: "Sorting & Searching", difficulty: "Medium", time: "30 min", solved: 460 },
    { id: 27, title: "Merge Intervals", category: "Sorting & Searching", difficulty: "Medium", time: "35 min", solved: 520 },
    { id: 28, title: "Find Median from Data Stream", category: "Sorting & Searching", difficulty: "Hard", time: "50 min", solved: 190 }
  ];

  const topics = [
    "all",
    "Arrays & Strings",
    "Linked Lists", 
    "Trees & Graphs",
    "Dynamic Programming",
    "Stacks & Queues",
    "Sorting & Searching"
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || problem.category === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const problemsByDifficulty = {
    Easy: filteredProblems.filter(p => p.difficulty === 'Easy'),
    Medium: filteredProblems.filter(p => p.difficulty === 'Medium'),
    Hard: filteredProblems.filter(p => p.difficulty === 'Hard')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Explore <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">DSA Topics</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master Data Structures & Algorithms with our comprehensive collection of problems
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-lg"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Filter className="text-gray-500 w-5 h-5" />
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-lg"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic === 'all' ? 'All Topics' : topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Problems by Difficulty */}
        <Tabs defaultValue="Easy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/70 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="Easy" className="text-emerald-600 data-[state=active]:bg-emerald-100">
              Easy ({problemsByDifficulty.Easy.length})
            </TabsTrigger>
            <TabsTrigger value="Medium" className="text-yellow-600 data-[state=active]:bg-yellow-100">
              Medium ({problemsByDifficulty.Medium.length})
            </TabsTrigger>
            <TabsTrigger value="Hard" className="text-red-600 data-[state=active]:bg-red-100">
              Hard ({problemsByDifficulty.Hard.length})
            </TabsTrigger>
          </TabsList>

          {['Easy', 'Medium', 'Hard'].map(difficulty => (
            <TabsContent key={difficulty} value={difficulty}>
              <div className="grid gap-6">
                {problemsByDifficulty[difficulty as keyof typeof problemsByDifficulty].map((problem) => (
                  <Card key={problem.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">
                              {problem.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Code className="w-4 h-4" />
                              <span>{problem.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{problem.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{problem.solved.toLocaleString()} solved</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                          Solve Now
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No problems found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSATopics;
