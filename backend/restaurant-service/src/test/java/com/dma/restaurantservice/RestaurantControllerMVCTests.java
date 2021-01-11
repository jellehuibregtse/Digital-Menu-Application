package com.dma.restaurantservice;

import com.dma.restaurantservice.models.Restaurant;
import com.dma.restaurantservice.models.Styling;
import com.dma.restaurantservice.repositories.RestaurantRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("tests")
public class RestaurantControllerMVCTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RestaurantRepository repository;

    private final ObjectMapper mapper = new ObjectMapper();

    private String token = "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAifQ.7PqHgIx5g4M-zFeXjJI6TLfJkpoombDZ9M6-OtEP2f4";

    @BeforeEach
    public void setup() {
        Restaurant restaurant1 = new Restaurant();
        restaurant1.setName("Test1");
        restaurant1.setDisplayName("Test1");
        restaurant1.setUserId(0);
        restaurant1.setTableCount(10);
        restaurant1.setStyling(new Styling());

        Restaurant restaurant2 = new Restaurant();
        restaurant2.setName("Test2");
        restaurant2.setDisplayName("Test2");
        restaurant2.setUserId(0);
        restaurant2.setTableCount(9);
        restaurant2.setStyling(new Styling());

        repository.saveAll(Arrays.asList(restaurant1, restaurant2));
    }

    @AfterEach
    public void delete() {
        repository.deleteAll();
    }

    @Test
    public void getRestaurantById_andReturnStatus200() throws Exception {
        Restaurant restaurantOne = repository.findByName("Test1").orElseThrow();

        this.mockMvc.perform(MockMvcRequestBuilders.get("/restaurants/{id}", restaurantOne.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is((int) restaurantOne.getId())))
                .andExpect(jsonPath("$.name", is(restaurantOne.getName())));


        Restaurant restaurantTwo = repository.findByName("Test2").orElseThrow();
        this.mockMvc.perform(MockMvcRequestBuilders.get("/restaurants/{id}", restaurantTwo.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is((int) restaurantTwo.getId())))
                .andExpect(jsonPath("$.name", is(restaurantTwo.getName())));

    }

    @Test
    public void getUnknownRestaurantById_andReturnStatus404() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.get("/restaurants/333"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void createNewRestaurant_andReturnStatus200() throws Exception {
        Restaurant restaurant = new Restaurant();
        restaurant.setName("Test3");
        restaurant.setDisplayName("Test3");
        restaurant.setUserId(0);
        restaurant.setTableCount(11);
        this.mockMvc.perform(MockMvcRequestBuilders.post("/restaurants/")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(restaurant)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",
                        is(String.format("Restaurant with name: %s has been successfully created!",
                                restaurant.getName()))));
    }

    @Test
    public void updateRestaurant_andReturnStatus200() throws Exception {
        Restaurant foundRestaurant = repository.findByName("Test1").orElseThrow();

        foundRestaurant.setName("UpdatedTest2");
        foundRestaurant.setDisplayName("UpdatedTest2");
        foundRestaurant.setUserId(2);
        foundRestaurant.setTableCount(11);

        this.mockMvc.perform(MockMvcRequestBuilders.put("/restaurants")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(foundRestaurant)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",
                        is(String.format("Restaurant with id: %d has been successfully updated!",
                                foundRestaurant.getId()))));
    }

    @Test
    public void updateUnknownRestaurant_andReturnStatus404() throws Exception {
        Restaurant restaurant = new Restaurant();
        restaurant.setName("Unknown");
        restaurant.setDisplayName("Unknown");
        restaurant.setUserId(0);
        restaurant.setTableCount(11);
        this.mockMvc.perform(MockMvcRequestBuilders.put("/restaurants/")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(restaurant)))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void deleteRestaurant_andReturnStatus200() throws Exception {
        Restaurant restaurantOne = repository.findByName("Test1").orElseThrow();

        this.mockMvc.perform(MockMvcRequestBuilders.delete("/restaurants/{id}", restaurantOne.getId())
                .header("Authorization", token))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",
                        is(String.format("Restaurant with id: %d has been successfully deleted!",
                                restaurantOne.getId()))));
    }

    @Test
    public void deleteUnknownRestaurant_andReturnStatus404() throws Exception {

        this.mockMvc.perform(MockMvcRequestBuilders.delete("/restaurants/222")
                .header("Authorization", token))
                .andDo(print())
                .andExpect(status().isNotFound());

    }
}

