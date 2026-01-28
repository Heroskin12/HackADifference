package com.englishsponge.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.Instant;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RecentActivity {
    private String eventType;           // "video_watched" or "level_up"
    private String videoTitle;          // optional
    private String manualDescription;   // optional
    private Integer minutes;            // optional
    private String levelName;           // optional
    private Instant createdAt;          // ISO date or formatted date string
}
