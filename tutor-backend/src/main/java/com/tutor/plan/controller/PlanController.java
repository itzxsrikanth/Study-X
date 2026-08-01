package com.tutor.plan.controller;

import com.tutor.common.dto.ApiResponse;
import com.tutor.plan.dto.PlanResponse;
import com.tutor.plan.dto.TaskStatusUpdateRequest;
import com.tutor.plan.model.LearningPlan;
import com.tutor.plan.service.MilestoneService;
import com.tutor.plan.service.PlanGeneratorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanGeneratorService planGeneratorService;
    private final MilestoneService milestoneService;

    @PostMapping("/generate/{goalId}")
    public ResponseEntity<ApiResponse<PlanResponse>> generatePlan(@PathVariable Long goalId) {
        LearningPlan plan = planGeneratorService.generatePlanForGoal(goalId);
        PlanResponse response = milestoneService.mapToResponse(plan);
        return ResponseEntity.ok(ApiResponse.success(response, "Learning plan successfully generated"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlanResponse>> getPlanById(@PathVariable Long id) {
        PlanResponse response = milestoneService.getPlanById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/user/{userId}/latest")
    public ResponseEntity<ApiResponse<PlanResponse>> getLatestPlanByUserId(@PathVariable Long userId) {
        PlanResponse response = milestoneService.getLatestPlanByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PatchMapping("/tasks/{taskId}/status")
    public ResponseEntity<ApiResponse<PlanResponse>> updateTaskStatus(
            @PathVariable Long taskId,
            @Valid @RequestBody TaskStatusUpdateRequest request) {
        PlanResponse response = milestoneService.updateTaskStatus(taskId, request.getStatus());
        return ResponseEntity.ok(ApiResponse.success(response, "Task status updated"));
    }
}
