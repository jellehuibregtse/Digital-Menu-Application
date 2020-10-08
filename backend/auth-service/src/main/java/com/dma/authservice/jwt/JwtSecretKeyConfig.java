package com.dma.authservice.jwt;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

/**
 * Configuration file for the JWT secret key.
 *
 * @author Jelle Huibregtse
 */
@Configuration
public class JwtSecretKeyConfig {

    private final JwtConfig jwtConfig;

    @Autowired
    public JwtSecretKeyConfig(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Bean
    public SecretKey secretKey() {
        return Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
    }
}
