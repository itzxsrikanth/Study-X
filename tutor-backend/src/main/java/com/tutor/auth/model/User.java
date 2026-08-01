package com.tutor.auth.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    @Builder.Default
    private String role = "ROLE_LEARNER";

    @Builder.Default
    private Integer streakCount = 0;

    private LocalDateTime lastActiveAt;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
