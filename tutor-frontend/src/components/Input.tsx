import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input: React.FC<Props> = ({
  label,
  icon: Icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-caption font-semibold text-[#D1D5DB]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#687380] pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={`input-studyx w-full py-2.5 text-small ${
            Icon ? 'pl-10 pr-4' : 'px-4'
          } ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-caption text-red-400 font-medium">{error}</span>}
    </div>
  );
};
