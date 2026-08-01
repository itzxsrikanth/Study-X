import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { planApi } from '../api/planApi';

export const usePlan = (planId?: number | null, userId?: number) => {
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ['plan', planId, userId],
    queryFn: () => {
      if (planId) return planApi.getPlanById(planId);
      if (userId) return planApi.getLatestPlanForUser(userId);
      return null;
    },
    enabled: !!planId || !!userId,
  });

  const generatePlanMutation = useMutation({
    mutationFn: (goalId: number) => planApi.generatePlan(goalId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['plan'] });
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: number; status: string }) =>
      planApi.updateTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    plan: planQuery.data,
    isLoading: planQuery.isLoading,
    generatePlan: generatePlanMutation.mutateAsync,
    isGenerating: generatePlanMutation.isPending,
    toggleTask: toggleTaskMutation.mutateAsync,
  };
};
