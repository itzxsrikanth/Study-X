package com.tutor.goal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalResponse {
    private Long id;
    private Long userId;
    private String rawGoalPrompt;
    private String primarySubject;
    private String targetSkillLevel;
    private Integer weeklyHoursCommitment;
    private String preferredLearningStyle;
    private Integer estimatedDurationWeeks;
    private String status;
    private LocalDateTime createdAt;
}
