import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, BookOpen, CheckCircle2, Target } from 'lucide-react';
import { Badge } from '../components/Badge';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<{ day: string; completion: number }[]>([]);

  // Simulate an animated data load for the motion graph
  useEffect(() => {
    const rawData = [
      { day: 'Day 1', completion: 5 },
      { day: 'Day 2', completion: 15 },
      { day: 'Day 3', completion: 22 },
      { day: 'Day 4', completion: 35 },
      { day: 'Day 5', completion: 48 },
      { day: 'Day 6', completion: 65 },
      { day: 'Day 7', completion: 85 },
      { day: 'Day 8', completion: 92 },
      { day: 'Day 9', completion: 100 },
    ];
    
    // Staggered reveal effect
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < rawData.length) {
        setData((prev) => [...prev, rawData[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Fast stagger

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-studyx p-8 border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-studyx-glass"
      >
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Badge label="Progress Tracking" variant="cyan" icon={<Activity className="w-3.5 h-3.5" />} />
          </div>
          <h1 className="text-h1 font-bold text-[#FFFEFF] tracking-tight">
            Course <span className="text-gradient-studyx-primary">Completion Analytics</span>
          </h1>
          <p className="text-small text-[#9CA3AF] max-w-xl leading-relaxed">
            Watch your progress unfold over time. This dynamic motion graph tracks your module completion rates and overall curriculum velocity.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side Metrics */}
        <div className="lg:col-span-1 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card-studyx p-6 border-white/10 shadow-studyx-glass space-y-2"
          >
            <div className="flex items-center justify-between text-[#9CA3AF]">
              <span className="text-caption">Total Completion</span>
              <Target className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="text-h2 font-bold text-white">100%</div>
            <Badge label="Curriculum Mastered" variant="cyan" showDot={false} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card-studyx p-6 border-white/10 shadow-studyx-glass space-y-2"
          >
            <div className="flex items-center justify-between text-[#9CA3AF]">
              <span className="text-caption">Modules Passed</span>
              <BookOpen className="w-5 h-5 text-[#0EA5E9]" />
            </div>
            <div className="text-h2 font-bold text-white">24/24</div>
            <Badge label="All checkpoints passed" variant="purple" showDot={false} />
          </motion.div>
        </div>

        {/* The Motion Graph */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 glass-card-studyx p-6 md:p-8 border-white/10 shadow-studyx-glass"
        >
          <div className="flex items-center justify-between pb-6">
            <h3 className="text-h3 font-bold text-white flex items-center gap-3">
              <Activity className="w-6 h-6 text-[#06B6D4]" />
              Velocity Graph
            </h3>
            <div className="flex items-center gap-2 text-caption text-[#06B6D4] bg-[#06B6D4]/10 px-3 py-1 rounded-full border border-[#06B6D4]/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06B6D4]"></span>
              </span>
              Live Tracking
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#687380" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#687380" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                  contentStyle={{
                    backgroundColor: 'rgba(17, 18, 26, 0.95)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(6, 182, 212, 0.4)',
                    borderRadius: '16px',
                    color: '#FFFEFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                  formatter={(val: number) => [`${val}%`, 'Course Completed']}
                />
                <Area
                  type="monotone"
                  dataKey="completion"
                  stroke="#06B6D4"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#completionGradient)"
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
