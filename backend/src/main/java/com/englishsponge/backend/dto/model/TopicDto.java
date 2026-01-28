package com.englishsponge.backend.dto.model;

import lombok.Data;

import java.time.Instant;
import java.time.OffsetDateTime;

@Data
public class TopicDto {
    private Integer id;
    private String name;
    private Instant createdOn;
}
