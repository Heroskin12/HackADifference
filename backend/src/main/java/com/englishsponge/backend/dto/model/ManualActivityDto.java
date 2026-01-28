package com.englishsponge.backend.dto.model;

import lombok.Data;

import java.time.Instant;

@Data
public class ManualActivityDto {
    private Integer id;
    private Integer userId;
    private Integer minutes;
    private String description;
    private Instant createdAt;
}
