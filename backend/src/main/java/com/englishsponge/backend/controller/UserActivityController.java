package com.englishsponge.backend.controller;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.dto.request.ManualActivityRequest;
import com.englishsponge.backend.service.AuthService;
import com.englishsponge.backend.service.UserActivityService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/tracker")
@RequiredArgsConstructor
public class UserActivityController {

    private final AuthService authService;
    private final UserActivityService userActivityService;

    @GetMapping("/main")
    public ResponseEntity<?> tracker(HttpServletRequest request) {
        UserDto user = authService.verify(request);
        return ResponseEntity.ok(userActivityService.getTracking(user));
    }
}
