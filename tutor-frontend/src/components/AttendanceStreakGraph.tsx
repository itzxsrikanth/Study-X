import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell, YAxis, CartesianGrid } from 'recharts';

interface Props {
  streakData: { day: string; studied: boolean; hours: number }[];
}

export const AttendanceStreakGraph: React.FC<Props> = ({ streakData }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <span className="text-small font-semibold text-[#D1D5DB]">7-Day Streak Analysis</span>
      </div>

      <div className="h-60 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={streakData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis dataKey="day" stroke="#687380" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#687380" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{
                backgroundColor: 'rgba(17, 18, 26, 0.95)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(6, 182, 212, 0.4)',
                borderRadius: '16px',
                color: '#FFFEFF',
                fontSize: '12px',
                fontWeight: 600
              }}
              formatter={(val: number) => [`${val} Hours`, 'Study Time']}
            />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {streakData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.studied ? '#06B6D4' : '#1A1C26'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
