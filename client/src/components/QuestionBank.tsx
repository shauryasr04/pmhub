import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Clock, 
  Target, 
  Users,
  Brain,
  CheckCircle,
  Play,
  BookOpen,
  TrendingUp,
  Star,
  RefreshCw
} from 'lucide-react';

interface Question {
  id: string;
  category: string;
  subcategory: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Behavioral' | 'Product Design' | 'Case Study' | 'Technical' | 'Strategy';
  estimatedTime: number; // in minutes
  tips: string[];
  framework?: string;
  exampleAnswer?: string;
  company: string;
}

interface QuestionBankProps {
  onBack?: () => void;
  onSelectQuestion: (question: Question) => void;
  onStartInterview: (settings: { category: string; level: string; duration: number; question: Question }) => void;
}

const QuestionBank: React.FC<QuestionBankProps> = ({ onBack, onSelectQuestion, onStartInterview }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');

  // Mock question data - in production, this would come from an API
  const mockQuestions: Question[] = [
    // Behavioral Questions
    {
      id: '1',
      category: 'Leadership',
      subcategory: 'Influence Without Authority',
      question: 'Tell me about a time you had to influence a team or stakeholders without having direct authority over them.',
      difficulty: 'Medium',
      type: 'Behavioral',
      estimatedTime: 5,
      tips: [
        'Use the STAR method (Situation, Task, Action, Result)',
        'Focus on how you built relationships and credibility',
        'Show specific examples of your influence techniques',
        'Quantify the impact when possible'
      ],
      framework: 'STAR Method',
      exampleAnswer: 'Situation: I needed to convince engineering to prioritize a user research feature...',
      company: 'Google'
    },
    {
      id: '2',
      category: 'Conflict Resolution',
      subcategory: 'Stakeholder Management',
      question: 'Describe a situation where you had to manage conflicting priorities between different stakeholders.',
      difficulty: 'Hard',
      type: 'Behavioral',
      estimatedTime: 6,
      tips: [
        'Show how you gathered information from all parties',
        'Demonstrate your decision-making process',
        'Explain how you communicated the decision',
        'Highlight the outcome and learnings'
      ],
      framework: 'STAR Method',
      company: 'Microsoft'
    },
    // Product Design Questions
    {
      id: '3',
      category: 'Product Design',
      subcategory: 'Feature Design',
      question: 'Design a feature for Instagram that would increase user engagement among teenagers.',
      difficulty: 'Medium',
      type: 'Product Design',
      estimatedTime: 15,
      tips: [
        'Start by asking clarifying questions',
        'Define the problem and target users',
        'Consider user needs and business goals',
        'Think about metrics to measure success',
        'Consider technical constraints and feasibility'
      ],
      framework: 'Product Design Framework',
      exampleAnswer: 'First, I\'d like to understand the current engagement metrics and what specific behaviors we want to encourage...',
      company: 'Meta'
    },
    {
      id: '4',
      category: 'Product Design',
      subcategory: 'Improvement',
      question: 'How would you improve the user experience of a food delivery app?',
      difficulty: 'Easy',
      type: 'Product Design',
      estimatedTime: 12,
      tips: [
        'Identify specific pain points in the current experience',
        'Prioritize improvements based on user impact',
        'Consider different user personas',
        'Think about both short-term and long-term solutions'
      ],
      framework: 'User Journey Mapping',
      company: 'Uber'
    },
    // Case Study Questions
    {
      id: '5',
      category: 'Business Strategy',
      subcategory: 'Market Entry',
      question: 'How would you help Spotify enter the podcast market?',
      difficulty: 'Hard',
      type: 'Case Study',
      estimatedTime: 20,
      tips: [
        'Analyze the current podcast market landscape',
        'Identify Spotify\'s competitive advantages',
        'Consider different monetization strategies',
        'Think about content acquisition and creator relationships',
        'Plan for technical and operational challenges'
      ],
      framework: 'Market Analysis Framework',
      company: 'Spotify'
    },
    {
      id: '6',
      category: 'Metrics & Analytics',
      subcategory: 'Growth',
      question: 'How would you increase daily active users for a social media app?',
      difficulty: 'Medium',
      type: 'Case Study',
      estimatedTime: 18,
      tips: [
        'Define what DAU means for this specific app',
        'Analyze current user behavior and retention patterns',
        'Identify key drivers of engagement',
        'Propose specific features or changes',
        'Consider viral growth mechanisms'
      ],
      framework: 'Growth Framework',
      company: 'TikTok'
    },
    // Technical Questions
    {
      id: '7',
      category: 'Technical',
      subcategory: 'System Design',
      question: 'How would you design a notification system for a messaging app?',
      difficulty: 'Hard',
      type: 'Technical',
      estimatedTime: 25,
      tips: [
        'Define the requirements and constraints',
        'Consider different types of notifications',
        'Think about scalability and reliability',
        'Design the data model and API',
        'Consider real-time vs batch processing'
      ],
      framework: 'System Design Principles',
      company: 'WhatsApp'
    },
    {
      id: '8',
      category: 'Technical',
      subcategory: 'Data',
      question: 'How would you measure the success of a recommendation algorithm?',
      difficulty: 'Medium',
      type: 'Technical',
      estimatedTime: 15,
      tips: [
        'Define success metrics (accuracy, engagement, etc.)',
        'Consider different types of users and content',
        'Think about A/B testing methodology',
        'Consider long-term vs short-term metrics',
        'Plan for data collection and analysis'
      ],
      framework: 'Metrics Framework',
      company: 'Netflix'
    },
    // Strategy Questions
    {
      id: '9',
      category: 'Strategy',
      subcategory: 'Product Vision',
      question: 'What\'s your 5-year vision for a productivity app?',
      difficulty: 'Hard',
      type: 'Strategy',
      estimatedTime: 20,
      tips: [
        'Consider market trends and user needs evolution',
        'Think about technology advancements',
        'Consider competitive landscape changes',
        'Define clear success metrics',
        'Balance ambition with feasibility'
      ],
      framework: 'Vision Framework',
      company: 'Notion'
    },
    {
      id: '10',
      category: 'Strategy',
      subcategory: 'Pricing',
      question: 'How would you price a new SaaS product?',
      difficulty: 'Medium',
      type: 'Strategy',
      estimatedTime: 15,
      tips: [
        'Analyze the competitive landscape',
        'Consider different pricing models',
        'Think about customer segments and willingness to pay',
        'Consider value-based pricing',
        'Plan for pricing experiments'
      ],
      framework: 'Pricing Strategy Framework',
      company: 'Slack'
    }
  ];

  const categories = [
    'Leadership', 'Conflict Resolution', 'Product Design', 'Business Strategy',
    'Metrics & Analytics', 'Technical', 'Strategy'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const types = ['Behavioral', 'Product Design', 'Case Study', 'Technical', 'Strategy'];
  const companies = ['Google', 'Microsoft', 'Meta', 'Uber', 'Spotify', 'TikTok', 'WhatsApp', 'Netflix', 'Notion', 'Slack'];

  // Load questions
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestions(mockQuestions);
        setFilteredQuestions(mockQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Filter questions
  useEffect(() => {
    let filtered = questions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(q => q.type === selectedType);
    }

    // Company filter
    if (selectedCompany !== 'all') {
      filtered = filtered.filter(q => q.company === selectedCompany);
    }

    setFilteredQuestions(filtered);
  }, [questions, searchTerm, selectedCategory, selectedDifficulty, selectedType, selectedCompany]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Behavioral': return 'bg-blue-100 text-blue-800';
      case 'Product Design': return 'bg-purple-100 text-purple-800';
      case 'Case Study': return 'bg-orange-100 text-orange-800';
      case 'Technical': return 'bg-green-100 text-green-800';
      case 'Strategy': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-gray-900">PM Question Bank</h1>
              <p className="text-gray-600 mt-2">
                Practice with real PM interview questions and get AI feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search questions, categories, or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Companies</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredQuestions.length} questions found
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Star className="w-4 h-4" />
            <span>Click on any question to start practicing</span>
          </div>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelectQuestion(question)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {question.question}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(question.type)}`}>
                            {question.type}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            {question.company}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{question.category}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{question.estimatedTime} min</span>
                        </div>
                        {question.framework && (
                          <div className="flex items-center space-x-1">
                            <Brain className="w-4 h-4" />
                            <span>{question.framework}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-700 mb-4">
                        <strong>Subcategory:</strong> {question.subcategory}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>💡 {question.tips.length} tips provided</span>
                          {question.exampleAnswer && <span>📝 Example answer included</span>}
                        </div>
                        <button 
                          onClick={() => onStartInterview({
                            category: question.category,
                            level: question.difficulty.toLowerCase(),
                            duration: question.estimatedTime,
                            question: question
                          })}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Practice Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
