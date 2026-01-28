package com.englishsponge.backend.dto.model;

import lombok.Data;

import java.time.Instant;
import java.time.OffsetDateTime;

@Data
public class GuideDto {
    private Integer id;
    private String name;
    private String picture;
    private String description;
    private Instant createdOn;
}
