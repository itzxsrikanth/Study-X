package com.tutor.nudge.service;

import com.tutor.aigateway.service.PromptOrchestrationService;
import com.tutor.nudge.model.Nudge;
import com.tutor.nudge.repository.NudgeRepository;
import com.tutor.plan.model.LearningPlan;
import com.tutor.plan.repository.LearningPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NudgeGeneratorService {

    private final PromptOrchestrationService promptOrchestrationService;
    private final NudgeRepository nudgeRepository;
    private final LearningPlanRepository planRepository;

    public Nudge createNudgeForUser(Long userId, String reason, int daysInactive) {
        Optional<LearningPlan> planOpt = planRepository.findTopByUserIdOrderByCreatedAtDesc(userId);
        String subject = planOpt.map(LearningPlan::getTitle).orElse("your learning plan");

        String msg = promptOrchestrationService.generateNudgeMessage(subject, daysInactive);

        Nudge nudge = Nudge.builder()
                .userId(userId)
                .triggerReason(reason)
                .message(msg)
                .isRead(false)
                .isDismissed(false)
                .build();

        return nudgeRepository.save(nudge);
    }
}
