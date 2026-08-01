package com.tutor.plan.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskStatusUpdateRequest {
    @NotBlank(message = "Status is required")
    private String status; // PENDING, IN_PROGRESS, COMPLETED
}
