package com.dma.authservice.controller;

import com.dma.authservice.jwt.JwtConfig;
import com.dma.authservice.services.JwtTokenService;
import com.google.common.collect.Lists;
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
public class TestControllerTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private JwtConfig jwtConfig;

    @Test
    public void shouldNotAllowAccessToUnauthenticatedUsers() throws Exception {
        this.mvc.perform(MockMvcRequestBuilders.get("/test")).andExpect(status().isUnauthorized());
    }

    @Test
    public void shouldGenerateAuthToken() throws Exception {
        String token = jwtTokenService.generateToken("john", Lists.newArrayList("ROLE_ADMIN"));

        assertNotNull(token);
        this.mvc.perform(MockMvcRequestBuilders.get("/test").header("Authorization", jwtConfig.getPrefix() + token))
                .andExpect(status().isOk());
    }

}