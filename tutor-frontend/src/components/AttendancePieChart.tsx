import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  attended: number;
  missed: number;
}

export const AttendancePieChart: React.FC<Props> = ({ attended, missed }) => {
  const data = [
    { name: 'Attended', value: attended, color: '#3B82F6' },
    { name: 'Missed', value: missed, color: '#1A1C26' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <span className="text-small font-semibold text-[#D1D5DB]">Monthly Attendance</span>
        <span className="text-caption font-mono text-[#06B6D4]">
          {Math.round((attended / (attended + missed)) * 100)}%
        </span>
      </div>
      
      <div className="h-60 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 18, 26, 0.95)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(59, 130, 246, 0.4)',
                borderRadius: '16px',
                color: '#FFFEFF',
                fontSize: '12px',
                fontWeight: 600
              }}
              formatter={(val: number) => [`${val} Days`, 'Status']}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-h3 font-bold text-white">{attended}</span>
          <span className="text-caption text-[#9CA3AF]">Days</span>
        </div>
      </div>
    </div>
  );
};
