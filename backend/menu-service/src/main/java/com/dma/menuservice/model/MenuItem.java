package com.dma.menuservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

/**
 * The MenuItem entity.
 *
 * @author Jelle Huibregtse
 */
@Entity
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String name;

    private double price;

    @OneToOne(cascade = CascadeType.ALL)
    private Category category;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;
    
    public MenuItem() {

    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Ingredient> getIngredients() {
        return this.ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients =ingredients;
    }
}
