package com.dma.orderservice;

import com.dma.orderservice.controller.OrderController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class OrderServiceApplicationTests {

    @Autowired
    private OrderController orderController;

    @Test
    public void contextLoads() {
        assertThat(orderController).isNotNull();
    }
}
