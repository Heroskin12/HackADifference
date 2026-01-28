package com.englishsponge.backend.dto.response;

import lombok.Data;

@Data
public class DailyWatch {
    private String day;     // e.g., "Mon", "Tue"
    private long minutes;
}
