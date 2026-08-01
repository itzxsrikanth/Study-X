package com.tutor.nudge.service;

import com.tutor.auth.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NudgeSchedulerService {

    private final DisengagementDetectorService detectorService;
    private final NudgeGeneratorService generatorService;

    // Run every day at 9 AM (or every hour in dev)
    @Scheduled(cron = "0 0 9 * * ?")
    public void checkForInactiveLearners() {
        log.info("Running disengagement detection job...");
        List<User> inactiveUsers = detectorService.findDisengagedUsers(2);
        for (User user : inactiveUsers) {
            generatorService.createNudgeForUser(user.getId(), "DISENGAGED_2_DAYS", 2);
            log.info("Created nudge for disengaged user: {}", user.getEmail());
        }
    }
}
