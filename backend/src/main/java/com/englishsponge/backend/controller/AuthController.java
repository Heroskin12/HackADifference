package com.englishsponge.backend.controller;

import com.englishsponge.backend.dto.request.ForgotPasswordRequest;
import com.englishsponge.backend.dto.request.LoginRequest;
import com.englishsponge.backend.dto.request.OtpRequest;
import com.englishsponge.backend.dto.request.SignupRequest;
import com.englishsponge.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Value("${cookie.name}")
    private String cookieName;

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
        ResponseCookie cookie = ResponseCookie.from(cookieName, token)
                                              .httpOnly(true)
                                              .secure(true)
                                              .sameSite("None")
                                              .path("/")
                                              .build();
        return ResponseEntity.ok()
                             .header(HttpHeaders.SET_COOKIE, cookie.toString())
                             .body(Map.of("message", "login successful"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from(cookieName, "")
                                              .maxAge(0)
                                              .httpOnly(true)
                                              .secure(true)
                                              .sameSite("None")
                                              .path("/")
                                              .build();
        return ResponseEntity.ok()
                             .header(HttpHeaders.SET_COOKIE, cookie.toString())
                             .body(Map.of("message", "logged out"));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody String email) {
        if (authService.verifyEmail(email)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/otp")
    public ResponseEntity<?> otp(@RequestBody OtpRequest otp) {
        if (authService.verifyOtp(otp)) {
            authService.userVerified(otp.getEmail());
            return ResponseEntity.ok().build();
        } else return ResponseEntity.badRequest().build();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupUser) {
        if (authService.signup(signupUser)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> signup(@RequestBody String email) {
        if (authService.forgot(email)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/forgot/password")
    public ResponseEntity<?> forgotOtp(@RequestBody ForgotPasswordRequest request) {
        OtpRequest otpRequest = new OtpRequest();
        otpRequest.setEmail(request.getEmail());
        otpRequest.setOtp(request.getOtp());
        if (authService.verifyOtp(otpRequest)) {
            authService.forgotPassword(request);
            return ResponseEntity.ok().build();
        } else return ResponseEntity.badRequest().build();
    }

}
