import React from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Lightbulb, 
  Target,
  ArrowRight,
  Home
} from 'lucide-react';
import { Answer } from '../types';

interface AnswerAnalysisProps {
  answer: Answer;
  onNextQuestion: () => void;
  onEndInterview: () => void;
}

const AnswerAnalysis: React.FC<AnswerAnalysisProps> = ({
  answer,
  onNextQuestion,
  onEndInterview
}) => {
  const analysis = answer.analysis;

  if (!analysis) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Unavailable</h3>
        <p className="text-gray-600 mb-6">
          We couldn't analyze your answer at this time. Please try again.
        </p>
        <button
          onClick={onNextQuestion}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Continue to Next Question
        </button>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Answer Analysis</h3>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
              {analysis.score}/10
            </div>
            <div className={`text-sm font-medium ${getScoreColor(analysis.score)}`}>
              {getScoreLabel(analysis.score)}
            </div>
          </div>
        </div>

        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              analysis.score >= 8 ? 'bg-green-500' : 
              analysis.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${analysis.score * 10}%` }}
          ></div>
        </div>
      </div>

      {/* Strengths */}
      {analysis.strengths && analysis.strengths.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Areas for Improvement */}
      {analysis.improvements && analysis.improvements.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Areas for Improvement</h4>
          </div>
          <ul className="space-y-2">
            {analysis.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Suggestions for Better Answers</h4>
          </div>
          <ul className="space-y-2">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Concepts */}
      {analysis.keyConcepts && analysis.keyConcepts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-purple-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Key PM Concepts to Mention</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.keyConcepts.map((concept, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-6">
        <button
          onClick={onEndInterview}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          End Interview
        </button>

        <button
          onClick={onNextQuestion}
          className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 font-medium"
        >
          Next Question
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AnswerAnalysis;
