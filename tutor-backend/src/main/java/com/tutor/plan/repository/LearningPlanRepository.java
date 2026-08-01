package com.tutor.plan.repository;

import com.tutor.plan.model.LearningPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearningPlanRepository extends JpaRepository<LearningPlan, Long> {
    List<LearningPlan> findByUserId(Long userId);
    Optional<LearningPlan> findTopByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<LearningPlan> findByGoalId(Long goalId);
}
