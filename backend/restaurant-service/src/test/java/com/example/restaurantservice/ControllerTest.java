package com.example.restaurantservice;

import com.example.restaurantservice.controllers.RestaurantController;
import com.example.restaurantservice.models.Restaurant;
import com.example.restaurantservice.repositories.RestaurantRepository;
import jdk.jfr.ContentType;
import org.checkerframework.checker.units.qual.A;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc()
public class ControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getAllRestaurantsTest() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/restaurant/getAll"))
                .andExpect(status().isOk());
    }
    @Test
    public void getRestaurantByIdTest() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/restaurant/2"))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/restaurant/222"))
                .andExpect(status().isNotFound());
    }


}