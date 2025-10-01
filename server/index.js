const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Load PM interview questions
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/pm-questions.json'), 'utf8'));

// Load PM context from Cracking the PM Interview
const pmContext = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/pm-context.json'), 'utf8'));

// Routes
app.get('/api/questions', (req, res) => {
  const { category, level } = req.query;
  let filteredQuestions = questions;

  if (category && category !== 'all') {
    filteredQuestions = questions.filter(q => q.category === category);
  }

  if (level && level !== 'all') {
    filteredQuestions = filteredQuestions.filter(q => q.level === level);
  }

  res.json(filteredQuestions);
});

app.get('/api/questions/random', (req, res) => {
  const { category, level } = req.query;
  let filteredQuestions = questions;

  if (category && category !== 'all') {
    filteredQuestions = questions.filter(q => q.category === category);
  }

  if (level && level !== 'all') {
    filteredQuestions = filteredQuestions.filter(q => q.level === level);
  }

  if (filteredQuestions.length === 0) {
    return res.status(404).json({ error: 'No questions found for the specified criteria' });
  }

  const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
  res.json(randomQuestion);
});

app.post('/api/analyze-answer', async (req, res) => {
  try {
    const { question, answer, context } = req.body;

    // Get PM context for enhanced analysis
    const pmBookContext = pmContext.books['cracking-the-pm-interview'];
    const evaluationCriteria = pmBookContext.evaluationCriteria;

    const prompt = `
    As an expert Product Management interviewer with deep knowledge from "Cracking the PM Interview", analyze this candidate's answer and provide constructive feedback.

    Question: ${question}
    Candidate's Answer: ${answer}
    Context: ${context || 'General PM interview'}

    EVALUATION FRAMEWORK (from Cracking the PM Interview):
    ${JSON.stringify(evaluationCriteria, null, 2)}

    PM COMPETENCIES TO ASSESS:
    - Product Sense: Did they identify user problems and design solutions?
    - Structured Thinking: Did they ask clarifying questions and break down the problem?
    - Customer Focus: Did they think about users vs. personal preferences?
    - Business Acumen: Did they consider business goals and metrics?
    - Leadership: Did they show initiative and problem-solving approach?

    Please provide:
    1. A score from 1-10 based on the evaluation criteria
    2. Strengths of the answer (reference specific PM competencies)
    3. Areas for improvement (reference common mistakes from the book)
    4. Specific suggestions for a better answer (reference PM frameworks)
    5. Key PM concepts they should mention (from the book)
    6. Follow-up questions to test deeper understanding

    Format your response as JSON with these fields: score, strengths, improvements, suggestions, keyConcepts, followUpQuestions
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert Product Management interviewer with 10+ years of experience and deep knowledge from 'Cracking the PM Interview'. Provide detailed, constructive feedback using PM frameworks and evaluation criteria."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing answer:', error);
    res.status(500).json({ error: 'Failed to analyze answer' });
  }
});

app.post('/api/generate-followup', async (req, res) => {
  try {
    const { question, answer, context } = req.body;

    // Get PM context for enhanced follow-up generation
    const pmBookContext = pmContext.books['cracking-the-pm-interview'];
    const followUpQuestions = pmBookContext.followUpQuestions;

    const prompt = `
    As a Product Management interviewer with deep knowledge from "Cracking the PM Interview", generate a thoughtful follow-up question based on the candidate's answer.

    Original Question: ${question}
    Candidate's Answer: ${answer}
    Context: ${context || 'General PM interview'}

    PM EVALUATION FRAMEWORK:
    ${JSON.stringify(followUpQuestions, null, 2)}

    Generate a follow-up question that:
    1. Digs deeper into their answer using PM frameworks
    2. Tests specific PM competencies (product sense, structured thinking, customer focus, business acumen, leadership)
    3. Is relevant to their response and experience level
    4. Helps assess their PM thinking and problem-solving approach
    5. References concepts from "Cracking the PM Interview"

    Return only the follow-up question, no additional text.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert Product Management interviewer with deep knowledge from 'Cracking the PM Interview'. Generate insightful follow-up questions that test specific PM competencies and frameworks."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 200
    });

    res.json({ followUpQuestion: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error generating follow-up:', error);
    res.status(500).json({ error: 'Failed to generate follow-up question' });
  }
});

