import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2,
  VolumeX,
  Home, 
  Clock,
  Brain,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Settings,
  User
} from 'lucide-react';
import { speakWithHumanVoice, stopAllSpeech } from '../utils/voiceUtils';

interface VideoCallInterviewProps {
  session: {
    category: string;
    level: string;
    duration: number;
    startTime: Date;
  };
  onEndInterview: () => void;
  onResetInterview: () => void;
}

const VideoCallInterview: React.FC<VideoCallInterviewProps> = ({
  session,
  onEndInterview,
  onResetInterview
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([]);

  const speechSynthesis = useRef<SpeechSynthesisUtterance | null>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleEndCall();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [recognition, isRecording]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Force stop all speech synthesis when component unmounts
      stopAllSpeech();
      
      // Stop speech recognition if active
      if (recognition && isRecording) {
        recognition.stop();
      }
    };
  }, [recognition, isRecording]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // If we have a final transcript, process it
        if (finalTranscript.trim()) {
          handleVoiceInput(finalTranscript.trim());
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'no-speech') {
          setError(`Voice recognition error: ${event.error}`);
        }
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setError('Voice recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  }, []);

  // Initialize conversation
  useEffect(() => {
    if (!currentQuestion) {
      // Wait for voices to load before starting conversation
      import('../utils/voiceUtils').then(({ waitForVoices }) => {
        waitForVoices().then(() => {
          startConversation();
        });
      });
    }
  }, []);

  const startConversation = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Hi! I'm ready to start my ${session.level} level Product Management interview focusing on ${session.category}. Please begin with an introductory question.`
            }
          ],
          context: `${session.category} - ${session.level} level PM interview`,
          sessionId: sessionId
        }),
      });

      const data = await response.json();
      
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      setCurrentQuestion(data.response);
      setConversationHistory([{role: 'user', content: `Hi! I'm ready to start my ${session.level} level Product Management interview focusing on ${session.category}. Please begin with an introductory question.`}, {role: 'assistant', content: data.response}]);
      
      // Auto-speak the welcome message
      speakText(data.response);
    } catch (error) {
      console.error('Error starting conversation:', error);
      setError('Failed to start interview. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = async (content: string) => {
    if (!content.trim() || isProcessing) return;

    setIsProcessing(true);

    try {
      const updatedHistory = [...conversationHistory, {role: 'user', content: content.trim()}];
      
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedHistory,
          context: `${session.category} - ${session.level} level PM interview`,
          sessionId: sessionId
        }),
      });

      const data = await response.json();

      setCurrentQuestion(data.response);
      setConversationHistory([...updatedHistory, {role: 'assistant', content: data.response}]);
      
      // Auto-speak the response
      speakText(data.response);
    } catch (error) {
      console.error('Error processing voice input:', error);
      setError('Failed to process your response. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = () => {
    if (recognition && !isRecording) {
      setError(null);
      setIsRecording(true);
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
    }
  };

  const speakText = (text: string) => {
    if (!isMuted) {
      speakWithHumanVoice(
        text,
        () => setIsAISpeaking(true),
        () => setIsAISpeaking(false),
        (error) => {
          console.error('Speech synthesis error:', error);
          setIsAISpeaking(false);
        }
      );
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
    }
  };

  const handleEndCall = () => {
    // Ask for confirmation before ending the call
    const confirmed = window.confirm('Are you sure you want to end the interview? This action cannot be undone.');
    
    if (confirmed) {
      // Force stop all speech synthesis
      stopAllSpeech();
      
      // Stop any ongoing speech recognition
      if (recognition && isRecording) {
        recognition.stop();
      }
      
      // Clear any ongoing processing
      setIsProcessing(false);
      setIsAISpeaking(false);
      setIsRecording(false);
      setIsListening(false);
      
      // Clear the speech synthesis ref
      if (speechSynthesis.current) {
        speechSynthesis.current = null;
      }
      
      // End the interview
      onEndInterview();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-white text-sm ml-4">PM Interview - {session.category} • {session.level} level</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm">
            <Clock className="w-4 h-4 inline mr-1" />
            {formatTime(Math.floor((Date.now() - session.startTime.getTime()) / 1000))}
          </div>
          <button
            onClick={onResetInterview}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Video Call Area */}
      <div className="flex-1 flex">
        {/* AI Video (Left Side) */}
        <div className="flex-1 bg-gray-800 relative">
          {/* AI Avatar/Video Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* AI Avatar */}
              <div className="relative mb-8">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Brain className="w-32 h-32 text-white" />
                </div>
                
                {/* Speaking indicator */}
                {isAISpeaking && (
                  <div className="absolute -inset-4 rounded-full border-4 border-green-400 animate-pulse"></div>
                )}
                
                {/* Processing indicator */}
                {isProcessing && (
                  <div className="absolute -inset-2 rounded-full border-2 border-yellow-400 animate-spin"></div>
                )}
              </div>

              {/* AI Name */}
              <div className="text-white text-xl font-semibold mb-2">AI Interviewer</div>
              <div className="text-gray-300 text-sm mb-4">
                {isAISpeaking ? 'Speaking...' : isProcessing ? 'Thinking...' : 'Ready to listen'}
              </div>

              {/* Current Question */}
              {currentQuestion && (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-6 text-left">
                    <p className="text-white text-lg leading-relaxed">
                      {currentQuestion}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-2 rounded-full transition-colors ${
                isVideoOn ? 'bg-gray-600 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* User Video (Right Side) */}
        <div className="w-80 bg-gray-700 relative">
          {/* User Video Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* User Avatar */}
              <div className="w-48 h-48 bg-gray-600 rounded-full flex items-center justify-center shadow-xl mb-4">
                <User className="w-24 h-24 text-gray-300" />
              </div>
              
              {/* User Name */}
              <div className="text-white text-lg font-semibold mb-2">You</div>
              <div className="text-gray-300 text-sm">
                {isRecording ? 'Speaking...' : isListening ? 'Ready to speak' : 'Muted'}
              </div>
            </div>
          </div>

          {/* User Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full transition-colors ${
                isMuted ? 'bg-red-500 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!recognition || isProcessing || isAISpeaking}
              className={`p-3 rounded-full transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isMuted 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
          >
            {isMuted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            {isMuted ? 'Unmute' : 'Mute'}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isVideoOn 
                ? 'bg-gray-600 text-white hover:bg-gray-500' 
                : 'bg-red-500 text-white'
            }`}
          >
            {isVideoOn ? <Video className="w-4 h-4 mr-2" /> : <VideoOff className="w-4 h-4 mr-2" />}
            {isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
          </button>

          <button
            onClick={handleEndCall}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <PhoneOff className="w-4 h-4 mr-2" />
            End Call
          </button>
        </div>
        
        {/* Help text */}
        <div className="text-center mt-2 text-gray-400 text-sm">
          Press <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Esc</kbd> to end call
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 text-red-200 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCallInterview;
