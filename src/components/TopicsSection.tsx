
import React from 'react';
import { ChevronRight, Clock, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopicsSection = () => {
  const topics = [
    {
      title: "Arrays & Strings",
      description: "Master fundamental data structures and string manipulation techniques",
      problems: 25,
      difficulty: "Beginner",
      color: "from-emerald-400 to-cyan-400",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-400",
      route: "/arrays-strings"
    },
    {
      title: "Linked Lists",
      description: "Understand pointer manipulation and linked data structures",
      problems: 18,
      difficulty: "Beginner",
      color: "from-blue-400 to-indigo-400",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
      route: "/linked-lists"
    },
    {
      title: "Stacks & Queues",
      description: "Learn LIFO and FIFO data structures with practical applications",
      problems: 15,
      difficulty: "Intermediate",
      color: "from-yellow-400 to-orange-400",
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-400",
      route: "/stacks-queues"
    },
    {
      title: "Trees & Graphs",
      description: "Explore hierarchical and network data structures",
      problems: 32,
      difficulty: "Intermediate",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-400",
      route: "/trees-graphs"
    },
    {
      title: "Dynamic Programming",
      description: "Master optimization techniques and memoization strategies",
      problems: 28,
      difficulty: "Advanced",
      color: "from-red-400 to-pink-400",
      bgColor: "bg-red-500/10",
      textColor: "text-red-400",
      route: "/dynamic-programming"
    },
    {
      title: "Sorting & Searching",
      description: "Efficient algorithms for data organization and retrieval",
      problems: 20,
      difficulty: "Intermediate",
      color: "from-indigo-400 to-purple-400",
      bgColor: "bg-indigo-500/10",
      textColor: "text-indigo-400",
      route: "/sorting-searching"
    }
  ];

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Advanced': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Structured Learning Path
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Explore DSA <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Topics</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each topic includes comprehensive explanations, multiple approaches, 
            and hands-on coding exercises to strengthen your understanding.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <Link 
              key={index}
              to={topic.route}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${topic.color} shadow-lg`}></div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyStyle(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {topic.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="font-medium">{topic.problems} Problems</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>~2 weeks</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Start Learning</span>
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${topic.color}`}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
