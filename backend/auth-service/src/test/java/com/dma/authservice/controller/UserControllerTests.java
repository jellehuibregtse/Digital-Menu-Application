package com.dma.authservice.controller;

import com.dma.authservice.jwt.JwtConfig;
import com.dma.authservice.services.JwtTokenService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private JwtConfig jwtConfig;

    @Test
    void shouldNotAllowAccessToUnauthenticatedUsers() throws Exception {
        this.mvc.perform(MockMvcRequestBuilders.get("/auth")).andExpect(status().isUnauthorized());
    }
}
