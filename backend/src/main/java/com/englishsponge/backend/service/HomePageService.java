package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.LengthDto;
import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.dto.response.Filter;
import com.englishsponge.backend.dto.response.FiltersResponse;
import com.englishsponge.backend.dto.response.VideoTopic;
import com.englishsponge.backend.dto.response.VideosResponse;
import com.englishsponge.backend.remote.DbExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class HomePageService {

    private final DbExecutor executor;
    private final SubscriptionTierService subscriptionTierService;
    @Value("${videos-per-page}")
    private Integer videosPerPage;
    @Value("${filter.tables}")
    private List<String> filterTables;

    public List<VideosResponse> getLatestVideos(UserDto user, Map<String, String> filters) {

        // handle pagination
        int page = filters.get("page") == null ? 1 : Integer.parseInt(filters.get("page"));
        filters.remove("page");
        Map<String, Object> params = new HashMap<>();
        params.put("offset", (page - 1) * videosPerPage);
        params.put("limit", videosPerPage);

        // filter handling
        StringBuilder sqlBuilder = new StringBuilder("""
                                                             SELECT v.id, v.title, v.length, v.link, v.subscription_tier, g.name as guide, a.name as accent, gr.name as grammar_area, l.name as level
                                                                 from videos v
                                                             left join
                                                                 guide g ON v.guide = g.id
                                                             left join
                                                                 accent a ON v.accent = a.id
                                                             left join
                                                                 level l ON v.level = l.id
                                                             left join
                                                                 grammar_area gr ON v.grammar_area = gr.id
                                                             """);

        // if series then change the ordering
        boolean isSeries = false;

        // continue
        if (!filters.isEmpty()) {
            sqlBuilder.append(" WHERE ");
            List<String> conditions = new ArrayList<>();

            // search string
            if (filters.containsKey("search")) {
                conditions.add("(v.title ILIKE :search OR v.description ILIKE :search)");
                params.put("search", "%" + filters.get("search") + "%");
                filters.remove("search");
            }

            // length duration
            if (filters.containsKey("length")) {
                LengthDto length = executor.runSingle("SELECT * FROM length WHERE id = :id",
                                                      LengthDto.class,
                                                      Map.of("id", Integer.parseInt(filters.get("length"))));
                if (length.getMinDuration() > length.getMaxDuration()) {
                    conditions.add("v.length >= :minDuration");
                    params.put("minDuration", length.getMinDuration());
                } else {
                    conditions.add("v.length BETWEEN :minDuration AND :maxDuration");
                    params.put("minDuration", length.getMinDuration());
                    params.put("maxDuration", length.getMaxDuration());
                }
                filters.remove("length");
            }

            // topics
            if (filters.containsKey("topic")) {
                String topicCondition = """
                        EXISTS (
                            SELECT 1 FROM video_topic vt
                            WHERE vt.video_id = v.id
                              AND vt.topic_id = :topic_id
                        )
                        """;
                conditions.add(topicCondition);
                params.put("topic_id", Integer.parseInt(filters.get("topic")));
                filters.remove("topic");
            }

            // everything else that works via foreign key
            for (String key : filters.keySet()) {
                conditions.add("v." + key + " = :" + key);
                params.put(key, Integer.parseInt(filters.get(key)));
                if (key.equals("series")) isSeries = true;
            }

            sqlBuilder.append(String.join(" AND ", conditions));
        }
        if (isSeries) {
            sqlBuilder.append(" order by added_on limit :limit offset :offset");
        }
        else {
            sqlBuilder.append(" order by added_on desc limit :limit offset :offset");
        }
        String sql = sqlBuilder.toString();

        List<VideosResponse> videos = executor.run(sql, VideosResponse.class, params);
        List<Integer> videoIds = videos.stream().map(VideosResponse::getId).toList();
        Map<String, Object> topicParams = new HashMap<>();
        topicParams.put("videoIds", videoIds);

        List<VideoTopic> videoTopics = executor.run("""
                                                                SELECT vt.video_id, t.name AS topic
                                                                FROM video_topic vt
                                                                LEFT JOIN topic t ON vt.topic_id = t.id
                                                                WHERE vt.video_id IN (:videoIds)
                                                            """, VideoTopic.class, topicParams);
        Map<Integer, List<String>> topicsMap = videoTopics.stream()
                                                          .collect(Collectors.groupingBy(VideoTopic::getVideoId,
                                                                                         Collectors.mapping(VideoTopic::getTopic,
                                                                                                            Collectors.toList())));
        Set<Integer> validSubscriptionTiers = subscriptionTierService.validSubscriptionTiers(user);
        for (VideosResponse video : videos) {
            video.setTopics(topicsMap.getOrDefault(video.getId(), new ArrayList<>()));
            if (!validSubscriptionTiers.contains(video.getSubscriptionTier())) {
                video.setLocked(true);
            }
        }
        return videos;
    }

    public FiltersResponse getAvailableFilters() {
        FiltersResponse response = new FiltersResponse();
        List<Filter> filters = new ArrayList<>();
        for (String filterTable : filterTables) {
            Filter filter = new Filter();
            filter.setKey(filterTable);

            String sql = """
                    SELECT id, name from #{filterTable}
                    """;
            Map<String, Object> params = new HashMap<>();
            params.put("filterTable", filterTable);
            filter.setValues(executor.run(sql, Filter.Value.class, params));

            filters.add(filter);
        }
        response.setFilters(filters);
        return response;
    }
}
