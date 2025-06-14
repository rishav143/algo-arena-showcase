import React from 'react';
import { ArrowLeft, Clock, Star, Code, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '../components/Navigation';
import YouTubeSection from '../components/YouTubeSection';

const LinkedLists = () => {
  const problems = [
    { id: 1, title: "Reverse Linked List", difficulty: "Easy", time: "20 min", solved: 890, companies: ["Google", "Facebook"] },
    { id: 2, title: "Merge Two Sorted Lists", difficulty: "Easy", time: "25 min", solved: 720, companies: ["Amazon", "Microsoft"] },
    { id: 3, title: "Add Two Numbers", difficulty: "Medium", time: "30 min", solved: 580, companies: ["Apple", "Netflix"] },
    { id: 4, title: "Copy List with Random Pointer", difficulty: "Medium", time: "35 min", solved: 410, companies: ["Uber", "Spotify"] },
    { id: 5, title: "Merge k Sorted Lists", difficulty: "Hard", time: "50 min", solved: 280, companies: ["Google", "Amazon"] }
  ];

  const videoTutorials = [
    {
      id: "1",
      title: "Reverse Linked List - Iterative & Recursive Solutions",
      description: "Master both iterative and recursive approaches to reverse a linked list with clear explanations.",
      duration: "16:20",
      views: "22.4K",
      thumbnail: "placeholder"
    },
    {
      id: "2",
      title: "Merge Two Sorted Lists - Step by Step",
      description: "Learn how to merge two sorted linked lists efficiently with pointer manipulation.",
      duration: "13:45",
      views: "18.7K",
      thumbnail: "placeholder"
    },
    {
      id: "3",
      title: "Linked List Cycle Detection - Floyd's Algorithm",
      description: "Understand the two-pointer technique to detect cycles in linked lists.",
      duration: "19:30",
      views: "15.2K",
      thumbnail: "placeholder"
    },
    {
      id: "4",
      title: "Copy List with Random Pointer - Complete Solution",
      description: "Solve this complex linked list problem using hash map and constant space approaches.",
      duration: "24:15",
      views: "11.8K",
      thumbnail: "placeholder"
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      
      {/* Header */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Linked Lists</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Understand pointer manipulation and linked data structures with these essential problems.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Code className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{problems.length}</div>
              <div className="text-gray-600">Problems</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">~2 weeks</div>
              <div className="text-gray-600">Estimated Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Beginner</div>
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
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
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
                  
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    Solve Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* YouTube Video Tutorials Section */}
        <YouTubeSection 
          problemTitle="Linked Lists"
          videos={videoTutorials}
        />
      </div>
    </div>
  );
};

export default LinkedLists;
