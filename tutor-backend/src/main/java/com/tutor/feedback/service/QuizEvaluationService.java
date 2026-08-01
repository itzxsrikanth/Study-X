package com.tutor.feedback.service;

import com.tutor.feedback.dto.QuizResultResponse;
import com.tutor.feedback.dto.QuizSubmissionRequest;
import com.tutor.feedback.model.PerformanceSignal;
import com.tutor.feedback.model.QuizQuestion;
import com.tutor.feedback.model.QuizResult;
import com.tutor.feedback.repository.QuizResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizEvaluationService {

    private final QuizResultRepository quizResultRepository;
    private final PerformanceAnalysisService performanceAnalysisService;
    private final PlanMutationService planMutationService;

    public List<QuizQuestion> generateQuizQuestions(String topic) {
        return List.of(
                QuizQuestion.builder()
                        .id("q1")
                        .questionText("What is the primary benefit of declarative state management in modern architectures?")
                        .options(List.of(
                                "Increases manual boilerplate code",
                                "Ensures predictable single source of truth and reactive UI updates",
                                "Forces synchronous thread blocking",
                                "Prevents API requests from being cached"
                        ))
                        .correctOptionIndex(1)
                        .explanation("Declarative state management simplifies UI synchronisation by maintaining a single source of truth.")
                        .targetTopic("State Management & Architecture")
                        .build(),

                QuizQuestion.builder()
                        .id("q2")
                        .questionText("Which mechanism handles asynchronous dynamic plan adaptation upon feedback signals?")
                        .options(List.of(
                                "Static SQL triggers only",
                                "Strategy pattern combined with event mutation services",
                                "Disabling client side routing",
                                "Hardcoded linear control flow"
                        ))
                        .correctOptionIndex(1)
                        .explanation("The Strategy pattern enables dynamic swapping of remediation algorithms based on runtime signals.")
                        .targetTopic("Adaptive Remediation Strategies")
                        .build(),

                QuizQuestion.builder()
                        .id("q3")
                        .questionText("Why are disengagement nudges scheduled using cron background triggers?")
                        .options(List.of(
                                "To block user interaction continuously",
                                "To autonomously monitor learner activity without manual intervention",
                                "To clean up database tables",
                                "To prevent JWT token renewal"
                        ))
                        .correctOptionIndex(1)
                        .explanation("Background cron triggers automate disengagement detection and personalized re-engagement nudges.")
                        .targetTopic("Engagement & Re-engagement Mechanics")
                        .build()
        );
    }

    public QuizResultResponse evaluateSubmission(QuizSubmissionRequest request) {
        List<QuizQuestion> questions = generateQuizQuestions("General");
        PerformanceSignal signal = performanceAnalysisService.analyzeQuizPerformance(
                request.getUserId(), request.getPlanId(), questions, request.getSelectedAnswers());

        boolean adapted = planMutationService.mutatePlanIfNecessary(signal);

        int score = (int) Math.round((signal.getAccuracyPercentage() / 100.0) * questions.size());
        String rating = signal.getAccuracyPercentage() >= 80 ? "EXCELLENT" :
                        signal.getAccuracyPercentage() >= 60 ? "PROFICIENT" : "NEEDS_REMEDIATION";

        QuizResult result = QuizResult.builder()
                .userId(request.getUserId())
                .planId(request.getPlanId())
                .score(score)
                .totalQuestions(questions.size())
                .percentage(signal.getAccuracyPercentage())
                .performanceRating(rating)
                .weakTopic(signal.getIdentifiedWeakness())
                .completedAt(LocalDateTime.now())
                .build();

        QuizResult saved = quizResultRepository.save(result);

        String summary = adapted
                ? "Your score was " + Math.round(signal.getAccuracyPercentage()) + "%. AI Tutor has adapted your learning plan with target remediation for: " + signal.getIdentifiedWeakness()
                : "Great job! You passed with " + Math.round(signal.getAccuracyPercentage()) + "%. No plan adaptation required.";

        return QuizResultResponse.builder()
                .id(saved.getId())
                .userId(saved.getUserId())
                .planId(saved.getPlanId())
                .score(saved.getScore())
                .totalQuestions(saved.getTotalQuestions())
                .percentage(saved.getPercentage())
                .performanceRating(saved.getPerformanceRating())
                .weakTopic(saved.getWeakTopic())
                .planAdapted(adapted)
                .feedbackSummary(summary)
                .completedAt(saved.getCompletedAt())
                .build();
    }
}
