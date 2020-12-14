//package com.dma.menuservice;
//
//import com.dma.menuservice.model.*;
//import com.dma.menuservice.repository.MenuRepository;
//import org.h2.command.Command;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.lang.reflect.Array;
//import java.util.Arrays;
//import java.util.List;
//
//@Component
//public class Runner implements CommandLineRunner {
//
//    @Autowired
//    private MenuRepository repository;
//
//    private Menu testMenu;
//
//    @Override
//    public void run(String... args) throws Exception {
//        //Init Restaurant
//        Restaurant testRestaurant = new Restaurant();
//
//        testRestaurant.setName("Demo Restaurant");
//        testRestaurant.setId(78L);
//
//        //Init Categories
//        Category categoryOne = new Category();
//        categoryOne.setName("Main Dishes");
//
//        Category categoryTwo = new Category();
//        categoryTwo.setName("Beverages");
//
//        Category categoryThree = new Category();
//        categoryThree.setName("Salads");
//
//        //Init Ingredients
//        Ingredient ingredientOne = new Ingredient();
//        ingredientOne.setName("Meat");
//        Ingredient ingredientTwo = new Ingredient();
//        ingredientTwo.setName("Fish");
//
//        //Init Menu
//        testMenu = new Menu();
//        testMenu.setName("TestMenu");
//        testMenu.setRestaurantId(testRestaurant.getId());
//        testMenu.setCategories(Arrays.asList(categoryOne, categoryTwo,categoryThree));
//
//        //Init Menu Items
//        MenuItem testItemOne = new MenuItem();
//        testItemOne.setName("Steak");
//        testItemOne.setPrice(12.99);
//        testItemOne.setCategory(testMenu.getCategories().get(0));
//        testItemOne.setIngredients(Arrays.asList(ingredientOne));
//
//        MenuItem testItemTwo = new MenuItem();
//        testItemTwo.setName("Fanta 330ml");
//        testItemTwo.setPrice(1.99);
//        testItemTwo.setCategory(testMenu.getCategories().get(1));
//
//        MenuItem testItemThree = new MenuItem();
//        testItemThree.setName("Salmon with vegetables");
//        testItemThree.setPrice(15.99);
//        testItemThree.setCategory(testMenu.getCategories().get(0));
//        testItemThree.setIngredients(Arrays.asList(ingredientTwo));
//
//        MenuItem testItemFour = new MenuItem();
//        testItemFour.setName("Lipton 330ml");
//        testItemFour.setPrice(1.99);
//        testItemFour.setCategory(testMenu.getCategories().get(1));
//
//        MenuItem testItemFive = new MenuItem();
//        testItemFive.setName("Tuna Salad");
//        testItemFive.setPrice(9.99);
//        testItemFive.setIngredients(Arrays.asList(ingredientTwo));
//        testItemFive.setCategory(testMenu.getCategories().get(2));
//
//        List<MenuItem> testItems = Arrays.asList(testItemOne, testItemTwo,testItemThree,testItemFour,testItemFive);
//        testMenu.setItems(testItems);
//
//        repository.save(testMenu);
//    }
//}
//
