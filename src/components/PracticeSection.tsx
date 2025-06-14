
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Play, Lightbulb, CheckCircle, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PracticeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Code2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Practice Coding
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Write, compile, and run code in multiple languages. Get instant AI assistance when you encounter errors or need help debugging your solutions.
          </p>
          <Link to="/practice">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
              Start Practicing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/60 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Multi-Language Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Practice with JavaScript, Python, Java, C++, and more programming languages in our advanced code editor.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Instant Compilation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Compile and run your code instantly with real-time feedback and comprehensive error detection.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">AI-Powered Help</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get intelligent suggestions and error corrections from our AI assistant to improve your coding skills.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;
