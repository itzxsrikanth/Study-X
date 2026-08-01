import { create } from 'zustand';
import { auth, isFirebaseConfigured } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

interface UserState {
  userId: number | string;
  email: string;
  fullName: string;
  token: string | null;
  activePlanId: number | null;
  streakCount: number;
  isInitialized: boolean;
  setAuth: (userId: number | string, email: string, fullName: string, token: string, streakCount?: number) => void;
  setActivePlanId: (planId: number) => void;
  setStreakCount: (count: number) => void;
  logout: () => Promise<void>;
  initAuth: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: 1, // Default demo user
  email: 'learner@tutor.ai',
  fullName: 'Alex Learner',
  token: localStorage.getItem('jwt_token'),
  activePlanId: null,
  streakCount: 3,
  isInitialized: false,

  setAuth: (userId, email, fullName, token, streakCount = 1) => {
    localStorage.setItem('jwt_token', token);
    set({ userId, email, fullName, token, streakCount });
  },

  setActivePlanId: (activePlanId) => set({ activePlanId }),
  setStreakCount: (streakCount) => set({ streakCount }),

  logout: async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem('jwt_token');
    set({ userId: 1, email: 'learner@tutor.ai', fullName: 'Alex Learner', token: null, activePlanId: null });
  },

  initAuth: () => {
    if (!isFirebaseConfigured || !auth) {
      // Mock mode
      set({ isInitialized: true });
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('jwt_token', token);
        set({ 
          userId: user.uid, 
          email: user.email || '', 
          fullName: user.displayName || 'Learner',
          token,
          isInitialized: true
        });
      } else {
        localStorage.removeItem('jwt_token');
        set({ token: null, isInitialized: true });
      }
    });
  }
}));
