
import React from 'react';
import { ArrowLeft, Clock, Star, Code, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '../components/Navigation';

const DynamicProgramming = () => {
  const problems = [
    { id: 1, title: "Climbing Stairs", difficulty: "Easy", time: "20 min", solved: 950, companies: ["Google", "Amazon"] },
    { id: 2, title: "House Robber", difficulty: "Medium", time: "30 min", solved: 480, companies: ["Microsoft", "Apple"] },
    { id: 3, title: "Longest Increasing Subsequence", difficulty: "Medium", time: "35 min", solved: 420, companies: ["Facebook", "Netflix"] },
    { id: 4, title: "Coin Change", difficulty: "Medium", time: "40 min", solved: 380, companies: ["Uber", "Spotify"] },
    { id: 5, title: "Edit Distance", difficulty: "Hard", time: "60 min", solved: 180, companies: ["Google", "Microsoft"] }
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Navigation />
      
      {/* Header */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Dynamic Programming</h1>
            <p className="text-xl text-red-100 max-w-3xl">
              Master optimization techniques and memoization strategies with these challenging problems.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Code className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{problems.length}</div>
              <div className="text-gray-600">Problems</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">~4 weeks</div>
              <div className="text-gray-600">Estimated Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Advanced</div>
              <div className="text-gray-600">Difficulty Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Problems List */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Practice Problems</h2>
          {problems.map((problem) => (
            <Card key={problem.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                        {problem.title}
                      </h3>
                      <Badge className={`${getDifficultyColor(problem.difficulty)} border`}>
                        {problem.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{problem.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{problem.solved.toLocaleString()} solved</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Companies:</span>
                      {problem.companies.map((company, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
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

export default DynamicProgramming;
