package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.dto.request.ForgotPasswordRequest;
import com.englishsponge.backend.dto.request.OtpRequest;
import com.englishsponge.backend.dto.request.SignupRequest;
import com.englishsponge.backend.exception.InternalAppException;
import com.englishsponge.backend.exception.InvalidCredentialsException;
import com.englishsponge.backend.remote.DbExecutor;
import com.englishsponge.backend.utility.JwtUtil;
import com.englishsponge.backend.utility.MailUtil;
import com.englishsponge.backend.utility.PasswordUtil;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${cookie.name}")
    private String cookieName;

    private final DbExecutor dbExecutor;
    private final JwtUtil jwtUtil;
    private final PasswordUtil passwordUtil;
    private final MailUtil mailUtil;

    public String login(String email, String password) {
        password = passwordUtil.getMd5(password);
        String sql = "SELECT id, email, password FROM users WHERE email = :email";
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);

        UserDto user = dbExecutor.runSingle(sql, UserDto.class, params);

        if (user == null || user.getPassword() == null || !user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return jwtUtil.generateToken(user.getId());
    }

    public UserDto verify(HttpServletRequest request) {
        if (request.getCookies() == null) {
            throw new InvalidCredentialsException("Missing authentication");
        }

        for (var cookie : request.getCookies()) {
            if (cookieName.equals(cookie.getName())) {
                try {
                    Integer id = jwtUtil.validateAndExtractUserId(cookie.getValue());
                    Map <String, Object> params = new HashMap<>();
                    params.put("id", id);
                    return dbExecutor.runSingle("select * from users where id = :id", UserDto.class, params);
                } catch (Exception e) {
                    break;
                }
            }
        }

        throw new InvalidCredentialsException("Invalid or expired token");
    }

    @Transactional
    public boolean verifyEmail(String email) {
        String checkUserSql = "SELECT * FROM users WHERE email = :email";
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);
        UserDto user = dbExecutor.runSingle(checkUserSql, UserDto.class, params);
        if (user == null || !user.getVerified() || user.getPassword() == null) {
            int otp = mailUtil.makeOtp();
            String sql;
            if (user == null) sql = "INSERT INTO users (email, otp) values (:email, :otp)";
            else sql = "UPDATE users SET otp = :otp, verified = false WHERE email = :email";
            Map<String, Object> otpParams = new HashMap<>();
            otpParams.put("otp", otp);
            otpParams.put("email", email);
            dbExecutor.execute(sql, otpParams);

            mailUtil.sendOtp(email, otp, "Signup");
            return true;
        }
        return false;
    }

    public boolean verifyOtp(OtpRequest otp) {
        String checkUserSql = "SELECT otp FROM users WHERE email = :email";
        Map<String, Object> params = new HashMap<>();
        params.put("email", otp.getEmail());
        Integer dbOtp = dbExecutor.runSingle(checkUserSql, Integer.class, params);
        return dbOtp != null && Objects.equals(dbOtp, otp.getOtp());
    }

    @Transactional
    public void userVerified(String email) {
        String verifySql = "UPDATE users SET verified = :verified WHERE email = :email";
        Map<String, Object> otpParams = new HashMap<>();
        otpParams.put("email", email);
        otpParams.put("verified", true);
        dbExecutor.execute(verifySql, otpParams);
    }

    @Transactional
    public boolean signup(SignupRequest signupUser) {
        String checkUserSql = "SELECT * FROM users WHERE email = :email AND verified = true AND otp IS NOT NULL";
        Map<String, Object> params = new HashMap<>();
        params.put("email", signupUser.getEmail());
        UserDto user = dbExecutor.runSingle(checkUserSql, UserDto.class, params);
        if (user != null) {
            String passwordHash = passwordUtil.getMd5(signupUser.getPassword());
            String updateDetails = "UPDATE users SET name = :name, password = :password, otp = NULL WHERE id = :id";
            Map<String, Object> detailsParams = new HashMap<>();
            detailsParams.put("id", user.getId());
            detailsParams.put("name", signupUser.getName());
            detailsParams.put("password", passwordHash);
            dbExecutor.execute(updateDetails, detailsParams);
            return true;
        }
        else {
            return false;
        }
    }

    @Transactional
    public boolean forgot(String email) {
        String checkUserSql = "SELECT * FROM users WHERE email = :email AND verified = true";
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);
        UserDto user = dbExecutor.runSingle(checkUserSql, UserDto.class, params);
        if (user != null) {
            int otp = mailUtil.makeOtp();
            String sql = "UPDATE users SET otp = :otp WHERE email = :email";
            Map<String, Object> otpParams = new HashMap<>();
            otpParams.put("otp", otp);
            otpParams.put("email", email);
            dbExecutor.execute(sql, otpParams);
            mailUtil.sendOtp(email, otp, "Forgot Password");
            return true;
        }
        return false;
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        String passwordHash = passwordUtil.getMd5(request.getNewPassword());
        String sql = "UPDATE users SET password = :password, otp = null WHERE email = :email";
        Map<String, Object> params = new HashMap<>();
        params.put("email", request.getEmail());
        params.put("password", passwordHash);
        dbExecutor.execute(sql, params);
    }
}
