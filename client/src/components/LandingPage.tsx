import React from 'react';
import { Brain, Video, Target, BookOpen, Users, Calendar, Briefcase, ArrowRight, Play } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center items-center mb-8">
              <div className="bg-primary-600 p-6 rounded-full shadow-2xl">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              PM Hub
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your all-in-one platform for Product Management recruiting success
            </p>
            
            {/* Description */}
            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              From AI-powered interview practice to networking guides and job opportunities, 
              we've got everything you need to land your dream PM role.
            </p>
            
            {/* CTA Button */}
            <button
              onClick={onEnterApp}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center mx-auto"
            >
              <Play className="w-8 h-8 mr-4" />
              Take Me There
              <ArrowRight className="w-8 h-8 ml-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform covers every aspect of PM recruiting, 
              from interview prep to landing your first role.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Interview Practice */}
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Interview Practice</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Practice with AI-powered video interviews that feel like real PM interviews. 
                Get instant feedback and improve your skills.
              </p>
            </div>

            {/* Question Bank */}
            <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-indigo-200">
              <div className="bg-indigo-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Question Bank</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Choose specific questions to practice with AI feedback and detailed analysis. 
                Master every type of PM interview question.
              </p>
            </div>

            {/* Interview Prep Guide */}
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Interview Prep Guide</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Comprehensive guides for internship and new grad PM interviews. 
                Learn the frameworks and strategies that work.
              </p>
            </div>

            {/* Networking Guide */}
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Networking Guide</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Learn how to network effectively in the PM community. 
                Build meaningful connections that lead to opportunities.
              </p>
            </div>

            {/* Recruiting Timelines */}
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Recruiting Timelines</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Stay on track with detailed PM recruiting timelines. 
                Never miss important deadlines or opportunities.
              </p>
            </div>

            {/* Job Opportunities */}
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Opportunities</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Find PM internships and new grad positions. 
                Discover opportunities at top companies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Aspiring PMs
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of students and new grads who are preparing for their PM careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100 text-lg">Practice Questions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100 text-lg">Company Questions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100 text-lg">Free to Use</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Land Your Dream PM Role?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Start practicing today and join the next generation of Product Managers
          </p>
          <button
            onClick={onEnterApp}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center mx-auto"
          >
            <Play className="w-8 h-8 mr-4" />
            Get Started Now
            <ArrowRight className="w-8 h-8 ml-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
