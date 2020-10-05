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
@RequestMapping("/menus")
public class MenuController {

    private final String URL = "http://menu-service/api/menus";
    private final RestTemplate restTemplate;

    @Autowired
    public MenuController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllMenus() {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.GET, null, Object.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMenu(@PathVariable long id) {
        try {
            return restTemplate.exchange(URL + "/" + id, HttpMethod.GET, new HttpEntity<>(id), Object.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<String> createMenu(@RequestBody Object menu) {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.POST, new HttpEntity<>(menu), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity<String> updateMenu(@RequestBody Object menu) {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.PUT, new HttpEntity<>(menu), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMenu(@PathVariable long id) {
        try {
            return restTemplate.exchange(URL + "/" + id, HttpMethod.DELETE, new HttpEntity<>(id), String.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}