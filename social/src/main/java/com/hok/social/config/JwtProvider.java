package com.hok.social.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
@Service
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET.getBytes());

    public String generateToken(Authentication authentication) {
        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("email", authentication.getName())
                .signWith(key)
                .compact();
        return jwt;
    }

    public String getEmailFromToken(String token) {
        token = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(token).getBody();

        String email = String.valueOf(claims.get("email"));
        return email;
    }
}
