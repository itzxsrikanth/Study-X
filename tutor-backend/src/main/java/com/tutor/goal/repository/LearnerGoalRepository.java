package com.tutor.goal.repository;

import com.tutor.goal.model.LearnerGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearnerGoalRepository extends JpaRepository<LearnerGoal, Long> {
    List<LearnerGoal> findByUserId(Long userId);
    Optional<LearnerGoal> findTopByUserIdOrderByCreatedAtDesc(Long userId);
}
