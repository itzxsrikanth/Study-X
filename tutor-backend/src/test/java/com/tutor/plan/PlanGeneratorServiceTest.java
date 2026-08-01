package com.tutor.plan;

import com.tutor.goal.model.LearnerGoal;
import com.tutor.goal.repository.LearnerGoalRepository;
import com.tutor.plan.model.LearningPlan;
import com.tutor.plan.repository.LearningPlanRepository;
import com.tutor.plan.service.PlanGeneratorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class PlanGeneratorServiceTest {

    @Mock
    private LearnerGoalRepository goalRepository;

    @Mock
    private LearningPlanRepository planRepository;

    @InjectMocks
    private PlanGeneratorService planGeneratorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGeneratePlanForGoal_Success() {
        LearnerGoal goal = LearnerGoal.builder()
                .id(1L)
                .userId(1L)
                .primarySubject("Java Microservices")
                .targetSkillLevel("INTERMEDIATE")
                .build();

        when(goalRepository.findById(1L)).thenReturn(Optional.of(goal));
        when(planRepository.save(any(LearningPlan.class))).thenAnswer(invocation -> invocation.getArgument(0));

        LearningPlan plan = planGeneratorService.generatePlanForGoal(1L);

        assertNotNull(plan);
        assertEquals(3, plan.getTotalMilestones());
        assertEquals("ACTIVE", plan.getStatus());
        assertTrue(plan.getTitle().contains("Java Microservices"));
    }
}
