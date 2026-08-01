import { axiosInstance } from './axiosInstance';
import { DashboardSummary } from '../types/Dashboard';

export const dashboardApi = {
  getSummary: async (userId: number): Promise<DashboardSummary> => {
    const response = await axiosInstance.get(`/dashboard/user/${userId}`);
    return response.data.data;
  },
  recordSession: async (userId: number, planId?: number, taskId?: number, minutes: number = 30) => {
    const response = await axiosInstance.post('/dashboard/session', null, {
      params: { userId, planId, taskId, minutes }
    });
    return response.data.data;
  }
};
