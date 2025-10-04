import React, { useState } from 'react';
import { Brain, Clock, Play, Briefcase, BookOpen, Users, Calendar, Target } from 'lucide-react';
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
    level: 'both',
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
    { value: 'internship', label: 'PM Internship' },
    { value: 'new-grad', label: 'New Grad PM' },
    { value: 'both', label: 'Both Internship & New Grad' }
  ];

  const durations = [
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' }
  ];

  const handleStart = () => {
    onStartInterview(settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-primary-600 p-2 rounded-full mr-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PM Hub</span>
            </div>
            
            {/* Navigation Links */}
            <div className="flex space-x-8">
              <button
                onClick={onNavigateToInterviewPrep}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Interview Prep
              </button>
              <button
                onClick={onNavigateToNetworking}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <Users className="w-4 h-4 mr-2" />
                Networking Guide
              </button>
              <button
                onClick={onNavigateToTimelines}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Recruiting Timelines
              </button>
              <button
                onClick={onNavigateToInternships}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Job Opportunities
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center p-4 pt-20">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-primary-600 p-4 rounded-full">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to PM Hub
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to start your PM interview practice? Configure your settings below and choose how you'd like to begin.
            </p>
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
                Position Type
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

          {/* Core Interview Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
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
              Practice via a Question Bank
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
    </div>
  );
};

export default WelcomeScreen;
