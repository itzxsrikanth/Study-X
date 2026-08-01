package com.tutor.plan.service;

import com.tutor.common.exception.ResourceNotFoundException;
import com.tutor.goal.model.LearnerGoal;
import com.tutor.goal.repository.LearnerGoalRepository;
import com.tutor.plan.model.LearningPlan;
import com.tutor.plan.model.Milestone;
import com.tutor.plan.model.Task;
import com.tutor.plan.repository.LearningPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanGeneratorService {

    private final LearnerGoalRepository goalRepository;
    private final LearningPlanRepository planRepository;

    public LearningPlan generatePlanForGoal(Long goalId) {
        LearnerGoal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found with id " + goalId));

        LearningPlan plan = LearningPlan.builder()
                .goalId(goal.getId())
                .userId(goal.getUserId())
                .title("Mastery Roadmap: " + goal.getPrimarySubject())
                .description("Personalized step-by-step learning plan for " + goal.getTargetSkillLevel() + " level.")
                .status("ACTIVE")
                .createdAt(LocalDateTime.now())
                .build();

        // Milestone 1: Core Fundamentals
        Milestone m1 = Milestone.builder()
                .sequenceOrder(1)
                .title("Foundations & Key Concepts of " + goal.getPrimarySubject())
                .description("Build strong mental models and understand foundational mechanics.")
                .estimatedHours(4)
                .isCompleted(false)
                .build();

        m1.addTask(Task.builder()
                .sequenceOrder(1)
                .title("Core Terminology & Theoretical Architecture")
                .resourceUrl("https://developer.mozilla.org/")
                .durationMinutes(45)
                .status("PENDING")
                .build());

        m1.addTask(Task.builder()
                .sequenceOrder(2)
                .title("Interactive Guided Walkthrough & Setup")
                .resourceUrl("https://github.com/")
                .durationMinutes(60)
                .status("PENDING")
                .build());

        // Milestone 2: Intermediate Application
        Milestone m2 = Milestone.builder()
                .sequenceOrder(2)
                .title("Hands-On Implementation & Patterns")
                .description("Apply concepts to real-world projects and problem solving.")
                .estimatedHours(6)
                .isCompleted(false)
                .build();

        m2.addTask(Task.builder()
                .sequenceOrder(1)
                .title("Build Miniature Prototype Project")
                .resourceUrl("https://codepen.io/")
                .durationMinutes(90)
                .status("PENDING")
                .build());

        m2.addTask(Task.builder()
                .sequenceOrder(2)
                .title("Code Refactoring & Best Practices Audit")
                .resourceUrl("https://refactoring.guru/")
                .durationMinutes(60)
                .status("PENDING")
                .build());

        // Milestone 3: Advanced Mastery & Assessment
        Milestone m3 = Milestone.builder()
                .sequenceOrder(3)
                .title("Advanced Synthesis & Final Evaluation")
                .description("Consolidate learning through adaptive quizzes and practical evaluation.")
                .estimatedHours(5)
                .isCompleted(false)
                .build();

        m3.addTask(Task.builder()
                .sequenceOrder(1)
                .title("System Design & Edge Case Strategy")
                .resourceUrl("https://microservices.io/")
                .durationMinutes(75)
                .status("PENDING")
                .build());

        m3.addTask(Task.builder()
                .sequenceOrder(2)
                .title("Phase 5 Knowledge Evaluation Quiz")
                .resourceUrl("/quiz")
                .durationMinutes(30)
                .status("PENDING")
                .build());

        plan.addMilestone(m1);
        plan.addMilestone(m2);
        plan.addMilestone(m3);
        plan.setTotalMilestones(3);

        return planRepository.save(plan);
    }
}
