export interface GoalIntakeRequest {
  userId?: number;
  rawGoalPrompt: string;
  weeklyHoursCommitment?: number;
  targetSkillLevel?: string;
  preferredLearningStyle?: string;
}

export interface GoalResponse {
  id: number;
  userId: number;
  rawGoalPrompt: string;
  primarySubject: string;
  targetSkillLevel: string;
  weeklyHoursCommitment: number;
  preferredLearningStyle: string;
  estimatedDurationWeeks: number;
  status: string;
  createdAt: string;
}
