package com.tutor.progress.repository;

import com.tutor.progress.model.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {
    List<StudySession> findByUserId(Long userId);
    List<StudySession> findByUserIdAndSessionDateAfter(Long userId, LocalDate date);

    @Query("SELECT s.sessionDate, SUM(s.durationMinutes) FROM StudySession s WHERE s.userId = :userId AND s.sessionDate >= :startDate GROUP BY s.sessionDate ORDER BY s.sessionDate ASC")
    List<Object[]> getDailyStudyTimeForUser(Long userId, LocalDate startDate);
}
