package com.englishsponge.backend.dto.response;

import lombok.Data;

@Data
public class TotalTimeVideo {
    private double totalWatchTime;
    private double watchTimeThisWeek;
    private long totalVideosWatched;
    private long videosWatchedThisWeek;
    private long manualTimeThisWeek;
}
