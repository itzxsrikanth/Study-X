import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Target, BookOpen, Wand2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';

interface Props {
  onSubmit: (prompt: string, hours: number, level: string, style: string) => void;
  isSubmitting: boolean;
}

const PRESET_GOALS = [
  "Master Full-Stack Web Architecture with React, Spring Boot & PostgreSQL",
  "Learn Data Structures, Algorithms & LeetCode Problem Solving in Python",
  "Understand Deep Learning, Transformers & Generative AI Systems",
  "Build Cloud Native Microservices with Docker, Kubernetes & AWS"
];

export const GoalInputForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const [prompt, setPrompt] = useState('');
  const [hours, setHours] = useState(6);
  const [level, setLevel] = useState('INTERMEDIATE');
  const [style, setStyle] = useState('PRACTICAL_PROJECTS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt, hours, level, style);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-card-studyx p-6 md:p-10 space-y-8 shadow-studyx-glass border-white/10"
    >
      <div className="space-y-3">
        <label className="block text-small font-semibold text-[#FFFEFF] flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-[#06B6D4]" />
          What learning goal would you like to achieve in StudyX?
        </label>
        <div className="relative">
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. I want to become fluent in Full-Stack Web Development, mastering React components, Spring Boot microservices, and database design over 4 weeks..."
            className="input-studyx w-full p-4 text-small text-[#FFFEFF] placeholder-[#687380] leading-relaxed"
          />
        </div>
      </div>

      {/* Preset Inspirations */}
      <div>
        <span className="text-caption font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3 block">
          Preset Suggestions
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {PRESET_GOALS.map((preset, idx) => (
            <motion.button
              key={idx}
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setPrompt(preset)}
              className="text-small bg-[#11121A] hover:bg-[#1A1C26] border border-white/5 hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-white p-3.5 rounded-2xl transition-all text-left flex items-start gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
              <span>{preset}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
        <div className="space-y-2">
          <label className="text-caption font-semibold text-[#D1D5DB] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#3B82F6]" />
            Weekly Commitment
          </label>
          <div className="flex items-center gap-4 bg-[#11121A] p-3 rounded-xl border border-white/5">
            <input
              type="range"
              min="1"
              max="20"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-[#3B82F6]"
            />
            <span className="text-small font-bold text-[#3B82F6] font-mono whitespace-nowrap">{hours} hrs/wk</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-caption font-semibold text-[#D1D5DB] flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#06B6D4]" />
            Target Skill Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="input-studyx w-full p-3 text-small text-[#FFFEFF]"
          >
            <option value="BEGINNER">Beginner (Foundations)</option>
            <option value="INTERMEDIATE">Intermediate (Practical Application)</option>
            <option value="ADVANCED">Advanced (Architecture & Design)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-caption font-semibold text-[#D1D5DB] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#0EA5E9]" />
            Learning Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="input-studyx w-full p-3 text-small text-[#FFFEFF]"
          >
            <option value="PRACTICAL_PROJECTS">Hands-On Projects</option>
            <option value="THEORETICAL">Deep Theory & Mechanics</option>
            <option value="MIXED">Balanced Hybrid</option>
          </select>
        </div>
      </div>

      {/* Primary Gradient Button Variant */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="lg"
          showArrow={true}
          disabled={isSubmitting || !prompt.trim()}
          className="w-full justify-center"
        >
          {isSubmitting ? 'Parsing Intent & Generating Roadmap...' : 'Generate AI Personalized Roadmap'}
        </Button>
      </div>
    </motion.form>
  );
};
