package com.dma.restaurantservice.controllers;

import com.dma.restaurantservice.models.Restaurant;
import com.dma.restaurantservice.repositories.RestaurantRepository;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * The controller that handles all the mappings for the restaurant service.
 *
 * @author Jordan Radushev
 * @author Jelle Huibregtse
 * @author Aron Hemmes
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
    @GetMapping("/user")
    public ResponseEntity<List<Restaurant>> getAllRestaurantsForUser(@RequestHeader("Authorization") String token) {
        long id = Long.parseLong(parseJwtToken(token).get("id").toString());
        return ResponseEntity.ok(repository.findAllByUserId(id).orElse(new ArrayList<>()));
    }

    /**
     * Check if restaurant name is taken.
     *
     * @param name that needs to be found.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<Boolean> nameTaken(@RequestParam String name) {
        return ResponseEntity.ok(repository.findByName(name).isPresent());
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
    public ResponseEntity<String> createRestaurant(@RequestBody Restaurant restaurant, @RequestHeader("Authorization") String token) {
        long id = Long.parseLong(parseJwtToken(token).get("id").toString());
        restaurant.setUserId(id);
        repository.save(restaurant);

        return ResponseEntity.ok(String.format("Restaurant with name: %s has been successfully created!",
                                               restaurant.getName()));
    }

    /**
     * Update a single restaurant.
     *
     * @param updatedRestaurant
     * @return message and HTTP status OK.
     */
    @PutMapping
    public ResponseEntity<String> updateRestaurant(@RequestBody Restaurant updatedRestaurant, @RequestHeader("Authorization") String token) {
        long id = Long.parseLong(parseJwtToken(token).get("id").toString());
        Restaurant restaurant = repository.findById(updatedRestaurant.getId()).orElseThrow(() -> new ResourceNotFoundException("not found"));

        if(restaurant.getUserId() == id) {
            restaurant.setName(updatedRestaurant.getName());
            restaurant.setDisplayName(updatedRestaurant.getDisplayName());
            restaurant.getStyling().setColorScheme(updatedRestaurant.getStyling().getColorScheme());
            restaurant.getStyling().setLogoURL(updatedRestaurant.getStyling().getLogoURL());
            repository.save(restaurant);

            return ResponseEntity.ok(String.format("Restaurant with id: %d has been successfully updated!",
                    updatedRestaurant.getId()));
        }
        else
            return ResponseEntity.badRequest().body("You do not have permission to update this restaurant!");
    }

    /**
     * Delete a single restaurant.
     *
     * @param id of the restaurant.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable long id, @RequestHeader("Authorization") String token) {
        Restaurant restaurant = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));
        if(restaurant.getUserId() == Long.parseLong(parseJwtToken(token).get("id").toString())) {

            repository.delete(restaurant);

            return ResponseEntity.ok(String.format("Restaurant with id: %d has been successfully deleted!", id));
        }
        else
            return ResponseEntity.badRequest().body("You do not have permission to delete this restaurant!");
    }

    private JSONObject parseJwtToken(String token) {
        String base64EncodedBody = token.split("\\.")[1];

        return (JSONObject) JSONValue.parse(new String(new Base64(true).decode(base64EncodedBody)));
    }
}