package com.tutor.progress.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "study_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private Long planId;
    private Long taskId;

    @Column(nullable = false)
    private Integer durationMinutes;

    private LocalDate sessionDate;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
