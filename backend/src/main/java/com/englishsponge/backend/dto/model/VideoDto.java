package com.englishsponge.backend.dto.model;

import lombok.Data;

import java.time.Instant;

@Data
public class VideoDto {
    private Integer id;
    private String title;
    private String description;
    private Integer length;
    private Integer guide;
    private Integer accent;
    private Integer level;
    private String link;
    private Instant addedOn;
    private Integer series;
    private Integer subscriptionTier;
}
