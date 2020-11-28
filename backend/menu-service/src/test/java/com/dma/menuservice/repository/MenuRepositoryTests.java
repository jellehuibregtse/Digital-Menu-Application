package com.dma.menuservice.repository;

import com.dma.menuservice.model.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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
        //Init Restaurant
        Restaurant testRestaurant = new Restaurant();
        testRestaurant.setName("Test Restaurant 1");
        testRestaurant.setId(1L);

        //Init Categories
        Category categoryOne = new Category();
        categoryOne.setName("Main Dishes");

        Category categoryTwo = new Category();
        categoryTwo.setName("Beverages");

        //Init Ingredients
        Ingredient ingredientOne = new Ingredient();
        ingredientOne.setName("Meat");
        
        //Init Menu
        testMenu = new Menu();
        testMenu.setName("TestMenu");
        testMenu.setRestaurantId(testRestaurant.getId());
        testMenu.setCategories(Arrays.asList(categoryOne,categoryTwo));


        //Init Menu Items
        MenuItem testItemOne = new MenuItem();
        testItemOne.setName("Steak");
        testItemOne.setCategory(testMenu.getCategories().get(0));
        testItemOne.setIngredients(Arrays.asList(ingredientOne));

        MenuItem testItemTwo = new MenuItem();
        testItemTwo.setName("Coca Cola 330ml");
        testItemTwo.setCategory(testMenu.getCategories().get(1));

        List<MenuItem> testItems = Arrays.asList(testItemOne, testItemTwo);
        testMenu.setItems(testItems);
        entityManager.persist(testMenu);
    }

    @Test
    public void should_get_menu_categories(){
        Long id = (Long) entityManager.getId(testMenu);
        var menu = repository.findById(id);
        assertThat(menu.get().getItems().size()).isEqualTo(2);

        assertThat(menu.get().getCategories().size()).isEqualTo(2);

        assertThat(menu.get().getItems().get(0).getCategory().getName()).isEqualTo("Main Dishes");
        assertThat(menu.get().getItems().get(1).getCategory().getName()).isEqualTo("Beverages");
    }

    @Test
    public void should_get_menuitem_ingredients(){
        Long id = (Long) entityManager.getId(testMenu);
        var menu = repository.findById(id);
        var menuItem = menu.get().getItems().get(0);

        assertThat(menuItem.getIngredients().get(0).getName()).isEqualTo("Meat");

    }
    @Test
    public void should_get_single_menu() {
        Long id = (Long) entityManager.getId(testMenu);
        var menu = repository.findById(id);

        Assertions.assertTrue(menu.isPresent());
        assertThat(menu.get().getName()).isEqualTo("TestMenu");
        assertThat(menu.get().getRestaurantId()).isEqualTo(1L);
    }

    @Test
    public void should_not_get_non_existing_menu() {
        var menu = repository.findById(3L);

        Assertions.assertFalse(menu.isPresent());
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
        var menu = repository.findById(id);

        Assertions.assertTrue(menu.isPresent());
        assertThat(menu.get().getName()).isEqualTo(newMenu.getName());
        assertThat(menu.get().getItems().size()).isEqualTo(1);
    }

    @Test
    public void should_update_menu() {
        Long id = (Long) entityManager.getId(testMenu);
        var menu = repository.findById(id);

        Assertions.assertTrue(menu.isPresent());

        var foundMenu = menu.get();

        MenuItem testItemThree = new MenuItem();
        testItemThree.setName("Fanta 330ml");

        foundMenu.setItems(Collections.singletonList(testItemThree));
        foundMenu.setName("UpdatedTestRestaurant");

        Menu updatedMenu = entityManager.find(Menu.class, foundMenu.getId());

        assertThat(updatedMenu.getItems().contains(testItemThree)).isTrue();
        assertThat(updatedMenu.getItems().size()).isNotEqualTo(2);
    }
}