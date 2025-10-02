import React, { useState } from 'react';
import VideoCallInterview from './components/VideoCallInterview';
import WelcomeScreen from './components/WelcomeScreen';
import InternshipsPage from './components/InternshipsPage';
import { InterviewSession } from './types';

function App() {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'interview' | 'internships'>('home');

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
    setCurrentPage('interview');
  };

  const endInterview = () => {
    // Stop all speech synthesis before ending
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    // End the interview and return to home
    setSession(null);
    setCurrentPage('home');
  };

  const resetInterview = () => {
    setSession(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentPage === 'internships' ? (
        <InternshipsPage onBack={() => setCurrentPage('home')} />
      ) : !session ? (
        <WelcomeScreen 
          onStartInterview={startInterview}
          onNavigateToInternships={() => setCurrentPage('internships')}
        />
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
