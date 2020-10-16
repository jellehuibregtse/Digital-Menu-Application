package com.dma.orderservice;

import com.dma.orderservice.model.CustomerOrder;
import com.dma.orderservice.model.Status;
import com.dma.orderservice.repository.OrderRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests using Mock MVC.
 *
 * @author Jelle Huibregtse
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
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

    @Test
    public void getSingleOrder_returnsStatus200_andOrder() throws Exception {
        this.mockMvc.perform(get("/orders/1"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))

                    .andExpect(jsonPath("$.id", is(1)))
                    .andExpect(jsonPath("$.status", is("NEW")))
                    .andExpect(jsonPath("$.restaurantId", is(1)))
                    .andExpect(jsonPath("$.tableNumber", is(1)))
                    .andExpect(jsonPath("$.items", hasSize(0)));
    }

    @Test
    public void addOrder_returnsStatus200_andMessage() throws Exception {
        var newOrder = new CustomerOrder(Status.NEW, 5L, 10, Lists.newArrayList());

        this.mockMvc.perform(post("/orders/").contentType(MediaType.APPLICATION_JSON).content(toJsonString(newOrder)))
                    .andExpect(status().isOk())
                    .andExpect(content().string(endsWith("has been successfully created!")));
    }

    private String toJsonString(Object object) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(object);
    }
}