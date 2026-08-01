package com.tutor.nudge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NudgeResponse {
    private Long id;
    private Long userId;
    private String triggerReason;
    private String message;
    private Boolean isRead;
    private Boolean isDismissed;
    private LocalDateTime createdAt;
}
