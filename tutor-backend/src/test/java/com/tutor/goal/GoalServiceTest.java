package com.tutor.goal;

import com.tutor.goal.dto.GoalIntakeRequest;
import com.tutor.goal.dto.GoalResponse;
import com.tutor.goal.model.LearnerGoal;
import com.tutor.goal.repository.LearnerGoalRepository;
import com.tutor.goal.service.GoalService;
import com.tutor.goal.service.IntentParsingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class GoalServiceTest {

    @Mock
    private LearnerGoalRepository goalRepository;

    @Mock
    private IntentParsingService intentParsingService;

    @InjectMocks
    private GoalService goalService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testProcessGoalIntake_Success() {
        GoalIntakeRequest request = new GoalIntakeRequest();
        request.setUserId(1L);
        request.setRawGoalPrompt("Master React and Spring Boot fullstack development");

        LearnerGoal parsedGoal = LearnerGoal.builder()
                .id(10L)
                .userId(1L)
                .rawGoalPrompt(request.getRawGoalPrompt())
                .primarySubject("Fullstack Development")
                .targetSkillLevel("INTERMEDIATE")
                .weeklyHoursCommitment(5)
                .estimatedDurationWeeks(4)
                .status("PARSED")
                .build();

        when(intentParsingService.parseAndBuildGoal(any(GoalIntakeRequest.class))).thenReturn(parsedGoal);
        when(goalRepository.save(any(LearnerGoal.class))).thenReturn(parsedGoal);

        GoalResponse response = goalService.processGoalIntake(request);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("Fullstack Development", response.getPrimarySubject());
        assertEquals("PARSED", response.getStatus());
    }
}
