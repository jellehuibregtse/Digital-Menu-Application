package com.dma.inventoryservice.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private long restaurantId;

    @NotNull
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    private List<InventoryItem> items;

    public Inventory(){}

    public Inventory(@NotNull long restaurantId, @NotNull String name, List<InventoryItem> items){
        this.restaurantId = restaurantId;
        this.name = name;
        this.items = items;
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

    public List<InventoryItem> getItems() {
        return items;
    }

    public void setItems(List<InventoryItem> items) {
        this.items = items;
    }
}
