import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, RotateCcw } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  onAnswerSubmit: (answer: string) => void;
  isRecording: boolean;
  onRecordingChange: (isRecording: boolean) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscript,
  onAnswerSubmit,
  isRecording,
  onRecordingChange
}) => {
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        onRecordingChange(true);
        setError(null);
        console.log('Speech recognition started');
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

        const fullTranscript = finalTranscript + interimTranscript;
        setTranscript(fullTranscript);
        onTranscript(fullTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = 'Speech recognition error';
        
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage = 'Microphone not accessible. Please check permissions.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone permission denied. Please allow microphone access.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your connection.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        setError(errorMessage);
        onRecordingChange(false);
      };

      recognitionInstance.onend = () => {
        onRecordingChange(false);
        console.log('Speech recognition ended');
      };

      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  }, [onRecordingChange, onTranscript]);

  const startRecording = () => {
    if (recognition) {
      setTranscript('');
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const handleSubmit = async () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);
    try {
      await onAnswerSubmit(transcript.trim());
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError('Failed to submit answer');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setTranscript('');
    onTranscript('');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTranscript(value);
    onTranscript(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Answer</h3>
        <div className="flex items-center space-x-2">
          {error && (
            <span className="text-sm text-red-600">{error}</span>
          )}
        </div>
      </div>

      {/* Recording Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={!recognition}
            className="flex items-center justify-center w-16 h-16 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Mic className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center justify-center w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl recording-indicator"
          >
            <MicOff className="w-6 h-6" />
          </button>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">
            {isRecording ? 'Recording...' : 'Click to record'}
          </p>
          <p className="text-xs text-gray-500">
            {recognition ? 'Voice recognition ready' : 'Voice recognition not available'}
          </p>
        </div>
      </div>

      {/* Transcript Area */}
      <div className="space-y-4">
        <textarea
          ref={textareaRef}
          value={transcript}
          onChange={handleTextChange}
          placeholder="Your answer will appear here as you speak, or you can type directly..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleClear}
            disabled={!transcript.trim()}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </button>

          <button
            onClick={handleSubmit}
            disabled={!transcript.trim() || isProcessing}
            className="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Answer
              </>
            )}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Speak clearly and at a moderate pace. You can pause and resume recording, 
          or type your answer directly. The AI will analyze your response and provide feedback.
        </p>
      </div>
    </div>
  );
};

export default VoiceRecorder;
