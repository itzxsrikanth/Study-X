package com.tutor.feedback;

import com.tutor.feedback.dto.QuizResultResponse;
import com.tutor.feedback.dto.QuizSubmissionRequest;
import com.tutor.feedback.model.PerformanceSignal;
import com.tutor.feedback.model.QuizResult;
import com.tutor.feedback.repository.QuizResultRepository;
import com.tutor.feedback.service.PerformanceAnalysisService;
import com.tutor.feedback.service.PlanMutationService;
import com.tutor.feedback.service.QuizEvaluationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class QuizEvaluationServiceTest {

    @Mock
    private QuizResultRepository quizResultRepository;

    @Mock
    private PerformanceAnalysisService performanceAnalysisService;

    @Mock
    private PlanMutationService planMutationService;

    @InjectMocks
    private QuizEvaluationService quizEvaluationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testEvaluateSubmission_RemediationNeeded() {
        QuizSubmissionRequest request = new QuizSubmissionRequest();
        request.setUserId(1L);
        request.setPlanId(10L);
        request.setSelectedAnswers(Map.of("q1", 0, "q2", 0)); // wrong answers

        PerformanceSignal signal = PerformanceSignal.builder()
                .userId(1L)
                .planId(10L)
                .accuracyPercentage(33.3)
                .identifiedWeakness("State Management")
                .requiresPlanAdaptation(true)
                .build();

        QuizResult savedResult = QuizResult.builder()
                .id(5L)
                .userId(1L)
                .planId(10L)
                .score(1)
                .totalQuestions(3)
                .percentage(33.3)
                .performanceRating("NEEDS_REMEDIATION")
                .weakTopic("State Management")
                .build();

        when(performanceAnalysisService.analyzeQuizPerformance(any(), any(), any(), any())).thenReturn(signal);
        when(planMutationService.mutatePlanIfNecessary(signal)).thenReturn(true);
        when(quizResultRepository.save(any())).thenReturn(savedResult);

        QuizResultResponse response = quizEvaluationService.evaluateSubmission(request);

        assertNotNull(response);
        assertTrue(response.getPlanAdapted());
        assertEquals("NEEDS_REMEDIATION", response.getPerformanceRating());
    }
}
