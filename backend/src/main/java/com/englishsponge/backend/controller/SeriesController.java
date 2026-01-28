package com.englishsponge.backend.controller;

import com.englishsponge.backend.service.SeriesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping("/api/series")
@RequiredArgsConstructor
public class SeriesController {

    private final SeriesService seriesService;

    @GetMapping("/list")
    public ResponseEntity<?> getAllSeries() {
        return ResponseEntity.ok(seriesService.getAllSeries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeriesById(@PathVariable Integer id) {
        return ResponseEntity.ok(seriesService.getSeriesById(id));
    }

}
