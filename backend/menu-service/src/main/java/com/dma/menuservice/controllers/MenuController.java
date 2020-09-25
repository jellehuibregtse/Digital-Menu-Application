package com.dma.menuservice.controllers;

import com.dma.menuservice.models.Menu;
import com.dma.menuservice.repositories.MenuRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuRepository menuRepository;

    public MenuController(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @CrossOrigin
    @RequestMapping("/getAll/{restaurantId}")
    public List<Menu> getAllMenus(@PathVariable long restaurantId) {
        var menus = menuRepository.findAll();
        return StreamSupport.stream(menus.spliterator(), false).filter(menu -> menu.getRestaurantId() == restaurantId).collect(Collectors.toList());
    }

    @CrossOrigin
    @RequestMapping("/get/{menuId}/")
    public Menu getMenu(@PathVariable long menuId) {
        var menu = menuRepository.findById(menuId);
        return menu.orElse(null);
    }
}
