package com.tutor.progress.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponse {
    private Long userId;
    private Integer streakCount;
    private Integer totalMinutesStudied;
    private Double overallProgressPercentage;
    private Integer completedMilestones;
    private Integer totalMilestones;
    private List<DailyTimeEntry> weeklyTimeSpent;
    private Map<String, Object> activePlanSummary;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DailyTimeEntry {
        private String date; // YYYY-MM-DD
        private Integer minutes;
    }
}
