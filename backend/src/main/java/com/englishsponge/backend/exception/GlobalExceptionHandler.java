package com.englishsponge.backend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @Value("${cookie.name}")
    private String cookieName;

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleInvalidCredentials(InvalidCredentialsException ex) {
        ResponseCookie cookie = ResponseCookie.from(cookieName, "").maxAge(0).httpOnly(true).path("/").build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .header(HttpHeaders.SET_COOKIE, cookie.toString())
                             .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(InternalAppException.class)
    public ResponseEntity<Map<String, String>> handleInternalAppException(InternalAppException ex) {
        log.error("Internal app exception called", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(Map.of("error", "internal_app_exception"));
    }

    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<Map<String, String>> handleInvalidRequestException(InvalidRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(Map.of("error", ex.getMessage()));
    }
}
