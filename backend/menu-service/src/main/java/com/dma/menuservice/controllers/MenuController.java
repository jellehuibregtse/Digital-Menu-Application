package com.dma.menuservice.controllers;

import com.dma.menuservice.models.Menu;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/menu")
public class MenuController {

    @RequestMapping("/{restaurantId}")
    public Menu getMenu(@PathVariable String restaurantId) {
        return new Menu(restaurantId, "Menu");
    }
}
