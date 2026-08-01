package com.tutor.progress.service;

import com.tutor.auth.model.User;
import com.tutor.auth.repository.UserRepository;
import com.tutor.progress.model.StudySession;
import com.tutor.progress.repository.StudySessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StreakCalculatorService {

    private final StudySessionRepository studySessionRepository;
    private final UserRepository userRepository;

    public int calculateAndSyncStreak(Long userId) {
        List<StudySession> sessions = studySessionRepository.findByUserId(userId);
        Set<LocalDate> studyDates = sessions.stream()
                .map(StudySession::getSessionDate)
                .collect(Collectors.toSet());

        int currentStreak = 0;
        LocalDate today = LocalDate.now();
        LocalDate checkDate = today;

        if (!studyDates.contains(today)) {
            checkDate = today.minusDays(1);
        }

        while (studyDates.contains(checkDate)) {
            currentStreak++;
            checkDate = checkDate.minusDays(1);
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setStreakCount(currentStreak);
            userRepository.save(user);
        }

        return currentStreak;
    }
}
