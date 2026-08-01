package com.tutor.feedback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultResponse {
    private Long id;
    private Long userId;
    private Long planId;
    private Integer score;
    private Integer totalQuestions;
    private Double percentage;
    private String performanceRating;
    private String weakTopic;
    private Boolean planAdapted;
    private String feedbackSummary;
    private LocalDateTime completedAt;
}
