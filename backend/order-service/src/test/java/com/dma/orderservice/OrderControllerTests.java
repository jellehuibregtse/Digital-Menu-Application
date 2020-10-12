package com.dma.orderservice;

import com.dma.orderservice.models.CustomerOrder;
import com.dma.orderservice.models.OrderItem;
import com.dma.orderservice.models.Status;
import com.dma.orderservice.repositories.OrderRepository;
import com.google.common.collect.Lists;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class OrderControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OrderRepository orderRepository;

    @BeforeEach
    public void setup() {
        var orderOne = new CustomerOrder(Status.NEW, 1L, 1, Lists.newArrayList());
        var orderTwo = new CustomerOrder(Status.COMPLETE, 1L, 2, Lists.newArrayList());

        orderRepository.saveAll(Arrays.asList(orderOne, orderTwo));
    }

    @AfterEach
    public void cleanup() {
        orderRepository.deleteAll();
    }

    @Test
    public void getAllOrders_returnsStatus200_andAllOrders() throws Exception {
        this.mockMvc.perform(get("/orders/restaurant/1"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))

                    .andExpect(jsonPath("$", hasSize(2)))
                    .andExpect(jsonPath("$[0].id", is(1)))
                    .andExpect(jsonPath("$[0].status", is("NEW")))
                    .andExpect(jsonPath("$[0].restaurantId", is(1)))
                    .andExpect(jsonPath("$[0].tableNumber", is(1)))
                    .andExpect(jsonPath("$[0].items", hasSize(0)))

                    .andExpect(jsonPath("$[1].id", is(2)))
                    .andExpect(jsonPath("$[1].status", is("COMPLETE")))
                    .andExpect(jsonPath("$[1].restaurantId", is(1)))
                    .andExpect(jsonPath("$[1].tableNumber", is(2)))
                    .andExpect(jsonPath("$[1].items", hasSize(0)));
    }
}