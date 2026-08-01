import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nudge } from '../types/Dashboard';
import { BellRing, X, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

interface Props {
  nudges: Nudge[];
  onDismiss: (nudgeId: number) => void;
  onActionClick?: () => void;
}

export const NudgeBanner: React.FC<Props> = ({ nudges, onDismiss, onActionClick }) => {
  if (!nudges || nudges.length === 0) return null;

  const activeNudge = nudges[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15, scale: 0.98 }}
        className="glass-card-studyx p-5 border-white/10 shadow-glow-pink relative overflow-hidden bg-gradient-to-r from-[#1A1C26]/90 via-[#11121A]/90 to-[#0B0B10] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-studyx-primary rounded-2xl text-white shadow-glow-primary flex-shrink-0">
            <BellRing className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge label="AI Nudge" variant="pink" />
              <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            </div>
            <p className="text-small font-medium text-[#FFFEFF] leading-relaxed">{activeNudge.message}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {onActionClick && (
            <Button variant="primary" size="sm" showArrow={true} onClick={onActionClick}>
              Resume Study
            </Button>
          )}
          <button
            onClick={() => onDismiss(activeNudge.id)}
            className="text-[#687380] hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
