# PM Voice Interviewer

An AI-powered voice mock interviewer for Product Management interviews. Practice your PM interview skills with real-time voice interaction, get instant feedback, and improve your interview performance.

## Features

- 🎤 **Voice Interaction**: Speak naturally and get AI responses in real-time
- 🎯 **Targeted Questions**: Questions tailored to your experience level and focus areas
- ⏱️ **Flexible Duration**: Choose interview length that fits your schedule
- 📊 **Real-time Analysis**: Get instant feedback on your answers with detailed scoring
- 🧠 **AI-Powered**: Uses OpenAI GPT for intelligent question generation and answer analysis
- 📱 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express
- **AI**: OpenAI GPT-3.5-turbo
- **Voice**: Web Speech API (Speech-to-Text and Text-to-Speech)
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Navigate to the project root
cd /Users/shauryasr/PM_app

# Install all dependencies (root, server, and client)
npm run install-all
```

**Note**: Make sure you're in the project root directory (`/Users/shauryasr/PM_app`) when running these commands, not in the `server` or `client` subdirectories.

### 2. Environment Setup

1. Copy the environment example file:
```bash
cp server/env.example server/.env
```

2. Edit `server/.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=5000
```

**Note**: The `.env` file contains sensitive information and should never be committed to version control. The `env.example` file is just a template.

### 3. Run the Application

```bash
# Start both frontend and backend in development mode
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

### 4. Access the Application

Open your browser and navigate to http://localhost:3000

## Usage

1. **Configure Interview**: Choose your focus area, experience level, and interview duration
2. **Start Interview**: Click "Start Interview" to begin
3. **Answer Questions**: Use voice recording or type your answers
4. **Get Feedback**: Receive detailed analysis and suggestions for each answer
5. **Continue**: Move to the next question or end the interview

## Question Categories

- Decision Making
- Prioritization
- Strategy
- Metrics & Analytics
- User Research
- Stakeholder Management
- Technical
- Failure Analysis
- Process
- Market Awareness
- Roadmapping
- Collaboration
- Customer Feedback
- Inclusion
- Product Lifecycle
- Scaling

## Experience Levels

- **Junior PM**: Entry-level product management questions
- **Mid-level PM**: Intermediate questions requiring more experience
- **Senior PM**: Advanced strategic and leadership questions
- **Mixed Levels**: Combination of all levels

## Browser Compatibility

- Chrome (recommended for best voice recognition)
- Firefox
- Safari
- Edge

**Note**: Voice recognition works best in Chrome. Other browsers may have limited support.

## API Endpoints

- `GET /api/questions` - Get all questions (with optional filtering)
- `GET /api/questions/random` - Get a random question
- `POST /api/analyze-answer` - Analyze a candidate's answer
- `POST /api/generate-followup` - Generate follow-up questions

## Development

### Project Structure

```
PM_app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── types/         # TypeScript type definitions
│   │   └── ...
│   └── ...
├── server/                # Node.js backend
│   ├── data/             # Question database
│   ├── index.js          # Express server
│   └── ...
└── ...
```

### Adding New Questions

Edit `server/data/pm-questions.json` to add new interview questions:

```json
{
  "id": 21,
  "question": "Your question here",
  "category": "category-name",
  "level": "junior|mid|senior",
  "followUp": "Optional follow-up question"
}
```

### Customizing AI Analysis

Modify the prompts in `server/index.js` to customize how the AI analyzes answers and generates follow-up questions.

## Troubleshooting

### Voice Recognition Not Working
- Ensure you're using a supported browser (Chrome recommended)
- Check microphone permissions
- Try refreshing the page

### OpenAI API Errors
- Verify your API key is correct
- Check your OpenAI account has sufficient credits
- Ensure the API key has the necessary permissions

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Ensure all environment variables are set

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Interviewing!** 🚀
