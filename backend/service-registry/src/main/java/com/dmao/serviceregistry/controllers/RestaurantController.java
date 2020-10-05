package com.dmao.serviceregistry.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

/**
 * The controller that handles all mappings for the restaurant-service.
 *
 * @author Aron Hemmes
 */
@RestController
@CrossOrigin
@RequestMapping("/restaurants")
public class RestaurantController {

    private final String URL = "http://restaurant-service/api/restaurants";
    private final RestTemplate restTemplate;

    @Autowired
    public RestaurantController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllRestaurants() {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.GET, null, Object.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRestaurant(@PathVariable long id) {
        try {
            return restTemplate.exchange(URL + "/" + id, HttpMethod.GET, null, Object.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createRestaurant(@RequestBody Object restaurant) {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.POST, new HttpEntity<>(restaurant), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updateRestaurant(@RequestBody Object restaurant) {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.PUT, new HttpEntity<>(restaurant), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRestaurant(@PathVariable long id) {
        try {
            return restTemplate.exchange(URL + "/" + id, HttpMethod.DELETE, new HttpEntity<>(id), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}