import React from 'react';
import { Play, Volume2, Clock, Target } from 'lucide-react';
import { Question } from '../types';

interface QuestionDisplayProps {
  question: Question;
  onSpeak: () => void;
  isPlaying: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  onSpeak,
  isPlaying
}) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'decision-making': 'bg-purple-100 text-purple-800',
      'prioritization': 'bg-blue-100 text-blue-800',
      'strategy': 'bg-green-100 text-green-800',
      'metrics': 'bg-yellow-100 text-yellow-800',
      'user-research': 'bg-pink-100 text-pink-800',
      'stakeholder-management': 'bg-indigo-100 text-indigo-800',
      'technical': 'bg-gray-100 text-gray-800',
      'failure-analysis': 'bg-red-100 text-red-800',
      'process': 'bg-orange-100 text-orange-800',
      'market-awareness': 'bg-teal-100 text-teal-800',
      'roadmapping': 'bg-cyan-100 text-cyan-800',
      'collaboration': 'bg-emerald-100 text-emerald-800',
      'customer-feedback': 'bg-violet-100 text-violet-800',
      'inclusion': 'bg-rose-100 text-rose-800',
      'product-lifecycle': 'bg-amber-100 text-amber-800',
      'scaling': 'bg-lime-100 text-lime-800',
      'role-clarity': 'bg-sky-100 text-sky-800',
      'experimentation': 'bg-fuchsia-100 text-fuchsia-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      'junior': 'bg-green-100 text-green-800',
      'mid': 'bg-yellow-100 text-yellow-800',
      'senior': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const formatCategory = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>
              {formatCategory(question.category)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(question.level)}`}>
              {question.level.charAt(0).toUpperCase() + question.level.slice(1)} Level
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {question.question}
          </h2>
        </div>

        <button
          onClick={onSpeak}
          disabled={isPlaying}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
            isPlaying 
              ? 'bg-primary-400 cursor-not-allowed' 
              : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg'
          } text-white`}
        >
          {isPlaying ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Question Context */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Target className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900 mb-2">What we're looking for:</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              This question tests your {formatCategory(question.category).toLowerCase()} skills. 
              Think about specific examples from your experience, use data to support your points, 
              and demonstrate your product thinking process.
            </p>
          </div>
        </div>
      </div>

      {/* Follow-up Question Hint */}
      {question.followUp && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Potential Follow-up:</h4>
              <p className="text-blue-800 text-sm">
                {question.followUp}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <p className="text-sm text-primary-800">
          <strong>Instructions:</strong> Click the speaker icon to hear the question, 
          then record or type your answer. Take your time to think through your response 
          and provide specific examples from your experience.
        </p>
      </div>
    </div>
  );
};

export default QuestionDisplay;
