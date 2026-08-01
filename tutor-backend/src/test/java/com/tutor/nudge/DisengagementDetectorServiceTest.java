package com.tutor.nudge;

import com.tutor.auth.model.User;
import com.tutor.auth.repository.UserRepository;
import com.tutor.nudge.service.DisengagementDetectorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class DisengagementDetectorServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private DisengagementDetectorService detectorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindDisengagedUsers() {
        User activeUser = User.builder().id(1L).email("active@tutor.com").lastActiveAt(LocalDateTime.now()).build();
        User disengagedUser = User.builder().id(2L).email("inactive@tutor.com").lastActiveAt(LocalDateTime.now().minusDays(5)).build();

        when(userRepository.findAll()).thenReturn(List.of(activeUser, disengagedUser));

        List<User> result = detectorService.findDisengagedUsers(2);

        assertEquals(1, result.size());
        assertEquals(2L, result.get(0).getId());
    }
}
