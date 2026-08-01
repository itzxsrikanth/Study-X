export interface DailyTimeEntry {
  date: string;
  minutes: number;
}

export interface DashboardSummary {
  userId: number;
  streakCount: number;
  totalMinutesStudied: number;
  overallProgressPercentage: number;
  completedMilestones: number;
  totalMilestones: number;
  weeklyTimeSpent: DailyTimeEntry[];
  activePlanSummary: {
    planId?: number;
    title?: string;
    status?: string;
  };
}

export interface Nudge {
  id: number;
  userId: number;
  triggerReason: string;
  message: string;
  isRead: boolean;
  isDismissed: boolean;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  targetTopic: string;
}

export interface QuizResultResponse {
  id: number;
  userId: number;
  planId?: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  performanceRating: string;
  weakTopic?: string;
  planAdapted: boolean;
  feedbackSummary: string;
  completedAt: string;
}
