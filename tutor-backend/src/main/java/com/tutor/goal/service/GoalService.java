package com.tutor.goal.service;

import com.tutor.common.exception.ResourceNotFoundException;
import com.tutor.goal.dto.GoalIntakeRequest;
import com.tutor.goal.dto.GoalResponse;
import com.tutor.goal.model.LearnerGoal;
import com.tutor.goal.repository.LearnerGoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final LearnerGoalRepository goalRepository;
    private final IntentParsingService intentParsingService;

    public GoalResponse processGoalIntake(GoalIntakeRequest request) {
        LearnerGoal goal = intentParsingService.parseAndBuildGoal(request);
        LearnerGoal saved = goalRepository.save(goal);
        return mapToResponse(saved);
    }

    public GoalResponse getGoalById(Long id) {
        LearnerGoal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Learner goal not found with id " + id));
        return mapToResponse(goal);
    }

    public List<GoalResponse> getGoalsByUserId(Long userId) {
        return goalRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public GoalResponse mapToResponse(LearnerGoal goal) {
        return GoalResponse.builder()
                .id(goal.getId())
                .userId(goal.getUserId())
                .rawGoalPrompt(goal.getRawGoalPrompt())
                .primarySubject(goal.getPrimarySubject())
                .targetSkillLevel(goal.getTargetSkillLevel())
                .weeklyHoursCommitment(goal.getWeeklyHoursCommitment())
                .preferredLearningStyle(goal.getPreferredLearningStyle())
                .estimatedDurationWeeks(goal.getEstimatedDurationWeeks())
                .status(goal.getStatus())
                .createdAt(goal.getCreatedAt())
                .build();
    }
}
