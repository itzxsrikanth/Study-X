import React from 'react';

export type BadgeVariant = 'purple' | 'pink' | 'lime' | 'cyan' | 'neutral';

interface Props {
  variant?: BadgeVariant;
  label: string;
  icon?: React.ReactNode;
  showDot?: boolean;
}

export const Badge: React.FC<Props> = ({
  variant = 'purple',
  label,
  icon,
  showDot = true,
}) => {
  const variantStyles = {
    purple: 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30 dot-bg-[#3B82F6]',
    pink: 'bg-[#0EA5E9]/15 text-[#0EA5E9] border-[#0EA5E9]/30 dot-bg-[#0EA5E9]',
    lime: 'bg-[#C6FF00]/15 text-[#C6FF00] border-[#C6FF00]/30 dot-bg-[#C6FF00]',
    cyan: 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30 dot-bg-[#06B6D4]',
    neutral: 'bg-[#252936] text-[#9CA3AF] border-white/10 dot-bg-[#687380]',
  }[variant];

  const dotColors = {
    purple: 'bg-[#3B82F6]',
    pink: 'bg-[#0EA5E9]',
    lime: 'bg-[#C6FF00]',
    cyan: 'bg-[#06B6D4]',
    neutral: 'bg-[#687380]',
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-semibold border ${variantStyles}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors}`} />}
      {icon}
      <span>{label}</span>
    </span>
  );
};
