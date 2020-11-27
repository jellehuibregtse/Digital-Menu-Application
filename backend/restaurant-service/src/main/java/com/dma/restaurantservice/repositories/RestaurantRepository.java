package com.dma.restaurantservice.repositories;

import com.dma.restaurantservice.models.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * The restaurant repository.
 *
 * @author Jordan Radushev
 */
@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Long> {

    Optional<Restaurant> findByName(String name);

    Optional<List<Restaurant>> findAllByUserId(long userId);

    void deleteByName(String name);
}