package com.englishsponge.backend.dto.model;

import lombok.Data;

import java.time.Instant;

@Data
public class GrammarAreaDto {
    private Integer id;
    private String name;
    private Instant createdOn;
}
