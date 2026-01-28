package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.ManualActivityDto;
import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.dto.request.ManualActivityRequest;
import com.englishsponge.backend.dto.response.*;
import com.englishsponge.backend.remote.DbExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserActivityService {

    private final DbExecutor dbExecutor;

    public DashboardResponse getTracking(UserDto user) {
        Map<String, Object> data = new HashMap<>();
        data.put("user", user.getId());
        String levelSql = """
                WITH total_watch AS (
                    SELECT SUM(minutes) AS total_minutes
                    FROM (
                             SELECT COALESCE(time_spent, 0) AS minutes
                             FROM user_activity
                             WHERE user_id = :user
                
                             UNION ALL
                
                             SELECT COALESCE(ma.minutes, 0)
                             FROM manual_activity ma
                             WHERE ma.user_id = :user
                         ) combined
                ),
                     current_level AS (
                         SELECT id, name, short_description, mins_needed
                         FROM level
                         WHERE mins_needed <= (SELECT total_minutes FROM total_watch)
                         ORDER BY mins_needed DESC
                         LIMIT 1
                     ),
                     next_level AS (
                         SELECT id, name, mins_needed - (SELECT total_minutes FROM total_watch) AS minutes_remaining
                         FROM level
                         WHERE mins_needed > (SELECT total_minutes FROM total_watch)
                         ORDER BY mins_needed
                         LIMIT 1
                     )
                SELECT
                    c.id AS level_id,
                    c.name,
                    c.short_description,
                    COALESCE(n.minutes_remaining, 0) AS minutes_to_next_level
                FROM current_level c
                         LEFT JOIN next_level n ON TRUE;
                """;
        String totalTimeTotalVideoSql = """
                WITH combined AS (
                    SELECT
                        ua.user_id,
                        ua.video_id,
                        ua.time_spent AS minutes,
                        NULL AS manual_id,
                        ua.created_at,
                        'video' AS source
                    FROM user_activity ua
                    WHERE ua.user_id = :user
                
                    UNION ALL
                
                    SELECT
                        ma.user_id,
                        NULL AS video_id,
                        ma.minutes,
                        ma.id AS manual_id,
                        ma.created_at,
                        'manual' AS source
                    FROM manual_activity ma
                    WHERE ma.user_id = :user
                )
                SELECT
                    -- total watch time (videos only)
                    COALESCE(SUM(CASE WHEN source = 'video' THEN minutes ELSE 0 END), 0) AS total_watch_time,
                
                    -- watch time this week (videos only)
                    COALESCE(SUM(CASE WHEN source = 'video' AND created_at >= date_trunc('week', CURRENT_DATE) THEN minutes ELSE 0 END), 0) AS watch_time_this_week,
                
                    -- total videos watched
                    COUNT(DISTINCT CASE WHEN source = 'video' THEN video_id END) AS total_videos_watched,
                
                    -- videos watched this week
                    COUNT(DISTINCT CASE WHEN source = 'video' AND created_at >= date_trunc('week', CURRENT_DATE) THEN video_id END) AS videos_watched_this_week,
                
                    -- manual time this week
                    COALESCE(SUM(CASE WHEN source = 'manual' AND created_at >= date_trunc('week', CURRENT_DATE) THEN minutes ELSE 0 END), 0) AS manual_time_this_week
                FROM combined;
                """;
        String categoryWatchedSql = """
                SELECT t.name as topic, SUM(ua.time_spent) AS minutes
                FROM user_activity ua
                    JOIN videos v ON v.id = ua.video_id
                    JOIN video_topic vt ON vt.video_id = v.id
                    JOIN topic t ON t.id = vt.topic_id
                WHERE ua.user_id = :user
                GROUP BY t.name;
                """;
        String dailyWatchedSql = """
                SELECT
                    TO_CHAR(created_at::date, 'Dy') AS day,
                    SUM(time_spent) AS minutes
                FROM user_activity
                WHERE user_id = :user AND created_at >= NOW() - INTERVAL '6 days'
                GROUP BY day, created_at::date
                ORDER BY created_at::date;
                """;
        String recentActivitySql = """
                WITH all_activities AS (
                    SELECT
                        ua.user_id,
                        ua.video_id,
                        v.title AS video_title,
                        ua.time_spent AS minutes,
                        NULL AS manual_description,
                        ua.created_at,
                        'video_watched' AS raw_type
                    FROM user_activity ua
                             LEFT JOIN videos v ON ua.video_id = v.id
                    WHERE ua.user_id = :user
                
                    UNION ALL
                
                    SELECT
                        ma.user_id,
                        NULL AS video_id,
                        NULL AS video_title,
                        ma.minutes,
                        ma.description AS manual_description,
                        ma.created_at,
                        'manual_activity' AS raw_type
                    FROM manual_activity ma
                    WHERE ma.user_id = :user
                ),
                     user_progress AS (
                         SELECT
                             a.*,
                             SUM(a.minutes) OVER (PARTITION BY a.user_id ORDER BY a.created_at) AS total_minutes
                         FROM all_activities a
                     ),
                     with_levels AS (
                         SELECT
                             up.*,
                             l.id AS current_level_id,
                             l.name AS current_level_name,
                             l.mins_needed
                         FROM user_progress up
                                  LEFT JOIN LATERAL (
                             SELECT id, name, mins_needed
                             FROM level
                             WHERE mins_needed <= up.total_minutes
                             ORDER BY mins_needed DESC
                             LIMIT 1
                             ) l ON true
                     ),
                     level_transitions AS (
                         SELECT
                             wl.*,
                             LAG(current_level_id, 1) OVER (PARTITION BY user_id ORDER BY created_at) AS prev_level_id
                         FROM with_levels wl
                     ),
                     combined AS (
                         -- Level-ups before the triggering activity
                         SELECT
                             created_at - INTERVAL '1 microsecond' AS created_at,
                             'level_up' AS event_type,
                             NULL AS video_title,
                             NULL AS manual_description,
                             NULL AS minutes,
                             current_level_name AS level_name
                         FROM level_transitions
                         WHERE current_level_id IS DISTINCT FROM prev_level_id
                           AND current_level_id IS NOT NULL
                
                         UNION ALL
                
                         -- Normal activities (video or manual)
                         SELECT
                             created_at,
                             raw_type AS event_type,
                             video_title,
                             manual_description,
                             minutes,
                             current_level_name AS level_name
                         FROM level_transitions
                
                         UNION ALL
                
                         -- Base level (mins_needed = 0), only if it never appears already
                         SELECT
                             (SELECT MIN(created_at) FROM all_activities WHERE user_id = :user) - INTERVAL '1 second' AS created_at,
                             'level_up' AS event_type,
                             NULL AS video_title,
                             NULL AS manual_description,
                             NULL AS minutes,
                             (SELECT name FROM level WHERE mins_needed = 0 LIMIT 1) AS level_name
                         WHERE NOT EXISTS (
                             SELECT 1
                             FROM level_transitions lt
                             WHERE lt.current_level_id = (SELECT id FROM level WHERE mins_needed = 0 LIMIT 1)
                                OR lt.prev_level_id = (SELECT id FROM level WHERE mins_needed = 0 LIMIT 1)
                         )
                     )
                SELECT *
                FROM combined
                ORDER BY created_at DESC
                LIMIT 20;
                """;
        CurrentLevel currentLevel = dbExecutor.runSingle(levelSql, CurrentLevel.class, data);
        TotalTimeVideo totalTimeVideo = dbExecutor.runSingle(totalTimeTotalVideoSql, TotalTimeVideo.class, data);
        List<CategoryWatchTime> categoryWatchTime = dbExecutor.run(categoryWatchedSql, CategoryWatchTime.class, data);
        List<DailyWatch> dailyWatches = dbExecutor.run(dailyWatchedSql, DailyWatch.class, data);
        List<RecentActivity> recentActivity = dbExecutor.run(recentActivitySql, RecentActivity.class, data);
        return new DashboardResponse(currentLevel, totalTimeVideo, categoryWatchTime, dailyWatches, recentActivity);
    }
}
