import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { QuizQuestion, QuizResultResponse } from '../types/Dashboard';
import { ShieldAlert, RefreshCw, Award, Zap } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

interface Props {
  questions: QuizQuestion[];
  onSubmit: (answers: Record<string, number>) => Promise<QuizResultResponse>;
  onPlanAdapted?: () => void;
}

export const QuizCard: React.FC<Props> = ({ questions, onSubmit, onPlanAdapted }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResultResponse | null>(null);

  const currentQ = questions[currentIdx];

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleSelect = (optionIdx: number) => {
    if (result) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await onSubmit(selectedAnswers);
      setResult(res);
      triggerConfetti();
      if (res.planAdapted && onPlanAdapted) {
        onPlanAdapted();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-studyx p-8 md:p-10 space-y-8 text-center border-white/10 shadow-studyx-glass"
      >
        <div className="inline-flex p-5 rounded-full bg-gradient-studyx-primary text-white shadow-glow-primary mb-2">
          {result.planAdapted ? <ShieldAlert className="w-12 h-12" /> : <Award className="w-12 h-12" />}
        </div>

        <div className="space-y-2">
          <h2 className="text-h2 font-bold text-[#FFFEFF]">
            Adaptive Evaluation Complete!
          </h2>
          <p className="text-caption text-[#9CA3AF] font-mono">Phase 5 Feedback Loop Remediation Service</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="glass-card-studyx p-4 border-white/5">
            <span className="text-h1 font-bold text-gradient-studyx-primary">
              {Math.round(result.percentage)}%
            </span>
            <span className="block text-caption text-[#9CA3AF] font-semibold mt-1">
              Score ({result.score}/{result.totalQuestions})
            </span>
          </div>

          <div className="glass-card-studyx p-4 border-white/5 flex flex-col justify-center">
            <span className="text-small font-bold text-[#C6FF00] uppercase">{result.performanceRating}</span>
            <span className="block text-caption text-[#9CA3AF] font-semibold mt-1">Performance Signal</span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl text-left border text-small leading-relaxed ${
          result.planAdapted
            ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
            : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
        }`}>
          <p className="font-semibold">{result.feedbackSummary}</p>
        </div>

        <Button
          variant="tertiary"
          size="md"
          onClick={() => {
            setResult(null);
            setCurrentIdx(0);
            setSelectedAnswers({});
          }}
        >
          Retake Assessment
        </Button>
      </motion.div>
    );
  }

  if (!currentQ) {
    return <div className="text-[#9CA3AF] text-center p-8">No quiz questions available.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-studyx p-6 md:p-10 space-y-8 border-white/10 shadow-studyx-glass"
    >
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-[#06B6D4] text-small font-bold">
          <Zap className="w-4 h-4 text-[#3B82F6]" />
          Question {currentIdx + 1} of {questions.length}
        </div>
        <Badge label={currentQ.targetTopic} variant="purple" />
      </div>

      {/* Question Text */}
      <div className="space-y-6">
        <h3 className="text-h3 font-semibold text-[#FFFEFF] leading-snug">
          {currentQ.questionText}
        </h3>

        {/* Options Cards */}
        <div className="space-y-3">
          {currentQ.options?.map((option, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === idx;
            return (
              <motion.button
                key={idx}
                type="button"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all text-small font-semibold flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-studyx-primary border-white/30 text-white shadow-glow-primary'
                    : 'bg-[#11121A] hover:bg-[#1A1C26] border-white/5 text-[#9CA3AF] hover:text-white'
                }`}
              >
                <span>{option}</span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected ? 'border-white bg-white text-[#0B0B10]' : 'border-white/20'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <span className="text-caption text-[#687380] font-mono">
          Select choice to continue
        </span>

        {currentIdx < questions.length - 1 ? (
          <Button
            variant="primary"
            size="md"
            showArrow={true}
            onClick={handleNext}
            disabled={selectedAnswers[currentQ.id] === undefined}
          >
            Next Question
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(selectedAnswers).length < questions.length}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin inline mr-2" />
                Evaluating...
              </>
            ) : (
              'Submit Evaluation'
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
};
