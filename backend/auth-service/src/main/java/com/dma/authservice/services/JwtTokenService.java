package com.dma.authservice.services;

import com.dma.authservice.jwt.JwtConfig;
import com.google.common.collect.Lists;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

/**
 * A service that handles all Jwt token related actions.
 *
 * @author Jelle Huibregtse
 */
@Service
public class JwtTokenService {

    private final JwtConfig jwtConfig;

    @Autowired
    public JwtTokenService(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public String generateToken(String subject, long id) {
        var now = System.currentTimeMillis();

        return Jwts.builder()
                   .setSubject(subject)
                   .claim("id", id)
                   .setIssuedAt(new Date(now))
                   .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getExpiration())))
                   .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes())
                   .compact();
    }
}
