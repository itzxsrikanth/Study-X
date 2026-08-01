import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { 
  Award, 
  Flame, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  Zap,
  BookOpen,
  CheckCircle2,
  Lock,
  Star,
  Layers,
  Check,
  QrCode
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';

interface AchievementBadge {
  id: string;
  title: string;
  desc: string;
  criteria: string;
  xpReward: number;
  icon: any;
  unlocked: boolean;
  progress: number;
  badgeVariant: 'purple' | 'pink' | 'lime' | 'cyan';
  tier: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Top Performer';
}

export const ProfilePage: React.FC = () => {
  const { fullName, email, streakCount, activePlanId } = useUserStore();
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);
  const [prefModalOpen, setPrefModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Retrieve cached plan to calculate real dynamic progress & XP
  const cachedPlan = localStorage.getItem('latest_plan');
  let completedTasksCount = 0;
  if (cachedPlan) {
    try {
      const plan = JSON.parse(cachedPlan);
      plan.milestones?.forEach((m: any) => {
        m.tasks?.forEach((t: any) => {
          if (t.status === 'COMPLETED') completedTasksCount++;
        });
      });
    } catch (e) {}
  }

  // Calculate dynamic XP: Base 500 XP + 250 XP per completed task + streak bonus
  const totalXp = 500 + (completedTasksCount * 250) + (streakCount * 100);
  const scholarLevel = Math.floor(totalXp / 500) + 1;

  // 5-Tier Achievement Badges
  const achievementBadges: AchievementBadge[] = [
    {
      id: 'b-beg',
      title: 'Beginner Scholar',
      tier: 'Beginner',
      desc: 'Started your adaptive learning journey in SteadyX.',
      criteria: 'Register & initialize active learning plan',
      xpReward: 200,
      icon: BookOpen,
      unlocked: true,
      progress: 100,
      badgeVariant: 'cyan',
    },
    {
      id: 'b-int',
      title: 'Intermediate Practitioner',
      tier: 'Intermediate',
      desc: 'Completed initial roadmap tasks and adaptive quizzes.',
      criteria: 'Reach 500+ XP & complete 1 task',
      xpReward: 400,
      icon: Zap,
      unlocked: totalXp >= 500,
      progress: Math.min(100, Math.round((totalXp / 500) * 100)),
      badgeVariant: 'purple',
    },
    {
      id: 'b-adv',
      title: 'Advanced Architect',
      tier: 'Advanced',
      desc: 'Demonstrated proficiency in full-stack architecture.',
      criteria: 'Reach 1,000+ XP & maintain 3+ day streak',
      xpReward: 600,
      icon: Layers,
      unlocked: totalXp >= 1000 && streakCount >= 3,
      progress: Math.min(100, Math.round((totalXp / 1000) * 100)),
      badgeVariant: 'pink',
    },
    {
      id: 'b-exp',
      title: 'Expert Specialist',
      tier: 'Expert',
      desc: 'Mastered target curriculum with 1500+ XP.',
      criteria: 'Reach 1,500+ XP in SteadyX',
      xpReward: 800,
      icon: Sparkles,
      unlocked: totalXp >= 1500,
      progress: Math.min(100, Math.round((totalXp / 1500) * 100)),
      badgeVariant: 'lime',
    },
    {
      id: 'b-top',
      title: 'Top Performer',
      tier: 'Top Performer',
      desc: 'Scored 90%+ in adaptive evaluation loops.',
      criteria: 'Score 90%+ on adaptive quiz evaluation',
      xpReward: 1000,
      icon: Award,
      unlocked: true,
      progress: 100,
      badgeVariant: 'pink',
    },
  ];

  const verificationId = `STEADYX-2026-VERIFIED-994`;
  const qrCodeUrl = `https://quickchart.io/qr?text=https%3A%2F%2Fsteadyx.ai%2Fverify%2F${verificationId}&size=150`;

  const handleDownloadCertificate = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);

    const certWindow = window.open('', '_blank');
    if (certWindow) {
      certWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>SteadyX Verified Certificate - ${fullName}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0B0B10; color: #FFFEFF; padding: 40px; text-align: center; }
            .cert { border: 8px double #3B82F6; padding: 40px; border-radius: 24px; background: #11121A; max-width: 800px; margin: 0 auto; box-shadow: 0 0 50px rgba(180, 77, 255, 0.4); text-align: center; }
            h1 { font-size: 36px; color: #3B82F6; margin-bottom: 10px; }
            h2 { font-size: 28px; color: #FFFEFF; margin-top: 20px; }
            p { font-size: 16px; color: #9CA3AF; line-height: 1.6; }
            .badge { display: inline-block; padding: 8px 20px; background: #0EA5E9; color: #fff; border-radius: 50px; font-weight: bold; font-size: 14px; margin-top: 20px; }
            .id { font-family: monospace; font-size: 12px; color: #06B6D4; margin-top: 20px; }
            .qr { margin-top: 25px; }
          </style>
        </head>
        <body>
          <div class="cert">
            <div class="badge">SteadyX Verified Academic Certificate</div>
            <h1>Certificate of Completion</h1>
            <p>This certifies that</p>
            <h2>${fullName || 'Alex Learner'}</h2>
            <p>has successfully completed all required course modules, adaptive evaluation quizzes, and assessments in <strong>Full-Stack Web Architecture & Spring Boot Mastery</strong>.</p>
            <div class="qr">
              <img src="${qrCodeUrl}" width="120" height="120" alt="QR Verification" />
            </div>
            <div class="id">VERIFICATION ID: ${verificationId}</div>
          </div>
        </body>
        </html>
      `);
      certWindow.document.close();
      certWindow.print();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pt-4">
      {/* Student Profile OS Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-studyx p-8 md:p-10 border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-studyx-glass"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-studyx-primary flex items-center justify-center font-bold text-white text-h1 shadow-glow-primary">
            {fullName ? fullName.charAt(0) : 'S'}
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-h2 font-bold text-[#FFFEFF]">{fullName}</h1>
              <ShieldCheck className="w-5 h-5 text-[#C6FF00]" />
            </div>
            <p className="text-caption text-[#9CA3AF] font-mono">{email}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <Badge label={`${streakCount} Day Streak`} variant="pink" icon={<Flame className="w-3.5 h-3.5" />} />
              <Badge label={`Level ${scholarLevel} Scholar (${totalXp} XP)`} variant="purple" />
              <Badge label="Top Performer Tier" variant="lime" />
            </div>
          </div>
        </div>

        <Button
          variant="tertiary"
          size="sm"
          onClick={() => setPrefModalOpen(true)}
        >
          Edit Preferences
        </Button>
      </motion.div>

      {/* 5-Tier Achievement Badges Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-h3 font-semibold text-[#FFFEFF] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#3B82F6]" />
            5-Tier Achievement Badges
          </h3>
          <span className="text-caption text-[#9CA3AF] font-mono">
            {achievementBadges.filter(b => b.unlocked).length} / {achievementBadges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {achievementBadges.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedBadge(b)}
                className={`glass-card-studyx p-4 border cursor-pointer transition-all space-y-3 relative overflow-hidden ${
                  b.unlocked
                    ? 'border-white/10 hover:border-[#3B82F6]/50 shadow-studyx-glass'
                    : 'border-white/5 opacity-65 bg-[#0B0B10]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl border ${
                    b.unlocked
                      ? 'bg-[#1A1C26] text-[#3B82F6] border-white/10 shadow-glow-primary'
                      : 'bg-[#11121A] text-[#687380] border-white/5'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {b.unlocked ? (
                    <Badge label={b.tier} variant={b.badgeVariant} />
                  ) : (
                    <Badge label="Locked" variant="neutral" icon={<Lock className="w-3 h-3" />} />
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-[#FFFEFF] text-small">{b.title}</h4>
                  <p className="text-caption text-[#9CA3AF] mt-0.5 leading-relaxed text-[11px]">{b.desc}</p>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#687380]">
                    <span>Progress</span>
                    <span>{b.progress}%</span>
                  </div>
                  <div className="w-full bg-[#1A1C26] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        b.unlocked ? 'bg-gradient-studyx-primary' : 'bg-[#343745]'
                      }`}
                      style={{ width: `${b.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Verified SteadyX Certificate Card with QR Code */}
      <div className="glass-card-studyx p-8 md:p-10 border-white/10 space-y-6 shadow-studyx-glass">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-h3 font-semibold text-[#FFFEFF] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#06B6D4]" />
              Verified SteadyX Certificate of Completion
            </h3>
            <span className="text-caption text-[#9CA3AF]">Official Digital Certificate with QR Verification</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={downloadSuccess ? Check : Download}
            showArrow={false}
            onClick={handleDownloadCertificate}
          >
            {downloadSuccess ? 'Certificate Opened!' : 'Download PDF Certificate'}
          </Button>
        </div>

        <div className="glass-card-studyx p-8 rounded-3xl border-white/10 bg-[#0B0B10] text-center space-y-4 shadow-studyx-glass relative overflow-hidden">
          <span className="text-caption font-bold uppercase tracking-widest text-[#06B6D4] block">
            SteadyX Certificate of Academic Achievement
          </span>
          <h2 className="text-h2 font-bold text-[#FFFEFF]">
            Full-Stack Web Architecture & Spring Boot Mastery
          </h2>
          <p className="text-small text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
            This certifies that <strong className="text-white">{fullName}</strong> has successfully completed all required course modules, adaptive evaluation quizzes, and assessments in SteadyX.
          </p>

          {/* QR Code Verification Display */}
          <div className="pt-2 flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-white rounded-2xl shadow-lg border border-white/20">
              <img src={qrCodeUrl} width="100" height="100" alt="QR Code Verification" className="rounded-lg" />
            </div>
            <span className="text-caption text-[#687380] font-mono flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-[#06B6D4]" /> Verification ID: {verificationId}
            </span>
          </div>
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <Modal
          isOpen={!!selectedBadge}
          onClose={() => setSelectedBadge(null)}
          title={selectedBadge.title}
          description={selectedBadge.desc}
          icon={selectedBadge.icon}
          primaryActionLabel={selectedBadge.unlocked ? "Awesome!" : "Got It"}
          onPrimaryAction={() => setSelectedBadge(null)}
        >
          <div className="space-y-4 py-2 text-left">
            <div className="p-3.5 rounded-2xl bg-[#11121A] border border-white/5 space-y-1">
              <span className="text-caption text-[#687380] font-mono uppercase">Unlock Criteria</span>
              <p className="text-small font-semibold text-[#FFFEFF]">{selectedBadge.criteria}</p>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#11121A] border border-white/5">
              <span className="text-small font-semibold text-[#9CA3AF]">XP Reward</span>
              <Badge label={`+${selectedBadge.xpReward} XP`} variant={selectedBadge.badgeVariant} icon={<Star className="w-3 h-3" />} />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-caption text-[#9CA3AF]">
                <span>Status</span>
                <span className="font-bold text-white">{selectedBadge.unlocked ? '100% Unlocked' : `${selectedBadge.progress}% In Progress`}</span>
              </div>
              <div className="w-full bg-[#1A1C26] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-studyx-primary h-full rounded-full transition-all"
                  style={{ width: `${selectedBadge.progress}%` }}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Preferences Modal */}
      <Modal
        isOpen={prefModalOpen}
        onClose={() => setPrefModalOpen(false)}
        title="Edit Preferences"
        description="Update your SteadyX profile preferences and target goals."
        icon={Zap}
        primaryActionLabel="Save Changes"
        onPrimaryAction={() => setPrefModalOpen(false)}
        secondaryActionLabel="Cancel"
      >
        <div className="space-y-3 py-2 text-left">
          <label className="block text-caption font-semibold text-[#D1D5DB]">Display Name</label>
          <input
            type="text"
            defaultValue={fullName}
            className="input-studyx w-full p-3 text-small text-white"
          />

          <label className="block text-caption font-semibold text-[#D1D5DB] pt-2">Email Address</label>
          <input
            type="email"
            defaultValue={email}
            className="input-studyx w-full p-3 text-small text-white"
          />
        </div>
      </Modal>
    </div>
  );
};
