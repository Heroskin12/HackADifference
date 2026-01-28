package com.englishsponge.backend.controller;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.exception.InvalidCredentialsException;
import com.englishsponge.backend.service.AuthService;
import com.englishsponge.backend.service.HomePageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomePageController {

    private final AuthService authService;
    private final HomePageService homePageService;

    @GetMapping("/videos")
    public ResponseEntity<?> getLatestVideos(HttpServletRequest request, @RequestParam HashMap<String, String> filters) {
        try {
            UserDto user = authService.verify(request);
            return ResponseEntity.ok(homePageService.getLatestVideos(user, filters));
        }
        catch (InvalidCredentialsException e) {
            return ResponseEntity.ok(homePageService.getLatestVideos(null, filters));
        }
    }

    @GetMapping("/filters")
    public ResponseEntity<?> getAvailableFilters() {
        // authService.verify(request);
        return ResponseEntity.ok(homePageService.getAvailableFilters());
    }

}
