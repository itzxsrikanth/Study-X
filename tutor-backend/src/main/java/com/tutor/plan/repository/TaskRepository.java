package com.tutor.plan.repository;

import com.tutor.plan.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByMilestoneIdOrderBySequenceOrderAsc(Long milestoneId);
}
