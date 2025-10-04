import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertCircle,
  Users,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MapPin,
  ExternalLink
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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const internshipTimeline = {
    months: [
      {
        month: "August",
        phase: "Early Preparation & Research",
        tasks: [
          "Research 2025-2026 APM internship programs",
          "Identify target companies from APM Season listings",
          "Update resume with PM-relevant experience",
          "Start building product thinking skills",
          "Join PM communities and follow industry leaders"
        ],
        deadlines: [],
        tips: [
          "Focus on understanding what APMs actually do vs PMs",
          "Study successful APM programs at top tech companies",
          "Start following APM Season for latest opportunities"
        ]
      },
      {
        month: "September",
        phase: "Application Season Opens",
        tasks: [
          "Apply to early APM programs (Google, Microsoft, Meta)",
          "Attend company info sessions and career fairs",
          "Reach out to current APMs for informational interviews",
          "Practice behavioral and product thinking questions",
          "Prepare compelling cover letters"
        ],
        deadlines: [
          "Google APM Program (Early Sept)",
          "Microsoft APM Program (Mid Sept)",
          "Meta APM Program (Late Sept)"
        ],
        tips: [
          "Apply to 15-20 companies for better odds",
          "Customize each application for company culture",
          "Track applications using APM Season as reference"
        ]
      },
      {
        month: "October",
        phase: "Peak Application Period",
        tasks: [
          "Apply to remaining APM programs",
          "Prepare for phone screens and initial interviews",
          "Practice case study frameworks (CIRCLES, AARM)",
          "Build relationships with recruiters and current APMs",
          "Attend company events and PM workshops"
        ],
        deadlines: [
          "Amazon APM Program (Oct 1)",
          "Apple APM Program (Oct 15)",
          "Figma APM Program (Oct 31)",
          "Roblox APM Program (Oct 31)"
        ],
        tips: [
          "Most APM applications are due this month",
          "Focus on demonstrating product sense and leadership",
          "Prepare for technical PM questions and system design"
        ]
      },
      {
        month: "November",
        phase: "Interview Preparation & Execution",
        tasks: [
          "Mock interviews with current APMs and PMs",
          "Deep dive into target companies' products and culture",
          "Practice product design and strategy questions",
          "Prepare thoughtful questions for interviewers",
          "Finalize portfolio with product case studies"
        ],
        deadlines: [
          "TikTok APM Program (Nov 1)",
          "Databricks APM Program (Nov 15)",
          "IBM APM Program (Nov 30)"
        ],
        tips: [
          "Most APM interviews happen this month",
          "Practice with real APMs, not just friends",
          "Study company-specific products and recent launches"
        ]
      },
      {
        month: "December",
        phase: "Final Interviews & Decisions",
        tasks: [
          "Final round interviews with senior PMs and executives",
          "Negotiate offers and understand program details",
          "Make final decisions between offers",
          "Send thank you notes to all interviewers",
          "Plan for summer internship experience"
        ],
        deadlines: [
          "Duolingo APM Program (Dec 1)",
          "Arcade APM Program (Dec 15)",
          "Most programs close by Dec 31"
        ],
        tips: [
          "Be prepared for last-minute interviews",
          "Have backup options ready",
          "Celebrate your hard work and prepare for success!"
        ]
      }
    ],
    keyCompanies: [
      { name: "Google", timeline: "Aug 1 - Dec 15", difficulty: "Very High", notes: "APM Program - $113-161K", salary: "$113-161K" },
      { name: "Microsoft", timeline: "Sept 1 - Dec 20", difficulty: "High", notes: "APM Program", salary: "Competitive" },
      { name: "Meta", timeline: "Sept 1 - Dec 10", difficulty: "Very High", notes: "APM Program", salary: "Competitive" },
      { name: "Figma", timeline: "Oct 1 - Dec 31", difficulty: "High", notes: "APM Program - $140K", salary: "$140K" },
      { name: "Roblox", timeline: "Oct 1 - Dec 31", difficulty: "High", notes: "APM Program - $142K", salary: "$142K" },
      { name: "TikTok", timeline: "Nov 1 - Jan 15", difficulty: "High", notes: "PM Program - $116-176K", salary: "$116-176K" },
      { name: "Databricks", timeline: "Nov 1 - Jan 15", difficulty: "High", notes: "APM Program - $133-150K", salary: "$133-150K" },
      { name: "IBM", timeline: "Nov 1 - Jan 15", difficulty: "Medium", notes: "Entry Level PM - $99-148K", salary: "$99-148K" },
      { name: "Duolingo", timeline: "Dec 1 - Feb 15", difficulty: "High", notes: "APM Program - $125-135K", salary: "$125-135K" },
      { name: "Arcade", timeline: "Dec 1 - Feb 15", difficulty: "Medium", notes: "APM Program", salary: "Competitive" }
    ]
  };

  const newGradTimeline = {
    months: [
      {
        month: "January",
        phase: "Early Preparation & Research",
        tasks: [
          "Research 2025-2026 APM full-time programs",
          "Identify target companies from APM Season listings",
          "Update resume with senior year projects and PM experience",
          "Build comprehensive PM portfolio with case studies",
          "Start networking with senior PMs and APM alumni"
        ],
        deadlines: [],
        tips: [
          "Focus on leadership and impact stories from college",
          "Build relationships with PMs at target companies",
          "Start thinking about location preferences and company culture"
        ]
      },
      {
        month: "February",
        phase: "Application Season Begins",
        tasks: [
          "Apply to early APM full-time programs",
          "Attend company info sessions and career fairs",
          "Reach out to APM alumni for informational interviews",
          "Practice case study interviews and product thinking",
          "Prepare for technical PM questions and system design"
        ],
        deadlines: [
          "Google APM Program (Feb 1)",
          "Microsoft APM Program (Feb 15)",
          "Meta RPM Program (Feb 28)"
        ],
        tips: [
          "APM programs are highly competitive - apply early",
          "Focus on demonstrating leadership potential and product sense",
          "Prepare for both technical and behavioral rounds"
        ]
      },
      {
        month: "March",
        phase: "Peak Application Period",
        tasks: [
          "Mass applications to APM and PM roles",
          "Prepare for phone screens and initial interviews",
          "Practice product strategy and leadership questions",
          "Build relationships with recruiters and current APMs",
          "Attend PM conferences and company events"
        ],
        deadlines: [
          "Amazon APM Program (Mar 1)",
          "Apple APM Program (Mar 15)",
          "Figma APM Program (Mar 31)",
          "Roblox APM Program (Mar 31)"
        ],
        tips: [
          "Most APM applications are due this month",
          "Focus on companies that align with your interests and values",
          "Prepare for both individual and panel interviews"
        ]
      },
      {
        month: "April",
        phase: "Interview Preparation & Execution",
        tasks: [
          "Mock interviews with senior PMs and APM alumni",
          "Deep dive into company products, strategy, and culture",
          "Practice leadership scenarios and product design questions",
          "Prepare thoughtful questions about team and growth opportunities",
          "Finalize case study presentations and portfolio"
        ],
        deadlines: [
          "TikTok APM Program (Apr 1)",
          "Databricks APM Program (Apr 15)",
          "IBM APM Program (Apr 30)"
        ],
        tips: [
          "Most APM interviews happen this month",
          "Practice with PMs from your target companies",
          "Study company-specific products and recent strategic moves"
        ]
      },
      {
        month: "May",
        phase: "Final Interviews & Decisions",
        tasks: [
          "Final round interviews with senior PMs and executives",
          "Negotiate compensation packages and understand program details",
          "Make final decisions between offers",
          "Send thank you notes to all interviewers",
          "Plan for post-graduation start and relocation"
        ],
        deadlines: [
          "Duolingo APM Program (May 1)",
          "Arcade APM Program (May 15)",
          "Most programs close by May 31"
        ],
        tips: [
          "Be prepared to make quick decisions",
          "Consider total compensation, growth opportunities, and culture",
          "Think about long-term career growth and learning opportunities"
        ]
      }
    ],
    keyCompanies: [
      { name: "Google", timeline: "Jan 1 - May 15", difficulty: "Very High", notes: "APM Program - $113-161K", salary: "$113-161K" },
      { name: "Microsoft", timeline: "Feb 1 - May 20", difficulty: "High", notes: "APM Program", salary: "Competitive" },
      { name: "Meta", timeline: "Feb 1 - May 10", difficulty: "Very High", notes: "RPM Program", salary: "Competitive" },
      { name: "Figma", timeline: "Mar 1 - May 31", difficulty: "High", notes: "APM Program - $140K", salary: "$140K" },
      { name: "Roblox", timeline: "Mar 1 - May 31", difficulty: "High", notes: "APM Program - $142K", salary: "$142K" },
      { name: "TikTok", timeline: "Apr 1 - Jun 15", difficulty: "High", notes: "PM Program - $116-176K", salary: "$116-176K" },
      { name: "Databricks", timeline: "Apr 1 - Jun 15", difficulty: "High", notes: "APM Program - $133-150K", salary: "$133-150K" },
      { name: "IBM", timeline: "Apr 1 - Jun 15", difficulty: "Medium", notes: "Entry Level PM - $99-148K", salary: "$99-148K" },
      { name: "Duolingo", timeline: "May 1 - Jul 15", difficulty: "High", notes: "APM Program - $125-135K", salary: "$125-135K" },
      { name: "Arcade", timeline: "May 1 - Jul 15", difficulty: "Medium", notes: "APM Program", salary: "Competitive" }
    ]
  };

  const currentData = activeTab === 'internship' ? internshipTimeline : newGradTimeline;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
        {/* Current Month Indicator */}
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">
                Current Month: {monthNames[currentMonth]} - 
                {activeTab === 'internship' ? ' Internship Season' : ' New Grad Season'}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-blue-600" />
            Monthly Timeline
          </h2>
          <div className="space-y-8">
            {currentData.months.map((month, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{month.month}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {month.phase}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-green-500" />
                          Key Tasks
                        </h4>
                        <ul className="space-y-2">
                          {month.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                          Important Deadlines
                        </h4>
                        {month.deadlines.length > 0 ? (
                          <ul className="space-y-2">
                            {month.deadlines.map((deadline, deadlineIndex) => (
                              <li key={deadlineIndex} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">{deadline}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No major deadlines this month</p>
                        )}
                      </div>
                    </div>
                    
                    {month.tips && month.tips.length > 0 && (
                      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-yellow-600" />
                          Pro Tips
                        </h4>
                        <ul className="space-y-1">
                          {month.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-gray-700 flex items-start">
                              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
            Key Companies & Programs
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.keyCompanies.map((company, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold text-sm">
                              {company.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{company.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {company.timeline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          company.difficulty === 'Very High' 
                            ? 'bg-red-100 text-red-800'
                            : company.difficulty === 'High'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {company.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {company.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
            Quick Reference
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Application Tips</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Apply early for better chances</li>
                <li>• Customize each application</li>
                <li>• Track applications in spreadsheet</li>
                <li>• Follow up after 2 weeks</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Interview Prep</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Practice with real PMs</li>
                <li>• Study company products</li>
                <li>• Prepare behavioral stories</li>
                <li>• Mock interview regularly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Networking</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Start networking early</li>
                <li>• Attend company events</li>
                <li>• Join PM communities</li>
                <li>• Follow up consistently</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitingTimelines;
