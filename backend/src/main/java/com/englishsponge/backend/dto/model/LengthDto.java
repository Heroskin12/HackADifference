package com.englishsponge.backend.dto.model;

import lombok.Data;

@Data
public class LengthDto {
    private Integer id;
    private String name;
    private Integer minDuration;
    private Integer maxDuration;
}
