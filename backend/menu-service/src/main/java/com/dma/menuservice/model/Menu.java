package com.dma.menuservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.lang.reflect.Array;
import java.util.*;

/**
 * The menu entity.
 *
 * @author Jelle Huibregtse
 */
@Entity
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private long restaurantId;

    @NotNull
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    private List<MenuItem> items;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Category> categories;


    public Menu() {}

    public Menu(@NotNull long restaurantId, @NotNull String name, List<MenuItem> items) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.items = items;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MenuItem> getItems() {
        return items;
    }

    public void setItems(List<MenuItem> items) {
        this.items = items;
    }

    public List<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

}
