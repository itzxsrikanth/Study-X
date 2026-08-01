import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  Code, 
  MessageSquare, 
  Plus, 
  Pin,
  Check,
  Copy,
  Mic,
  Volume2,
  VolumeX,
  Radio,
  Globe,
  BookOpen,
  Terminal,
  Search,
  PenTool,
  Bug,
  Zap,
  FileText,
  FileSpreadsheet,
  Presentation,
  Archive,
  Cpu
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useVoiceAssistant, WORLD_LANGUAGES } from '../hooks/useVoiceAssistant';
import { VoiceVisualizer } from '../components/VoiceVisualizer';
import { tutorApi } from '../api/tutorApi';
import { 
  exportAsPDF, 
  exportAsDOCX, 
  exportAsPPTX, 
  exportAsXLSX, 
  exportAsZIP 
} from '../utils/fileExporter';

export type AIMode = 'study' | 'coding' | 'research' | 'writing' | 'debug' | 'productivity';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  codeSnippet?: string;
  language?: string;
  providerUsed?: string;
  mode?: AIMode;
  timestamp: string;
}

const AI_MODES: { id: AIMode; label: string; icon: any; color: string; desc: string }[] = [
  { id: 'study', label: 'Study Mode', icon: BookOpen, color: 'text-[#06B6D4]', desc: 'Academic breakdowns & step-by-step concept explanations' },
  { id: 'coding', label: 'Coding Mode', icon: Terminal, color: 'text-[#3B82F6]', desc: 'Production code, architecture & refactoring (when requested)' },
  { id: 'research', label: 'Research Mode', icon: Search, color: 'text-[#C6FF00]', desc: 'Literature synthesis, citations & analytical reports' },
  { id: 'writing', label: 'Creative Writing', icon: PenTool, color: 'text-[#0EA5E9]', desc: 'Essays, narrative synthesis & structured articles' },
  { id: 'debug', label: 'Debug Mode', icon: Bug, color: 'text-amber-400', desc: 'Root-cause diagnosis, stack trace parsing & bug fixes' },
  { id: 'productivity', label: 'Productivity Mode', icon: Zap, color: 'text-emerald-400', desc: 'Action items, execution roadmaps & project templates' },
];

