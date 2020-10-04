package com.dma.restaurantservice;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests for the restaurant controller.
 *
 * @author Jordan Radushev
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc()
public class RestaurantControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getAllRestaurantsTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/restaurant/getAll"))
                .andExpect(status().isOk());
    }

    @Test
    public void getRestaurantByIdTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/restaurant/2"))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/restaurant/222"))
                .andExpect(status().isNotFound());
    }


}