// Interactive conversation endpoint
app.post('/api/conversation', async (req, res) => {
  try {
    const { messages, context, sessionId } = req.body;

    // Extract experience level from context
    const experienceLevel = context?.includes('senior') ? 'senior' : 
                           context?.includes('mid') ? 'mid' : 
                           context?.includes('junior') ? 'junior' : 'mid';

    // Get relevant PM context based on experience level
    const relevantContext = getRelevantPMContext(experienceLevel);

    const systemPrompt = `
    You are an expert Product Management interviewer conducting a live interview, with deep knowledge from "Cracking the PM Interview" by Gayle Laakmann McDowell and Jackie Bavaro.

    PM INTERVIEW EXPERTISE:
    ${JSON.stringify(relevantContext, null, 2)}

    EVALUATION FRAMEWORK:
    - Product Sense: Can they identify user problems and design solutions that address real needs?
    - Structured Thinking: Do they ask clarifying questions and break down problems systematically?
    - Customer Focus: Do they think about users vs. personal preferences?
    - Business Acumen: Do they consider business goals, metrics, and market opportunity?
    - Leadership: Do they show initiative and ability to lead without authority?

    INTERVIEW APPROACH:
    1. Ask thoughtful, challenging PM questions based on the candidate's experience level (${experienceLevel})
    2. Provide real-time feedback using the evaluation criteria above
    3. Guide the conversation naturally like a real interviewer
    4. Assess their PM skills using the frameworks from "Cracking the PM Interview"
    5. Be encouraging but thorough in your questioning
    6. Reference specific PM concepts and frameworks when appropriate

    CONTEXT: ${context || 'General PM interview'}
    SESSION: ${sessionId || 'new-session'}

    Respond as a conversational interviewer who references PM best practices naturally.
    Ask follow-up questions that test specific competencies.
    Provide feedback that references PM frameworks and evaluation criteria.
    Keep responses concise but engaging (2-3 sentences max).
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const response = completion.choices[0].message.content;
    
    res.json({ 
      response,
      sessionId: sessionId || Date.now().toString(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in conversation:', error);
    res.status(500).json({ error: 'Failed to process conversation' });
  }
});

// Helper function to get relevant PM context based on experience level
function getRelevantPMContext(level) {
  const book = pmContext.books['cracking-the-pm-interview'];
  const frameworks = pmContext.evaluationFrameworks;
  
  return {
    keyConcepts: book.keyConcepts,
    interviewFrameworks: book.interviewFrameworks,
    evaluationCriteria: book.evaluationCriteria,
    commonMistakes: book.commonMistakes,
    followUpQuestions: book.followUpQuestions,
    pmCompetencies: pmContext.pmCompetencies,
    experienceLevel: level,
    frameworks: frameworks
  };
}

// Get interview suggestions based on experience level
app.post('/api/interview-suggestions', async (req, res) => {
  try {
    const { level, category, experience } = req.body;

    const prompt = `
    Generate 5 interview questions for a ${level} Product Manager focusing on ${category}.
    Experience: ${experience || 'Not specified'}
    
    Include:
    1. A behavioral question
    2. A technical/analytical question  
    3. A strategic thinking question
    4. A stakeholder management question
    5. A product sense question
    
    Format as JSON array with question, category, and difficulty fields.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert PM interviewer creating targeted interview questions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000
    });

    const questions = JSON.parse(completion.choices[0].message.content);
    res.json({ questions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    res.status(500).json({ error: 'Failed to generate interview suggestions' });
  }
});

// Serve React app (only in production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
