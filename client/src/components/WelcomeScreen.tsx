import React, { useState } from 'react';
import { Video, Brain, Clock, Play, Briefcase } from 'lucide-react';
import { InterviewSettings } from '../types';

interface WelcomeScreenProps {
  onStartInterview: (settings: InterviewSettings) => void;
  onNavigateToInternships: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartInterview, onNavigateToInternships }) => {
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
            PM Video Interviewer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practice Product Management interviews with AI-powered video calls. 
            Experience realistic video interviews with human-like AI interviewer.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Video className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Video Call Interview</h3>
            <p className="text-gray-600">Face-to-face video interview with AI interviewer, just like Zoom</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Brain className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Interviewer</h3>
            <p className="text-gray-600">Professional AI interviewer with human-like voice and responses</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Clock className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Flexible Duration</h3>
            <p className="text-gray-600">Choose interview length that fits your schedule</p>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleStart}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Interview
            </button>
            
            <button
              onClick={onNavigateToInternships}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center justify-center"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Browse Internships
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
