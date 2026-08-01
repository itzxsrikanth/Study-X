package com.tutor.auth.service;

import com.tutor.auth.dto.LoginRequest;
import com.tutor.auth.dto.LoginResponse;
import com.tutor.auth.model.User;
import com.tutor.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse authenticateOrRegister(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    String name = request.getFullName() != null && !request.getFullName().isBlank()
                            ? request.getFullName()
                            : request.getEmail().split("@")[0];
                    User newUser = User.builder()
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .fullName(name)
                            .streakCount(1)
                            .lastActiveAt(LocalDateTime.now())
                            .build();
                    return userRepository.save(newUser);
                });

        user.setLastActiveAt(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), user.getId());

        return LoginResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .streakCount(user.getStreakCount())
                .build();
    }
}
