import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Target, 
  Users, 
  Clock, 
  CheckCircle, 
  Lightbulb,
  FileText,
  Video,
  Brain,
  TrendingUp,
  Award
} from 'lucide-react';
import Navbar from './Navbar';

interface InterviewPrepGuideProps {
  onBack?: () => void;
  onNavigateToInterviewPrep: () => void;
  onNavigateToNetworking: () => void;
  onNavigateToTimelines: () => void;
  onNavigateToHome: () => void;
}

const InterviewPrepGuide: React.FC<InterviewPrepGuideProps> = ({ 
  onBack, 
  onNavigateToInterviewPrep, 
  onNavigateToNetworking, 
  onNavigateToTimelines, 
  onNavigateToHome
}) => {
  const [activeTab, setActiveTab] = useState<'internship' | 'newgrad'>('internship');

  const internshipPrep = {
    timeline: [
      { phase: "Early Prep (6-8 months before)", tasks: ["Research PM roles and companies", "Build foundational PM knowledge", "Start networking with PMs", "Work on side projects"] },
      { phase: "Application Phase (3-4 months before)", tasks: ["Polish resume and LinkedIn", "Apply to 20+ internships", "Prepare for phone screens", "Practice behavioral questions"] },
      { phase: "Interview Phase (1-2 months before)", tasks: ["Mock interviews with PMs", "Practice case studies", "Prepare questions for interviewers", "Finalize portfolio"] }
    ],
    keySkills: [
      { skill: "Product Sense", description: "Understanding user needs and market opportunities", tips: ["Study successful products", "Practice product critiques", "Follow PM blogs and podcasts"] },
      { skill: "Analytical Thinking", description: "Data-driven decision making and problem solving", tips: ["Practice SQL and Excel", "Learn A/B testing concepts", "Study metrics and KPIs"] },
      { skill: "Communication", description: "Clear articulation of ideas and stakeholder management", tips: ["Practice elevator pitches", "Join public speaking groups", "Write product requirements docs"] },
      { skill: "Technical Understanding", description: "Basic knowledge of engineering and design", tips: ["Learn about APIs and databases", "Understand design systems", "Study technical architecture"] }
    ],
    commonQuestions: [
      {
        category: "Behavioral",
        questions: [
          "Tell me about a time you influenced without authority",
          "Describe a project where you had to work with difficult stakeholders",
          "How do you prioritize features when resources are limited?"
        ]
      },
      {
        category: "Product Design",
        questions: [
          "Design a feature for [popular app]",
          "How would you improve user engagement for [product]?",
          "What metrics would you track for [feature]?"
        ]
      },
      {
        category: "Case Studies",
        questions: [
          "How would you increase revenue for [company]?",
          "Design a product for [target audience]",
          "How would you enter [new market]?"
        ]
      }
    ]
  };

  const newGradPrep = {
    timeline: [
      { phase: "Early Prep (12+ months before)", tasks: ["Complete PM coursework/certifications", "Build strong portfolio", "Gain relevant experience", "Network extensively"] },
      { phase: "Application Phase (6-8 months before)", tasks: ["Target specific companies", "Customize applications", "Prepare for technical rounds", "Build case study portfolio"] },
      { phase: "Interview Phase (2-4 months before)", tasks: ["Advanced case study prep", "System design basics", "Leadership scenarios", "Final company research"] }
    ],
    keySkills: [
      { skill: "Strategic Thinking", description: "Long-term vision and market analysis", tips: ["Study market trends", "Analyze competitor strategies", "Practice strategic frameworks"] },
      { skill: "Leadership", description: "Leading cross-functional teams and initiatives", tips: ["Take on leadership roles", "Mentor others", "Lead side projects"] },
      { skill: "Business Acumen", description: "Understanding business models and metrics", tips: ["Study financial statements", "Learn about unit economics", "Understand business models"] },
      { skill: "Technical Depth", description: "Deep understanding of technology and architecture", tips: ["Learn system design", "Understand scalability", "Study technical trade-offs"] }
    ],
    commonQuestions: [
      {
        category: "Leadership",
        questions: [
          "How would you build a PM team from scratch?",
          "Describe a time you had to make a difficult product decision",
          "How do you handle conflicts between engineering and design?"
        ]
      },
      {
        category: "Strategy",
        questions: [
          "How would you pivot our product strategy?",
          "What's your 5-year vision for this product?",
          "How would you compete with [major competitor]?"
        ]
      },
      {
        category: "System Design",
        questions: [
          "Design a notification system for [product]",
          "How would you scale [feature] to 1M users?",
          "Design a recommendation engine"
        ]
      }
    ]
  };

  const currentData = activeTab === 'internship' ? internshipPrep : newGradPrep;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        onNavigateToInterviewPrep={onNavigateToInterviewPrep}
        onNavigateToNetworking={onNavigateToNetworking}
        onNavigateToTimelines={onNavigateToTimelines}
        onNavigateToHome={onNavigateToHome}
        currentPage="interview-prep"
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
              <h1 className="text-3xl font-bold text-gray-900">PM Interview Prep Guide</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive preparation for Product Management interviews
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
              Internship Prep
            </button>
            <button
              onClick={() => setActiveTab('newgrad')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'newgrad'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Award className="w-4 h-4 inline mr-2" />
              New Grad Prep
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timeline Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-blue-600" />
            Preparation Timeline
          </h2>
          <div className="space-y-6">
            {currentData.timeline.map((phase, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{phase.phase}</h3>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-600" />
            Key Skills to Develop
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {currentData.keySkills.map((skill, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.skill}</h3>
                <p className="text-gray-600 mb-4">{skill.description}</p>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                    Tips to Improve
                  </h4>
                  <ul className="space-y-1">
                    {skill.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-gray-700 flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Questions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-blue-600" />
            Common Interview Questions
          </h2>
          <div className="space-y-6">
            {currentData.commonQuestions.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-600" />
                  {category.category} Questions
                </h3>
                <div className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <div key={qIndex} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 font-medium">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Recommended Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Books</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• "Cracking the PM Interview" by Gayle McDowell</li>
                <li>• "Inspired" by Marty Cagan</li>
                <li>• "The Lean Startup" by Eric Ries</li>
                <li>• "Hooked" by Nir Eyal</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Online Resources</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Product Management courses on Coursera</li>
                <li>• PM blogs: Lenny's Newsletter, First Round Review</li>
                <li>• Practice case studies on Exponent</li>
                <li>• Join PM communities on Slack/Discord</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepGuide;
