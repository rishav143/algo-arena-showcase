
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
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4 sm:mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Structured Learning Path
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Explore DSA <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Topics</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Each topic includes comprehensive explanations, multiple approaches, 
            and hands-on coding exercises to strengthen your understanding.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {topics.map((topic, index) => (
            <Link 
              key={index}
              to={topic.route}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${topic.color} shadow-lg`}></div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getDifficultyStyle(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {topic.description}
                </p>
                
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
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
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 text-sm sm:text-base">
                    <span>Start Learning</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className={`w-8 sm:w-12 h-1 rounded-full bg-gradient-to-r ${topic.color}`}></div>
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
