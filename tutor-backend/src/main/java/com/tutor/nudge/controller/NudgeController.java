package com.tutor.nudge.controller;

import com.tutor.common.dto.ApiResponse;
import com.tutor.common.exception.ResourceNotFoundException;
import com.tutor.nudge.dto.NudgeResponse;
import com.tutor.nudge.model.Nudge;
import com.tutor.nudge.repository.NudgeRepository;
import com.tutor.nudge.service.NudgeGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/nudges")
@RequiredArgsConstructor
public class NudgeController {

    private final NudgeRepository nudgeRepository;
    private final NudgeGeneratorService nudgeGeneratorService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<NudgeResponse>>> getActiveNudgesForUser(@PathVariable Long userId) {
        List<Nudge> nudges = nudgeRepository.findByUserIdAndIsDismissedFalseOrderByCreatedAtDesc(userId);
        List<NudgeResponse> dtos = nudges.stream().map(this::mapToDto).toList();
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @PostMapping("/trigger/{userId}")
    public ResponseEntity<ApiResponse<NudgeResponse>> triggerManualNudge(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "MANUAL_PROMPT") String reason) {
        Nudge nudge = nudgeGeneratorService.createNudgeForUser(userId, reason, 1);
        return ResponseEntity.ok(ApiResponse.success(mapToDto(nudge), "Smart nudge generated"));
    }

    @PatchMapping("/{nudgeId}/dismiss")
    public ResponseEntity<ApiResponse<Void>> dismissNudge(@PathVariable Long nudgeId) {
        Nudge nudge = nudgeRepository.findById(nudgeId)
                .orElseThrow(() -> new ResourceNotFoundException("Nudge not found with id " + nudgeId));
        nudge.setIsDismissed(true);
        nudgeRepository.save(nudge);
        return ResponseEntity.ok(ApiResponse.success(null, "Nudge dismissed"));
    }

    private NudgeResponse mapToDto(Nudge n) {
        return NudgeResponse.builder()
                .id(n.getId())
                .userId(n.getUserId())
                .triggerReason(n.getTriggerReason())
                .message(n.getMessage())
                .isRead(n.getIsRead())
                .isDismissed(n.getIsDismissed())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
