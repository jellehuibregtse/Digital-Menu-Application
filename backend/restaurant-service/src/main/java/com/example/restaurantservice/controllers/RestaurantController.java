package com.example.restaurantservice.controllers;

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
@RequestMapping("/api")
public class RestaurantController {

    @Autowired
    private RestaurantRepository repository;

    @GetMapping("/")
    public List<Restaurant> getAllMenus(){

        List<Restaurant> result = repository.findAll();
        return result;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getAllMenusById(@PathVariable long id){
        Restaurant result = repository.findById(id).orElseThrow(()->new RuntimeException("not found"));
        return ResponseEntity.ok(result);
    }
    @PostMapping("/")
    public void createNewRestaurant(@RequestBody Restaurant restaurant){
        System.out.println(restaurant);
        repository.save(restaurant);
    }
}
