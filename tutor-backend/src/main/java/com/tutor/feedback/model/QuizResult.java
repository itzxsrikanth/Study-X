package com.tutor.feedback.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private Long planId;

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Integer totalQuestions;

    private Double percentage;

    private String performanceRating; // EXCELLENT, PROFICIENT, NEEDS_REMEDIATION

    @Column(length = 1000)
    private String weakTopic;

    @Builder.Default
    private LocalDateTime completedAt = LocalDateTime.now();
}
