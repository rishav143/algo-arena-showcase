
import React from 'react';
import { ArrowLeft, Clock, Star, Code, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '../components/Navigation';

const TreesGraphs = () => {
  const problems = [
    { id: 1, title: "Maximum Depth of Binary Tree", difficulty: "Easy", time: "15 min", solved: 1100, companies: ["Google", "Amazon"] },
    { id: 2, title: "Valid Binary Search Tree", difficulty: "Medium", time: "30 min", solved: 540, companies: ["Microsoft", "Facebook"] },
    { id: 3, title: "Binary Tree Level Order Traversal", difficulty: "Medium", time: "25 min", solved: 620, companies: ["Apple", "Netflix"] },
    { id: 4, title: "Course Schedule", difficulty: "Medium", time: "40 min", solved: 380, companies: ["Uber", "Airbnb"] },
    { id: 5, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", time: "55 min", solved: 200, companies: ["Google", "Microsoft"] }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      {/* Header */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Trees & Graphs</h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-3xl">
              Explore hierarchical and network data structures through these comprehensive problems.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/80 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Code className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{problems.length}</div>
              <div className="text-gray-600 text-sm">Problems</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">~3 weeks</div>
              <div className="text-gray-600 text-sm">Estimated Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 border-0 shadow-lg sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Intermediate</div>
              <div className="text-gray-600 text-sm">Difficulty Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Problems List */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Practice Problems</h2>
          {problems.map((problem) => (
            <Card key={problem.id} className="group hover:shadow-xl transition-shadow duration-200 bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
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
                  
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 self-start lg:self-center flex-shrink-0">
                    Solve Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreesGraphs;
