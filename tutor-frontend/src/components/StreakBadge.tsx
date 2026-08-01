import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  streakCount: number;
}

export const StreakBadge: React.FC<Props> = ({ streakCount }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 bg-[#0EA5E9]/15 border border-[#0EA5E9]/30 px-3.5 py-1.5 rounded-full shadow-glow-pink cursor-pointer"
    >
      <div className="relative">
        <Flame className="w-4 h-4 text-[#0EA5E9] fill-[#0EA5E9]" />
      </div>
      <span className="text-caption font-bold text-[#FFFEFF] tracking-wide">
        {streakCount} {streakCount === 1 ? 'Day' : 'Days'} Streak
      </span>
    </motion.div>
  );
};
