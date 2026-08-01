import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';

export const useDashboard = (userId: number) => {
  const queryClient = useQueryClient();

  const summaryQuery = useQuery({
    queryKey: ['dashboard', userId],
    queryFn: () => dashboardApi.getSummary(userId),
    enabled: !!userId,
  });

  const recordSessionMutation = useMutation({
    mutationFn: ({ planId, taskId, minutes }: { planId?: number; taskId?: number; minutes: number }) =>
      dashboardApi.recordSession(userId, planId, taskId, minutes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', userId] });
    },
  });

  return {
    summary: summaryQuery.data,
    isLoading: summaryQuery.isLoading,
    recordSession: recordSessionMutation.mutateAsync,
  };
};
