import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isActive: boolean;
  type?: 'listening' | 'speaking';
}

export const VoiceVisualizer: React.FC<Props> = ({ isActive, type = 'listening' }) => {
  if (!isActive) return null;

  const barColor = type === 'listening' ? 'bg-[#06B6D4]' : 'bg-[#3B82F6]';
  const labelText = type === 'listening' ? 'AI Voice Assistant Listening...' : 'AI Tutor Speaking...';

  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#11121A] border border-white/10 text-caption font-semibold font-mono">
      <div className="flex items-center gap-1 h-3.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`w-1 rounded-full ${barColor}`}
            animate={{
              height: ['6px', '16px', '6px'],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.12,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className={type === 'listening' ? 'text-[#06B6D4]' : 'text-[#3B82F6]'}>{labelText}</span>
    </div>
  );
};
