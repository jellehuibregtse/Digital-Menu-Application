package com.example.restaurantservice.controllers;

import com.example.restaurantservice.exceptions.ResourceNotFoundException;
import com.example.restaurantservice.models.Restaurant;
import com.example.restaurantservice.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantRepository repository;

    //Get all the restaurant with respective menu IDs
    @GetMapping("/getAll")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {

        List<Restaurant> result = repository.findAll();
        return ResponseEntity.ok(result);
    }

    //Get a single restaurant with its details by restaurant id
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable long id) {
        Restaurant result = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));
        return ResponseEntity.ok(result);
    }

    //Update a single restaurant with its details by restaurant id
    @PutMapping("/{id}")
    public ResponseEntity<String> updateRestaurant(@PathVariable long id, @RequestBody Restaurant restaurant) {
        Restaurant updatedRestaurant = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));

        updatedRestaurant.setName(restaurant.getName());
        updatedRestaurant.setColorScheme(restaurant.getColorScheme());
        updatedRestaurant.setLogoURL(restaurant.getLogoURL());
        updatedRestaurant.setMenuIDs(restaurant.getMenuIDs());
        repository.save(updatedRestaurant);

        String message = String.format("Restaurant with id: %d has been successfully updated!", id);
        return ResponseEntity.ok(message);
    }

    //Delete a single restaurant with its details by restaurant id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable long id) {
        Restaurant deletedRestaurant = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));
        repository.delete(deletedRestaurant);
        String message = String.format("Restaurant with id: %d has been successfully deleted!", id);
        return ResponseEntity.ok(message);
    }

    //Create a new restaurant with its details
    @PostMapping("/")
    public ResponseEntity<String> createNewRestaurant(@RequestBody Restaurant restaurant) {
        try {
            Restaurant createdRestaurant = repository.findByName(restaurant.getName());
            String message = "";
            repository.save(restaurant);
            message = String.format("Restaurant with name: %s has been successfully created!", restaurant.getName());
            return ResponseEntity.ok(message);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("already exists");
        }
    }
}
