import { useState, useEffect, useRef, useCallback } from 'react';

export interface WorldLanguage {
  code: string;
  name: string;
  flag: string;
}

export const WORLD_LANGUAGES: WorldLanguage[] = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-IN', name: 'English (India)', flag: '🇮🇳' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'hi-IN', name: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'es-ES', name: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French (Français)', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'zh-CN', name: 'Chinese (Mandarin 普通话)', flag: '🇨🇳' },
  { code: 'ja-JP', name: 'Japanese (日本語)', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean (한국어)', flag: '🇰🇷' },
  { code: 'ar-SA', name: 'Arabic (العربية)', flag: '🇸🇦' },
  { code: 'pt-BR', name: 'Portuguese (Brasil)', flag: '🇧🇷' },
  { code: 'ru-RU', name: 'Russian (Русский)', flag: '🇷🇺' },
  { code: 'it-IT', name: 'Italian (Italiano)', flag: '🇮🇹' },
  { code: 'nl-NL', name: 'Dutch (Nederlands)', flag: '🇳🇱' },
  { code: 'tr-TR', name: 'Turkish (Türkçe)', flag: '🇹🇷' },
  { code: 'pl-PL', name: 'Polish (Polski)', flag: '🇵🇱' },
  { code: 'vi-VN', name: 'Vietnamese (Tiếng Việt)', flag: '🇻🇳' },
  { code: 'th-TH', name: 'Thai (ไทย)', flag: '🇹🇭' },
  { code: 'id-ID', name: 'Indonesian (Bahasa Indonesia)', flag: '🇮🇩' },
  { code: 'bn-IN', name: 'Bengali (বাংলা)', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil (தமிழ்)', flag: '🇮🇳' },
  { code: 'te-IN', name: 'Telugu (తెలుగు)', flag: '🇮🇳' },
  { code: 'mr-IN', name: 'Marathi (मराठी)', flag: '🇮🇳' },
  { code: 'gu-IN', name: 'Gujarati (ગુજરાતી)', flag: '🇮🇳' },
  { code: 'ur-PK', name: 'Urdu (اردو)', flag: '🇵🇰' },
  { code: 'sv-SE', name: 'Swedish (Svenska)', flag: '🇸🇪' },
  { code: 'uk-UA', name: 'Ukrainian (Українська)', flag: '🇺🇦' },
  { code: 'el-GR', name: 'Greek (Ελληνικά)', flag: '🇬🇷' },
  { code: 'he-IL', name: 'Hebrew (עברית)', flag: '🇮🇱' },
];

export interface VoiceAssistantState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  isSupported: boolean;
  selectedLang: string;
  setSelectedLang: (langCode: string) => void;
  startListening: () => void;
  stopListening: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

export const useVoiceAssistant = (
  onTranscriptComplete?: (text: string) => void,
  initialLang: string = 'en-US'
): VoiceAssistantState => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [selectedLang, setSelectedLang] = useState(initialLang);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = selectedLang;

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);

      if (event.results[0].isFinal) {
        setIsListening(false);
        if (onTranscriptComplete && currentTranscript.trim()) {
          onTranscriptComplete(currentTranscript.trim());
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscriptComplete, selectedLang]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      try {
        recognitionRef.current.lang = selectedLang;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  }, [isListening, selectedLang]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (err) {
        console.warn('Recognition stop error:', err);
      }
    }
  }, [isListening]);

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    window.speechSynthesis.cancel();

    // Strip markdown formatting for clean speech
    const cleanText = text
      .replace(/###/g, '')
      .replace(/#/g, '')
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      .replace(/\$\$/g, '')
      .replace(/\$/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = selectedLang;

    // Pick best matching system voice for selected language
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang.toLowerCase().includes(selectedLang.toLowerCase().slice(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [selectedLang]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    isSupported,
    selectedLang,
    setSelectedLang,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
  };
};
