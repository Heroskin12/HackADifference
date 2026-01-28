package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.dto.response.VideoTopic;
import com.englishsponge.backend.dto.response.VideosResponse;
import com.englishsponge.backend.exception.InvalidRequestException;
import com.englishsponge.backend.remote.DbExecutor;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoPageService {

    private final SubscriptionTierService subscriptionTierService;
    private final DbExecutor dbExecutor;

    public VideosResponse watch(UserDto user, Integer watchId) {
        Set<Integer> validSubscriptionTiers = subscriptionTierService.validSubscriptionTiers(user);
        String subscriptionTierCsv = validSubscriptionTiers.stream()
                                                           .map(String::valueOf)
                                                           .collect(Collectors.joining(","));

        String sqlBuilder = """
                SELECT v.id, v.title, v.description, v.length, v.link, v.series, g.name as guide, a.name as accent, l.name as level, v.subscription_tier
                from videos v
                left join
                   guide g ON v.guide = g.id
                left join
                   accent a ON v.accent = a.id
                left join
                   level l ON v.level = l.id
                where v.id = :watch_id
                   AND v.subscription_tier IN (""" + subscriptionTierCsv + """
                )
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("watch_id", watchId);
        VideosResponse video = dbExecutor.runSingle(sqlBuilder, VideosResponse.class, params);

        if (video == null) {
            throw new InvalidRequestException("Invalid watch id or user for tier");
        }

        List<VideoTopic> videoTopics = dbExecutor.run("""
                                                                  SELECT vt.video_id, t.name AS topic
                                                                  FROM video_topic vt
                                                                  LEFT JOIN topic t ON vt.topic_id = t.id
                                                                  WHERE vt.video_id = :watch_id
                                                              """, VideoTopic.class, params);
        List<String> topics = videoTopics.stream().map(VideoTopic::getTopic).collect(Collectors.toList());
        video.setTopics(topics);

        // Generate a unique hash based on current timestamp
        long timestamp = System.currentTimeMillis();
        String base64Time = Base64.getEncoder().encodeToString(String.valueOf(timestamp).getBytes());
        video.setTabId(base64Time);

        return video;
    }

    @Transactional
    public void time(UserDto user, Integer videoId, String tabId) {
        // Update or Insert the video_watched activity tied to tabId
        String updateSql = """
                UPDATE user_activity
                SET time_spent = time_spent + 2, created_at = NOW()
                WHERE user_id = :user_id
                AND video_id = :video_id
                AND tab_id = :tab_id
                """;

        Map<String, Object> userActivityParams = new HashMap<>();
        userActivityParams.put("user_id", user.getId());
        userActivityParams.put("video_id", videoId);
        userActivityParams.put("tab_id", tabId);

        int updatedRows = dbExecutor.execute(updateSql, userActivityParams);

        if (updatedRows == 0) {
            // No existing row for this tab_id, insert new
            String insertSql = """
                    INSERT INTO user_activity (user_id, video_id, time_spent, tab_id, created_at)
                    VALUES (:user_id, :video_id, 2, :tab_id, NOW())
                    """;
            dbExecutor.execute(insertSql, userActivityParams);
        }
    }
}
