package com.dma.restaurantservice.repository;

import com.dma.restaurantservice.models.Restaurant;
import com.dma.restaurantservice.repositories.RestaurantRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests for the restaurant repository.
 *
 * @author Jordan Radushev
 */
@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("tests")
public class RestaurantRepositoryTests {

    @Autowired
    private RestaurantRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    /**
     * Initialize persistent data in the in-memory database
     *
     */
    public void init() {
        Restaurant restaurant1 = new Restaurant("Test1", "test_theme", "test_url", new ArrayList<>());
        Restaurant restaurant2 = new Restaurant("Test2", "test_theme", "test_url", new ArrayList<>());

        entityManager.persist(restaurant1);
        entityManager.persist(restaurant2);
    }

    /**
     * Get all restaurants
     *
     */
    @Test
    public void should_get_all_restaurants() {
        init();

        assertThat(repository.findAll())
                .hasSize(2);
    }

    /**
     * Get a single restaurant
     *
     */
    @Test
    public void should_get_single_restaurant() {
        init();

        Restaurant foundRestaurant1 = repository.findByName("Test1").get();
        assertThat(foundRestaurant1.getName())
                .isEqualTo("Test1");

        Restaurant foundRestaurant2 = repository.findByName("Test2").get();
        assertThat(foundRestaurant2.getName())
                .isEqualTo("Test2");

    }

    /**
     * Cannot get non-existing restaurant
     *
     */
    @Test(expected = NoSuchElementException.class)
    public void should_not_get_unknown_restaurant(){
        init();

        Restaurant foundRestaurant1 = repository.findByName("WrongName").get();
    }

    /**
     * Save new restaurant
     *
     */
    @Test
    public void should_save_new_restaurant() {
        init();

        Restaurant savedRestaurant = repository
                .save(new Restaurant("Test3", "test_theme", "test_url", new ArrayList<>()));

        assertThat(savedRestaurant.getName())
                .isEqualTo("Test3");
    }



    /**
     * Update restaurant details
     *
     */
    @Test
    public void should_update_restaurant() {
        init();

        Restaurant foundRestaurant = repository.findByName("Test1").get();
        foundRestaurant.setName("UpdatedTest1");

        Restaurant updatedRestaurant = repository.save(foundRestaurant);

        assertThat(foundRestaurant.getName())
                .isEqualTo(updatedRestaurant.getName());

    }

    /**
     * Cannot update non-existing restaurant
     *
     */
    @Test(expected = NoSuchElementException.class)
    public void should_not_update_unknown_restaurant() {
        init();

        Restaurant foundRestaurant = repository.findByName("WrongName").get();
        foundRestaurant.setName("UpdatedTest1");

        repository.save(foundRestaurant);
        Restaurant updatedRestaurant = repository.findByName("UpdatedTest1").get();
    }

    /**
     * Delete restaurant
     *
     */
    @Test
    public void should_delete_restaurant() {
        init();

        Restaurant foundRestaurant = repository.findByName("Test1").get();
        repository.delete(foundRestaurant);

        assertThat(repository.findAll()).hasSize(1);
    }

    /**
     * Cannot delete non-existing restaurant
     *
     */
    @Test(expected = NoSuchElementException.class)
    public void should_not_delete_unknown_restaurant() {
        init();

        Restaurant foundRestaurant = repository.findByName("WrongName").get();
        repository.delete(foundRestaurant);
    }
}
