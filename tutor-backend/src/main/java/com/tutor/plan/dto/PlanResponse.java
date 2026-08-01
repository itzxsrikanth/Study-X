package com.tutor.plan.dto;

import com.tutor.plan.model.Milestone;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanResponse {
    private Long id;
    private Long goalId;
    private Long userId;
    private String title;
    private String description;
    private Integer totalMilestones;
    private Integer completedMilestones;
    private Double progressPercentage;
    private String status;
    private List<Milestone> milestones;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
