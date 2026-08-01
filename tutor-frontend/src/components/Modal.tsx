import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  description,
  icon: Icon = Sparkles,
  primaryActionLabel = 'Confirm Action',
  onPrimaryAction,
  secondaryActionLabel = 'Cancel',
  onSecondaryAction,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0B10]/80 backdrop-blur-md"
          />

          {/* Centered Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card-studyx relative z-10 p-8 max-w-md w-full text-center space-y-6 shadow-glow-primary border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#687380] hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Icon Top */}
            <div className="inline-flex p-4 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30 shadow-glow-primary">
              <Icon className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-h3 font-bold text-[#FFFEFF]">{title}</h3>
              <p className="text-small text-[#9CA3AF] leading-relaxed">{description}</p>
            </div>

            {children}

            <div className="space-y-3 pt-2">
              {onPrimaryAction && (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    onPrimaryAction();
                    onClose();
                  }}
                >
                  {primaryActionLabel}
                </Button>
              )}

              {secondaryActionLabel && (
                <button
                  onClick={() => {
                    if (onSecondaryAction) onSecondaryAction();
                    onClose();
                  }}
                  className="text-small font-medium text-[#9CA3AF] hover:text-white transition-colors block mx-auto"
                >
                  {secondaryActionLabel}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
