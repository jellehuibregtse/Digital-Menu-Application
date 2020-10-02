package com.dma.menuservice.controllers;

import com.dma.menuservice.models.Menu;
import com.dma.menuservice.repositories.MenuRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public List<Menu> getAllMenus(@RequestParam long restaurantId) {
        var menus = menuRepository.findAll();
        return StreamSupport.stream(menus.spliterator(), false).filter(menu -> menu.getRestaurantId() == restaurantId).collect(Collectors.toList());
    }

    @GetMapping("/get")
    public Menu getMenu(@RequestParam long menuId) {
        var menu = menuRepository.findById(menuId);
        return menu.orElse(new Menu());
    }

    @PostMapping("/add")
    public Menu addMenu(@RequestBody Menu menu) {
        return menuRepository.save(menu);
    }
}
