package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.ManualActivityDto;
import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.dto.request.ManualActivityRequest;
import com.englishsponge.backend.dto.request.OtpRequest;
import com.englishsponge.backend.dto.request.PasswordChangeRequest;
import com.englishsponge.backend.exception.InvalidRequestException;
import com.englishsponge.backend.remote.DbExecutor;
import com.englishsponge.backend.utility.MailUtil;
import com.englishsponge.backend.utility.PasswordUtil;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserSettingsService {

    private final DbExecutor dbExecutor;
    private final MailUtil mailUtil;
    private final PasswordUtil passwordUtil;

    @Transactional
    public void changeName(UserDto user, String name) {
        String sql = """
                update users set name = :name where id = :id
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("name", name);
        params.put("id", user.getId());

        dbExecutor.execute(sql, params);
    }

    @Transactional
    public void changePassword(UserDto user, PasswordChangeRequest passwordChangeRequest) {
        String fetchSql = "select password from users where id=:id";
        Map<String, Object> fetchParams = new HashMap<>();
        fetchParams.put("id", user.getId());
        String currentPassword = dbExecutor.runSingle(fetchSql, String.class, fetchParams);

        String curPasswordHash = passwordUtil.getMd5(passwordChangeRequest.getCurrentPassword());
        String newPasswordHash = passwordUtil.getMd5(passwordChangeRequest.getNewPassword());

        if (!currentPassword.equals(curPasswordHash)) {
            throw new InvalidRequestException("Current password does not match.");
        }

        String updateSql = """
                update users set password=:password where id=:id
                """;
        Map<String, Object> updateParams = new HashMap<>();
        updateParams.put("id", user.getId());
        updateParams.put("password", newPasswordHash);
        dbExecutor.execute(updateSql, updateParams);
    }

    @Transactional
    public void deleteAccount(UserDto user) {
        String sql = """
                delete from users where id=:id
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("id", user.getId());
        dbExecutor.execute(sql, params);
    }

    @Transactional
    public void sendNewOtpMail(UserDto user, String email) {
        String findUserSql = """
                select count(*) from users where email=:email
                """;
        Map<String, Object> findUserParams = new HashMap<>();
        findUserParams.put("email", email);
        boolean existing = dbExecutor.runSingle(findUserSql, Long.class, findUserParams) > 0;

        if (!existing) {
            int otp = mailUtil.makeOtp();
            String sql = """
                    update users set otp = :otp, new_email = :email where id = :id
                    """;
            Map<String, Object> params = new HashMap<>();
            params.put("otp", otp);
            params.put("email", email);
            params.put("id", user.getId());
            dbExecutor.execute(sql, params);
            mailUtil.sendOtp(email, otp, "Email Change");
        } else throw new InvalidRequestException("Email already exists.");
    }

    @Transactional
    public void changeEmail(UserDto user, OtpRequest otpRequest) {
        String sql = """
                UPDATE users
                SET
                  email = CASE WHEN new_email = :email THEN :email ELSE email END,
                  new_email = NULL,
                  otp = NULL
                WHERE id = :id;
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("email", otpRequest.getEmail());
        params.put("id", user.getId());
        dbExecutor.execute(sql, params);
    }

    @Transactional
    public void changeDailyGoal(UserDto user, String dailyGoal) {
        String sql = """
                UPDATE users SET daily_goal = :daily_goal where id = :id
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("id", user.getId());
        params.put("daily_goal", Integer.parseInt(dailyGoal));
        dbExecutor.execute(sql, params);
    }

    public List<ManualActivityDto> viewManualActivity(UserDto user) {
        Map<String, Object> data = new HashMap<>();
        data.put("user", user.getId());
        String sql = "select * from manual_activity where user_id = :user order by created_at DESC limit 10;";
        return dbExecutor.run(sql, ManualActivityDto.class, data);
    }

    @Transactional
    public void addManualActivity(UserDto user, ManualActivityRequest manualActivityRequest) {
        String sql = "INSERT INTO manual_activity (user_id, minutes, description) values (:user_id, :minutes, :description)";
        Map<String, Object> data = new HashMap<>();
        data.put("user_id", user.getId());
        data.put("minutes", manualActivityRequest.getMinutes());
        data.put("description", manualActivityRequest.getDescription());
        dbExecutor.execute(sql, data);
    }
}
