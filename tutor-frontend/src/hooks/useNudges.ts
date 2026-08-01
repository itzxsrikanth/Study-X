import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { nudgeApi } from '../api/nudgeApi';

export const useNudges = (userId: number) => {
  const queryClient = useQueryClient();

  const nudgesQuery = useQuery({
    queryKey: ['nudges', userId],
    queryFn: () => nudgeApi.getNudges(userId),
    enabled: !!userId,
  });

  const dismissMutation = useMutation({
    mutationFn: (nudgeId: number) => nudgeApi.dismissNudge(nudgeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nudges', userId] });
    },
  });

  const triggerMutation = useMutation({
    mutationFn: () => nudgeApi.triggerNudge(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nudges', userId] });
    },
  });

  return {
    nudges: nudgesQuery.data || [],
    isLoading: nudgesQuery.isLoading,
    dismissNudge: dismissMutation.mutateAsync,
    triggerNudge: triggerMutation.mutateAsync,
  };
};
