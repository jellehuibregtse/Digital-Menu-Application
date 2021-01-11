package com.dma.menuservice.controller;


import com.dma.menuservice.model.Category;
import com.dma.menuservice.model.Menu;
import com.dma.menuservice.model.MenuItem;
import com.dma.menuservice.repository.MenuItemRepository;
import com.dma.menuservice.repository.MenuRepository;
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

    private final MenuRepository menuRepository;
    private final MenuItemRepository menuItemRepository;

    public MenuController(MenuRepository menuRepository, MenuItemRepository menuItemRepository) {
        this.menuRepository = menuRepository;
        this.menuItemRepository = menuItemRepository;
    }

    /**
     * Get a list of all menus.
     *
     * @return <code>ResponseEntity</code> with a list of menus and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> result = new ArrayList<>();
        menuRepository.findAll().forEach(result::add);

        return ResponseEntity.ok(result);
    }


    @GetMapping("/byRestaurantId/{restaurantId}")
    public ResponseEntity<List<Menu>> getAllMenusByRestaurantId(@PathVariable long restaurantId) {
        return ResponseEntity.ok(menuRepository.findByRestaurantId(restaurantId).orElse(new ArrayList<>()));
    }

    /**
     * Get a single menu by ID.
     *
     * @param id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @GetMapping("{id}")
    public ResponseEntity<Menu> getMenu(@PathVariable long id) {
        Menu result = menuRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found."));
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
        menuRepository.save(menu);

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
                menuRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));

        updatedMenu.setRestaurantId(menu.getRestaurantId());
        updatedMenu.setName(menu.getName());
        updatedMenu.setItems(menu.getItems());
        updatedMenu.setCategories(menu.getCategories());
        menuRepository.save(updatedMenu);

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
        Menu result = menuRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));

        menuRepository.delete(result);

        return ResponseEntity.ok(String.format("Restaurant with id: %d has been successfully deleted!", id));
    }


    /**
     * Get menu item by ID.
     *
     * @param id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @GetMapping("/menuitem/{id}")
    public ResponseEntity<?> getMenuItem(@PathVariable long id) {
        MenuItem result = menuItemRepository.findById(id).orElse(null);


        return ResponseEntity.ok(result);
    }

    /**
     * Add menu item to ID.
     *
     * @param menuId - id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @PutMapping("/addMenuItem/{menuId}")
    public ResponseEntity<?> addMenuItemToMenu(@RequestBody MenuItem item, @PathVariable long menuId) {
        Menu menu = menuRepository.findById(menuId).orElse(null);
        var items = menu.getItems();

        Category category = menu.getCategories()
                .stream().filter(c -> c.getId() == item.getCategory().getId())
                .findFirst().get();

        MenuItem newItem = new MenuItem();
        newItem.setName(item.getName());
        newItem.setPrice(item.getPrice());
        newItem.setCategory(category);

        items.add(newItem);
        menuRepository.save(menu);
        return ResponseEntity.ok("Sucessfully updated");
    }

    /**
     * Add menu item to ID.
     *
     * @param menuId - id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @PutMapping("/updateMenuItem/{menuId}")
    public ResponseEntity<?> updateMenuItem(@RequestBody MenuItem item, @PathVariable long menuId) {

        Menu menu = menuRepository.findById(menuId).get();
        MenuItem selectedItem = menu.getItems()
                .stream()
                .filter(i -> i.getId() == item.getId())
                .findFirst()
                .get();

        int index = menu.getItems().indexOf(selectedItem);

        long updatedCategoryId = item.getCategory().getId();
        Category updatedCategory = menu.getCategories()
                .stream()
                .filter(c -> c.getId() == updatedCategoryId)
                .findFirst()
                .get();

        selectedItem.setPrice(item.getPrice());
        selectedItem.setCategory(updatedCategory);
        selectedItem.setName(item.getName());
        selectedItem.setIngredients(item.getIngredients());

        menu.getItems().set(index, selectedItem);
        menuRepository.save(menu);

        return ResponseEntity.ok("Sucessfully updated");
    }

    /**
     * Delete item in menu.
     *
     * @param menuId - id of the menu.
     * @return <code>ResponseEntity</code> with a menu or message and HTTP status OK or BadRequest.
     */
    @PutMapping("/deleteMenuItem/{menuId}")
    public ResponseEntity<?> deleteMenuItem(@RequestBody MenuItem item, @PathVariable long menuId) {

        Menu menu = menuRepository.findById(menuId).get();
        MenuItem selectedItem = menu.getItems()
                .stream()
                .filter(i -> i.getId() == item.getId())
                .findFirst()
                .get();

        int index = menu.getItems().indexOf(selectedItem);

        menu.getItems().remove(index);
        menuRepository.save(menu);

        return ResponseEntity.ok("Sucessfully deleted");
    }
}
