package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.LevelDto;
import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.remote.DbExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Math.min;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeneralService {

    private final DbExecutor dbExecutor;

    public UserDto getUser(UserDto user) {
        Map<String, Object> params = new HashMap<>();
        params.put("id", user.getId());
        String sqlDailyGoal = """
                SELECT
                    COALESCE(SUM(time_spent), 0) AS minutes
                FROM user_activity
                WHERE user_id = :id
                  AND created_at >= NOW() - INTERVAL '1 day';
                """;
        user.setDailyGoalCompleted(min(dbExecutor.runSingle(sqlDailyGoal, Long.class, params),
                                              user.getDailyGoal()));
        return user;
    }

    public List<LevelDto> getLevels() {
        String sql = "SELECT * from level order by mins_needed;";
        return dbExecutor.run(sql, LevelDto.class, null);
    }
}
