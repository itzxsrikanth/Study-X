package com.tutor.feedback.service;

import com.tutor.feedback.model.PerformanceSignal;
import com.tutor.plan.model.LearningPlan;
import com.tutor.plan.repository.LearningPlanRepository;
import com.tutor.plan.service.PlanAdaptationEngine;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlanMutationService {

    private final LearningPlanRepository planRepository;
    private final PlanAdaptationEngine adaptationEngine;

    public boolean mutatePlanIfNecessary(PerformanceSignal signal) {
        if (!Boolean.TRUE.equals(signal.getRequiresPlanAdaptation())) {
            return false;
        }

        Optional<LearningPlan> planOpt = signal.getPlanId() != null
                ? planRepository.findById(signal.getPlanId())
                : planRepository.findTopByUserIdOrderByCreatedAtDesc(signal.getUserId());

        if (planOpt.isPresent()) {
            adaptationEngine.adaptPlanForRemediation(planOpt.get(), signal.getIdentifiedWeakness());
            return true;
        }

        return false;
    }
}
