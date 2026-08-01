import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { LearningPlan, Milestone, Task } from '../types/LearningPlan';
import { planApi } from '../api/planApi';
import { 
  Sparkles, 
  Flame, 
  MapPin, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Brain,
  GraduationCap
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { AttendancePieChart } from '../components/AttendancePieChart';
import { AttendanceStreakGraph } from '../components/AttendanceStreakGraph';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId, fullName, streakCount, activePlanId, setActivePlanId } = useUserStore();
  const [plan, setPlan] = useState<LearningPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, [activePlanId]);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      if (activePlanId) {
        const fetched = await planApi.getPlanById(activePlanId);
        setPlan(fetched);
      } else {
        const fetched = await planApi.getLatestPlanForUser(userId || 1);
        setPlan(fetched);
        if (fetched?.id) setActivePlanId(fetched.id);
      }
    } catch (err) {
      console.warn('Dashboard plan fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId: number, currentStatus: string) => {
    if (!plan) return;
    const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    try {
      const updated = await planApi.updateTaskStatus(taskId, newStatus);
      setPlan(updated);
    } catch (err) {
      console.error('Task toggle error:', err);
    }
  };

  // Compute metrics
  let totalTasks = 0;
  let completedTasks = 0;

  plan?.milestones?.forEach((m: Milestone) => {
    m.tasks?.forEach((t: Task) => {
      totalTasks++;
      if (t.status === 'COMPLETED') completedTasks++;
    });
  });

  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const mockStreakData = [
    { day: 'Mon', studied: true, hours: 2.5 },
    { day: 'Tue', studied: true, hours: 1.5 },
    { day: 'Wed', studied: false, hours: 0 },
    { day: 'Thu', studied: true, hours: 3 },
    { day: 'Fri', studied: true, hours: 2 },
    { day: 'Sat', studied: true, hours: 4 },
    { day: 'Sun', studied: false, hours: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pt-4">
      {/* OS Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-studyx p-8 md:p-10 border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-studyx-glass"
      >
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Badge label="Adaptive Learning OS" variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />} />
            <span className="text-caption text-[#687380] font-mono">Phase 3 Analytics</span>
          </div>
          <h1 className="text-h1 font-bold text-[#FFFEFF] tracking-tight">
            Welcome back, <span className="text-gradient-studyx-primary">{fullName || 'Scholar'}</span>!
          </h1>
          <p className="text-small text-[#9CA3AF] max-w-xl leading-relaxed">
            Your personalized SteadyX AI engine has calibrated your active roadmap based on real-time adaptive evaluations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Button variant="primary" size="md" icon={Sparkles} onClick={() => navigate('/goal-intake')}>
            Generate New Roadmap
          </Button>
          <Button variant="tertiary" size="md" icon={HelpCircle} showArrow={false} onClick={() => navigate('/quiz')}>
            Take Adaptive Quiz
          </Button>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card-studyx p-5 border-white/10 space-y-2 shadow-studyx-glass">
          <div className="flex items-center justify-between text-caption text-[#9CA3AF]">
            <span>Active Streak</span>
            <Flame className="w-5 h-5 text-[#0EA5E9]" />
          </div>
          <div className="text-h2 font-bold text-white">{streakCount} Days</div>
          <Badge label="Streak Master Active" variant="pink" showDot={false} />
        </div>

        <div className="glass-card-studyx p-5 border-white/10 space-y-2 shadow-studyx-glass">
          <div className="flex items-center justify-between text-caption text-[#9CA3AF]">
            <span>Overall Progress</span>
            <TrendingUp className="w-5 h-5 text-[#06B6D4]" />
          </div>
          <div className="text-h2 font-bold text-white">{progressPercentage}%</div>
          <Badge label={`${completedTasks}/${totalTasks} Tasks Completed`} variant="cyan" showDot={false} />
        </div>

        <div className="glass-card-studyx p-5 border-white/10 space-y-2 shadow-studyx-glass">
          <div className="flex items-center justify-between text-caption text-[#9CA3AF]">
            <span>Active Milestones</span>
            <MapPin className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div className="text-h2 font-bold text-white">{plan?.milestones?.length || 0}</div>
          <Badge label={plan?.status || 'ACTIVE'} variant="purple" showDot={false} />
        </div>

        <div className="glass-card-studyx p-5 border-white/10 space-y-2 shadow-studyx-glass">
          <div className="flex items-center justify-between text-caption text-[#9CA3AF]">
            <span>Achievement Tier</span>
            <Award className="w-5 h-5 text-[#C6FF00]" />
          </div>
          <div className="text-h2 font-bold text-white">Top Performer</div>
          <Badge label="500+ XP Master" variant="lime" showDot={false} />
        </div>
      </div>

      {/* Main Roadmap & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Roadmap & Task Stream */}
        <div className="lg:col-span-2 glass-card-studyx p-6 md:p-8 border-white/10 space-y-6 shadow-studyx-glass">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-h3 font-bold text-[#FFFEFF] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#3B82F6]" />
                {plan?.title || 'Active Learning Roadmap'}
              </h3>
              <p className="text-caption text-[#9CA3AF] mt-0.5">{plan?.description || 'Full-Stack Software Engineer'}</p>
            </div>

            <Button variant="tertiary" size="sm" icon={ArrowRight} onClick={() => navigate('/plan')}>
              View Full Timeline
            </Button>
          </div>

          {/* Milestones Task List */}
          <div className="space-y-6">
            {plan?.milestones?.map((m: Milestone) => (
              <div key={m.id} className="p-5 rounded-2xl bg-[#11121A] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-small">{m.title}</h4>
                  <Badge label={`~${m.estimatedHours}h`} variant="purple" />
                </div>
                <p className="text-caption text-[#9CA3AF] leading-relaxed">{m.description}</p>

                <div className="space-y-2 pt-2">
                  {m.tasks?.map((task: Task) => {
                    const isCompleted = task.status === 'COMPLETED';
                    return (
                      <div
                        key={task.id}
                        onClick={() => handleToggleTask(task.id, task.status)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isCompleted
                            ? 'bg-[#1A1C26] border-[#C6FF00]/40 text-[#D1D5DB] line-through opacity-80'
                            : 'bg-[#0B0B10] border-white/10 text-white hover:border-[#3B82F6]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-[#C6FF00]' : 'text-[#687380]'}`} />
                          <span className="text-small font-medium">{task.title}</span>
                        </div>
                        <span className="text-caption font-mono text-[#687380]">{task.durationMinutes}m</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Learning Analytics & Recommended Next Course */}
        <div className="space-y-6">
          {/* Skill Mastery Radar / Analytics */}
          <div className="glass-card-studyx p-6 border-white/10 space-y-4 shadow-studyx-glass">
            <h3 className="text-small font-bold text-[#FFFEFF] flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#06B6D4]" />
              Skill Mastery Analytics
            </h3>
            
            <div className="space-y-3 text-caption">
              <div>
                <div className="flex justify-between text-[#9CA3AF] mb-1">
                  <span>Spring Boot & Java</span>
                  <span className="font-mono text-white font-bold">92%</span>
                </div>
                <div className="w-full bg-[#1A1C26] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#06B6D4] h-full rounded-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#9CA3AF] mb-1">
                  <span>React & TypeScript</span>
                  <span className="font-mono text-white font-bold">85%</span>
                </div>
                <div className="w-full bg-[#1A1C26] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3B82F6] h-full rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#9CA3AF] mb-1">
                  <span>SQL & Index Optimization</span>
                  <span className="font-mono text-white font-bold">78%</span>
                </div>
                <div className="w-full bg-[#1A1C26] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0EA5E9] h-full rounded-full w-[78%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Next Course Panel */}
          <div className="glass-card-studyx p-6 border-white/10 space-y-4 shadow-studyx-glass bg-[#11121A]">
            <div className="flex items-center gap-2">
              <Badge label="Recommended Next Course" variant="lime" icon={<GraduationCap className="w-3.5 h-3.5" />} />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white text-small">
                Deep Learning & Generative AI Systems
              </h4>
              <p className="text-caption text-[#9CA3AF] leading-relaxed">
                Based on your high mastery in full-stack architecture, taking this course next will unlock advanced AI Agent engineering skills.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              className="w-full justify-center"
              onClick={() => navigate('/courses')}
            >
              Enroll in Courses Hub
            </Button>
          </div>
        </div>
      </div>

      {/* Attendance & Streak Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="glass-card-studyx p-6 border-white/10 shadow-studyx-glass">
          <AttendancePieChart attended={21} missed={4} />
        </div>
        <div className="glass-card-studyx p-6 border-white/10 shadow-studyx-glass">
          <AttendanceStreakGraph streakData={mockStreakData} />
        </div>
      </div>
    </div>
  );
};
