package com.dma.restaurantservice;

import com.dma.restaurantservice.models.Restaurant;
import com.dma.restaurantservice.repositories.RestaurantRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests for the restaurant repository.
 *
 * @author Jordan Radushev
 */
@DataJpaTest
public class RestaurantRepositoryTests {

    @Autowired
    private RestaurantRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    /**
     * Initialize persistent data in the entity manager
     */
    @BeforeEach
    public void init() {
        Restaurant restaurant1 = new Restaurant(1L, "test1", "Test1", 0, 10, null, new ArrayList<>());
        Restaurant restaurant2 = new Restaurant(2L, "test2", "Test2", 0, 10, null, new ArrayList<>());

        entityManager.persist(restaurant1);
        entityManager.persist(restaurant2);
    }

    /**
     * Get all restaurants
     */
    @Test
    public void should_get_all_restaurants() {
        repository.findAll();
        assertThat(repository.findAll()).hasSize(2);

        assertThat(((List<Restaurant>) repository.findAll()).size()).isEqualTo(2);
    }

    /**
     * Get a single restaurant
     */
    @Test
    public void should_get_single_restaurant() {
        Restaurant foundRestaurant1 = repository.findByName("Test1").get();
        assertThat(foundRestaurant1.getName()).isEqualTo("Test1");

        Restaurant foundRestaurant2 = repository.findByName("Test2").get();
        assertThat(foundRestaurant2.getName()).isEqualTo("Test2");
    }

    /**
     * Cannot get non-existing restaurant
     */
    @Test()
    public void should_not_get_unknown_restaurant() {
        Assertions.assertThrows(NoSuchElementException.class, () -> repository.findByName("WrongName").get());
    }

    /**
     * Save new restaurant
     */
    @Test
    public void should_save_new_restaurant() {
        Restaurant savedRestaurant =
                repository.save(new Restaurant(3L, "test3", "Test3", 0, 10, null, new ArrayList<>()));

        assertThat(savedRestaurant.getName()).isEqualTo("Test3");
    }


    /**
     * Update restaurant details
     */
    @Test
    public void should_update_restaurant() {
        Restaurant foundRestaurant = repository.findByName("Test1").get();
        foundRestaurant.setName("UpdatedTest1");

        Restaurant updatedRestaurant = repository.save(foundRestaurant);

        assertThat(foundRestaurant.getName()).isEqualTo(updatedRestaurant.getName());

    }

    /**
     * Cannot update non-existing restaurant
     */
    @Test()
    public void should_not_update_unknown_restaurant() {
        Assertions.assertThrows(NoSuchElementException.class, () -> {
            Restaurant foundRestaurant = repository.findByName("WrongName").get();
            foundRestaurant.setName("UpdatedTest1");

            repository.save(foundRestaurant);
            repository.findByName("UpdatedTest1").get();
        });
    }

    /**
     * Delete restaurant
     */
    @Test
    public void should_delete_restaurant() {
        Restaurant foundRestaurant = repository.findByName("Test1").get();
        repository.delete(foundRestaurant);

        assertThat(repository.findAll()).hasSize(1);
    }

    /**
     * Delete all restaurants
     */
    @Test
    public void should_delete_all_restaurants() {

        repository.deleteAll();

        assertThat(repository.findAll()).hasSize(0);
    }

    /**
     * Cannot delete non-existing restaurant
     */
    @Test
    public void should_not_delete_unknown_restaurant() {
        Assertions.assertThrows(NoSuchElementException.class, () -> {
            Restaurant foundRestaurant = repository.findByName("WrongName").get();
            repository.delete(foundRestaurant);
        });
    }
}



