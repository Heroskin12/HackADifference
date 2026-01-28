package com.englishsponge.backend.controller;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.exception.InvalidCredentialsException;
import com.englishsponge.backend.exception.InvalidRequestException;
import com.englishsponge.backend.service.AuthService;
import com.englishsponge.backend.service.VideoPageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/video")
@RequiredArgsConstructor
public class VideoPageController {

    private final AuthService authService;
    private final VideoPageService videoPageService;

    @GetMapping("/watch")
    public ResponseEntity<?> watch(@RequestParam int v, HttpServletRequest request) {
        try {
            UserDto user = authService.verify(request);
            return ResponseEntity.ok(videoPageService.watch(user, v));
        }
        catch (InvalidCredentialsException e) {
            return ResponseEntity.ok(videoPageService.watch(null, v));
        }
    }

    @GetMapping("/time")
    public ResponseEntity<?> time(@RequestParam int v, @RequestParam String tabId, HttpServletRequest request) {
        UserDto user = authService.verify(request);
        videoPageService.time(user, v, tabId);
        return ResponseEntity.ok().build();
    }

}
