package com.example.restaurantservice.repositories;

import com.example.restaurantservice.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {
    Restaurant findByName(String name);
}
