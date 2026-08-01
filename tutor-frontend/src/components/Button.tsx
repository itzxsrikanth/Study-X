import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  showArrow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  showArrow = false,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-caption py-1.5 px-4 gap-1.5',
    md: 'text-small py-2.5 px-5 gap-2',
    lg: 'text-body py-3.5 px-7 gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'btn-studyx-primary',
    secondary: 'btn-studyx-secondary',
    tertiary: 'btn-studyx-tertiary',
    ghost: 'btn-studyx-ghost',
  }[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center font-semibold ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
      {(showArrow || (variant === 'primary' && showArrow !== false)) && (
        <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
      )}
    </motion.button>
  );
};