export const AiChatPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AIMode>('study');
  const [sessionId] = useState<string>(() => 'session_' + Date.now());

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello! I am your AI Tutor powered directly by Anthropic Claude and Google Gemini APIs. I provide clear, human-like explanations, step-by-step problem solving, and personalized tutoring. Ask me any study or technical question!",
      providerUsed: 'Anthropic Claude 3.5 Sonnet / Google Gemini 1.5',
      mode: 'study',
      timestamp: '10:00 AM'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [voiceMode, setVoiceMode] = useState(false);
  const [activeSpeechMsgId, setActiveSpeechMsgId] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState('en-US');

  const [pinnedChats] = useState([
    "Spring Boot Architecture",
    "React Query Best Practices",
    "SQL Index Optimization",
  ]);

  // Multilingual Voice Assistant Hook (English, Tamil, Hindi, etc.)
  const {
    isListening,
    isSpeaking,
    transcript,
    isSupported: isVoiceSupported,
    setSelectedLang,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
  } = useVoiceAssistant((finalText) => {
    setInput(finalText);
    handleSend(finalText);
  }, activeLang);

  const handleLanguageChange = (langCode: string) => {
    setActiveLang(langCode);
    setSelectedLang(langCode);
  };

  useEffect(() => {
    if (isListening && transcript) {
      setInput(transcript);
    }
  }, [isListening, transcript]);

  // Utility to parse raw API text response into text & optional code block
  const parseApiResponse = (rawText: string): { text: string; codeSnippet?: string; language?: string } => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/;
    const match = rawText.match(codeBlockRegex);

    if (match) {
      const language = match[1] || 'text';
      const codeSnippet = match[2].trim();
      const cleanText = rawText.replace(codeBlockRegex, '').trim();
      return { text: cleanText || "Here is the requested implementation:", codeSnippet, language };
    }

    return { text: rawText };
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      // Call backend API /api/v1/tutor/chat (Official Claude / Gemini API Integration)
      const apiResult = await tutorApi.sendChatQuery(query, activeMode, sessionId);
      const parsed = parseApiResponse(apiResult.response);
      const newMsgId = (Date.now() + 1).toString();

      const aiMsg: ChatMessage = {
        id: newMsgId,
        sender: 'ai',
        text: parsed.text,
        codeSnippet: parsed.codeSnippet,
        language: parsed.language,
        providerUsed: apiResult.providerUsed,
        mode: activeMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (voiceMode) {
        setActiveSpeechMsgId(newMsgId);
        speakText(parsed.text);
      }
    } catch (err) {
      console.error('AI Tutor API response error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleToggleSpeak = (msgId: string, text: string) => {
    if (isSpeaking && activeSpeechMsgId === msgId) {
      stopSpeaking();
      setActiveSpeechMsgId(null);
    } else {
      setActiveSpeechMsgId(msgId);
      speakText(text);
    }
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentLangObj = WORLD_LANGUAGES.find((l) => l.code === activeLang) || WORLD_LANGUAGES[0];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4 h-[calc(100vh-7rem)]">
      {/* Left History Sidebar */}
      <div className="hidden lg:flex flex-col glass-card-studyx p-4 space-y-4 border-white/10 h-full">
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          showArrow={false}
          className="w-full justify-center"
          onClick={() => setMessages([messages[0]])}
        >
          New Conversation
        </Button>

        <div className="space-y-2 flex-1 overflow-y-auto">
          <span className="text-caption font-semibold uppercase tracking-widest text-[#687380] px-2 block">
            Pinned Conversations
          </span>
          {pinnedChats.map((chat, idx) => (
            <div
              key={idx}
              onClick={() => handleSend(chat)}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#11121A] hover:bg-white/5 text-small text-[#D1D5DB] cursor-pointer border border-white/5 transition-all"
            >
              <div className="flex items-center gap-2.5 truncate">
                <MessageSquare className="w-3.5 h-3.5 text-[#3B82F6] flex-shrink-0" />
                <span className="truncate font-semibold">{chat}</span>
              </div>
              <Pin className="w-3.5 h-3.5 text-[#0EA5E9] flex-shrink-0" />
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-2xl bg-[#11121A] border border-[#3B82F6]/30 text-caption text-[#9CA3AF] space-y-1">
          <span className="font-semibold text-[#FFFEFF] flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#06B6D4]" />
            Official Claude & Gemini APIs
          </span>
          <p className="text-caption">Natural human answers, deep reasoning, session memory, no unneeded code.</p>
        </div>
      </div>

      {/* Main Chat Panel */}
      <div className="lg:col-span-3 glass-card-studyx flex flex-col justify-between border-white/10 h-full overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#11121A]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-studyx-primary text-white shadow-glow-primary">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-small font-bold text-[#FFFEFF] flex items-center gap-2">
                Official Claude & Gemini AI Tutor
                <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
              </h3>
              <span className="text-caption text-[#687380] font-mono">Intelligent Model Routing & Failover</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <VoiceVisualizer isActive={isListening} type="listening" />
            <VoiceVisualizer isActive={isSpeaking} type="speaking" />

            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-2 bg-[#0B0B10] border border-white/10 px-3 py-1.5 rounded-full">
              <Globe className="w-4 h-4 text-[#06B6D4]" />
              <select
                value={activeLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent text-caption font-semibold text-white focus:outline-none cursor-pointer"
              >
                {WORLD_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#11121A] text-white">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Mode Pill */}
            <button
              onClick={() => {
                setVoiceMode(!voiceMode);
                if (isSpeaking) stopSpeaking();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold transition-all border ${
                voiceMode
                  ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#3B82F6] shadow-glow-primary'
                  : 'bg-[#11121A] border-white/10 text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${voiceMode ? 'animate-pulse text-[#0EA5E9]' : ''}`} />
              <span>{voiceMode ? 'Voice: ON' : 'Voice: OFF'}</span>
            </button>
          </div>
        </div>

        {/* 6 AI Operational Modes Toolbar */}
        <div className="px-4 py-2.5 bg-[#0B0B10] border-b border-white/10 flex flex-wrap items-center gap-2 overflow-x-auto">
          {AI_MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-caption font-bold transition-all border ${
                  isActive
                    ? 'bg-gradient-studyx-primary text-white border-[#3B82F6] shadow-glow-primary'
                    : 'bg-[#11121A] border-white/5 text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
                title={mode.desc}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : mode.color}`} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Messages Stream */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2.5 rounded-2xl flex-shrink-0 text-white shadow-lg ${
                msg.sender === 'user' ? 'bg-[#0EA5E9]' : 'bg-gradient-studyx-primary'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`space-y-3 max-w-2xl p-5 rounded-2xl border text-small leading-relaxed relative ${
                msg.sender === 'user'
                  ? 'bg-[#3B82F6]/25 border-[#3B82F6]/40 text-[#FFFEFF] rounded-tr-none'
                  : 'bg-[#11121A] border-white/10 text-[#D1D5DB] rounded-tl-none shadow-studyx-glass'
              }`}>
                {/* AI Provider Badge */}
                {msg.sender === 'ai' && msg.providerUsed && (
                  <div className="flex items-center gap-1.5 pb-1 text-[11px] font-mono text-[#06B6D4]">
                    <Cpu className="w-3 h-3 text-[#06B6D4]" />
                    <span>{msg.providerUsed}</span>
                  </div>
                )}

                <div className="whitespace-pre-line font-sans leading-relaxed space-y-2">
                  {msg.text}
                </div>

                {/* Render Code snippet ONLY if present (e.g. explicitly requested by user) */}
                {msg.codeSnippet && (
                  <div className="rounded-2xl bg-[#0B0B10] p-4 border border-white/10 space-y-2 font-mono mt-3">
                    <div className="flex items-center justify-between text-caption text-[#687380] pb-2 border-b border-white/5">
                      <span className="flex items-center gap-1.5 font-bold uppercase text-[#06B6D4]">
                        <Code className="w-3.5 h-3.5" /> {msg.language || 'code'}
                      </span>
                      <button
                        onClick={() => handleCopyCode(msg.id, msg.codeSnippet!)}
                        className="flex items-center gap-1 text-[#9CA3AF] hover:text-white transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#C6FF00]" />
                            <span className="text-[#C6FF00]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-[#06B6D4] text-caption overflow-x-auto">
                      <code>{msg.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* AI Action & Download Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5">
                  {msg.sender === 'ai' ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Audio Speaker */}
                      <button
                        onClick={() => handleToggleSpeak(msg.id, msg.text)}
                        className={`flex items-center gap-1 text-caption font-semibold transition-colors ${
                          isSpeaking && activeSpeechMsgId === msg.id
                            ? 'text-[#06B6D4]'
                            : 'text-[#687380] hover:text-white'
                        }`}
                      >
                        {isSpeaking && activeSpeechMsgId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-[#0EA5E9]" />
                            <span>Stop Reading</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                            <span>Read ({currentLangObj.flag})</span>
                          </>
                        )}
                      </button>

                      {/* Download Exporter Options */}
                      <span className="text-white/20">|</span>
                      <button
                        onClick={() => exportAsPDF('StudyX_AI_Response', msg.text)}
                        className="flex items-center gap-1 text-caption text-[#9CA3AF] hover:text-[#06B6D4] transition-colors"
                        title="Download PDF"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>

                      <button
                        onClick={() => exportAsDOCX('StudyX_AI_Response', msg.text)}
                        className="flex items-center gap-1 text-caption text-[#9CA3AF] hover:text-[#3B82F6] transition-colors"
                        title="Download DOCX"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>DOCX</span>
                      </button>

                      <button
                        onClick={() => exportAsPPTX('StudyX_AI_Presentation', msg.text)}
                        className="flex items-center gap-1 text-caption text-[#9CA3AF] hover:text-amber-400 transition-colors"
                        title="Download PPTX"
                      >
                        <Presentation className="w-3.5 h-3.5" />
                        <span>PPTX</span>
                      </button>

                      <button
                        onClick={() => exportAsXLSX('StudyX_AI_Sheet', msg.text)}
                        className="flex items-center gap-1 text-caption text-[#9CA3AF] hover:text-[#C6FF00] transition-colors"
                        title="Download XLSX"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>XLSX</span>
                      </button>

                      {msg.codeSnippet && (
                        <button
                          onClick={() => exportAsZIP('StudyX_Project', msg.codeSnippet!)}
                          className="flex items-center gap-1 text-caption text-[#9CA3AF] hover:text-[#0EA5E9] transition-colors"
                          title="Download ZIP Archive"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          <span>ZIP</span>
                        </button>
                      )}
                    </div>
                  ) : <div />}

                  <span className="text-caption text-[#687380] font-mono">{msg.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3 text-[#687380] text-small italic font-mono">
              <Bot className="w-4 h-4 text-[#3B82F6] animate-spin" />
              Official Claude & Gemini API is processing your answer...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-[#11121A]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3 bg-[#0B0B10] border border-white/10 rounded-full p-2 pl-5 focus-within:ring-2 focus-within:ring-[#3B82F6]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? `Listening in ${currentLangObj.name}...` : `Ask any question or tap mic...`}
              className="w-full bg-transparent text-small text-white placeholder-[#687380] focus:outline-none"
            />

            {/* Mic Button */}
            {isVoiceSupported && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (isListening) stopListening();
                  else startListening();
                }}
                className={`p-2.5 rounded-full transition-all ${
                  isListening
                    ? 'bg-[#06B6D4] text-[#0B0B10] shadow-glow-cyan animate-pulse'
                    : 'bg-[#11121A] text-[#9CA3AF] hover:text-white border border-white/10'
                }`}
                title={`Speak in ${currentLangObj.name}`}
              >
                <Mic className="w-4 h-4" />
              </motion.button>
            )}

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-full bg-gradient-studyx-primary hover:opacity-90 text-white disabled:opacity-50 transition-all shadow-glow-primary"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
