package com.tutor.progress.service;

import com.tutor.progress.model.StudySession;
import com.tutor.progress.repository.StudySessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeTrackingService {

    private final StudySessionRepository studySessionRepository;

    public StudySession recordSession(Long userId, Long planId, Long taskId, Integer minutes) {
        StudySession session = StudySession.builder()
                .userId(userId)
                .planId(planId)
                .taskId(taskId)
                .durationMinutes(minutes)
                .sessionDate(LocalDate.now())
                .build();
        return studySessionRepository.save(session);
    }

    public List<StudySession> getSessionsForPastDays(Long userId, int days) {
        LocalDate startDate = LocalDate.now().minusDays(days);
        return studySessionRepository.findByUserIdAndSessionDateAfter(userId, startDate);
    }
}
