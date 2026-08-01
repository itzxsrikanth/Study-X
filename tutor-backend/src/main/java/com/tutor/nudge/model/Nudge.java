package com.tutor.nudge.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "nudges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nudge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String triggerReason; // DISENGAGED_2_DAYS, MILESTONE_INCOMPLETE, STREAK_AT_RISK

    @Column(length = 1000, nullable = false)
    private String message;

    @Builder.Default
    private Boolean isRead = false;

    @Builder.Default
    private Boolean isDismissed = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
