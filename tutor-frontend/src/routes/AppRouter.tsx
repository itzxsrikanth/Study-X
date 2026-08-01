import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { GoalIntakePage } from '../pages/GoalIntakePage';
import { LearningPlanPage } from '../pages/LearningPlanPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AiChatPage } from '../pages/AiChatPage';
import { QuizPage } from '../pages/QuizPage';
import { ProfilePage } from '../pages/ProfilePage';
import { CoursesHubPage } from '../pages/CoursesHubPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/welcome" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/goal-intake" element={<GoalIntakePage />} />
      <Route path="/plan" element={<LearningPlanPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/courses" element={<CoursesHubPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/chat" element={<AiChatPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
