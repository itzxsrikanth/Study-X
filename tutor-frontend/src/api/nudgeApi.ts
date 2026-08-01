import { axiosInstance } from './axiosInstance';
import { Nudge } from '../types/Dashboard';

export const nudgeApi = {
  getNudges: async (userId: number): Promise<Nudge[]> => {
    const response = await axiosInstance.get(`/nudges/user/${userId}`);
    return response.data.data;
  },
  triggerNudge: async (userId: number): Promise<Nudge> => {
    const response = await axiosInstance.post(`/nudges/trigger/${userId}`);
    return response.data.data;
  },
  dismissNudge: async (nudgeId: number): Promise<void> => {
    await axiosInstance.patch(`/nudges/${nudgeId}/dismiss`);
  }
};
