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

interface RecruitingTimelinesProps {
  onBack?: () => void;
}

const RecruitingTimelines: React.FC<RecruitingTimelinesProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'internship' | 'newgrad'>('internship');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const internshipTimeline = {
    months: [
      {
        month: "August",
        phase: "Early Preparation",
        tasks: [
          "Research target companies and PM roles",
          "Update resume and LinkedIn profile",
          "Start building PM knowledge base",
          "Begin networking with PMs",
          "Work on side projects to build portfolio"
        ],
        deadlines: [],
        tips: [
          "Focus on understanding what PMs actually do",
          "Start following PM blogs and podcasts",
          "Join PM communities and Slack groups"
        ]
      },
      {
        month: "September",
        phase: "Application Season Begins",
        tasks: [
          "Apply to early application programs",
          "Attend career fairs and company info sessions",
          "Reach out to PMs for informational interviews",
          "Practice behavioral interview questions",
          "Prepare elevator pitch"
        ],
        deadlines: [
          "Google STEP Program (Sept 1)",
          "Microsoft Explore Program (Sept 15)",
          "Meta University (Sept 30)"
        ],
        tips: [
          "Apply to 20+ companies for better odds",
          "Customize each application",
          "Track applications in a spreadsheet"
        ]
      },
      {
        month: "October",
        phase: "Peak Application Period",
        tasks: [
          "Continue mass applications",
          "Prepare for phone screens",
          "Practice case study frameworks",
          "Build relationships with recruiters",
          "Attend company events and workshops"
        ],
        deadlines: [
          "Amazon Internship Program (Oct 1)",
          "Apple Internship Program (Oct 15)",
          "Stripe Internship Program (Oct 31)"
        ],
        tips: [
          "Most applications are due this month",
          "Focus on quality over quantity",
          "Prepare for technical PM questions"
        ]
      },
      {
        month: "November",
        phase: "Interview Preparation",
        tasks: [
          "Mock interviews with PMs",
          "Deep dive into target companies",
          "Practice product design questions",
          "Prepare questions for interviewers",
          "Finalize portfolio and case studies"
        ],
        deadlines: [
          "Uber Internship Program (Nov 1)",
          "Airbnb Internship Program (Nov 15)"
        ],
        tips: [
          "Most interviews happen this month",
          "Practice with real PMs, not just friends",
          "Study company-specific products and culture"
        ]
      },
      {
        month: "December",
        phase: "Interview Season",
        tasks: [
          "Final round interviews",
          "Negotiate offers",
          "Make final decisions",
          "Thank you notes to interviewers",
          "Plan for next semester"
        ],
        deadlines: [
          "Most offers extended by Dec 15",
          "Decision deadlines typically Dec 20-31"
        ],
        tips: [
          "Be prepared to make quick decisions",
          "Don't be afraid to negotiate",
          "Keep other options open until you sign"
        ]
      }
    ],
    keyCompanies: [
      { name: "Google", timeline: "Aug 1 - Dec 15", difficulty: "Very High", notes: "STEP program for underclassmen" },
      { name: "Microsoft", timeline: "Sept 1 - Dec 20", difficulty: "High", notes: "Explore program for sophomores" },
      { name: "Meta", timeline: "Sept 1 - Dec 10", difficulty: "Very High", notes: "University program" },
      { name: "Amazon", timeline: "Oct 1 - Dec 31", difficulty: "High", notes: "Large program, good for first-time interns" },
      { name: "Apple", timeline: "Oct 15 - Jan 15", difficulty: "Very High", notes: "Highly selective" },
      { name: "Stripe", timeline: "Oct 1 - Dec 20", difficulty: "High", notes: "Fast-growing, great culture" }
    ]
  };

  const newGradTimeline = {
    months: [
      {
        month: "January",
        phase: "Early Preparation",
        tasks: [
          "Research full-time PM roles",
          "Update resume with senior year projects",
          "Build comprehensive PM portfolio",
          "Start networking with senior PMs",
          "Prepare for behavioral interviews"
        ],
        deadlines: [],
        tips: [
          "Focus on leadership and impact stories",
          "Build relationships with PMs at target companies",
          "Start thinking about location preferences"
        ]
      },
      {
        month: "February",
        phase: "Application Season Begins",
        tasks: [
          "Apply to early full-time programs",
          "Attend company info sessions",
          "Reach out to alumni in PM roles",
          "Practice case study interviews",
          "Prepare for technical PM questions"
        ],
        deadlines: [
          "Google APM Program (Feb 1)",
          "Microsoft PM Program (Feb 15)",
          "Meta RPM Program (Feb 28)"
        ],
        tips: [
          "APM programs are highly competitive",
          "Focus on demonstrating leadership potential",
          "Prepare for system design questions"
        ]
      },
      {
        month: "March",
        phase: "Peak Application Period",
        tasks: [
          "Mass applications to PM roles",
          "Prepare for phone screens",
          "Practice product strategy questions",
          "Build relationships with recruiters",
          "Attend PM conferences and events"
        ],
        deadlines: [
          "Amazon PM Program (Mar 1)",
          "Apple PM Program (Mar 15)",
          "Uber PM Program (Mar 31)"
        ],
        tips: [
          "Most applications are due this month",
          "Focus on companies that align with your interests",
          "Prepare for both technical and behavioral rounds"
        ]
      },
      {
        month: "April",
        phase: "Interview Preparation",
        tasks: [
          "Mock interviews with senior PMs",
          "Deep dive into company products and strategy",
          "Practice leadership scenarios",
          "Prepare questions about team and culture",
          "Finalize case study presentations"
        ],
        deadlines: [
          "Stripe PM Program (Apr 1)",
          "Airbnb PM Program (Apr 15)"
        ],
        tips: [
          "Most interviews happen this month",
          "Practice with PMs from your target companies",
          "Prepare for both individual and panel interviews"
        ]
      },
      {
        month: "May",
        phase: "Interview Season",
        tasks: [
          "Final round interviews",
          "Negotiate compensation packages",
          "Make final decisions",
          "Thank you notes to all interviewers",
          "Plan for graduation and start dates"
        ],
        deadlines: [
          "Most offers extended by May 15",
          "Decision deadlines typically May 20-31"
        ],
        tips: [
          "Be prepared to make quick decisions",
          "Negotiate salary, equity, and benefits",
          "Consider long-term career growth potential"
        ]
      }
    ],
    keyCompanies: [
      { name: "Google", timeline: "Feb 1 - May 15", difficulty: "Very High", notes: "APM program, highly selective" },
      { name: "Microsoft", timeline: "Feb 15 - May 20", difficulty: "High", notes: "PM program, good for new grads" },
      { name: "Meta", timeline: "Feb 1 - May 10", difficulty: "Very High", notes: "RPM program, fast-paced" },
      { name: "Amazon", timeline: "Mar 1 - May 31", difficulty: "High", notes: "Large program, good growth opportunities" },
      { name: "Apple", timeline: "Mar 15 - Jun 15", difficulty: "Very High", notes: "Highly selective, design-focused" },
      { name: "Uber", timeline: "Mar 1 - May 20", difficulty: "High", notes: "Fast-growing, impact-focused" }
    ]
  };

  const currentData = activeTab === 'internship' ? internshipTimeline : newGradTimeline;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-3xl font-bold text-gray-900">PM Recruiting Timelines</h1>
              <p className="text-gray-600 mt-2">
                Complete timeline for PM internship and new grad recruiting
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
