package com.tutor.plan.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milestone_id")
    @JsonIgnore
    private Milestone milestone;

    private Integer sequenceOrder;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String resourceUrl;

    private Integer durationMinutes;

    @Builder.Default
    private String status = "PENDING"; // PENDING, IN_PROGRESS, COMPLETED
}
