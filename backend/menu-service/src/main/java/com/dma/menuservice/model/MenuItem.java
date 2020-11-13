package com.dma.menuservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

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

    @Enumerated(EnumType.STRING)
    private ItemCategory category;

    @Enumerated
    @ElementCollection(targetClass = Allergens.class)
    private Collection<Allergens> allergens;

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

    public ItemCategory getCategory() {
        return category;
    }

    public void setCategory(ItemCategory category) {
        this.category = category;
    }

    public Collection<Allergens> getAllergens() {
        return allergens;
    }

    public void setAllergens(Collection<Allergens> allergens) {
        this.allergens = allergens;
    }
}
