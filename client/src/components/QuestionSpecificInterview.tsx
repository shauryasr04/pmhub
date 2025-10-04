import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX,
  Clock,
  Target,
  Brain,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Star
} from 'lucide-react';
import { speakWithHumanVoice, stopAllSpeech } from '../utils/voiceUtils';

interface Question {
  id: string;
  category: string;
  subcategory: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Behavioral' | 'Product Design' | 'Case Study' | 'Technical' | 'Strategy';
  estimatedTime: number;
  tips: string[];
  framework?: string;
  exampleAnswer?: string;
}

interface QuestionSpecificInterviewProps {
  question: Question;
  onBack: () => void;
  onEndInterview: () => void;
}

const QuestionSpecificInterview: React.FC<QuestionSpecificInterviewProps> = ({
  question,
  onBack,
  onEndInterview
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [sessionId] = useState(Date.now().toString());
  const [startTime] = useState(new Date());
  const [currentPhase, setCurrentPhase] = useState<'introduction' | 'question' | 'discussion' | 'feedback'>('introduction');
  
  const recognition = useRef<SpeechRecognition | null>(null);
  const speechSynthesis = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onstart = () => {
        setIsListening(true);
      };

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserResponse(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsRecording(false);
        setIsListening(false);
      };
    }

    // Start the interview automatically
    startInterview();

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
      stopAllSpeech();
    };
  }, []);

  const startInterview = async () => {
    const introduction = `Welcome to your PM interview practice session. Today we'll be working on a ${question.difficulty.toLowerCase()} ${question.type.toLowerCase()} question. 

The question is: "${question.question}"

${question.framework ? `I recommend using the ${question.framework} framework to structure your answer.` : ''}

Take your time to think about your response. When you're ready, just start speaking and I'll listen to your answer. After you finish, I'll provide detailed feedback on your response.

Are you ready to begin?`;

    await speakWithHumanVoice(introduction);
    setCurrentPhase('question');
  };

  const handleUserResponse = async (transcript: string) => {
    setIsProcessing(true);
    
    // Add user response to conversation history
    const newHistory = [...conversationHistory, { role: 'user' as const, content: transcript }];
    setConversationHistory(newHistory);

    try {
      // Send to AI for analysis and follow-up
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are an expert PM interviewer conducting a practice interview. The specific question being asked is: "${question.question}"

Question Details:
- Category: ${question.category}
- Subcategory: ${question.subcategory}
- Difficulty: ${question.difficulty}
- Type: ${question.type}
- Framework: ${question.framework || 'No specific framework'}
- Tips: ${question.tips.join(', ')}

Your role:
1. Listen to the candidate's response
2. Ask 1-2 thoughtful follow-up questions to dig deeper
3. Provide specific, constructive feedback
4. Reference the question's framework and tips when appropriate
5. Be encouraging but thorough in your evaluation

Keep responses conversational and helpful. Focus on helping them improve their PM interview skills.`
            },
            ...newHistory
          ],
          context: `PM Interview Practice - ${question.type} Question`,
          sessionId
        }),
      });

      const data = await response.json();
      const aiResponse = data.response;

      // Add AI response to conversation history
      setConversationHistory([...newHistory, { role: 'assistant', content: aiResponse }]);

      // Speak the AI response
      setIsAISpeaking(true);
      await speakWithHumanVoice(aiResponse);
      setIsAISpeaking(false);

      // If this seems like a good stopping point, move to feedback phase
      if (newHistory.length >= 4) { // After 2 exchanges
        setCurrentPhase('feedback');
        await generateFinalFeedback();
      }

    } catch (error) {
      console.error('Error processing response:', error);
      await speakWithHumanVoice("I'm sorry, I encountered an error processing your response. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const generateFinalFeedback = async () => {
    try {
      const response = await fetch('/api/analyze-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.question,
          answer: conversationHistory.filter(msg => msg.role === 'user').map(msg => msg.content).join(' '),
          context: `PM Interview Practice - ${question.type} Question - ${question.category}`
        }),
      });

      const data = await response.json();
      setFeedback(data.feedback);
      
      // Speak the feedback
      await speakWithHumanVoice(`Great job! Let me provide you with detailed feedback on your response. ${data.feedback}`);
      
    } catch (error) {
      console.error('Error generating feedback:', error);
      await speakWithHumanVoice("I'm sorry, I couldn't generate feedback at this time. Your practice session is complete.");
    }
  };

  const startRecording = () => {
    if (recognition.current && !isRecording) {
      recognition.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition.current && isRecording) {
      recognition.current.stop();
    }
  };

  const handleEndCall = () => {
    const confirmed = window.confirm('Are you sure you want to end this practice session?');
    if (confirmed) {
      stopAllSpeech();
      if (recognition.current && isRecording) {
        recognition.current.stop();
      }
      onEndInterview();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Questions
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PM Interview Practice</h1>
                <p className="text-sm text-gray-600">
                  {question.category} • {question.subcategory}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(question.type)}`}>
                  {question.type}
                </span>
              </div>
              <button
                onClick={handleEndCall}
                className="flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                End Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Interview Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Interview Question
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-800 font-medium">{question.question}</p>
              </div>
              
              {question.framework && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Recommended Framework:</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {question.framework}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{question.estimatedTime} min estimated</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Brain className="w-4 h-4" />
                  <span>{question.tips.length} tips available</span>
                </div>
              </div>
            </div>

            {/* Voice Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Controls</h3>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing || isAISpeaking}
                  className={`flex items-center px-6 py-3 rounded-full text-white font-medium transition-colors ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } ${(isProcessing || isAISpeaking) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-5 h-5 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
                      Start Speaking
                    </>
                  )}
                </button>
              </div>

              {isProcessing && (
                <div className="mt-4 text-center">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Processing your response...</p>
                </div>
              )}

              {isAISpeaking && (
                <div className="mt-4 text-center">
                  <Volume2 className="w-5 h-5 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">AI is speaking...</p>
                </div>
              )}
            </div>

            {/* Conversation History */}
            {conversationHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h3>
                <div className="space-y-4">
                  {conversationHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-50 border-l-4 border-blue-500'
                          : 'bg-gray-50 border-l-4 border-gray-400'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          {message.role === 'user' ? (
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">You</span>
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                              <Brain className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Tips for This Question
              </h3>
              <ul className="space-y-2">
                {question.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                  AI Feedback
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700">{feedback}</p>
                </div>
              </div>
            )}

            {/* Session Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Started:</span>
                  <span>{startTime.toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phase:</span>
                  <span className="capitalize">{currentPhase}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchanges:</span>
                  <span>{Math.floor(conversationHistory.length / 2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSpecificInterview;
