import React from 'react';
import { usePlan } from '../hooks/usePlan';
import { useUserStore } from '../store/userStore';
import { PlanTimeline } from '../components/PlanTimeline';
import { CardSkeleton } from '../components/SkeletonLoader';
import { useNavigate } from 'react-router-dom';
import { Map, Plus, HelpCircle } from 'lucide-react';
import { Button } from '../components/Button';

export const LearningPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.userId);
  const activePlanId = useUserStore((state) => state.activePlanId);

  const { plan, isLoading, toggleTask } = usePlan(activePlanId, userId);

  const handleToggleTask = async (taskId: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    await toggleTask({ taskId, status: nextStatus });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pt-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="glass-card-studyx p-12 text-center max-w-lg mx-auto space-y-6 border-white/10 shadow-studyx-glass mt-12">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-studyx-primary text-white shadow-glow-primary">
          <Map className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-h2 font-bold text-[#FFFEFF]">No Active Roadmap</h2>
          <p className="text-[#9CA3AF] text-small leading-relaxed">
            Define your learning objective using our AI Goal Intake wizard to generate a connected milestone roadmap.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          showArrow={true}
          onClick={() => navigate('/goal-intake')}
        >
          Create Custom Roadmap
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 font-bold text-[#FFFEFF] flex items-center gap-2.5">
            <Map className="w-7 h-7 text-[#3B82F6]" />
            StudyX Learning Roadmap
          </h1>
          <p className="text-[#9CA3AF] text-small font-medium">Phase 2: Connected Milestone Nodes & Dynamic Tasks</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={HelpCircle}
            showArrow={false}
            onClick={() => navigate('/quiz')}
          >
            Take Quiz
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            showArrow={true}
            onClick={() => navigate('/goal-intake')}
          >
            New Goal
          </Button>
        </div>
      </div>

      <PlanTimeline plan={plan} onToggleTask={handleToggleTask} />
    </div>
  );
};
