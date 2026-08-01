import React from 'react';
import { Hexagon, Heart, ShieldCheck, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#11121A]/80 backdrop-blur-xl py-12 px-4 text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl overflow-hidden shadow-glow-primary border border-white/10">
              <img src="/studyx-logo.png" alt="StudyX Logo" className="w-9 h-9 object-cover" />
            </div>
            <span className="font-bold text-[#FFFEFF] text-h4 tracking-tight">
              Study<span className="text-gradient-studyx-primary">X</span>
            </span>
          </div>
          <p className="text-caption text-[#9CA3AF] leading-relaxed">
            Adaptive AI learning platform built on the official StudyX design system specification.
          </p>
        </div>

        <div>
          <h4 className="text-caption font-semibold uppercase tracking-widest text-[#FFFEFF] mb-3">Platform</h4>
          <ul className="space-y-2 text-small">
            <li><Link to="/welcome" className="hover:text-[#3B82F6] transition-colors">Landing Page</Link></li>
            <li><Link to="/dashboard" className="hover:text-[#3B82F6] transition-colors">Dashboard</Link></li>
            <li><Link to="/goal-intake" className="hover:text-[#3B82F6] transition-colors">AI Goal Intake</Link></li>
            <li><Link to="/plan" className="hover:text-[#3B82F6] transition-colors">Learning Roadmap</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-caption font-semibold uppercase tracking-widest text-[#FFFEFF] mb-3">AI Engine</h4>
          <ul className="space-y-2 text-small">
            <li><Link to="/chat" className="hover:text-[#3B82F6] transition-colors">AI Tutor Chat</Link></li>
            <li><Link to="/quiz" className="hover:text-[#3B82F6] transition-colors">Adaptive Quiz</Link></li>
            <li><Link to="/profile" className="hover:text-[#3B82F6] transition-colors">Student Profile & XP</Link></li>
            <li><span className="text-[#687380]">Spring Boot Backend & JWT</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-caption font-semibold uppercase tracking-widest text-[#FFFEFF] mb-3">Connect</h4>
          <div className="flex items-center gap-3 mb-4">
            <a href="#" className="p-2 rounded-xl bg-[#1A1C26] border border-white/10 hover:border-[#3B82F6] text-[#9CA3AF] hover:text-white transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-xl bg-[#1A1C26] border border-white/10 hover:border-[#3B82F6] text-[#9CA3AF] hover:text-white transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-xl bg-[#1A1C26] border border-white/10 hover:border-[#3B82F6] text-[#9CA3AF] hover:text-white transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <div className="text-caption text-[#C6FF00] flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
            StudyX Verified Platform
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-caption text-[#687380] gap-4">
        <span>&copy; {new Date().getFullYear()} StudyX Design System. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-[#0EA5E9] fill-[#0EA5E9] inline" /> for learners.
        </span>
      </div>
    </footer>
  );
};
