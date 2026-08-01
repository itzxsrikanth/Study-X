package com.tutor.nudge.repository;

import com.tutor.nudge.model.Nudge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NudgeRepository extends JpaRepository<Nudge, Long> {
    List<Nudge> findByUserIdAndIsDismissedFalseOrderByCreatedAtDesc(Long userId);
    List<Nudge> findByUserId(Long userId);
}
