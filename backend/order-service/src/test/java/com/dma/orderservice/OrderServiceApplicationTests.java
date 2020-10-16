package com.dma.orderservice;

import com.dma.orderservice.controller.OrderController;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class OrderServiceApplicationTests {

    @Autowired
    private OrderController orderController;

    @Test
    public void contextLoads() {
        Assert.assertNotNull(orderController);
    }
}
