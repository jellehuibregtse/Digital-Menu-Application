package com.example.restaurantservice.repositories;

import com.example.restaurantservice.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {
}
