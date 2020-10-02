package com.dma.menuservice.services;

import com.dma.menuservice.models.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RestaurantService {

    private final RestTemplate restTemplate;

    public RestaurantService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Restaurant getRestaurant(long restaurantId) {
        return restTemplate.getForObject("http://restaurant-service/api/restaurant/?restaurantId="+restaurantId, Restaurant.class);
    }
}
