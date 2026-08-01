package com.tutor.plan.repository;

import com.tutor.plan.model.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    List<Milestone> findByLearningPlanIdOrderBySequenceOrderAsc(Long planId);
}
