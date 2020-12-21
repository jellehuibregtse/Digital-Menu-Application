package com.dma.menuservice.controller;


import com.dma.menuservice.model.Category;
import com.dma.menuservice.model.Menu;
import com.dma.menuservice.model.MenuItem;
import com.dma.menuservice.repository.MenuRepository;
import com.dma.menuservice.service.RestaurantService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * The controller that handles all the mappings for the menu service.
 *
 * @author Jelle Huibregtse
 */
@RestController
@RequestMapping("/menus")
public class MenuController {

    private final MenuRepository repository;

    private final RestaurantService restaurantService;

    public MenuController(MenuRepository repository, RestaurantService restaurantService) {
        this.repository = repository;
        this.restaurantService = restaurantService;
    }

    /**
     * Get a list of all menus.
     *
     * @return <code>ResponseEntity</code> with a list of menus and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> result = new ArrayList<>();
        repository.findAll().forEach(result::add);

        return ResponseEntity.ok(result);
    }

    
    @GetMapping("/byRestaurantId/{restaurantId}")
    public ResponseEntity<List<Menu>> getAllMenusByRestaurantId(@PathVariable long restaurantId) {
        List<Menu> result = new ArrayList<>();
        result = repository.findByRestaurantId(restaurantId).orElse(null);

        return ResponseEntity.ok(result);
    }

    /**
     * Get a single men by ID.
     *
     * @param id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @GetMapping("{id}")
    public ResponseEntity<Menu> getMenu(@PathVariable long id) {
        Menu result = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found."));
        return ResponseEntity.ok(result);
    }

    /**
     * Create a menu.
     *
     * @param menu that needs to be created.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @PostMapping
    public ResponseEntity<String> createMenu(@RequestBody Menu menu) {

        List<Category> categories = new ArrayList<>();
        if(menu.getCategories()!=null) {
            for (var c : menu.getCategories()){
                categories.add(new Category(c.getName()));
            }
        }

        repository.save(menu);

        return ResponseEntity.ok(String.format("Menu with name: %s has been successfully created!", menu.getName()));
    }

    /**
     * Update a menu.
     *
     * @param menu that needs to be updated.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @PutMapping("{id}")
    public ResponseEntity<String> updateMenu(@RequestBody Menu menu, @PathVariable long id) {
        Menu updatedMenu =
                repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));

        updatedMenu.setRestaurantId(menu.getRestaurantId());
        updatedMenu.setName(menu.getName());
        updatedMenu.setItems(menu.getItems());
        repository.save(updatedMenu);

        return ResponseEntity.ok(String.format("Restaurant with id: %d has been successfully updated!", menu.getId()));
    }

    /**
     * Delete a menu by ID.
     *
     * @param id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteMenu(@PathVariable long id) {
        Menu result = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));

        repository.delete(result);

        return ResponseEntity.ok(String.format("Restaurant with id: %d has been successfully deleted!", id));
    }


    @GetMapping("/menuitem/{id}")
    public ResponseEntity<?> getMenuItem(@PathVariable long id) {
        MenuItem result = repository.findMenuItemByItemId(id).orElse(null);


        return ResponseEntity.ok(result);
    }

    @PutMapping("/addMenuItem/{menuId}")
    public ResponseEntity<?> addMenuItemToMenu(@RequestBody MenuItem item,@PathVariable long menuId) {
       Menu menu =repository.findById(menuId).orElse(null);
       var items = menu.getItems();
       items.add(item);

       repository.save(menu);
        return ResponseEntity.ok("Sucessfully updated");
    }
}
