package com.dma.menuservice;

import com.dma.menuservice.controller.MenuController;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class MenuServiceApplicationTests {

    @Autowired
    private MenuController menuController;

    @Test
    public void contextLoads() {
        Assert.assertNotNull(menuController);
    }
}
