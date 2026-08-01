package com.tutor.goal.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "learner_goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearnerGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 1000)
    private String rawGoalPrompt;

    private String primarySubject;
    private String targetSkillLevel;
    private Integer weeklyHoursCommitment;
    private String preferredLearningStyle;
    private Integer estimatedDurationWeeks;

    @Builder.Default
    private String status = "PARSED";

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
