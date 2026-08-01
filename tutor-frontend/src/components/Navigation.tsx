import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { StreakBadge } from './StreakBadge';
import { 
  Hexagon,
  LayoutDashboard, 
  Sparkles, 
  MapPin, 
  MessageSquareText, 
  HelpCircle, 
  GraduationCap,
  Activity,
  LogOut, 
  Menu, 
  X
} from 'lucide-react';
import { Logo } from './Logo';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { streakCount, fullName, logout, token } = useUserStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Intake', path: '/goal-intake', icon: Sparkles },
    { label: 'Roadmap', path: '/plan', icon: MapPin },
    { label: 'Courses Hub', path: '/courses', icon: GraduationCap },
    { label: 'Course Analytics', path: '/analytics', icon: Activity },
    { label: 'AI Tutor', path: '/chat', icon: MessageSquareText },
    { label: 'Quiz', path: '/quiz', icon: HelpCircle },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
      {/* StudyX Logo Wordmark */}
      <Link 
        to={token ? '/dashboard' : '/welcome'} 
        className="pointer-events-auto flex items-center gap-3 group glass-card-studyx px-4 py-2 border-white/10 hover:border-[#3B82F6]/40 transition-all"
      >
        <div className="rounded-xl shadow-glow-primary group-hover:scale-105 transition-transform border border-white/10">
          <Logo className="w-9 h-9 shadow-glow-primary" />
        </div>
        <div className="hidden sm:block">
          <span className="font-bold text-[#FFFEFF] text-h4 tracking-tight block">
            Study<span className="text-gradient-studyx-primary">X</span>
          </span>
        </div>
      </Link>

      {/* Centered Floating Navigation Pills */}
      {token && (
        <nav className="pointer-events-auto hidden lg:flex items-center gap-1.5 glass-card-studyx px-3.5 py-1.5 shadow-studyx-glass rounded-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-small font-semibold transition-all ${
                  isActive ? 'text-[#FFFEFF]' : 'text-[#687380] hover:text-[#FFFEFF] hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStudyXTab"
                    className="absolute inset-0 bg-gradient-studyx-primary rounded-full shadow-glow-primary -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* Right Controls */}
      <div className="pointer-events-auto flex items-center gap-3">
        {token && (
          <div className="hidden sm:block">
            <StreakBadge streakCount={streakCount} />
          </div>
        )}

        {token ? (
          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              className="flex items-center gap-2.5 glass-card-studyx hover:border-[#3B82F6]/40 p-1.5 pr-3.5 text-caption font-semibold text-[#FFFEFF] transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-studyx-primary flex items-center justify-center text-white font-bold shadow-glow-primary">
                {fullName ? fullName.charAt(0) : 'S'}
              </div>
              <span className="hidden md:inline font-medium">{fullName}</span>
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Logout"
              className="p-2.5 rounded-full glass-card-studyx hover:border-red-500/40 text-[#687380] hover:text-red-400 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn-studyx-primary text-caption py-2 px-5"
          >
            Sign In
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        {token && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full glass-card-studyx text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="pointer-events-auto lg:hidden fixed top-20 left-4 right-4 glass-card-studyx p-6 shadow-2xl flex flex-col gap-3 z-50 border-white/10"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-caption font-semibold text-[#687380] uppercase tracking-wider">
                StudyX Menu
              </span>
              <StreakBadge streakCount={streakCount} />
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-small font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-studyx-primary text-white shadow-glow-primary'
                      : 'text-[#687380] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
