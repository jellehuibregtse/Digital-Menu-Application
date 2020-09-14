package com.dma.menuservice.models;

import java.util.ArrayList;
import java.util.List;

public class Menu {

    private String restaurantId;
    private String menuName;
    private List<MenuItem> menuItems;

    public Menu() {
    }

    public Menu(String restaurantId, String menuName) {
        this.restaurantId = restaurantId;
        this.menuName = menuName;
        this.menuItems = new ArrayList<>();
    }

    public Menu(String restaurantId, String menuName, List<MenuItem> menuItems) {
        this.restaurantId = restaurantId;
        this.menuName = menuName;
        this.menuItems = menuItems;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }
}
