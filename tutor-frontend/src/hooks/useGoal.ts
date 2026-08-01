import { useMutation } from '@tanstack/react-query';
import { goalApi } from '../api/goalApi';
import { GoalIntakeRequest } from '../types/Goal';

export const useGoal = () => {
  const submitGoalMutation = useMutation({
    mutationFn: (payload: GoalIntakeRequest) => goalApi.submitGoal(payload),
  });

  return {
    submitGoal: submitGoalMutation.mutateAsync,
    isSubmitting: submitGoalMutation.isPending,
    error: submitGoalMutation.error,
  };
};
