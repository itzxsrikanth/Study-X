import { create } from 'zustand';

interface UserState {
  userId: number;
  email: string;
  fullName: string;
  token: string | null;
  activePlanId: number | null;
  streakCount: number;
  setAuth: (userId: number, email: string, fullName: string, token: string, streakCount?: number) => void;
  setActivePlanId: (planId: number) => void;
  setStreakCount: (count: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: 1, // Default demo user
  email: 'learner@tutor.ai',
  fullName: 'Alex Learner',
  token: localStorage.getItem('jwt_token'),
  activePlanId: null,
  streakCount: 3,

  setAuth: (userId, email, fullName, token, streakCount = 1) => {
    localStorage.setItem('jwt_token', token);
    set({ userId, email, fullName, token, streakCount });
  },

  setActivePlanId: (activePlanId) => set({ activePlanId }),
  setStreakCount: (streakCount) => set({ streakCount }),

  logout: () => {
    localStorage.removeItem('jwt_token');
    set({ userId: 1, token: null, activePlanId: null });
  },
}));
