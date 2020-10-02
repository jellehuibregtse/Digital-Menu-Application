package com.dma.menuservice.controllers;

import com.dma.menuservice.models.Menu;
import com.dma.menuservice.repositories.MenuRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@CrossOrigin
@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuRepository menuRepository;

    public MenuController(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
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

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMenu(@RequestBody Menu menu) {
        return ResponseEntity.ok(String.format("Menu, %s has been successfully created!", menu.getName()));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMenu(@RequestParam long menuId) {
        var menu = menuRepository.findById(menuId);

        if (menu.isPresent()) {
            menuRepository.delete(menu.get());
            return ResponseEntity.ok(String.format("Menu, %s has been successfully deleted!", menu.get().getName()));
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMenu(@RequestBody Menu menu) {
        var menuFromRepository = menuRepository.findById(menu.getId()));

        if (menuFromRepository.isPresent()) {
            var updatedMenu = menuFromRepository.get();
            updatedMenu.setRestaurantId(menu.getRestaurantId());
            updatedMenu.setName(menu.getName());
            updatedMenu.setItems(menu.getItems());

            menuRepository.save(updatedMenu);
            return ResponseEntity.ok(String.format("Menu, %s has been successfully updated!", menu.getName()));
        }

        return ResponseEntity.notFound().build();
    }

}
