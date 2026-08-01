package com.tutor.feedback.service;

import com.tutor.feedback.model.PerformanceSignal;
import com.tutor.feedback.model.QuizQuestion;
import lombok.Service;

import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Service
public class PerformanceAnalysisService {

    public PerformanceSignal analyzeQuizPerformance(Long userId, Long planId, List<QuizQuestion> questions, Map<String, Integer> answers) {
        int correctCount = 0;
        String weakTopic = null;

        for (QuizQuestion q : questions) {
            Integer userChoice = answers.get(q.getId());
            if (userChoice != null && userChoice.equals(q.getCorrectOptionIndex())) {
                correctCount++;
            } else {
                weakTopic = q.getTargetTopic();
            }
        }

        double accuracy = questions.isEmpty() ? 0.0 : ((double) correctCount / questions.size()) * 100.0;
        boolean needsRemediation = accuracy < 70.0;

        return PerformanceSignal.builder()
                .userId(userId)
                .planId(planId)
                .accuracyPercentage(accuracy)
                .identifiedWeakness(weakTopic != null ? weakTopic : "General Concepts")
                .requiresPlanAdaptation(needsRemediation)
                .build();
    }
}
