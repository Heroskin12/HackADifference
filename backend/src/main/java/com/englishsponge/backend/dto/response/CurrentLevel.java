package com.englishsponge.backend.dto.response;

import lombok.Data;

@Data
public class CurrentLevel {
    private int levelId;
    private String name;
    private String shortDescription;
    private long minutesToNextLevel;
}
