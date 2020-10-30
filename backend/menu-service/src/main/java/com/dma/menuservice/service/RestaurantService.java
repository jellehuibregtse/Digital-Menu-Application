package com.dma.menuservice.service;

import com.dma.menuservice.model.Restaurant;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * The restaurant service which handles request to the restaurant service.
 *
 * @author Jelle Huibregtse
 */
@Service
public class RestaurantService {

    private final RestTemplate restTemplate;

    public RestaurantService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Gets a restaurant from the restaurant service by ID.
     *
     * @param restaurantId of the restaurant.
     * @return <code>Restaurant</code> object.
     */
    public Restaurant getRestaurant(long restaurantId) {
        return restTemplate.getForObject("http://restaurant-service/api/restaurants/" + restaurantId, Restaurant.class);
    }
}
