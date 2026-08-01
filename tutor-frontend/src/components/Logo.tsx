import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-9 h-9' }) => {
  return (
    <div className={`overflow-hidden rounded-2xl flex items-center justify-center bg-[#0B0B10] ${className}`}>
      <img 
        src="/studyx-logo.png" 
        alt="StudyX Logo" 
        className="w-[135%] max-w-[135%] h-[135%] object-cover -mt-[15%] pointer-events-none" 
      />
    </div>
  );
};
