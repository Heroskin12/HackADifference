package com.englishsponge.backend.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET = "your-secret-key-your-secret-key-your-secret-key"; // replace with env variable in prod
    Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(Integer userId) {
        long EXPIRATION_MS = 86400000;
        return Jwts.builder()
                   .subject(Integer.toString(userId))
                   .issuedAt(new Date())
                   .expiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                   .signWith(key)
                   .compact();
    }

    public Integer validateAndExtractUserId(String token) {
        Claims claims = Jwts.parser()
                            .verifyWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                            .build()
                            .parseSignedClaims(token)
                            .getPayload();
        return Integer.parseInt(claims.getSubject());
    }
}
