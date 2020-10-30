package com.dma.restaurantservice;

import com.dma.restaurantservice.models.Restaurant;
import com.dma.restaurantservice.repositories.RestaurantRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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

    @BeforeEach
    public void setup() {
        Restaurant restaurant1 = new Restaurant("Test1", "test_theme", "test_url", new ArrayList<>());
        Restaurant restaurant2 = new Restaurant("Test2", "test_theme", "test_url", new ArrayList<>());

        restaurant1.setId(1L);
        restaurant2.setId(2L);

        repository.saveAll(Arrays.asList(restaurant1, restaurant2));
    }

    @AfterEach
    public void delete() {
        repository.deleteAll();
    }

    @Test
    public void getAllRestaurants_andReturnStatus200() throws Exception {

        Restaurant restaurantOne = repository.findByName("Test1").orElseThrow();
        Restaurant restaurantTwo = repository.findByName("Test2").orElseThrow();

        this.mockMvc.perform(MockMvcRequestBuilders.get("/restaurants/"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$", hasSize(2)))
                    .andExpect(jsonPath("$[0].id", is((int) restaurantOne.getId())))
                    .andExpect(jsonPath("$[0].name", is("Test1")))
                    .andExpect(jsonPath("$[1].id", is((int) restaurantTwo.getId())))
                    .andExpect(jsonPath("$[1].name", is("Test2")));

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
        Restaurant restaurant = new Restaurant("Test3", "test_theme", "test_url", new ArrayList<>());
        this.mockMvc.perform(MockMvcRequestBuilders.post("/restaurants/")
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

        Restaurant restaurant = new Restaurant("UpdatedTest2", "test_theme", "test_url", new ArrayList<>());
        restaurant.setId(foundRestaurant.getId());

        this.mockMvc.perform(MockMvcRequestBuilders.put("/restaurants/")
                                                   .contentType(MediaType.APPLICATION_JSON)
                                                   .content(mapper.writeValueAsString(restaurant)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$",
                                        is(String.format("Restaurant with id: %d has been successfully updated!",
                                                         foundRestaurant.getId()))));
    }

    @Test
    public void updateUnknownRestaurant_andReturnStatus404() throws Exception {
        Restaurant restaurant = new Restaurant("UpdatedTest2", "test_theme", "test_url", new ArrayList<>());
        restaurant.setId(111L);
        this.mockMvc.perform(MockMvcRequestBuilders.put("/restaurants/")
                                                   .contentType(MediaType.APPLICATION_JSON)
                                                   .content(mapper.writeValueAsString(restaurant)))
                    .andDo(print())
                    .andExpect(status().isNotFound());
    }

    @Test
    public void deleteRestaurant_andReturnStatus200() throws Exception {
        Restaurant restaurantOne = repository.findByName("Test1").orElseThrow();

        this.mockMvc.perform(MockMvcRequestBuilders.delete("/restaurants/{id}", restaurantOne.getId()))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$",
                                        is(String.format("Restaurant with id: %d has been successfully deleted!",
                                                         restaurantOne.getId()))));
    }

    @Test
    public void deleteUnknownRestaurant_andReturnStatus404() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.delete("/restaurants/222"))
                    .andDo(print())
                    .andExpect(status().isNotFound());

    }
}

