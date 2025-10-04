import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import VideoCallInterview from './components/VideoCallInterview';
import WelcomeScreen from './components/WelcomeScreen';
import InternshipsPage from './components/InternshipsPage';
import InterviewPrepGuide from './components/InterviewPrepGuide';
import NetworkingGuide from './components/NetworkingGuide';
import RecruitingTimelines from './components/RecruitingTimelines';
import QuestionBank from './components/QuestionBank';
import { InterviewSession } from './types';

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'interview' | 'internships' | 'interview-prep' | 'networking' | 'timelines' | 'question-bank'>('home');
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const startInterview = (settings: {
    category: string;
    level: string;
    duration: number;
    question?: any;
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
      score: 0,
      selectedQuestion: settings.question
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

  const handleQuestionSelect = (question: any) => {
    setSelectedQuestion(question);
    // This will be handled by the onStartInterview callback
  };

  const enterApp = () => {
    setShowLandingPage(false);
  };

  return (
    <div className="min-h-screen">
      {showLandingPage ? (
        <LandingPage onEnterApp={enterApp} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentPage === 'internships' ? (
        <InternshipsPage 
          onBack={() => setCurrentPage('home')} 
          onNavigateToInterviewPrep={() => setCurrentPage('interview-prep')}
          onNavigateToNetworking={() => setCurrentPage('networking')}
          onNavigateToTimelines={() => setCurrentPage('timelines')}
          onNavigateToInternships={() => setCurrentPage('internships')}
          onNavigateToHome={() => setCurrentPage('home')}
        />
      ) : currentPage === 'interview-prep' ? (
        <InterviewPrepGuide 
          onBack={() => setCurrentPage('home')} 
          onNavigateToInterviewPrep={() => setCurrentPage('interview-prep')}
          onNavigateToNetworking={() => setCurrentPage('networking')}
          onNavigateToTimelines={() => setCurrentPage('timelines')}
          onNavigateToHome={() => setCurrentPage('home')}
        />
      ) : currentPage === 'networking' ? (
            <NetworkingGuide 
              onBack={() => setCurrentPage('home')} 
              onNavigateToInterviewPrep={() => setCurrentPage('interview-prep')}
              onNavigateToNetworking={() => setCurrentPage('networking')}
              onNavigateToTimelines={() => setCurrentPage('timelines')}
              onNavigateToHome={() => setCurrentPage('home')}
            />
          ) : currentPage === 'timelines' ? (
            <RecruitingTimelines 
              onBack={() => setCurrentPage('home')} 
              onNavigateToInterviewPrep={() => setCurrentPage('interview-prep')}
              onNavigateToNetworking={() => setCurrentPage('networking')}
              onNavigateToTimelines={() => setCurrentPage('timelines')}
              onNavigateToInternships={() => setCurrentPage('internships')}
              onNavigateToHome={() => setCurrentPage('home')}
            />
          ) : currentPage === 'question-bank' ? (
            <QuestionBank 
              onBack={() => setCurrentPage('home')} 
              onSelectQuestion={handleQuestionSelect}
              onStartInterview={startInterview}
              onNavigateToInterviewPrep={() => setCurrentPage('interview-prep')}
              onNavigateToNetworking={() => setCurrentPage('networking')}
              onNavigateToTimelines={() => setCurrentPage('timelines')}
              onNavigateToHome={() => setCurrentPage('home')}
            />
          ) : !session ? (
            <WelcomeScreen 
              onStartInterview={startInterview}
              onNavigateToInterviewPrep={() => setCurrentPage('interview-prep')}
              onNavigateToNetworking={() => setCurrentPage('networking')}
              onNavigateToTimelines={() => setCurrentPage('timelines')}
              onNavigateToQuestionBank={() => setCurrentPage('question-bank')}
              onNavigateToHome={() => setCurrentPage('home')}
            />
          ) : (
            <VideoCallInterview
          session={session}
          onEndInterview={endInterview}
          onResetInterview={resetInterview}
        />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
