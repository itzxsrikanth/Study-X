package com.tutor.auth.controller;

import com.tutor.auth.dto.LoginRequest;
import com.tutor.auth.dto.LoginResponse;
import com.tutor.auth.service.AuthService;
import com.tutor.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.authenticateOrRegister(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Authentication successful"));
    }
}
