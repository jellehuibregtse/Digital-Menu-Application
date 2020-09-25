package com.dma.menuservice.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;

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

    public long getId() {
        return id;
    }

    public long getRestaurantId() {
        return restaurantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MenuItem> getItems() {
        return Collections.unmodifiableList(items);
    }
}
