package com.medical.analyzer.controller;

import com.medical.analyzer.dto.AuthResponse;
import com.medical.analyzer.dto.LoginRequest;
import com.medical.analyzer.dto.SignupRequest;
import com.medical.analyzer.model.User;
import com.medical.analyzer.repository.UserRepository;
import com.medical.analyzer.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    /** POST /api/auth/signup — register a new user */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(
                    AuthResponse.builder()
                            .message("Email is already registered")
                            .build()
            );
        }

        // Create and save user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        // Generate token
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return new ResponseEntity<>(
                AuthResponse.builder()
                        .token(token)
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .message("User registered successfully")
                        .build(),
                HttpStatus.CREATED
        );
    }

    /** POST /api/auth/login — authenticate and get token */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    AuthResponse.builder()
                            .message("Invalid email or password")
                            .build()
            );
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        return ResponseEntity.ok(
                AuthResponse.builder()
                        .token(token)
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .message("Login successful")
                        .build()
        );
    }
}
