import React, { useState } from 'react';
import VideoCallInterview from './components/VideoCallInterview';
import WelcomeScreen from './components/WelcomeScreen';
import { InterviewSession } from './types';

function App() {
  const [session, setSession] = useState<InterviewSession | null>(null);

  const startInterview = (settings: {
    category: string;
    level: string;
    duration: number;
  }) => {
    setSession({
      id: Date.now().toString(),
      category: settings.category,
      level: settings.level,
      duration: settings.duration,
      startTime: new Date(),
      questions: [],
      answers: [],
      currentQuestionIndex: 0,
      isActive: true,
      score: 0
    });
  };

  const endInterview = () => {
    // End the interview and return to welcome screen
    setSession(null);
  };

  const resetInterview = () => {
    setSession(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!session ? (
        <WelcomeScreen onStartInterview={startInterview} />
      ) : (
        <VideoCallInterview
          session={session}
          onEndInterview={endInterview}
          onResetInterview={resetInterview}
        />
      )}
    </div>
  );
}

export default App;
