// Voice utility functions for more human-like speech synthesis

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
}

export const getHumanLikeVoiceSettings = (): VoiceSettings => {
  const voices = window.speechSynthesis.getVoices();
  
  // Preferred voices in order of quality (most human-like first)
  const preferredVoices = [
    'Google UK English Female',
    'Google UK English Male', 
    'Google US English Female',
    'Google US English Male',
    'Microsoft Zira Desktop',
    'Microsoft David Desktop',
    'Alex',
    'Samantha',
    'Victoria',
    'Daniel',
    'Karen',
    'Moira',
    'Tessa',
    'Veena',
    'Rishi'
  ];
  
  // Find the best available voice
  let selectedVoice = voices.find(voice => 
    preferredVoices.some(preferred => voice.name.includes(preferred))
  );
  
  // Fallback to any English female voice
  if (!selectedVoice) {
    selectedVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Female')
    );
  }
  
  // Final fallback to any English voice
  if (!selectedVoice) {
    selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
  }

  return {
    rate: 0.85, // Slightly slower for more natural speech
    pitch: 0.95, // Slightly lower pitch for more professional tone
    volume: 0.9, // Slightly lower volume for more natural feel
    voice: selectedVoice
  };
};

export const speakWithHumanVoice = (text: string, onStart?: () => void, onEnd?: () => void, onError?: (error: any) => void) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const settings = getHumanLikeVoiceSettings();
    
    // Apply human-like settings
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    
    if (settings.voice) {
      utterance.voice = settings.voice;
    }

    // Add natural pauses and emphasis
    const processedText = addNaturalPauses(text);
    utterance.text = processedText;

    // Event handlers
    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      onError?.(event.error);
    };

    window.speechSynthesis.speak(utterance);
  }
};

// Add natural pauses and emphasis to make speech more human-like
const addNaturalPauses = (text: string): string => {
  return text
    // Add pauses after question marks
    .replace(/\?/g, '? ')
    // Add pauses after periods
    .replace(/\./g, '. ')
    // Add pauses after exclamation marks
    .replace(/!/g, '! ')
    // Add slight pauses after commas
    .replace(/,/g, ', ')
    // Add emphasis to important words (capitalize them)
    .replace(/\b(important|key|critical|significant|major|essential)\b/gi, (match) => match.toUpperCase())
    // Add emphasis to numbers
    .replace(/\b(\d+)\b/g, '$1')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
};

// Get available voices for debugging
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  return window.speechSynthesis.getVoices();
};

// Check if voices are loaded
export const waitForVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};
