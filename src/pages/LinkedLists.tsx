import React, { useState, useCallback } from 'react';
import { ArrowLeft, Clock, Star, Code, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '../components/Navigation';
import SearchToolbar from '../components/SearchToolbar';

const LinkedLists = () => {
  const problems = [
    { id: 1, title: "Reverse Linked List", difficulty: "Easy", time: "20 min", solved: 890, companies: ["Google", "Facebook"] },
    { id: 2, title: "Merge Two Sorted Lists", difficulty: "Easy", time: "25 min", solved: 720, companies: ["Amazon", "Microsoft"] },
    { id: 3, title: "Add Two Numbers", difficulty: "Medium", time: "30 min", solved: 580, companies: ["Apple", "Netflix"] },
    { id: 4, title: "Copy List with Random Pointer", difficulty: "Medium", time: "35 min", solved: 410, companies: ["Uber", "Spotify"] },
    { id: 5, title: "Merge k Sorted Lists", difficulty: "Hard", time: "50 min", solved: 280, companies: ["Google", "Amazon"] }
  ];

  const topics = [
    { name: "Arrays & Strings", route: "/arrays-strings", color: "bg-gradient-to-r from-emerald-500 to-cyan-500" },
    { name: "Linked Lists", route: "/linked-lists", color: "bg-gradient-to-r from-blue-500 to-indigo-500" },
    { name: "Stacks & Queues", route: "/stacks-queues", color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
    { name: "Trees & Graphs", route: "/trees-graphs", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "Dynamic Programming", route: "/dynamic-programming", color: "bg-gradient-to-r from-red-500 to-pink-500" },
    { name: "Sorting & Searching", route: "/sorting-searching", color: "bg-gradient-to-r from-indigo-500 to-purple-500" }
  ];

  const [filteredProblems, setFilteredProblems] = useState(problems);

  const handleFilteredProblems = useCallback((filtered: typeof problems) => {
    setFilteredProblems(filtered);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      
      {/* Header */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Linked Lists</h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl">
              Understand pointer manipulation and linked data structures with these essential problems.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Toolbar */}
        <SearchToolbar
          problems={problems}
          onFilteredProblems={handleFilteredProblems}
          currentTopic="Linked Lists"
          topics={topics}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/80 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Code className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{filteredProblems.length}</div>
              <div className="text-gray-600 text-sm">Problems</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">~2 weeks</div>
              <div className="text-gray-600 text-sm">Estimated Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Beginner</div>
              <div className="text-gray-600 text-sm">Difficulty Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Problems List */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Practice Problems {filteredProblems.length !== problems.length && `(${filteredProblems.length} of ${problems.length})`}
          </h2>
          {filteredProblems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No problems found matching your search criteria.</p>
            </div>
          ) : (
            filteredProblems.map((problem) => (
              <Card key={problem.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {problem.title}
                        </h3>
                        <Badge className={`${getDifficultyColor(problem.difficulty)} border self-start flex-shrink-0`}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{problem.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          <span>{problem.solved.toLocaleString()} solved</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-500 flex-shrink-0">Companies:</span>
                        <div className="flex flex-wrap gap-2">
                          {problem.companies.map((company, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 self-start lg:self-center flex-shrink-0">
                      Solve Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedLists;
