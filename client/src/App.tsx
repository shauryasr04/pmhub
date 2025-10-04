import React, { useState } from 'react';
import VideoCallInterview from './components/VideoCallInterview';
import WelcomeScreen from './components/WelcomeScreen';
import InternshipsPage from './components/InternshipsPage';
import InterviewPrepGuide from './components/InterviewPrepGuide';
import NetworkingGuide from './components/NetworkingGuide';
import RecruitingTimelines from './components/RecruitingTimelines';
import QuestionBank from './components/QuestionBank';
import QuestionSpecificInterview from './components/QuestionSpecificInterview';
import { InterviewSession } from './types';

function App() {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'interview' | 'internships' | 'interview-prep' | 'networking' | 'timelines' | 'question-bank' | 'question-interview'>('home');
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

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

  const handleQuestionSelect = (question: any) => {
    setSelectedQuestion(question);
    setCurrentPage('question-interview');
  };

  const handleBackToQuestions = () => {
    setSelectedQuestion(null);
    setCurrentPage('question-bank');
  };

  const handleEndQuestionInterview = () => {
    setSelectedQuestion(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentPage === 'internships' ? (
        <InternshipsPage onBack={() => setCurrentPage('home')} />
      ) : currentPage === 'interview-prep' ? (
        <InterviewPrepGuide onBack={() => setCurrentPage('home')} />
      ) : currentPage === 'networking' ? (
        <NetworkingGuide onBack={() => setCurrentPage('home')} />
      ) : currentPage === 'timelines' ? (
        <RecruitingTimelines onBack={() => setCurrentPage('home')} />
      ) : currentPage === 'question-bank' ? (
        <QuestionBank 
          onBack={() => setCurrentPage('home')} 
          onSelectQuestion={handleQuestionSelect}
        />
      ) : currentPage === 'question-interview' ? (
        <QuestionSpecificInterview
          question={selectedQuestion}
          onBack={handleBackToQuestions}
          onEndInterview={handleEndQuestionInterview}
        />
      ) : !session ? (
        <WelcomeScreen 
          onStartInterview={startInterview}
          onNavigateToInternships={() => setCurrentPage('internships')}
          onNavigateToInterviewPrep={() => setCurrentPage('interview-prep')}
          onNavigateToNetworking={() => setCurrentPage('networking')}
          onNavigateToTimelines={() => setCurrentPage('timelines')}
          onNavigateToQuestionBank={() => setCurrentPage('question-bank')}
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
