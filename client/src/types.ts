export interface InterviewSession {
  id: string;
  category: string;
  level: string;
  duration: number; // in minutes
  startTime: Date;
  endTime?: Date;
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  isActive: boolean;
  score: number;
  selectedQuestion?: any; // Question from question bank
}

export interface Question {
  id: number;
  question: string;
  category: string;
  level: string;
  followUp?: string;
}

export interface Answer {
  questionId: number;
  answer: string;
  timestamp: Date;
  analysis?: AnswerAnalysis;
}

export interface AnswerAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  keyConcepts: string[];
}

export interface InterviewSettings {
  category: string;
  level: string;
  duration: number;
}

export interface VoiceState {
  isRecording: boolean;
  isPlaying: boolean;
  transcript: string;
  error: string | null;
}
