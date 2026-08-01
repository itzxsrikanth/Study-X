package com.tutor.progress.controller;

import com.tutor.common.dto.ApiResponse;
import com.tutor.progress.dto.DashboardSummaryResponse;
import com.tutor.progress.model.StudySession;
import com.tutor.progress.service.ProgressTrackingService;
import com.tutor.progress.service.TimeTrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final ProgressTrackingService progressTrackingService;
    private final TimeTrackingService timeTrackingService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<DashboardSummaryResponse>> getDashboard(@PathVariable Long userId) {
        DashboardSummaryResponse summary = progressTrackingService.getDashboardSummary(userId);
        return ResponseEntity.ok(ApiResponse.success(summary));
    }

    @PostMapping("/session")
    public ResponseEntity<ApiResponse<StudySession>> recordSession(
            @RequestParam Long userId,
            @RequestParam(required = false) Long planId,
            @RequestParam(required = false) Long taskId,
            @RequestParam Integer minutes) {
        StudySession session = timeTrackingService.recordSession(userId, planId, taskId, minutes);
        return ResponseEntity.ok(ApiResponse.success(session, "Study session recorded"));
    }
}
