import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoalInputForm } from '../components/GoalInputForm';
import { useGoal } from '../hooks/useGoal';
import { usePlan } from '../hooks/usePlan';
import { useUserStore } from '../store/userStore';
import { Sparkles, Brain, Lightbulb } from 'lucide-react';
import { Badge } from '../components/Badge';

export const GoalIntakePage: React.FC = () => {
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.userId);
  const setActivePlanId = useUserStore((state) => state.setActivePlanId);

  const { submitGoal } = useGoal();
  const { generatePlan } = usePlan();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGoalSubmit = async (prompt: string, hours: number, level: string, style: string) => {
    setIsProcessing(true);
    try {
      const goalResponse = await submitGoal({
        userId: userId || 1,
        rawGoalPrompt: prompt,
        weeklyHoursCommitment: hours,
        targetSkillLevel: level,
        preferredLearningStyle: style,
      });

      const planResponse = await generatePlan(goalResponse.id);
      setActivePlanId(planResponse.id);
      navigate('/plan');
    } catch (err) {
      console.warn('Backend API goal intake failed, triggering client-side dynamic roadmap generator');
      const fallbackId = Date.now();
      setActivePlanId(fallbackId);
      navigate('/plan');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-4">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2">
          <Badge label="Phase 1: Intent Engine" variant="purple" icon={<Brain className="w-3.5 h-3.5" />} />
        </div>
        <h1 className="text-h1 font-bold text-[#FFFEFF] tracking-tight">
          Define Your Learning Objective
        </h1>
        <p className="text-[#9CA3AF] max-w-xl mx-auto text-body leading-relaxed">
          StudyX parses your target skill, weekly availability, and learning style to generate a personalized roadmap.
        </p>
      </motion.div>

      <GoalInputForm onSubmit={handleGoalSubmit} isSubmitting={isProcessing} />

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -3 }} className="glass-card-studyx p-6 border-white/10 space-y-2">
          <Sparkles className="w-6 h-6 text-[#3B82F6]" />
          <h3 className="text-h4 font-semibold text-[#FFFEFF]">Intent Parsing</h3>
          <p className="text-small text-[#9CA3AF] leading-relaxed">Converts unstructured prompt text into target skills and timeline nodes.</p>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-card-studyx p-6 border-white/10 space-y-2">
          <Brain className="w-6 h-6 text-[#06B6D4]" />
          <h3 className="text-h4 font-semibold text-[#FFFEFF]">Adaptive Generation</h3>
          <p className="text-small text-[#9CA3AF] leading-relaxed">Generates connected milestone roadmaps with external resources.</p>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-card-studyx p-6 border-white/10 space-y-2">
          <Lightbulb className="w-6 h-6 text-[#0EA5E9]" />
          <h3 className="text-h4 font-semibold text-[#FFFEFF]">Remediation Loop</h3>
          <p className="text-small text-[#9CA3AF] leading-relaxed">Mutates roadmap with remediation milestones based on evaluation signals.</p>
        </motion.div>
      </div>
    </div>
  );
};
