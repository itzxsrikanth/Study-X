export interface Task {
  id: number;
  sequenceOrder: number;
  title: string;
  resourceUrl?: string;
  durationMinutes: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Milestone {
  id: number;
  sequenceOrder: number;
  title: string;
  description: string;
  estimatedHours: number;
  isCompleted: boolean;
  tasks: Task[];
}

export interface LearningPlan {
  id: number;
  goalId: number;
  userId: number;
  title: string;
  description: string;
  totalMilestones: number;
  completedMilestones: number;
  progressPercentage: number;
  status: 'ACTIVE' | 'ADAPTED' | 'COMPLETED';
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
}
