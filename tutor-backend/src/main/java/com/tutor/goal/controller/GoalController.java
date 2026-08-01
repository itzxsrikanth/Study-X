package com.tutor.goal.controller;

import com.tutor.common.dto.ApiResponse;
import com.tutor.goal.dto.GoalIntakeRequest;
import com.tutor.goal.dto.GoalResponse;
import com.tutor.goal.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping("/intake")
    public ResponseEntity<ApiResponse<GoalResponse>> createGoal(@Valid @RequestBody GoalIntakeRequest request) {
        GoalResponse response = goalService.processGoalIntake(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Goal intent successfully parsed"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GoalResponse>> getGoalById(@PathVariable Long id) {
        GoalResponse response = goalService.getGoalById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<GoalResponse>>> getGoalsByUserId(@PathVariable Long userId) {
        List<GoalResponse> responses = goalService.getGoalsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(responses));
    }
}
