package com.dma.menuservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    public Menu(@NotNull long restaurantId, @NotNull String name, List<MenuItem> items) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.items = items;
    }
}
