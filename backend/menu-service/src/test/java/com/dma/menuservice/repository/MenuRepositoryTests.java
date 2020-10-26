package com.dma.menuservice.repository;

import com.dma.menuservice.model.Menu;
import com.dma.menuservice.model.MenuItem;
import com.dma.menuservice.model.Restaurant;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests for the restaurant repository.
 *
 * @author Jordan Radushev
 */

@DataJpaTest
@ActiveProfiles("test")
public class MenuRepositoryTests {

    @Autowired
    private MenuRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    private Menu testMenu;

    /**
     * Initialize persistent data in the entity manager
     */
    @BeforeEach
    public void init() {
        MenuItem testItemOne = new MenuItem();
        testItemOne.setName("Steak");

        MenuItem testItemTwo = new MenuItem();
        testItemOne.setName("Coca Cola 330ml");

        Restaurant testRestaurant = new Restaurant();
        testRestaurant.setName("Test Restaurant 1");
        testRestaurant.setId(1L);

        testMenu = new Menu();
        testMenu.setName("TestMenu");
        testMenu.setRestaurantId(testRestaurant.getId());
        List<MenuItem> testItems = Arrays.asList(testItemOne, testItemTwo);
        testMenu.setItems(testItems);

        entityManager.persist(testMenu);


    }

    @Test
    public void should_get_single_menu() {
        Long id = (Long) entityManager.getId(testMenu);
        Menu foundMenu = repository.findById(id).get();

        assertThat(foundMenu.getName()).isEqualTo("TestMenu");
        assertThat(foundMenu.getRestaurantId()).isEqualTo(1L);
        assertThat(foundMenu.getItems().size()).isEqualTo(2);

    }

    @Test
    public void should_not_get_non_existing_menu() {
        Assertions.assertThrows(NoSuchElementException.class, () -> {
            repository.findById(3L).get();
        });

    }

    @Test
    public void should_create_new_menu() {
        MenuItem testItemThree = new MenuItem();
        testItemThree.setName("Rice with vegetables");

        Menu newMenu = new Menu();
        newMenu.setRestaurantId(2L);
        newMenu.setName("TestMenuTwo");
        newMenu.setItems(Collections.singletonList(testItemThree));

        repository.save(newMenu);

        Long id = (Long) entityManager.getId(newMenu);
        Menu foundMenu = repository.findById(id).get();

        assertThat(foundMenu.getName()).isEqualTo(newMenu.getName());
        assertThat(foundMenu.getItems().size()).isEqualTo(1);

    }

    @Test
    public void should_update_menu() {
        Long id = (Long) entityManager.getId(testMenu);
        Menu foundMenu = repository.findById(id).get();

        MenuItem testItemThree = new MenuItem();
        testItemThree.setName("Fanta 330ml");

        foundMenu.setItems(Collections.singletonList(testItemThree));
        foundMenu.setName("UpdatedTestRestaurant");

        Menu updatedMenu = entityManager.find(Menu.class, foundMenu.getId());

        assertThat(updatedMenu.getItems().contains(testItemThree)).isTrue();
        assertThat(updatedMenu.getItems().size()).isNotEqualTo(2);

    }

    @Test
    public void should_delete_menu() {
        Long id = (Long) entityManager.getId(testMenu);
        Menu foundMenu = repository.findById(id).get();
        repository.delete(foundMenu);

        assertThat(repository.findAll()).hasSize(0);
    }

}
