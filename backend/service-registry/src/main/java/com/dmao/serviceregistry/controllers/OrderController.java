package com.dmao.serviceregistry.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

/**
 * The websocket configuration class.
 *
 * @author Aron Hemmes
 */
@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {

    private final String URL = "http://order-service/api/orders";
    private final RestTemplate restTemplate;

    @Autowired
    public OrderController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllOrders() {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.GET, null, Object.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable long id) {
        try {
            return restTemplate.exchange(URL + "/" + id, HttpMethod.GET, new HttpEntity<>(id), Object.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createOrder(@RequestBody Object order) {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.POST, new HttpEntity<>(order), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updateOrder(@RequestBody Object order) {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.PUT, new HttpEntity<>(order), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable long id) {
        try {
            return restTemplate.exchange(URL + "/" + id, HttpMethod.DELETE, new HttpEntity<>(id), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}