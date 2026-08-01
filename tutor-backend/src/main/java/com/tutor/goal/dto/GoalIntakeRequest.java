package com.tutor.goal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoalIntakeRequest {
    private Long userId;

    @NotBlank(message = "Goal prompt cannot be blank")
    private String rawGoalPrompt;

    private Integer weeklyHoursCommitment;
    private String targetSkillLevel;
    private String preferredLearningStyle;
}
