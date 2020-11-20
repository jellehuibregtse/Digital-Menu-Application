package com.dma.authservice;

import com.dma.authservice.controllers.UserController;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class AuthServiceApplicationTests {

    @Autowired
    private UserController userController;

    @Test
    void contextLoads() {
        Assert.assertNotNull(userController);
    }
}