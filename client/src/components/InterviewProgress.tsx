import React from 'react';
import { Clock, Target, CheckCircle } from 'lucide-react';

interface InterviewProgressProps {
  currentIndex: number;
  totalQuestions: number;
  duration: number;
  startTime: Date;
}

const InterviewProgress: React.FC<InterviewProgressProps> = ({
  currentIndex,
  totalQuestions,
  duration,
  startTime
}) => {
  const elapsedMinutes = Math.floor((Date.now() - startTime.getTime()) / (1000 * 60));
  const remainingMinutes = Math.max(0, duration - elapsedMinutes);
  const progressPercentage = Math.min(100, (elapsedMinutes / duration) * 100);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Interview Progress</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {formatTime(remainingMinutes)} remaining
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Time Progress</span>
          <span>{elapsedMinutes}/{duration} min</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Question Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">
            Question {currentIndex + 1} of {totalQuestions || '?'}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalQuestions || 5) }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < currentIndex 
                  ? 'bg-green-500' 
                  : i === currentIndex 
                    ? 'bg-primary-500' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
          {totalQuestions > 5 && (
            <span className="text-xs text-gray-500 ml-1">
              +{totalQuestions - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Time Warning */}
      {remainingMinutes <= 5 && remainingMinutes > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              <strong>Time Alert:</strong> {remainingMinutes} minutes remaining. 
              Consider wrapping up your current answer.
            </p>
          </div>
        </div>
      )}

      {remainingMinutes <= 0 && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 rounded">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-red-800">
              <strong>Time's Up:</strong> The interview time has ended. 
              You can continue with additional questions or end the session.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewProgress;
