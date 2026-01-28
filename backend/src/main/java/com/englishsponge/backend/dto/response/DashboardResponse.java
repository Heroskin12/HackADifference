package com.englishsponge.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private CurrentLevel currentLevel;
    private TotalTimeVideo totalTimeVideo;
    private List<CategoryWatchTime> watchTimeByCategory;
    private List<DailyWatch> dailyWatchTime;
    private List<RecentActivity> recentActivity;
}
