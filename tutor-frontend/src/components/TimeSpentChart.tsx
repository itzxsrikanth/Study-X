import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DailyTimeEntry } from '../types/Dashboard';

interface Props {
  data: DailyTimeEntry[];
}

export const TimeSpentChart: React.FC<Props> = ({ data }) => {
  const [timeTab, setTimeTab] = useState<'week' | 'day'>('week');

  const formattedData = data?.map((entry) => ({
    date: entry.date ? entry.date.slice(5) : '',
    minutes: entry.minutes || 0,
  })) || [];

  return (
    <div className="space-y-4">
      {/* Week / Day Selector Tab above chart */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <span className="text-small font-semibold text-[#D1D5DB]">Study Analytics</span>
        <div className="flex items-center gap-1 bg-[#11121A] p-1 rounded-full border border-white/10">
          <button
            onClick={() => setTimeTab('week')}
            className={`px-3 py-1 rounded-full text-caption font-semibold transition-all ${
              timeTab === 'week' ? 'bg-gradient-studyx-primary text-white shadow-glow-primary' : 'text-[#687380] hover:text-white'
            }`}
          >
            Past Week
          </button>
          <button
            onClick={() => setTimeTab('day')}
            className={`px-3 py-1 rounded-full text-caption font-semibold transition-all ${
              timeTab === 'day' ? 'bg-gradient-studyx-primary text-white shadow-glow-primary' : 'text-[#687380] hover:text-white'
            }`}
          >
            Today
          </button>
        </div>
      </div>

      <div className="h-60 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="studyxAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis dataKey="date" stroke="#687380" fontSize={12} tickLine={false} />
            <YAxis stroke="#687380" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 18, 26, 0.95)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(180, 77, 255, 0.4)',
                borderRadius: '16px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(180, 77, 255, 0.3)',
                color: '#FFFEFF',
                fontSize: '12px',
                fontWeight: 600
              }}
              formatter={(val: number) => [`${val} Minutes`, 'Study Session']}
            />
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="#3B82F6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#studyxAreaGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
