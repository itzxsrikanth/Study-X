package com.tutor.progress;

import com.tutor.auth.model.User;
import com.tutor.auth.repository.UserRepository;
import com.tutor.progress.model.StudySession;
import com.tutor.progress.repository.StudySessionRepository;
import com.tutor.progress.service.StreakCalculatorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class StreakCalculatorServiceTest {

    @Mock
    private StudySessionRepository studySessionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private StreakCalculatorService streakCalculatorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCalculateAndSyncStreak_ThreeConsecutiveDays() {
        LocalDate today = LocalDate.now();
        List<StudySession> sessions = List.of(
                StudySession.builder().userId(1L).sessionDate(today).durationMinutes(30).build(),
                StudySession.builder().userId(1L).sessionDate(today.minusDays(1)).durationMinutes(45).build(),
                StudySession.builder().userId(1L).sessionDate(today.minusDays(2)).durationMinutes(20).build()
        );

        when(studySessionRepository.findByUserId(1L)).thenReturn(sessions);
        when(userRepository.findById(1L)).thenReturn(Optional.of(User.builder().id(1L).streakCount(0).build()));

        int streak = streakCalculatorService.calculateAndSyncStreak(1L);

        assertEquals(3, streak);
    }
}
