package com.englishsponge.backend.dto.model;

import lombok.Data;

import java.time.Instant;
import java.time.OffsetDateTime;

@Data
public class LevelDto {
    private Integer id;
    private String name;
    private String description;
    private String shortDescription;
    private Integer minsNeeded;
    private String icon;
    private Instant createdOn;
}
