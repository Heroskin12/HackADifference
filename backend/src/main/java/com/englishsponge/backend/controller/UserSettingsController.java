package com.englishsponge.backend.controller;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.dto.request.ManualActivityRequest;
import com.englishsponge.backend.dto.request.OtpRequest;
import com.englishsponge.backend.dto.request.PasswordChangeRequest;
import com.englishsponge.backend.service.AuthService;
import com.englishsponge.backend.service.UserSettingsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api/user/settings")
@RequiredArgsConstructor
public class UserSettingsController {

    @Value("${cookie.name}")
    private String cookieName;

    private final AuthService authService;
    private final UserSettingsService userSettingsService;

    @PatchMapping("/name")
    public ResponseEntity<?> changeName(HttpServletRequest request, @RequestBody String name) {
        UserDto user = authService.verify(request);
        userSettingsService.changeName(user, name);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/password")
    public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestBody PasswordChangeRequest passwordChangeRequest) {
        UserDto user = authService.verify(request);
        userSettingsService.changePassword(user, passwordChangeRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(HttpServletRequest request) {
        UserDto user = authService.verify(request);
        userSettingsService.deleteAccount(user);
        ResponseCookie cookie = ResponseCookie.from(cookieName, "").maxAge(0).httpOnly(true).path("/").build();
        return ResponseEntity.ok()
                             .header(HttpHeaders.SET_COOKIE, cookie.toString())
                             .body(Map.of("message", "Account deleted"));
    }

    @PostMapping("/email")
    public ResponseEntity<?> changeEmail(HttpServletRequest request, @RequestBody String email) {
        UserDto user = authService.verify(request);
        userSettingsService.sendNewOtpMail(user, email);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/email")
    public ResponseEntity<?> changeEmail(HttpServletRequest request, @RequestBody OtpRequest otpRequest) {
        UserDto user = authService.verify(request);
        if (user.getOtp() != null && Objects.equals(user.getOtp(), otpRequest.getOtp())) {
            userSettingsService.changeEmail(user, otpRequest);
            return ResponseEntity.ok().build();
        } else return ResponseEntity.badRequest().build();
    }

    @PatchMapping("/dailygoal")
    public ResponseEntity<?> changeDailyGoal(HttpServletRequest request, @RequestBody String dailyGoal) {
        UserDto user = authService.verify(request);
        userSettingsService.changeDailyGoal(user, dailyGoal);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/manual")
    public ResponseEntity<?> viewManualActivity(HttpServletRequest request) {
        UserDto user = authService.verify(request);
        return ResponseEntity.ok(userSettingsService.viewManualActivity(user));
    }

    @PostMapping("/manual")
    public ResponseEntity<?> addManualActivity(HttpServletRequest request, @RequestBody ManualActivityRequest manualActivityRequest) {
        UserDto user = authService.verify(request);
        userSettingsService.addManualActivity(user, manualActivityRequest);
        return ResponseEntity.ok().build();
    }

}
