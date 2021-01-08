package com.dma.inventoryservice;

import com.dma.inventoryservice.controller.InventoryController;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class InventoryServiceApplicationTests {

    @Autowired
    private InventoryController inventoryController;

    @Test
    void contextLoads() {
        Assert.assertNotNull(inventoryController);
    }
}
