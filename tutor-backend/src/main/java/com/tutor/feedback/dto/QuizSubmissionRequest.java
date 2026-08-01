package com.tutor.feedback.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

@Data
public class QuizSubmissionRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    private Long planId;

    // Map of questionId -> selectedOptionIndex
    @NotNull(message = "Answers are required")
    private Map<String, Integer> selectedAnswers;
}
