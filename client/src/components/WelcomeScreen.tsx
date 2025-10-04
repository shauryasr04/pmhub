import React, { useState } from 'react';
import { Video, Brain, Clock, Play, Briefcase, BookOpen, Users, Calendar, Target } from 'lucide-react';
import { InterviewSettings } from '../types';

interface WelcomeScreenProps {
  onStartInterview: (settings: InterviewSettings) => void;
  onNavigateToInternships: () => void;
  onNavigateToInterviewPrep: () => void;
  onNavigateToNetworking: () => void;
  onNavigateToTimelines: () => void;
  onNavigateToQuestionBank: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onStartInterview, 
  onNavigateToInternships, 
  onNavigateToInterviewPrep, 
  onNavigateToNetworking, 
  onNavigateToTimelines,
  onNavigateToQuestionBank
}) => {
  const [settings, setSettings] = useState<InterviewSettings>({
    category: 'all',
    level: 'mid',
    duration: 30
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'decision-making', label: 'Decision Making' },
    { value: 'prioritization', label: 'Prioritization' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'metrics', label: 'Metrics & Analytics' },
    { value: 'user-research', label: 'User Research' },
    { value: 'stakeholder-management', label: 'Stakeholder Management' },
    { value: 'technical', label: 'Technical' }
  ];

  const levels = [
    { value: 'junior', label: 'Junior PM' },
    { value: 'mid', label: 'Mid-level PM' },
    { value: 'senior', label: 'Senior PM' },
    { value: 'all', label: 'Mixed Levels' }
  ];

  const durations = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' }
  ];

  const handleStart = () => {
    onStartInterview(settings);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-primary-600 p-4 rounded-full">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            PM Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your all-in-one platform for Product Management recruiting success. 
            From interview prep to networking, we've got you covered.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Video className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Interview Practice</h3>
            <p className="text-gray-600">Practice with AI-powered video interviews that feel like real PM interviews</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-indigo-200">
            <Target className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Question Bank</h3>
            <p className="text-gray-600">Choose specific questions to practice with AI feedback and detailed analysis</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Interview Prep Guide</h3>
            <p className="text-gray-600">Comprehensive guides for internship and new grad PM interviews</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Networking Guide</h3>
            <p className="text-gray-600">Learn how to network effectively in the PM community</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recruiting Timelines</h3>
            <p className="text-gray-600">Stay on track with detailed PM recruiting timelines</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Briefcase className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Job Opportunities</h3>
            <p className="text-gray-600">Find PM internships and new grad positions</p>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Configure Your Video Interview
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Area
              </label>
              <select
                value={settings.category}
                onChange={(e) => setSettings({ ...settings, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={settings.level}
                onChange={(e) => setSettings({ ...settings, level: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={settings.duration}
                onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {durations.map((duration) => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <button
              onClick={handleStart}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Start AI Interview
            </button>
            
            <button
              onClick={onNavigateToQuestionBank}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 flex items-center justify-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Question Bank
            </button>
            
            <button
              onClick={onNavigateToInterviewPrep}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 flex items-center justify-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Interview Prep
            </button>
            
            <button
              onClick={onNavigateToNetworking}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 flex items-center justify-center"
            >
              <Users className="w-5 h-5 mr-2" />
              Networking Guide
            </button>
            
            <button
              onClick={onNavigateToTimelines}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Recruiting Timelines
            </button>
            
            <button
              onClick={onNavigateToInternships}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 flex items-center justify-center"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Job Opportunities
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">
            <strong>Instructions:</strong> Make sure your microphone and camera are working and you're in a quiet environment.
          </p>
          <p>
            You'll join a video call with an AI interviewer. The AI will ask questions and listen to your responses. 
            You can pause, ask for clarification, or request follow-up questions just like a real video interview.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
