package com.englishsponge.backend.controller;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.service.AuthService;
import com.englishsponge.backend.service.GeneralService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GeneralController {

    private final AuthService authService;
    private final GeneralService generalService;

    @GetMapping("/user")
    public ResponseEntity<?> userDetails(HttpServletRequest request) {
        UserDto user = authService.verify(request);
        return ResponseEntity.ok(generalService.getUser(user));
    }

    @GetMapping("/levels")
    public ResponseEntity<?> levels(HttpServletRequest request) {
        authService.verify(request);
        return ResponseEntity.ok(generalService.getLevels());
    }

}
