package com.tutor.goal.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tutor.aigateway.service.PromptOrchestrationService;
import com.tutor.goal.dto.GoalIntakeRequest;
import com.tutor.goal.model.LearnerGoal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class IntentParsingService {

    private final PromptOrchestrationService promptOrchestrationService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LearnerGoal parseAndBuildGoal(GoalIntakeRequest request) {
        String jsonResponse = promptOrchestrationService.parseGoalIntent(request.getRawGoalPrompt());

        String subject = "General Learning";
        String skillLevel = request.getTargetSkillLevel() != null ? request.getTargetSkillLevel() : "INTERMEDIATE";
        int weeklyHours = request.getWeeklyHoursCommitment() != null ? request.getWeeklyHoursCommitment() : 5;
        String style = request.getPreferredLearningStyle() != null ? request.getPreferredLearningStyle() : "HANDS_ON";
        int durationWeeks = 4;

        try {
            JsonNode node = objectMapper.readTree(jsonResponse);
            if (node.has("primarySubject")) subject = node.get("primarySubject").asText();
            if (node.has("targetSkillLevel") && request.getTargetSkillLevel() == null) skillLevel = node.get("targetSkillLevel").asText();
            if (node.has("weeklyHoursCommitment") && request.getWeeklyHoursCommitment() == null) weeklyHours = node.get("weeklyHoursCommitment").asInt();
            if (node.has("preferredLearningStyle") && request.getPreferredLearningStyle() == null) style = node.get("preferredLearningStyle").asText();
            if (node.has("estimatedDurationWeeks")) durationWeeks = node.get("estimatedDurationWeeks").asInt();
        } catch (Exception e) {
            log.warn("Parsing JSON AI output failed, extracting prompt keywords: {}", e.getMessage());
            subject = request.getRawGoalPrompt().length() > 30 ? request.getRawGoalPrompt().substring(0, 30) + "..." : request.getRawGoalPrompt();
        }

        return LearnerGoal.builder()
                .userId(request.getUserId() != null ? request.getUserId() : 1L)
                .rawGoalPrompt(request.getRawGoalPrompt())
                .primarySubject(subject)
                .targetSkillLevel(skillLevel)
                .weeklyHoursCommitment(weeklyHours)
                .preferredLearningStyle(style)
                .estimatedDurationWeeks(durationWeeks)
                .status("PARSED")
                .build();
    }
}
