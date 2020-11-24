package com.dma.menuservice;

import com.dma.menuservice.model.*;
import com.dma.menuservice.repository.MenuRepository;
import org.h2.command.Command;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class Runner implements CommandLineRunner {

    @Autowired
    private MenuRepository repository;

    private Menu testMenu;

    @Override
    public void run(String... args) throws Exception {
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
        Ingredient ingredientTwo = new Ingredient();
        ingredientTwo.setName("Fish");

        //Init Menu
        testMenu = new Menu();
        testMenu.setName("TestMenu");
        testMenu.setRestaurantId(testRestaurant.getId());
        testMenu.setCategories(Arrays.asList(categoryOne, categoryTwo));
        testMenu.setIngredients(Arrays.asList(ingredientOne,ingredientTwo));

        //Init Menu Items
        MenuItem testItemOne = new MenuItem();
        testItemOne.setName("Steak");
        testItemOne.setCategory(testMenu.getCategories().get(0));
        testItemOne.setIngredients(Arrays.asList(testMenu.getIngredients().get(0)));

        MenuItem testItemTwo = new MenuItem();
        testItemTwo.setName("Coca Cola 330ml");
        testItemTwo.setCategory(testMenu.getCategories().get(1));

        MenuItem testItemThree = new MenuItem();
        testItemThree.setName("Salmon with fries");
        testItemThree.setCategory(testMenu.getCategories().get(0));
        testItemThree.setIngredients(Arrays.asList(testMenu.getIngredients().get(1)));

        List<MenuItem> testItems = Arrays.asList(testItemOne, testItemTwo,testItemThree);
        testMenu.setItems(testItems);

        repository.save(testMenu);
    }
}
