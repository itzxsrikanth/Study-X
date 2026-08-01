import React from 'react';
import { motion } from 'framer-motion';
import { LearningPlan } from '../types/LearningPlan';
import { CheckCircle2, Circle, Clock, ExternalLink, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { Badge } from './Badge';

interface Props {
  plan: LearningPlan;
  onToggleTask: (taskId: number, currentStatus: string) => void;
}

export const PlanTimeline: React.FC<Props> = ({ plan, onToggleTask }) => {
  return (
    <div className="space-y-8">
      {/* Plan Header Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-studyx p-6 md:p-8 relative overflow-hidden border-white/10 shadow-studyx-glass space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge label="StudyX Roadmap" variant="purple" />
              {plan.status === 'ADAPTED' && (
                <Badge label="AI Adapted Curriculum" variant="pink" icon={<ShieldAlert className="w-3.5 h-3.5" />} />
              )}
            </div>
            <h2 className="text-h2 font-bold text-[#FFFEFF]">{plan.title}</h2>
            <p className="text-[#9CA3AF] text-body leading-relaxed">{plan.description}</p>
          </div>

          <div className="text-right glass-card-studyx p-4 border-white/5 min-w-[160px]">
            <div className="text-h1 font-bold text-gradient-studyx-primary">
              {plan.progressPercentage}%
            </div>
            <div className="text-caption font-semibold text-[#9CA3AF] mt-0.5 font-mono">
              {plan.completedMilestones} / {plan.totalMilestones} Milestones
            </div>
          </div>
        </div>

        {/* Dynamic Gradient Progress Bar */}
        <div className="w-full bg-[#1A1C26] rounded-full h-3 overflow-hidden p-0.5 border border-white/5">
          <motion.div
            className="bg-gradient-studyx-primary h-full rounded-full shadow-glow-primary"
            initial={{ width: 0 }}
            animate={{ width: `${plan.progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Connected Graph Milestones */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-7 before:w-1 before:bg-gradient-to-b before:from-[#3B82F6] before:via-[#06B6D4] before:to-[#11121A]">
        {plan.milestones?.map((milestone, idx) => (
          <motion.div
            key={milestone.id || idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-16"
          >
            {/* Circular Checkbox Node with Glow Ring */}
            <div
              className={`absolute left-3.5 top-2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                milestone.isCompleted
                  ? 'bg-[#C6FF00] border-[#C6FF00] text-[#0B0B10] shadow-glow-lime'
                  : 'bg-[#11121A] border-[#3B82F6] text-[#3B82F6] shadow-glow-primary'
              }`}
            >
              {milestone.isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-[#0B0B10]" />
              ) : (
                <span className="text-caption font-bold">{idx + 1}</span>
              )}
            </div>

            {/* Milestone Card */}
            <div className="glass-card-studyx glass-card-studyx-hover p-6 border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-[#06B6D4]" />
                  <h3 className="text-h3 font-semibold text-[#FFFEFF]">{milestone.title}</h3>
                </div>
                <span className="text-caption font-semibold text-[#9CA3AF] flex items-center gap-1.5 bg-[#11121A] px-3 py-1.5 rounded-full border border-white/5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                  ~{milestone.estimatedHours} Hours
                </span>
              </div>

              <p className="text-[#9CA3AF] text-small leading-relaxed">{milestone.description}</p>

              {/* Tasks List */}
              <div className="space-y-2.5 pt-1">
                {milestone.tasks?.map((task) => {
                  const isDone = task.status === 'COMPLETED';
                  return (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.005 }}
                      onClick={() => onToggleTask(task.id, task.status)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-[#687380] line-through'
                          : 'bg-[#11121A] hover:bg-[#1A1C26] border-white/5 hover:border-[#3B82F6]/40 text-[#FFFEFF]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-[#C6FF00] flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#687380] flex-shrink-0" />
                        )}
                        <span className="text-small font-medium">{task.title}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-caption font-mono text-[#687380] bg-[#0B0B10] px-2.5 py-1 rounded-lg border border-white/5">
                          {task.durationMinutes}m
                        </span>
                        {task.resourceUrl && (
                          <a
                            href={task.resourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#06B6D4] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
