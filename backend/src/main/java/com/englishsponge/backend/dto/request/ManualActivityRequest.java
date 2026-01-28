package com.englishsponge.backend.dto.request;

import lombok.Data;

@Data
public class ManualActivityRequest {
    private Integer minutes;
    private String description;
}
