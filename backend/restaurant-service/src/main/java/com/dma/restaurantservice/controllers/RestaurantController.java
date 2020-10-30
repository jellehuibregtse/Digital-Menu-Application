package com.dma.restaurantservice.controllers;

import com.dma.restaurantservice.exceptions.ResourceNotFoundException;
import com.dma.restaurantservice.models.Restaurant;
import com.dma.restaurantservice.repositories.RestaurantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * The controller that handles all the mappings for the restaurant service.
 *
 * @author Jordan Radushev
 * @author Jelle Huibregtse
 */
@RestController
@RequestMapping(value = "/restaurants")
public class RestaurantController {

    private final RestaurantRepository repository;

    public RestaurantController(RestaurantRepository repository) {
        this.repository = repository;
    }

    /**
     * Get a list of all restaurants.
     *
     * @return <code>ResponseEntity</code> with a list of restaurants and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> result = new ArrayList<>();
        repository.findAll().forEach(result::add);

        return ResponseEntity.ok(result);
    }

    /**
     * Get a single restaurant by ID.
     *
     * @param id of the restaurant.
     * @return <code>ResponseEntity</code> with a restaurant and HTTP status OK.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable long id) {
        Restaurant result = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found."));
        return ResponseEntity.ok(result);
    }

    /**
     * Create a restaurant.
     *
     * @param restaurant that needs to be created.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @PostMapping
    public ResponseEntity<String> createRestaurant(@RequestBody Restaurant restaurant) {
        repository.save(restaurant);

        return ResponseEntity.ok(String.format("Restaurant with name: %s has been successfully created!", restaurant.getName()));
    }


    /**
     * Update a single restaurant.
     *
     * @param restaurant that needs to be updated
     * @return message and HTTP status OK.
     */
    @PutMapping
    public ResponseEntity<String> updateRestaurant(@RequestBody Restaurant restaurant) {
        Restaurant updatedRestaurant = repository.findById(restaurant.getId()).orElseThrow(() -> new ResourceNotFoundException("not found"));

        updatedRestaurant.setName(restaurant.getName());
        updatedRestaurant.setColorScheme(restaurant.getColorScheme());
        updatedRestaurant.setLogoURL(restaurant.getLogoURL());
        updatedRestaurant.setMenuIDs(restaurant.getMenuIDs());
        repository.save(updatedRestaurant);

        return ResponseEntity.ok(String.format("Restaurant with id: %d has been successfully updated!", restaurant.getId()));
    }

    /**
     * Delete a single restaurant.
     *
     * @param id of the restaurant.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable long id) {
        Restaurant restaurant = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));

        repository.delete(restaurant);

        return ResponseEntity.ok(String.format("Restaurant with id: %d has been successfully deleted!", id));
    }
}
