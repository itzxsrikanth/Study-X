package com.tutor.progress.service;

import com.tutor.plan.model.LearningPlan;
import com.tutor.plan.repository.LearningPlanRepository;
import com.tutor.progress.dto.DashboardSummaryResponse;
import com.tutor.progress.model.StudySession;
import com.tutor.progress.repository.StudySessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProgressTrackingService {

    private final StreakCalculatorService streakCalculatorService;
    private final StudySessionRepository studySessionRepository;
    private final LearningPlanRepository planRepository;

    public DashboardSummaryResponse getDashboardSummary(Long userId) {
        int streak = streakCalculatorService.calculateAndSyncStreak(userId);

        List<StudySession> allSessions = studySessionRepository.findByUserId(userId);
        int totalMinutes = allSessions.stream().mapToInt(StudySession::getDurationMinutes).sum();

        // Build last 7 days chart data
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(6);
        List<Object[]> dailyData = studySessionRepository.getDailyStudyTimeForUser(userId, sevenDaysAgo);
        Map<String, Integer> dateMap = new HashMap<>();
        for (Object[] row : dailyData) {
            if (row[0] != null && row[1] != null) {
                dateMap.put(row[0].toString(), ((Number) row[1]).intValue());
            }
        }

        List<DashboardSummaryResponse.DailyTimeEntry> weeklyEntries = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            LocalDate d = sevenDaysAgo.plusDays(i);
            String dStr = d.toString();
            weeklyEntries.add(new DashboardSummaryResponse.DailyTimeEntry(dStr, dateMap.getOrDefault(dStr, 0)));
        }

        // Active plan summary
        Optional<LearningPlan> latestPlanOpt = planRepository.findTopByUserIdOrderByCreatedAtDesc(userId);
        double overallProgress = 0.0;
        int completedM = 0;
        int totalM = 0;
        Map<String, Object> planMap = new HashMap<>();

        if (latestPlanOpt.isPresent()) {
            LearningPlan plan = latestPlanOpt.get();
            totalM = plan.getTotalMilestones();
            completedM = plan.getCompletedMilestones();
            if (totalM > 0) {
                overallProgress = Math.round(((double) completedM / totalM) * 100.0 * 10.0) / 10.0;
            }
            planMap.put("planId", plan.getId());
            planMap.put("title", plan.getTitle());
            planMap.put("status", plan.getStatus());
        }

        return DashboardSummaryResponse.builder()
                .userId(userId)
                .streakCount(streak)
                .totalMinutesStudied(totalMinutes)
                .overallProgressPercentage(overallProgress)
                .completedMilestones(completedM)
                .totalMilestones(totalM)
                .weeklyTimeSpent(weeklyEntries)
                .activePlanSummary(planMap)
                .build();
    }
}
