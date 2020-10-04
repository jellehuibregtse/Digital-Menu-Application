package com.dma.restaurantservice;

import com.dma.restaurantservice.models.Restaurant;
import com.dma.restaurantservice.repositories.RestaurantRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

/**
 * Tests for the restaurant repository.
 *
 * @author Jordan Radushev
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class RestaurantRepositoryTests {

    @Autowired
    private RestaurantRepository repository;

    @Test
    public void saveNewRestaurant() {
        repository
                .save(new Restaurant("Test", "test_theme", "test_url", new ArrayList<>()));

        Restaurant foundRestaurant = repository.findByName("Test").get();
        assert (foundRestaurant.getName()).equals("Test");
    }

}
