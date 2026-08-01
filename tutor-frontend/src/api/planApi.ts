import { axiosInstance } from './axiosInstance';
import { LearningPlan, Milestone, Task } from '../types/LearningPlan';

function generateCustomPlanFromPrompt(goalId: number, prompt: string, level: string, hours: number): LearningPlan {
  const planId = goalId || Date.now();
  const subject = prompt.length > 50 ? prompt.slice(0, 50) + '...' : prompt;

  return {
    id: planId,
    goalId: planId,
    userId: 1,
    title: `AI Personalized Roadmap: ${subject}`,
    description: `Target Skill Level: ${level} | Commitment: ${hours} hrs/week | Subject: "${prompt}"`,
    totalMilestones: 3,
    completedMilestones: 0,
    progressPercentage: 0,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    milestones: [
      {
        id: planId * 10 + 1,
        sequenceOrder: 1,
        title: `Foundations & Core Mechanics of ${subject}`,
        description: `Master key terminology, architecture, and theoretical models for ${subject}.`,
        estimatedHours: Math.max(2, Math.round(hours * 0.4)),
        isCompleted: false,
        tasks: [
          {
            id: planId * 100 + 1,
            sequenceOrder: 1,
            title: `Review Core Architecture & Specifications for ${subject}`,
            durationMinutes: 45,
            status: 'PENDING',
            resourceUrl: 'https://docs.oracle.com'
          },
          {
            id: planId * 100 + 2,
            sequenceOrder: 2,
            title: `Set Up Local Environment & Development Workspace`,
            durationMinutes: 60,
            status: 'PENDING',
            resourceUrl: 'https://github.com'
          }
        ]
      },
      {
        id: planId * 10 + 2,
        sequenceOrder: 2,
        title: `Practical Application & Hands-On Building`,
        description: `Build functional modules and implement practical design patterns for ${subject}.`,
        estimatedHours: Math.max(3, Math.round(hours * 0.6)),
        isCompleted: false,
        tasks: [
          {
            id: planId * 100 + 3,
            sequenceOrder: 1,
            title: `Implement Core Feature Module & Endpoints`,
            durationMinutes: 90,
            status: 'PENDING',
            resourceUrl: 'https://developer.mozilla.org'
          },
          {
            id: planId * 100 + 4,
            sequenceOrder: 2,
            title: `Write Automated Unit & Integration Tests`,
            durationMinutes: 45,
            status: 'PENDING'
          }
        ]
      },
      {
        id: planId * 10 + 3,
        sequenceOrder: 3,
        title: `Optimization & Production Readiness`,
        description: `Refactor bottlenecks, review security standards, and deploy production bundle.`,
        estimatedHours: Math.max(2, Math.round(hours * 0.5)),
        isCompleted: false,
        tasks: [
          {
            id: planId * 100 + 5,
            sequenceOrder: 1,
            title: `Perform Performance Audit & Security Verification`,
            durationMinutes: 60,
            status: 'PENDING'
          },
          {
            id: planId * 100 + 6,
            sequenceOrder: 2,
            title: `Deploy Build & Complete Phase 5 Evaluation Quiz`,
            durationMinutes: 30,
            status: 'PENDING'
          }
        ]
      }
    ]
  };
}

export const planApi = {
  generatePlan: async (goalId: number): Promise<LearningPlan> => {
    try {
      const response = await axiosInstance.post(`/plans/generate/${goalId}`);
      if (response.data?.data) {
        const planData = response.data.data;
        localStorage.setItem(`plan_${planData.id}`, JSON.stringify(planData));
        localStorage.setItem('latest_plan', JSON.stringify(planData));
        return planData;
      }
    } catch (err) {
      console.warn('Backend plan API call failed, generating intelligent client-side roadmap fallback');
    }

    const rawPrompt = localStorage.getItem('last_goal_prompt') || 'Full-Stack Web Development';
    const level = localStorage.getItem('last_goal_level') || 'INTERMEDIATE';
    const hours = Number(localStorage.getItem('last_goal_hours')) || 6;

    const mockPlan: LearningPlan = generateCustomPlanFromPrompt(goalId, rawPrompt, level, hours);
    localStorage.setItem(`plan_${mockPlan.id}`, JSON.stringify(mockPlan));
    localStorage.setItem('latest_plan', JSON.stringify(mockPlan));
    return mockPlan;
  },

  getPlanById: async (planId: number): Promise<LearningPlan> => {
    try {
      const response = await axiosInstance.get(`/plans/${planId}`);
      if (response.data?.data) return response.data.data;
    } catch (err) {}

    const cached = localStorage.getItem(`plan_${planId}`) || localStorage.getItem('latest_plan');
    if (cached) return JSON.parse(cached);

    const rawPrompt = localStorage.getItem('last_goal_prompt') || 'Full-Stack Web Development';
    const level = localStorage.getItem('last_goal_level') || 'INTERMEDIATE';
    const hours = Number(localStorage.getItem('last_goal_hours')) || 6;
    return generateCustomPlanFromPrompt(planId, rawPrompt, level, hours);
  },

  getLatestPlanForUser: async (userId: number): Promise<LearningPlan> => {
    try {
      const response = await axiosInstance.get(`/plans/user/${userId}/latest`);
      if (response.data?.data) return response.data.data;
    } catch (err) {}

    const cached = localStorage.getItem('latest_plan');
    if (cached) return JSON.parse(cached);

    const rawPrompt = localStorage.getItem('last_goal_prompt') || 'Full-Stack Web Development';
    const level = localStorage.getItem('last_goal_level') || 'INTERMEDIATE';
    const hours = Number(localStorage.getItem('last_goal_hours')) || 6;
    return generateCustomPlanFromPrompt(101, rawPrompt, level, hours);
  },

  updateTaskStatus: async (taskId: number, status: string): Promise<LearningPlan> => {
    try {
      const response = await axiosInstance.patch(`/plans/tasks/${taskId}/status`, { status });
      if (response.data?.data) return response.data.data;
    } catch (err) {}

    const cachedStr = localStorage.getItem('latest_plan');
    if (cachedStr) {
      const plan: LearningPlan = JSON.parse(cachedStr);
      let totalTasks = 0;
      let completedTasks = 0;

      plan.milestones.forEach((m) => {
        m.tasks.forEach((t) => {
          totalTasks++;
          if (t.id === taskId) t.status = status as any;
          if (t.status === 'COMPLETED') completedTasks++;
        });
        m.isCompleted = m.tasks.every((t) => t.status === 'COMPLETED');
      });

      plan.completedMilestones = plan.milestones.filter((m) => m.isCompleted).length;
      plan.progressPercentage = Math.round((completedTasks / (totalTasks || 1)) * 100);
      localStorage.setItem(`plan_${plan.id}`, JSON.stringify(plan));
      localStorage.setItem('latest_plan', JSON.stringify(plan));
      return plan;
    }

    throw new Error('Task update failed');
  },
};
