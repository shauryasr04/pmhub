import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Mail,
  Linkedin,
  Twitter,
  Coffee,
  UserPlus,
  Target,
  Clock,
  CheckCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import Navbar from './Navbar';

interface NetworkingGuideProps {
  onBack?: () => void;
  onNavigateToInterviewPrep: () => void;
  onNavigateToNetworking: () => void;
  onNavigateToTimelines: () => void;
  onNavigateToInternships: () => void;
}

const NetworkingGuide: React.FC<NetworkingGuideProps> = ({ 
  onBack, 
  onNavigateToInterviewPrep, 
  onNavigateToNetworking, 
  onNavigateToTimelines, 
  onNavigateToInternships 
}) => {
  const [activeTab, setActiveTab] = useState<'internship' | 'newgrad'>('internship');

  const internshipNetworking = {
    strategies: [
      {
        title: "LinkedIn Outreach",
        description: "Connect with PMs at target companies",
        steps: [
          "Find PMs at companies you're interested in",
          "Send personalized connection requests",
          "Follow up with a coffee chat request",
          "Share relevant content to stay top-of-mind"
        ],
        tips: [
          "Mention mutual connections if any",
          "Reference their recent posts or achievements",
          "Be specific about what you want to learn",
          "Keep messages under 200 characters"
        ]
      },
      {
        title: "University Events",
        description: "Leverage campus resources and events",
        steps: [
          "Attend PM club meetings and workshops",
          "Join case study competitions",
          "Participate in career fairs",
          "Connect with alumni in PM roles"
        ],
        tips: [
          "Prepare elevator pitch for events",
          "Bring business cards or digital contact info",
          "Follow up within 24 hours",
          "Ask for informational interviews"
        ]
      },
      {
        title: "Online Communities",
        description: "Engage in PM-focused online spaces",
        steps: [
          "Join PM Slack communities",
          "Participate in Twitter PM discussions",
          "Contribute to PM subreddits",
          "Attend virtual PM meetups"
        ],
        tips: [
          "Share valuable insights, not just ask questions",
          "Help others with their PM journey",
          "Build genuine relationships over time",
          "Don't be overly promotional"
        ]
      }
    ],
    conversationStarters: [
      "What's the most challenging aspect of your PM role?",
      "How did you transition into product management?",
      "What skills do you wish you had developed earlier?",
      "What's your favorite part about working at [company]?",
      "How do you stay updated on PM best practices?"
    ],
    followUpTemplates: {
      linkedin: "Hi [Name], thanks for connecting! I'm a [year] student interested in PM. Would you be open to a 15-minute coffee chat about your experience at [company]?",
      email: "Hi [Name], I enjoyed our conversation at [event]. I'd love to learn more about [specific topic]. Are you available for a brief call this week?",
      thankYou: "Thank you for taking the time to speak with me about [topic]. Your insights on [specific advice] were really helpful. I'll keep you updated on my PM journey!"
    }
  };

  const newGradNetworking = {
    strategies: [
      {
        title: "Industry Events",
        description: "Attend conferences and professional meetups",
        steps: [
          "Research PM conferences (ProductCon, Mind the Product)",
          "Attend local PM meetups and workshops",
          "Volunteer at events to get backstage access",
          "Speak at events to build your personal brand"
        ],
        tips: [
          "Prepare talking points about your experience",
          "Bring business cards with portfolio link",
          "Follow up with everyone you meet",
          "Share insights on social media"
        ]
      },
      {
        title: "Mentorship Programs",
        description: "Find mentors in senior PM roles",
        steps: [
          "Apply to formal mentorship programs",
          "Reach out to senior PMs directly",
          "Join PM mentorship platforms",
          "Offer value in exchange for guidance"
        ],
        tips: [
          "Be clear about what you want to learn",
          "Respect their time and expertise",
          "Come prepared to meetings",
          "Show progress and gratitude"
        ]
      },
      {
        title: "Content Creation",
        description: "Build your personal brand through content",
        steps: [
          "Start a PM blog or newsletter",
          "Share insights on LinkedIn and Twitter",
          "Create PM case studies and analyses",
          "Participate in PM podcasts and panels"
        ],
        tips: [
          "Be consistent with posting schedule",
          "Share unique perspectives and experiences",
          "Engage with others' content authentically",
          "Don't be afraid to share failures and learnings"
        ]
      }
    ],
    conversationStarters: [
      "What's your biggest product success and what made it work?",
      "How do you approach building relationships with engineering teams?",
      "What's your process for prioritizing features?",
      "How do you handle difficult stakeholder conversations?",
      "What trends in PM are you most excited about?"
    ],
    followUpTemplates: {
      linkedin: "Hi [Name], I really enjoyed your talk on [topic] at [event]. I'm a new grad PM and would love to learn more about [specific area]. Would you be open to a brief call?",
      email: "Hi [Name], I've been following your work on [project] and found your insights on [topic] really valuable. I'd love to connect and learn from your experience.",
      thankYou: "Thank you for the mentorship session. Your advice on [specific topic] has already helped me [specific outcome]. I appreciate your time and guidance."
    }
  };

  const currentData = activeTab === 'internship' ? internshipNetworking : newGradNetworking;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        onNavigateToInterviewPrep={onNavigateToInterviewPrep}
        onNavigateToNetworking={onNavigateToNetworking}
        onNavigateToTimelines={onNavigateToTimelines}
        onNavigateToInternships={onNavigateToInternships}
        currentPage="networking"
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
              <h1 className="text-3xl font-bold text-gray-900">PM Networking Guide</h1>
              <p className="text-gray-600 mt-2">
                Build meaningful connections in the PM community
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
              Internship Networking
            </button>
            <button
              onClick={() => setActiveTab('newgrad')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'newgrad'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              New Grad Networking
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Networking Strategies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-600" />
            Networking Strategies
          </h2>
          <div className="space-y-8">
            {currentData.strategies.map((strategy, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{strategy.title}</h3>
                    <p className="text-gray-600 mb-4">{strategy.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Steps to Follow
                        </h4>
                        <ul className="space-y-2">
                          {strategy.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                          Pro Tips
                        </h4>
                        <ul className="space-y-2">
                          {strategy.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Starters */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
            Conversation Starters
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              Use these questions to start meaningful conversations with PMs:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {currentData.conversationStarters.map((question, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">"{question}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Follow-up Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Mail className="w-6 h-6 mr-3 text-blue-600" />
            Follow-up Templates
          </h2>
          <div className="space-y-6">
            {Object.entries(currentData.followUpTemplates).map(([type, template]) => (
              <div key={type} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                  {type.replace(/([A-Z])/g, ' $1').trim()} Template
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-800 font-mono text-sm">{template}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Networking Calendar */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-blue-600" />
            Networking Calendar
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Weekly Activities</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    Monday: LinkedIn outreach (5-10 connections)
                  </li>
                  <li className="flex items-center">
                    <Coffee className="w-4 h-4 mr-2 text-blue-500" />
                    Tuesday: Coffee chat or virtual meeting
                  </li>
                  <li className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                    Wednesday: Engage in PM communities
                  </li>
                  <li className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    Thursday: Follow up on previous conversations
                  </li>
                  <li className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    Friday: Attend virtual events or meetups
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Monthly Goals</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-green-500" />
                    Connect with 20+ new PMs
                  </li>
                  <li className="flex items-center">
                    <Coffee className="w-4 h-4 mr-2 text-green-500" />
                    Have 4+ informational interviews
                  </li>
                  <li className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-green-500" />
                    Attend 2+ networking events
                  </li>
                  <li className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                    Share 8+ valuable posts/comments
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
            Networking Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• PM groups and communities</li>
                <li>• Company pages and updates</li>
                <li>• Alumni networks</li>
                <li>• Industry hashtags (#ProductManagement)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• PM Twitter community</li>
                <li>• Product conference live-tweets</li>
                <li>• PM thought leaders</li>
                <li>• #ProductChat discussions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Events
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• ProductCon, Mind the Product</li>
                <li>• Local PM meetups</li>
                <li>• University career fairs</li>
                <li>• Virtual PM conferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingGuide;
