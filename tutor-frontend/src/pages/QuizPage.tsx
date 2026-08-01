import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useUserStore } from '../store/userStore';
import { QuizQuestion, QuizResultResponse } from '../types/Dashboard';
import { quizApi } from '../api/quizApi';
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  BookOpen, 
  Brain,
  Zap,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export const QuizPage: React.FC = () => {
  const { userId, activePlanId } = useUserStore();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResultResponse | null>(null);

  // Dynamic Difficulty Tier State
  const [difficultyTier, setDifficultyTier] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    setResult(null);
    setCurrentIndex(0);
    setAnswers({});
    try {
      const q = await quizApi.getQuestions('Full-Stack Architecture & AI Systems');
      setQuestions(q);
    } catch (err) {
      console.error('Error fetching quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId: string, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await quizApi.submitQuiz(userId || 1, activePlanId || 101, answers);
      setResult(res);

      // Adjust difficulty tier based on score percentage
      if (res.percentage >= 90) setDifficultyTier('Expert');
      else if (res.percentage >= 75) setDifficultyTier('Advanced');
      else if (res.percentage >= 50) setDifficultyTier('Intermediate');
      else setDifficultyTier('Beginner');

      // Trigger celebration if passed
      if (res.percentage >= 75) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Submit quiz failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto pt-16 text-center space-y-4">
        <div className="p-4 rounded-3xl bg-gradient-studyx-primary w-16 h-16 mx-auto flex items-center justify-center text-white shadow-glow-primary animate-pulse">
          <Brain className="w-8 h-8" />
        </div>
        <h2 className="text-h3 font-bold text-[#FFFEFF]">Generating SteadyX Adaptive Evaluation...</h2>
        <p className="text-small text-[#9CA3AF]">Calibrating difficulty algorithms across core curriculum topics.</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isAnswered = currentQ && answers[currentQ.id] !== undefined;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-4">
      {/* Header OS Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-card-studyx p-6 md:p-8 border-white/10 shadow-studyx-glass">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge label="Adaptive Quiz Engine" variant="lime" icon={<Brain className="w-3.5 h-3.5" />} />
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <h1 className="text-h2 font-bold text-[#FFFEFF]">
            Adaptive Evaluation Loop
          </h1>
          <p className="text-small text-[#9CA3AF]">
            Dynamic quiz evaluation adjusting difficulty in real-time based on your response accuracy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge label={`Current Tier: ${difficultyTier}`} variant={difficultyTier === 'Expert' ? 'pink' : difficultyTier === 'Advanced' ? 'purple' : 'cyan'} />
          <Button variant="tertiary" size="sm" icon={RotateCcw} showArrow={false} onClick={loadQuestions}>
            Reset Evaluation
          </Button>
        </div>
      </div>

      {!result ? (
        /* Quiz Questions Form */
        <div className="glass-card-studyx p-8 md:p-10 border-white/10 space-y-8 shadow-studyx-glass">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-caption font-mono text-[#9CA3AF]">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-[#1A1C26] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-studyx-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <span className="text-caption font-mono font-bold text-[#06B6D4] uppercase tracking-wider block">
              Topic: {currentQ?.targetTopic || 'Core Architecture'}
            </span>
            <h2 className="text-h3 font-bold text-[#FFFEFF] leading-snug">
              {currentQ?.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ?.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full p-4 rounded-2xl text-left text-small font-medium transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#FFFEFF] shadow-glow-primary'
                      : 'bg-[#11121A] border-white/5 text-[#D1D5DB] hover:bg-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-caption font-bold font-mono border ${
                      isSelected ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'bg-[#1A1C26] text-[#9CA3AF] border-white/10'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{opt}</span>
                  </div>

                  {isSelected && <CheckCircle2 className="w-5 h-5 text-[#3B82F6]" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <Button
              variant="tertiary"
              size="md"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              Previous Question
            </Button>

            {isLast ? (
              <Button
                variant="primary"
                size="md"
                disabled={!isAnswered || submitting}
                onClick={handleSubmit}
              >
                {submitting ? 'Evaluating Evaluation...' : 'Submit Evaluation'}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                disabled={!isAnswered}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
              >
                Next Question
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Evaluation Results Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-studyx p-8 md:p-10 border-white/10 space-y-8 shadow-studyx-glass text-center"
        >
          <div className="p-5 rounded-3xl bg-gradient-studyx-primary w-20 h-20 mx-auto flex items-center justify-center text-white shadow-glow-primary">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <Badge label={`Rating: ${result.performanceRating}`} variant={result.percentage >= 75 ? 'lime' : 'pink'} />
            <h2 className="text-h2 font-bold text-[#FFFEFF]">
              Evaluation Complete: {result.percentage}%
            </h2>
            <p className="text-small text-[#9CA3AF] max-w-lg mx-auto leading-relaxed">
              {result.feedbackSummary}
            </p>
          </div>

          {/* Strength & Weak Area Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-[#11121A] border border-[#C6FF00]/30 space-y-2">
              <span className="text-caption font-bold text-[#C6FF00] flex items-center gap-1.5 font-mono uppercase">
                <CheckCircle2 className="w-4 h-4" /> Strong Concepts Mastered
              </span>
              <p className="text-small text-[#D1D5DB]">
                Demonstrated strong competence across Spring Boot IoC dependency assembly and React Query staleTime caching strategy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#11121A] border border-[#0EA5E9]/30 space-y-2">
              <span className="text-caption font-bold text-[#0EA5E9] flex items-center gap-1.5 font-mono uppercase">
                <TrendingUp className="w-4 h-4" /> Target Remediation Focus
              </span>
              <p className="text-small text-[#D1D5DB]">
                {result.weakTopic ? `Remediation required for: ${result.weakTopic}` : 'All target curriculum topics passed with high mastery.'}
              </p>
            </div>
          </div>

          {/* Next Recommended Lessons */}
          <div className="p-5 rounded-2xl bg-[#0B0B10] border border-white/10 text-left space-y-3">
            <span className="text-caption font-bold text-[#06B6D4] flex items-center gap-1.5 font-mono uppercase">
              <BookOpen className="w-4 h-4" /> Recommended Next Lessons
            </span>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#11121A] border border-white/5 text-small text-white">
                <span>1. Deep-Dive: Relational Index Scans & Query Optimization</span>
                <Badge label="25 Mins" variant="purple" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#11121A] border border-white/5 text-small text-white">
                <span>2. Advanced: Spring Security JWT Authentication Lifecycle</span>
                <Badge label="40 Mins" variant="cyan" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="md" icon={RotateCcw} showArrow={false} onClick={loadQuestions}>
              Retake Evaluation
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
