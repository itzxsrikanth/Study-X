package com.tutor.aigateway.service;

import com.tutor.aigateway.client.AnthropicApiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PromptOrchestrationService {

    private final AnthropicApiClient aiClient;

    public String parseGoalIntent(String rawGoalPrompt) {
        String systemPrompt = "You are an expert educational goal intent parser. Output JSON containing: primarySubject, targetSkillLevel, weeklyHoursCommitment, preferredLearningStyle, estimatedDurationWeeks.";
        String userPrompt = "Parse this learning goal: " + rawGoalPrompt;

        String result = aiClient.generateCompletion(systemPrompt, userPrompt);
        if (result != null) return result;

        // Structured Fallback for Goal Intent
        return String.format("""
                {
                    "primarySubject": "%s",
                    "targetSkillLevel": "INTERMEDIATE",
                    "weeklyHoursCommitment": 5,
                    "preferredLearningStyle": "PRACTICAL_PROJECTS",
                    "estimatedDurationWeeks": 4
                }
                """, rawGoalPrompt.replaceAll("\"", "'"));
    }

    public String generateNudgeMessage(String subject, int inactiveDays) {
        String systemPrompt = "You are an empathetic, motivating AI study coach. Generate a concise, encouraging 2-sentence nudge for a student who has been inactive.";
        String userPrompt = String.format("Subject: %s. Days inactive: %d.", subject, inactiveDays);

        String result = aiClient.generateCompletion(systemPrompt, userPrompt);
        if (result != null) return result;

        return String.format("🔥 You're only a step away from mastering %s! Spending just 15 minutes today will keep your momentum and streak strong.", subject);
    }
}
