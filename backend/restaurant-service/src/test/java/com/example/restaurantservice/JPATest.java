package com.example.restaurantservice;

import com.example.restaurantservice.models.Restaurant;
import com.example.restaurantservice.repositories.RestaurantRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JPATest {
    @Autowired
    private RestaurantRepository repository;

    @Test
    public void saveNewRestaurant() throws Exception
    {
        repository
                .save(new Restaurant("Test","test_theme","test_url",new ArrayList<>()));

        Restaurant foundRestaurant = repository.findByName("Test");
        assert(foundRestaurant.getName()).equals("Test");
    }

}
