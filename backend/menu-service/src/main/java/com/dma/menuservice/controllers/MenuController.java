package com.dma.menuservice.controllers;

import com.dma.menuservice.models.Menu;
import com.dma.menuservice.repositories.MenuRepository;
import com.dma.menuservice.services.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * The controller that handles all the mappings for the menu service.
 *
 * @author Jelle Huibregtse
 */
@CrossOrigin
@RestController
@RequestMapping("/menus")
public class MenuController {

    private final MenuRepository menuRepository;

    private final RestaurantService restaurantService;

    public MenuController(MenuRepository menuRepository, RestaurantService restaurantService) {
        this.menuRepository = menuRepository;
        this.restaurantService = restaurantService;
    }

    /**
     * Get a list of all menus.
     *
     * @return <code>ResponseEntity</code> with a list of menus and HTTP status OK.
     */
    @GetMapping("/")
    public ResponseEntity<Iterable<Menu>> getAllMenus() {
        var menus = menuRepository.findAll();
        return ResponseEntity.ok(menus);
    }

    /**
     * Get a single men by ID.
     *
     * @param id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getMenu(@PathVariable long id) {
        var menu = menuRepository.findById(id);

        if (menu.isPresent()) {
            return ResponseEntity.ok(menu.get());
        }

        return ResponseEntity.badRequest().body("Menu has not been found.");
    }

    /**
     * Create a menu.
     *
     * @param menu that needs to be created.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @PostMapping("/")
    public ResponseEntity<?> createMenu(@RequestBody Menu menu) {
        var restaurant = restaurantService.getRestaurant(menu.getRestaurantId());

        if (restaurant.getId() == menu.getRestaurantId()) {
            return ResponseEntity.ok(String.format("Menu, %s has been successfully created!", menu.getName()));
        }

        return ResponseEntity.badRequest().body("That restaurant does not exist");
    }

    /**
     * Delete a menu by ID.
     *
     * @param id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenu(@PathVariable long id) {
        var menu = menuRepository.findById(id);

        if (menu.isPresent()) {
            menuRepository.delete(menu.get());
            return ResponseEntity.ok(String.format("Menu, %s has been successfully deleted!", menu.get().getName()));
        }

        return ResponseEntity.badRequest().body("Menu has not been found.");
    }

    /**
     * Update a menu.
     *
     * @param menu that needs to be updated.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @PutMapping("/")
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
