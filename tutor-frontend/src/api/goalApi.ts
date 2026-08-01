import { axiosInstance } from './axiosInstance';
import { GoalIntakeRequest, GoalResponse } from '../types/Goal';

export const goalApi = {
  submitGoal: async (payload: GoalIntakeRequest): Promise<GoalResponse> => {
    try {
      const response = await axiosInstance.post('/goals/intake', payload);
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (err) {
      console.warn('Backend goal API call failed, using client-side fallback intake parsing');
    }

    const prompt = payload.rawGoalPrompt || 'Full-Stack Web Development';
    const level = payload.targetSkillLevel || 'INTERMEDIATE';
    const hours = payload.weeklyHoursCommitment || 6;
    const style = payload.preferredLearningStyle || 'PRACTICAL_PROJECTS';

    // Save prompt details in localStorage for dynamic plan generation
    localStorage.setItem('last_goal_prompt', prompt);
    localStorage.setItem('last_goal_level', level);
    localStorage.setItem('last_goal_hours', String(hours));
    localStorage.setItem('last_goal_style', style);

    return {
      id: Date.now(),
      userId: payload.userId || 1,
      rawGoalPrompt: prompt,
      primarySubject: prompt,
      targetSkillLevel: level,
      weeklyHoursCommitment: hours,
      preferredLearningStyle: style,
      estimatedDurationWeeks: 4,
      status: 'PARSED',
      createdAt: new Date().toISOString()
    };
  },

  getGoalById: async (id: number): Promise<GoalResponse> => {
    try {
      const response = await axiosInstance.get(`/goals/${id}`);
      if (response.data?.data) return response.data.data;
    } catch (err) {}

    const prompt = localStorage.getItem('last_goal_prompt') || 'Full-Stack Web Development';
    const level = localStorage.getItem('last_goal_level') || 'INTERMEDIATE';
    const hours = Number(localStorage.getItem('last_goal_hours')) || 6;
    const style = localStorage.getItem('last_goal_style') || 'PRACTICAL_PROJECTS';

    return {
      id,
      userId: 1,
      rawGoalPrompt: prompt,
      primarySubject: prompt,
      targetSkillLevel: level,
      weeklyHoursCommitment: hours,
      preferredLearningStyle: style,
      estimatedDurationWeeks: 4,
      status: 'PARSED',
      createdAt: new Date().toISOString()
    };
  },
};
