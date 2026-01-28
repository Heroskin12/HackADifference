package com.englishsponge.backend.dto.model;

import lombok.Data;

import java.time.Instant;
import java.time.OffsetDateTime;

@Data
public class AccentDto {
    private Integer id;
    private String name;
    private String country;
    private Instant createdOn;
}
