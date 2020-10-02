package com.dma.menuservice.controllers;

import com.dma.menuservice.models.Menu;
import com.dma.menuservice.repositories.MenuRepository;
import com.dma.menuservice.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@CrossOrigin
@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuRepository menuRepository;

    private final RestaurantService restaurantService;

    public MenuController(MenuRepository menuRepository, RestaurantService restaurantService) {
        this.menuRepository = menuRepository;
        this.restaurantService = restaurantService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllMenus(@RequestParam long restaurantId) {
        var menus = menuRepository.findAll();
        var filteredMenus = StreamSupport.stream(menus.spliterator(), false).filter(menu -> menu.getRestaurantId() == restaurantId).collect(Collectors.toList());
        return ResponseEntity.ok(filteredMenus);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getMenu(@RequestParam long menuId) {
        var menu = menuRepository.findById(menuId);

        if (menu.isPresent()) {
            return ResponseEntity.ok(menu.get());
        }

        return ResponseEntity.badRequest().body("Menu has not been found.");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMenu(@RequestBody Menu menu) {
        var restaurant = restaurantService.getRestaurant(menu.getRestaurantId());
        if (restaurant.getId() == menu.getRestaurantId()) {
            return ResponseEntity.ok(String.format("Menu, %s has been successfully created!", menu.getName()));
        }

        return ResponseEntity.badRequest().body("That restaurant does not exist");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMenu(@RequestParam long menuId) {
        var menu = menuRepository.findById(menuId);

        if (menu.isPresent()) {
            menuRepository.delete(menu.get());
            return ResponseEntity.ok(String.format("Menu, %s has been successfully deleted!", menu.get().getName()));
        }

        return ResponseEntity.badRequest().body("Menu has not been found.");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMenu(@RequestBody Menu menu) {
        var menuFromRepository = menuRepository.findById(menu.getId());

        if (menuFromRepository.isPresent()) {
            var updatedMenu = menuFromRepository.get();
            updatedMenu.setRestaurantId(menu.getRestaurantId());
            updatedMenu.setName(menu.getName());
            updatedMenu.setItems(menu.getItems());

            menuRepository.save(updatedMenu);
            return ResponseEntity.ok(String.format("Menu, %s has been successfully updated!", menu.getName()));
        }

        return ResponseEntity.badRequest().body("Menu has not been found.");
    }

}
