import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Hexagon, 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  Star, 
  Users, 
  Layers,
  Bot
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Learners', value: '50,000+', icon: Users, color: 'text-[#3B82F6]' },
    { label: 'Curriculum Mastery Rate', value: '99.4%', icon: ShieldCheck, color: 'text-[#C6FF00]' },
    { label: 'AI Remediation Mutations', value: '1.2M+', icon: Brain, color: 'text-[#06B6D4]' },
    { label: 'Daily Study Streak Hours', value: '350,000h+', icon: Flame, color: 'text-[#0EA5E9]' },
  ];

  const features = [
    {
      title: 'AI Intent Engine',
      badge: { label: 'Phase 1', variant: 'purple' as const },
      desc: 'Parses unstructured text prompts into structured skill targets, time commitments, and tailored target outcomes.',
      icon: Sparkles,
    },
    {
      title: 'Connected Graph Roadmap',
      badge: { label: 'Phase 2', variant: 'cyan' as const },
      desc: 'Generates connected node roadmaps with milestone completion checkpoints and resource links.',
      icon: Layers,
    },
    {
      title: 'Real-Time Progress & Streaks',
      badge: { label: 'Phase 3', variant: 'pink' as const },
      desc: 'Track study sessions, visualize weekly study time with Recharts area graphs, and maintain daily streak flames.',
      icon: Flame,
    },
    {
      title: 'Smart Re-Engagement Nudges',
      badge: { label: 'Phase 4', variant: 'lime' as const },
      desc: 'Autonomous background scheduler detects disengagement and generates personalized motivational AI nudges.',
      icon: Hexagon,
    },
    {
      title: 'Feedback Loop Engine',
      badge: { label: 'Phase 5', variant: 'purple' as const },
      desc: 'Evaluates quiz scores and dynamically mutates your active plan with target remediation milestones for weak topics.',
      icon: Brain,
    },
  ];

  return (
    <div className="min-h-screen bg-studyxVoid text-studyxN0 flex flex-col justify-between pt-24 overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="floating-orbs-container !fixed pointer-events-none">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 space-y-20">
        {/* HERO SECTION */}
        <div className="text-center space-y-8 max-w-4xl mx-auto pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2"
          >
            <Badge label="StudyX Adaptive Learning Platform" variant="purple" icon={<Hexagon className="w-3.5 h-3.5" />} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-h1 font-bold tracking-tight text-[#FFFEFF] leading-tight"
          >
            The Cutting-Edge AI Platform for <span className="text-gradient-studyx-primary">Academic Mastery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#9CA3AF] text-body max-w-2xl mx-auto leading-relaxed"
          >
            StudyX parses your learning goals, generates connected milestone roadmaps, tracks daily study streaks, and dynamically mutates your curriculum with adaptive remediation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button
              variant="primary"
              size="lg"
              showArrow={true}
              onClick={() => navigate('/dashboard')}
            >
              Launch StudyX OS
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={Bot}
              showArrow={false}
              onClick={() => navigate('/chat')}
            >
              Open AI Tutor Chat
            </Button>
          </motion.div>
        </div>

        {/* STATS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-card-studyx p-6 text-center space-y-2 border-white/10 shadow-studyx-glass">
                <Icon className={`w-8 h-8 mx-auto ${stat.color}`} />
                <div className="text-h2 font-bold text-[#FFFEFF]">{stat.value}</div>
                <div className="text-caption text-[#9CA3AF] font-semibold">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* FEATURES GRID */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-caption font-semibold uppercase tracking-widest text-[#3B82F6]">
              System Capabilities
            </span>
            <h2 className="text-h2 font-bold text-[#FFFEFF]">
              5-Phase Adaptive Learning Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card-studyx glass-card-studyx-hover p-8 space-y-4 border-white/10 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-[#1A1C26] text-[#3B82F6] border border-white/5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge label={feat.badge.label} variant={feat.badge.variant} />
                    </div>
                    <h3 className="text-h4 font-semibold text-[#FFFEFF]">{feat.title}</h3>
                    <p className="text-small text-[#9CA3AF] leading-relaxed">{feat.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-1.5 text-caption text-[#C6FF00] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" />
                    Backend Verified
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
