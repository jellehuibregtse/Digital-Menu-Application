package com.dma.authservice.auth;

import com.dma.authservice.jwt.JwtConfig;
import com.dma.authservice.services.JwtTokenService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
class AuthTests {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private JwtConfig jwtConfig;

    @Test
    void generateToken_returnsString() {
        var token = jwtTokenService.generateToken("subject", 0);

        assertNotNull(token);
        assertFalse(token.contains(jwtConfig.getPrefix()));
    }
}
