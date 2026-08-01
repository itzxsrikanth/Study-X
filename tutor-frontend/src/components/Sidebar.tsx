import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  MapPin,
  MessageSquareText,
  HelpCircle,
  User,
  GraduationCap,
  Activity,
  Hexagon
} from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { Badge } from './Badge';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { streakCount, fullName } = useUserStore();

  const links = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: { label: 'Phase 3', variant: 'purple' as const } },
    { label: 'AI Intake', path: '/goal-intake', icon: Sparkles, badge: { label: 'New', variant: 'pink' as const } },
    { label: 'Roadmap', path: '/plan', icon: MapPin, badge: { label: 'Phase 2', variant: 'cyan' as const } },
    { label: 'Courses Hub', path: '/courses', icon: GraduationCap, badge: { label: 'Hub', variant: 'lime' as const } },
    { label: 'Course Analytics', path: '/analytics', icon: Activity, badge: { label: 'New', variant: 'purple' as const } },
    { label: 'AI Tutor Chat', path: '/chat', icon: MessageSquareText, badge: { label: 'Beta', variant: 'cyan' as const } },
    { label: 'Adaptive Quiz', path: '/quiz', icon: HelpCircle, badge: { label: 'Phase 5', variant: 'lime' as const } },
    { label: 'Profile & XP', path: '/profile', icon: User, badge: { label: 'Premium', variant: 'lime' as const } },
  ];

  return (
    <aside className="hidden xl:flex flex-col w-72 h-[calc(100vh-6.5rem)] sticky top-24 glass-card-studyx p-5 justify-between border-white/10 shadow-studyx-glass">
      {/* Top Logo & Workspace Links */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="rounded-xl overflow-hidden shadow-glow-primary border border-white/10">
            <img src="/studyx-logo.png" alt="StudyX Logo" className="w-9 h-9 object-cover" />
          </div>
          <div>
            <span className="font-bold text-[#FFFEFF] text-h4 tracking-tight block">
              Study<span className="text-gradient-studyx-primary">X</span>
            </span>
            <span className="text-caption text-[#06B6D4] font-semibold tracking-wider uppercase block -mt-1">
              Adaptive OS
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-caption font-semibold uppercase tracking-widest text-[#687380] px-3 block mb-2">
            Navigation
          </span>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-small font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-studyx-primary text-white shadow-glow-primary'
                    : 'text-[#9CA3AF] hover:text-[#FFFEFF] hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {!isActive && (
                  <Badge label={link.badge.label} variant={link.badge.variant} showDot={false} />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile Card Pinned To Bottom */}
      <div className="pt-4 border-t border-white/10">
        <Link
          to="/profile"
          className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#11121A] hover:bg-white/5 border border-white/5 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-studyx-primary flex items-center justify-center font-bold text-white shadow-glow-primary">
            {fullName ? fullName.charAt(0) : 'S'}
          </div>
          <div className="overflow-hidden flex-1">
            <h4 className="font-semibold text-[#FFFEFF] text-small truncate group-hover:text-[#3B82F6] transition-colors">
              {fullName}
            </h4>
            <span className="text-caption text-[#9CA3AF] block truncate">
              Scholar • {streakCount}d Streak
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
};
