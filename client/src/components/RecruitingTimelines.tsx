import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Users,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import Navbar from './Navbar';

interface RecruitingTimelinesProps {
  onBack?: () => void;
  onNavigateToInterviewPrep: () => void;
  onNavigateToNetworking: () => void;
  onNavigateToTimelines: () => void;
  onNavigateToInternships: () => void;
  onNavigateToHome: () => void;
}

const RecruitingTimelines: React.FC<RecruitingTimelinesProps> = ({ 
  onBack, 
  onNavigateToInterviewPrep, 
  onNavigateToNetworking, 
  onNavigateToTimelines, 
  onNavigateToInternships,
  onNavigateToHome
}) => {
  const [activeTab, setActiveTab] = useState<'internship' | 'newgrad'>('internship');

  const internshipTimeline = {
    companies: [
      { 
        name: "Google", 
        logo: "🔍", 
        deadline: "Early September", 
        salary: "$113-161K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Microsoft", 
        logo: "🪟", 
        deadline: "Mid September", 
        salary: "Competitive", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Meta", 
        logo: "📘", 
        deadline: "Late September", 
        salary: "Competitive", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Figma", 
        logo: "🎨", 
        deadline: "October 31", 
        salary: "$140K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Roblox", 
        logo: "🎮", 
        deadline: "October 31", 
        salary: "$142K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "TikTok", 
        logo: "🎵", 
        deadline: "November 1", 
        salary: "$116-176K", 
        status: "Open",
        program: "PM Program"
      },
      { 
        name: "Databricks", 
        logo: "📊", 
        deadline: "November 15", 
        salary: "$133-150K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "IBM", 
        logo: "💼", 
        deadline: "November 30", 
        salary: "$99-148K", 
        status: "Open",
        program: "Entry Level PM"
      },
      { 
        name: "Duolingo", 
        logo: "🦉", 
        deadline: "December 1", 
        salary: "$125-135K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Arcade", 
        logo: "🎯", 
        deadline: "December 15", 
        salary: "Competitive", 
        status: "Open",
        program: "APM Program"
      }
    ]
  };

  const newGradTimeline = {
    companies: [
      { 
        name: "Google", 
        logo: "🔍", 
        deadline: "February 1", 
        salary: "$113-161K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Microsoft", 
        logo: "🪟", 
        deadline: "February 15", 
        salary: "Competitive", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Meta", 
        logo: "📘", 
        deadline: "February 28", 
        salary: "Competitive", 
        status: "Open",
        program: "RPM Program"
      },
      { 
        name: "Figma", 
        logo: "🎨", 
        deadline: "March 31", 
        salary: "$140K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Roblox", 
        logo: "🎮", 
        deadline: "March 31", 
        salary: "$142K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "TikTok", 
        logo: "🎵", 
        deadline: "April 1", 
        salary: "$116-176K", 
        status: "Open",
        program: "PM Program"
      },
      { 
        name: "Databricks", 
        logo: "📊", 
        deadline: "April 15", 
        salary: "$133-150K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "IBM", 
        logo: "💼", 
        deadline: "April 30", 
        salary: "$99-148K", 
        status: "Open",
        program: "Entry Level PM"
      },
      { 
        name: "Duolingo", 
        logo: "🦉", 
        deadline: "May 1", 
        salary: "$125-135K", 
        status: "Open",
        program: "APM Program"
      },
      { 
        name: "Arcade", 
        logo: "🎯", 
        deadline: "May 15", 
        salary: "Competitive", 
        status: "Open",
        program: "APM Program"
      }
    ]
  };

  const currentData = activeTab === 'internship' ? internshipTimeline : newGradTimeline;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        onNavigateToInterviewPrep={onNavigateToInterviewPrep}
        onNavigateToNetworking={onNavigateToNetworking}
        onNavigateToTimelines={onNavigateToTimelines}
        onNavigateToInternships={onNavigateToInternships}
        onNavigateToHome={onNavigateToHome}
        currentPage="timelines"
      />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">APM Recruiting Timelines</h1>
              <p className="text-gray-600 mt-2">
                Complete timeline for APM internship and new grad recruiting based on current 2025-2026 opportunities
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Data sourced from <a href="https://www.apmseason.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">APM Season</a> - the #1 place for APM opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('internship')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'internship'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Internship Timeline
            </button>
            <button
              onClick={() => setActiveTab('newgrad')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'newgrad'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <GraduationCap className="w-4 h-4 inline mr-2" />
              New Grad Timeline
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Deadlines */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-blue-600" />
            {activeTab === 'internship' ? 'APM Internship Deadlines' : 'APM New Grad Deadlines'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.companies.map((company, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{company.logo}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Deadline:</span>
                    <span className="text-sm font-semibold text-gray-900">{company.deadline}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Salary:</span>
                    <span className="text-sm font-semibold text-green-600">{company.salary}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Program:</span>
                    <span className="text-sm text-gray-900">{company.program}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {company.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Quick Success Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Application Strategy</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Apply to 15-20 companies for better odds</li>
                <li>• Customize each application for company culture</li>
                <li>• Track applications using APM Season</li>
                <li>• Focus on demonstrating product sense</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Interview Preparation</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Practice with real APMs and PMs</li>
                <li>• Study company-specific products and culture</li>
                <li>• Prepare for both technical and behavioral rounds</li>
                <li>• Build relationships with current APMs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitingTimelines;
