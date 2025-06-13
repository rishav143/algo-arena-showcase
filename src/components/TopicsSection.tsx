
import React from 'react';
import { ChevronRight, Clock, Star } from 'lucide-react';

const TopicsSection = () => {
  const topics = [
    {
      title: "Arrays & Strings",
      description: "Master fundamental data structures and string manipulation techniques",
      problems: 25,
      difficulty: "Beginner",
      color: "bg-green-500"
    },
    {
      title: "Linked Lists",
      description: "Understand pointer manipulation and linked data structures",
      problems: 18,
      difficulty: "Beginner",
      color: "bg-blue-500"
    },
    {
      title: "Stacks & Queues",
      description: "Learn LIFO and FIFO data structures with practical applications",
      problems: 15,
      difficulty: "Intermediate",
      color: "bg-yellow-500"
    },
    {
      title: "Trees & Graphs",
      description: "Explore hierarchical and network data structures",
      problems: 32,
      difficulty: "Intermediate",
      color: "bg-purple-500"
    },
    {
      title: "Dynamic Programming",
      description: "Master optimization techniques and memoization strategies",
      problems: 28,
      difficulty: "Advanced",
      color: "bg-red-500"
    },
    {
      title: "Sorting & Searching",
      description: "Efficient algorithms for data organization and retrieval",
      problems: 20,
      difficulty: "Intermediate",
      color: "bg-indigo-500"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Explore DSA Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each topic includes comprehensive explanations, multiple approaches, 
            and hands-on coding exercises to strengthen your understanding.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {topic.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {topic.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  <span>{topic.problems} Problems</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>~2 weeks</span>
                </div>
              </div>
              
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                <span>Start Learning</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
