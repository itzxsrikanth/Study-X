package com.tutor.plan.service;

import com.tutor.common.exception.ResourceNotFoundException;
import com.tutor.plan.dto.PlanResponse;
import com.tutor.plan.model.LearningPlan;
import com.tutor.plan.model.Milestone;
import com.tutor.plan.model.Task;
import com.tutor.plan.repository.LearningPlanRepository;
import com.tutor.plan.repository.MilestoneRepository;
import com.tutor.plan.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final LearningPlanRepository planRepository;
    private final MilestoneRepository milestoneRepository;
    private final TaskRepository taskRepository;

    public PlanResponse getPlanById(Long planId) {
        LearningPlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException("Learning plan not found with id " + planId));
        return mapToResponse(plan);
    }

    public PlanResponse getLatestPlanByUserId(Long userId) {
        LearningPlan plan = planRepository.findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No active learning plan found for user id " + userId));
        return mapToResponse(plan);
    }

    public PlanResponse updateTaskStatus(Long taskId, String newStatus) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + taskId));

        task.setStatus(newStatus.toUpperCase());
        taskRepository.save(task);

        Milestone milestone = task.getMilestone();
        if (milestone != null) {
            List<Task> tasks = milestone.getTasks();
            boolean allCompleted = tasks.stream().allMatch(t -> "COMPLETED".equalsIgnoreCase(t.getStatus()));
            milestone.setIsCompleted(allCompleted);
            milestoneRepository.save(milestone);

            LearningPlan plan = milestone.getLearningPlan();
            if (plan != null) {
                long completedCount = plan.getMilestones().stream().filter(m -> Boolean.TRUE.equals(m.getIsCompleted())).count();
                plan.setCompletedMilestones((int) completedCount);
                plan.setUpdatedAt(LocalDateTime.now());
                if (completedCount == plan.getTotalMilestones()) {
                    plan.setStatus("COMPLETED");
                }
                planRepository.save(plan);
                return mapToResponse(plan);
            }
        }

        return null;
    }

    public PlanResponse mapToResponse(LearningPlan plan) {
        int total = plan.getTotalMilestones() > 0 ? plan.getTotalMilestones() : 1;
        double progress = ((double) plan.getCompletedMilestones() / total) * 100.0;

        return PlanResponse.builder()
                .id(plan.getId())
                .goalId(plan.getGoalId())
                .userId(plan.getUserId())
                .title(plan.getTitle())
                .description(plan.getDescription())
                .totalMilestones(plan.getTotalMilestones())
                .completedMilestones(plan.getCompletedMilestones())
                .progressPercentage(Math.min(100.0, Math.round(progress * 10.0) / 10.0))
                .status(plan.getStatus())
                .milestones(plan.getMilestones())
                .createdAt(plan.getCreatedAt())
                .updatedAt(plan.getUpdatedAt())
                .build();
    }
}
