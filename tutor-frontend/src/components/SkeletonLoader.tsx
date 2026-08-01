import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="glass-card p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-800 rounded-md w-1/3 skeleton-box" />
        <div className="h-6 bg-slate-800 rounded-full w-16 skeleton-box" />
      </div>
      <div className="h-8 bg-slate-800 rounded-xl w-2/3 skeleton-box" />
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-slate-800 rounded-md w-full skeleton-box" />
        <div className="h-3 bg-slate-800 rounded-md w-4/5 skeleton-box" />
      </div>
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="glass-card p-6 space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 bg-slate-800 rounded-md w-1/4 skeleton-box" />
        <div className="h-4 bg-slate-800 rounded-md w-16 skeleton-box" />
      </div>
      <div className="h-56 bg-slate-900/80 rounded-2xl flex items-end justify-between p-4 gap-3">
        {[40, 70, 30, 85, 60, 95, 50].map((h, idx) => (
          <div
            key={idx}
            className="w-full bg-slate-800 rounded-t-lg skeleton-box"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
};
