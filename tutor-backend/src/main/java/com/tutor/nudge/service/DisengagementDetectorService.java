package com.tutor.nudge.service;

import com.tutor.auth.model.User;
import com.tutor.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DisengagementDetectorService {

    private final UserRepository userRepository;

    public List<User> findDisengagedUsers(int thresholdDays) {
        LocalDateTime cutoff = LocalDateTime.now().minus(thresholdDays, ChronoUnit.DAYS);
        return userRepository.findAll().stream()
                .filter(u -> u.getLastActiveAt() == null || u.getLastActiveAt().isBefore(cutoff))
                .toList();
    }
}
