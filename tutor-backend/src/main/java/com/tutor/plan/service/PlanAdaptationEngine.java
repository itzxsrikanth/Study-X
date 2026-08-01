package com.tutor.plan.service;

import com.tutor.plan.model.LearningPlan;
import com.tutor.plan.model.Milestone;
import com.tutor.plan.model.Task;
import com.tutor.plan.repository.LearningPlanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlanAdaptationEngine {

    private final LearningPlanRepository planRepository;

    public LearningPlan adaptPlanForRemediation(LearningPlan plan, String weakTopic) {
        log.info("Adapting plan #{} due to remediation need in: {}", plan.getId(), weakTopic);

        Milestone remediationMilestone = Milestone.builder()
                .sequenceOrder(plan.getMilestones().size() + 1)
                .title("Remediation Boost: " + weakTopic)
                .description("Targeted reinforcement exercises added by AI Tutor based on your quiz evaluation.")
                .estimatedHours(2)
                .isCompleted(false)
                .build();

        remediationMilestone.addTask(Task.builder()
                .sequenceOrder(1)
                .title("Deep Dive Review: " + weakTopic)
                .resourceUrl("https://khanacademy.org/")
                .durationMinutes(45)
                .status("PENDING")
                .build());

        remediationMilestone.addTask(Task.builder()
                .sequenceOrder(2)
                .title("Targeted Practice Problem Set")
                .resourceUrl("https://leetcode.com/")
                .durationMinutes(45)
                .status("PENDING")
                .build());

        plan.addMilestone(remediationMilestone);
        plan.setTotalMilestones(plan.getMilestones().size());
        plan.setStatus("ADAPTED");
        plan.setUpdatedAt(LocalDateTime.now());

        return planRepository.save(plan);
    }
}
